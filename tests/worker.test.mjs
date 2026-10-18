import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker, {
  createSession,
  verifySession,
  parseImage,
  validateFields,
  encodeBase64,
  slugify,
} from '../worker/src/index.mjs';
const origin = 'https://www.gurusclassesofenglish.com';
const secret = 'test-signing-secret-with-at-least-32-characters';
const image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jOSsAAAAASUVORK5CYII=';
const fields = {
  title: 'Affect & effect',
  content: '## A useful difference\n\nAffect is usually a verb.',
  category: 'Grammar',
  excerpt: 'Know the difference.',
  imageAlt: 'Affect and effect with examples.',
  seoTitle: 'Affect vs effect',
  seoDescription: 'Learn the difference.',
  tags: ['grammar'],
};
function environment() {
  const values = new Map();
  return {
    ADMIN_PASSWORD: 'a-long-test-password',
    SESSION_SECRET: secret,
    GITHUB_TOKEN: 'test-token',
    GITHUB_REPO: 'example/repo',
    GITHUB_BRANCH: 'main',
    SITE_URL: origin,
    ALLOWED_ORIGINS: origin,
    LOGIN_LIMIT: { limit: async () => ({ success: true }) },
    API_LIMIT: { limit: async () => ({ success: true }) },
    DRAFTS: {
      put: async (key, value) => values.set(key, value),
      get: async (key, type) => {
        const value = values.get(key);
        return value ? (type === 'json' ? JSON.parse(value) : value) : null;
      },
    },
  };
}
async function request(path, env, { body, token, requestOrigin = origin } = {}) {
  return worker.fetch(
    new Request(`https://publisher.example${path}`, {
      method: body ? 'POST' : 'GET',
      headers: {
        Origin: requestOrigin,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    }),
    env,
  );
}
test('signed sessions expire and reject tampering', async () => {
  const token = await createSession(secret, 1000);
  assert.equal(await verifySession(token, secret, 1001), true);
  assert.equal(await verifySession(token, secret, 1000 + 12 * 60 * 60 * 1000), false);
  assert.equal(await verifySession(token + 'x', secret, 1001), false);
  assert.equal(await verifySession(token, 'different-key', 1001), false);
});
test('image validation rejects executable content and wrong file signatures', () => {
  assert.equal(parseImage(image).extension, 'png');
  assert.throws(() => parseImage('data:image/svg+xml;base64,PHN2Zz4='));
  assert.throws(() => parseImage('data:image/png;base64,PHN2Zz4='));
  assert.throws(() => parseImage('data:image/jpeg;base64,AAAA'));
});
test('post fields reject path injection through topics, missing content and oversized metadata', () => {
  assert.equal(validateFields(fields).title, fields.title);
  assert.throws(() => validateFields({ ...fields, category: '../../private' }));
  assert.throws(() => validateFields({ ...fields, content: '' }));
  assert.throws(() => validateFields({ ...fields, tags: ['x'.repeat(51)] }));
  assert.equal(slugify('../../Affect & Effect'), 'affect-effect');
  assert.equal(atob(encodeBase64('English')), 'English');
});
test('origins, authentication, setup and login rate limits fail closed', async () => {
  const env = environment();
  assert.equal(
    (await request('/posts', env, { requestOrigin: 'https://evil.example' })).status,
    403,
  );
  assert.equal((await request('/posts', env)).status, 401);
  assert.equal((await request('/session', env, { body: { password: 'wrong' } })).status, 401);
  env.LOGIN_LIMIT.limit = async () => ({ success: false });
  assert.equal(
    (await request('/session', env, { body: { password: env.ADMIN_PASSWORD } })).status,
    429,
  );
  delete env.GITHUB_TOKEN;
  assert.equal((await (await request('/health', env)).json()).ready, false);
});
test('manual draft works without AI; GitHub writes image and post atomically and retries are idempotent', async () => {
  const env = environment();
  const token = await createSession(secret);
  const draft = await (await request('/draft', env, { token, body: { image } })).json();
  assert.ok(draft.id);
  assert.equal(draft.generated, false);
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options = {}) => {
    const path = new URL(url).pathname;
    const body = options.body ? JSON.parse(options.body) : null;
    calls.push({ path, method: options.method, body });
    if (path.includes('/contents/')) return Response.json({}, { status: 404 });
    if (path.includes('/git/ref/')) return Response.json({ object: { sha: 'a'.repeat(40) } });
    if (path.endsWith('/git/commits/' + 'a'.repeat(40)))
      return Response.json({ tree: { sha: 'base-tree' } });
    if (path.endsWith('/git/blobs')) return Response.json({ sha: 'blob-' + calls.length });
    if (path.endsWith('/git/trees')) return Response.json({ sha: 'new-tree' });
    if (path.endsWith('/git/commits')) return Response.json({ sha: 'b'.repeat(40) });
    if (path.includes('/git/refs/')) return Response.json({});
    throw new Error('Unexpected fetch ' + url);
  };
  try {
    const response = await request('/publish', env, {
      token,
      body: { draftId: draft.id, ...fields },
    });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.status, 'publishing');
    const tree = calls.find((call) => call.path.endsWith('/git/trees'));
    assert.equal(tree.body.tree.length, 2);
    assert.equal(tree.body.base_tree, 'base-tree');
    assert.equal(calls.find((call) => call.path.includes('/git/refs/')).body.force, false);
    const count = calls.length;
    const second = await (
      await request('/publish', env, { token, body: { draftId: draft.id, ...fields } })
    ).json();
    assert.equal(second.commit, result.commit);
    assert.equal(calls.length, count);
  } finally {
    globalThis.fetch = original;
  }
});
test('a GitHub conflict preserves the draft and never force pushes', async () => {
  const env = environment();
  const token = await createSession(secret);
  const draft = await (await request('/draft', env, { token, body: { image } })).json();
  const original = globalThis.fetch;
  globalThis.fetch = async () => Response.json({}, { status: 409 });
  try {
    const response = await request('/publish', env, {
      token,
      body: { draftId: draft.id, ...fields },
    });
    assert.equal(response.status, 409);
    assert.ok(await env.DRAFTS.get('draft:' + draft.id));
  } finally {
    globalThis.fetch = original;
  }
});

