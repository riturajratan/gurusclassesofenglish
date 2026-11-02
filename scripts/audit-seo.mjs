import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
assert.ok(fs.existsSync(root), "Run npm run build before the SEO audit.");
const origin = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://gurusclassesofenglish.com"
).replace(/\/$/, "");
const read = (route) =>
  fs.readFileSync(path.join(root, route, "index.html"), "utf8");
const meta = (html, name) => {
  const tag = html.match(
    new RegExp(`<meta (?:name|property)="${name}"[^>]*>`),
  )?.[0];
  return tag?.match(/content="([^"]*)"/)?.[1];
};
const canonical = (html) =>
  html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
assert.equal(
  fs.readFileSync(path.join(root, "ads.txt"), "utf8").trim(),
  "google.com, pub-8791576499923818, DIRECT, f08c47fec0942fa0",
  "Incorrect ads.txt publisher",
);
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap entries");
const files = fs
  .readdirSync("content/posts")
  .filter((file) => file.endsWith(".json"));
const lessons = files.map((file) =>
  JSON.parse(fs.readFileSync(path.join("content/posts", file), "utf8")),
);
const published = lessons.filter((lesson) => !lesson.sample);
assert.equal(
  urls.length,
  published.length + 6,
  "Sitemap must include every real lesson and six public pages",
);

let articles = 0;
for (const address of urls) {
  const url = new URL(address);
  assert.equal(url.origin, origin, `Wrong sitemap origin: ${address}`);
  const html = read(decodeURIComponent(url.pathname));
  assert.ok(
    html.includes('href="/privacy/"'),
    `Missing privacy link: ${address}`,
  );
  assert.equal(canonical(html), address, `Incorrect canonical: ${address}`);
  assert.ok(meta(html, "description"), `Missing description: ${address}`);
  assert.equal(
    meta(html, "og:url"),
    address,
    `Incorrect social URL: ${address}`,
  );
  assert.ok(meta(html, "og:title"), `Missing social title: ${address}`);
  assert.ok(meta(html, "twitter:title"), `Missing Twitter title: ${address}`);
  assert.ok(
    !meta(html, "robots")?.includes("noindex"),
    `Sitemap URL is noindex: ${address}`,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) || []).length,
    1,
    `Expected one H1: ${address}`,
  );
  const schemas = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    ),
  ].map((match) => JSON.parse(match[1]));
  assert.ok(
    schemas.some((schema) =>
      schema["@graph"]?.some((entry) => entry["@type"] === "WebSite"),
    ),
    `Missing website identity: ${address}`,
  );
  const image = meta(html, "og:image");
  if (image && new URL(image).origin === origin) {
    assert.ok(
      fs.existsSync(path.join(root, new URL(image).pathname)),
      `Missing social image: ${image}`,
    );
  }
  if (url.pathname.startsWith("/blog/") && url.pathname !== "/blog/") {
    articles++;
    assert.ok(
      schemas.some((schema) => schema["@type"] === "BlogPosting"),
      `Missing article schema: ${address}`,
    );
    const breadcrumbs = schemas.find(
      (schema) => schema["@type"] === "BreadcrumbList",
    );
    assert.equal(
      breadcrumbs?.itemListElement.at(-1)?.item,
      address,
      `Incorrect breadcrumbs: ${address}`,
    );
  }
}
const sampleSlugs = fs
  .readdirSync(path.join(root, "blog"), { withFileTypes: true })
  .filter(
    (entry) =>
      entry.isDirectory() && !urls.includes(`${origin}/blog/${entry.name}/`),
  )
  .map((entry) => entry.name);
for (const address of urls) {
  const html = read(decodeURIComponent(new URL(address).pathname));
  for (const slug of sampleSlugs) {
    assert.ok(
      !html.includes(`href="/blog/${slug}/"`),
      `Sample linked from public content: ${address} → ${slug}`,
    );
  }
}
for (const lesson of published) {
  const lessonHtml = read(`/blog/${lesson.slug}/`);
  const eligibleForAd =
    (lesson.content.trim().match(/\S+/g) || []).length >= 100;
  assert.equal(
    lessonHtml.includes('data-lesson-ad="true"'),
    eligibleForAd,
    `Wrong ad placement eligibility: ${lesson.slug}`,
  );
  assert.ok(
    !/note for teacher review|teacher should review|review these details before publication|add or confirm the answers before publication/i.test(
      lesson.content,
    ),
    `Unresolved review note: ${lesson.slug}`,
  );
  if (lesson.updatedAt) {
    assert.ok(
      Date.parse(lesson.updatedAt) >= Date.parse(lesson.publishedAt),
      `Update precedes publication: ${lesson.slug}`,
    );
    const schemas = [
      ...read(`/blog/${lesson.slug}/`).matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
      ),
    ].map((match) => JSON.parse(match[1]));
    assert.equal(
      schemas.find((schema) => schema["@type"] === "BlogPosting")?.dateModified,
      lesson.updatedAt,
      `Wrong modification date: ${lesson.slug}`,
    );
  }
}
for (const lesson of lessons.filter((lesson) => lesson.sample)) {
  const address = `${origin}/blog/${lesson.slug}/`;
  assert.ok(!urls.includes(address), `Sample included in sitemap: ${address}`);
  assert.ok(
    meta(read(`/blog/${lesson.slug}/`), "robots")?.includes("noindex"),
    `Sample is indexable: ${address}`,
  );
}
// Legacy samples are loaded from lib/blogData.ts rather than content/posts.
// Every exported lesson must be either in the sitemap or explicitly noindex.
for (const entry of fs.readdirSync(path.join(root, "blog"), {
  withFileTypes: true,
})) {
  if (!entry.isDirectory()) continue;
  const route = `/blog/${entry.name}/`;
  const address = `${origin}${route}`;
  if (!urls.includes(address)) {
    assert.ok(
      meta(read(route), "robots")?.includes("noindex"),
      `Orphan indexable lesson: ${address}`,
    );
    assert.ok(
      !read(route).includes('data-lesson-ad="true"'),
      `Ad placement on a sample lesson: ${address}`,
    );
  }
}
for (const route of ["/publish/", "/offline/"]) {
  assert.ok(
    !read(route).includes('data-lesson-ad="true"'),
    `Ad placement on utility page: ${route}`,
  );
  assert.ok(
    meta(read(route), "robots")?.includes("noindex"),
    `Private/utility route is indexable: ${route}`,
  );
  assert.ok(
    !urls.includes(`${origin}${route}`),
    `Private/utility route in sitemap: ${route}`,
  );
}
for (const route of [
  "/",
  "/about/",
  "/contact/",
  "/privacy/",
  "/blog/",
  "/courses/",
]) {
  assert.ok(
    !read(route).includes('data-lesson-ad="true"'),
    `Ad placement outside published lessons: ${route}`,
  );
}
assert.ok(
  fs
    .readFileSync(path.join(root, "robots.txt"), "utf8")
    .includes(`Sitemap: ${origin}/sitemap.xml`),
);
console.log(
  `SEO audit passed: ${urls.length} indexable pages, ${articles} lesson articles, valid canonicals, social metadata, JSON-LD and sample exclusions.`,
);