test('AI draft text is validated; invalid output falls back to manual entry without losing the image', async () => {
  const env = environment();
  env.OPENAI_API_KEY = 'test-key';
  env.OPENAI_MODEL = 'test-vision-model';
  const token = await createSession(secret);
  const original = globalThis.fetch;
  try {
    for (const output of [JSON.stringify(fields), '{not valid json}']) {
      globalThis.fetch = async (url, options) => {
        assert.equal(url, 'https://api.openai.com/v1/responses');
        const body = JSON.parse(options.body);
        assert.equal(body.store, false);
        assert.equal(body.text.format.strict, true);
        assert.equal(body.input[0].content[1].image_url, image);
        return Response.json({ output: [{ content: [{ type: 'output_text', text: output }] }] });
      };
      const result = await (await request('/draft', env, { token, body: { image } })).json();
      assert.equal(result.generated, output === JSON.stringify(fields));
      const saved = await env.DRAFTS.get('draft:' + result.id, 'json');
      assert.equal(saved.image, image);
    }
  } finally {
    globalThis.fetch = original;
  }
});
test('publication status requires the lesson marker and surfaces failed builds', async () => {
  const env = environment();
  const token = await createSession(secret);
  const commit = 'c'.repeat(40);
  const slug = 'example-12345678-1234';
  const receipt = { slug, commit, url: `${origin}/blog/${slug}/`, status: 'publishing' };
  await env.DRAFTS.put(`commit:${commit}:${slug}`, JSON.stringify(receipt));
  const original = globalThis.fetch;
  try {
    for (const [html, workflow, expected] of [
      ['<html>A fallback page</html>', [], 'publishing'],
      ['<article data-lesson-id="' + slug + '">Lesson</article>', [], 'live'],
      [
        '<html>Old page</html>',
        [{ name: 'Publish notebook', status: 'completed', conclusion: 'failure' }],
        'failed',
      ],
    ]) {
      globalThis.fetch = async (url) =>
        String(url).startsWith('https://api.github.com/')
          ? Response.json({ workflow_runs: workflow })
          : new Response(html, { status: 200 });
      const result = await (
        await request(`/status?commit=${commit}&slug=${slug}`, env, { token })
      ).json();
      assert.equal(result.status, expected);
    }
  } finally {
    globalThis.fetch = original;
  }
});
test('unpublish rejects traversal and deletes only the selected post JSON', async () => {
  const env = environment();
  const token = await createSession(secret);
  assert.equal(
    (await request('/unpublish', env, { token, body: { slug: '../../private' } })).status,
    400,
  );
  const calls = [];
  const original = globalThis.fetch;
  globalThis.fetch = async (url, options = {}) => {
    const path = new URL(url).pathname;
    const body = options.body ? JSON.parse(options.body) : null;
    calls.push({ path, body });
    if (path.includes('/contents/')) return Response.json({ sha: 'existing' });
    if (path.includes('/git/ref/')) return Response.json({ object: { sha: 'a'.repeat(40) } });
    if (path.endsWith('/git/commits/' + 'a'.repeat(40)))
      return Response.json({ tree: { sha: 'tree' } });
    if (path.endsWith('/git/trees')) return Response.json({ sha: 'next-tree' });
    if (path.endsWith('/git/commits')) return Response.json({ sha: 'd'.repeat(40) });
    if (path.includes('/git/refs/')) return Response.json({});
    throw new Error('Unexpected fetch');
  };
  try {
    const result = await (
      await request('/unpublish', env, { token, body: { slug: 'example-12345678-1234' } })
    ).json();
    assert.equal(result.removed, true);
    const tree = calls.find((call) => call.path.endsWith('/git/trees')).body.tree;
    assert.deepEqual(tree, [
      { path: 'content/posts/example-12345678-1234.json', mode: '100644', type: 'blob', sha: null },
    ]);
  } finally {
    globalThis.fetch = original;
  }
});
