'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import LessonBody from './LessonBody';
import { site } from '@/lib/site';
type Fields = {
  title: string;
  content: string;
  category: string;
  excerpt: string;
  imageAlt: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
};
type Receipt = {
  slug: string;
  url: string;
  commit: string;
  status: string;
  removed?: boolean;
  message?: string;
};
const empty: Fields = {
  title: '',
  content: '',
  category: 'Vocabulary',
  excerpt: '',
  imageAlt: '',
  seoTitle: '',
  seoDescription: '',
  tags: [],
};
const categories = ['Vocabulary', 'Grammar', 'Common Mistakes', 'Writing', 'Speaking'];
async function imageData(file: File): Promise<string> {
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
    throw new Error('Choose a JPEG, PNG or WebP image.');
  if (file.size > 20 * 1024 * 1024) throw new Error('Choose an image smaller than 20 MB.');
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Your browser could not prepare the image.');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL('image/webp', 0.92);
    if (data.length > 7 * 1024 * 1024)
      throw new Error('This image is still too large. Please choose a smaller version.');
    return data;
  } finally {
    bitmap.close();
  }
}
async function takeSharedImage(): Promise<File | null> {
  return new Promise((resolve) => {
    const req = indexedDB.open('gurus-share', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('images');
    req.onerror = () => resolve(null);
    req.onsuccess = () => {
      const db = req.result;
      const tx = db.transaction('images', 'readwrite');
      const store = tx.objectStore('images');
      const get = store.get('pending');
      let value: File | null = null;
      get.onsuccess = () => {
        value = get.result || null;
        store.delete('pending');
      };
      tx.oncomplete = () => {
        db.close();
        resolve(value);
      };
      tx.onerror = () => {
        db.close();
        resolve(null);
      };
    };
  });
}
export default function Publisher() {
  const [ready, setReady] = useState(false),
    [checking, setChecking] = useState(!!site.publisherUrl),
    [token, setToken] = useState(''),
    [password, setPassword] = useState('');
  const [image, setImage] = useState(''),
    [fields, setFields] = useState<Fields>({ ...empty }),
    [draftId, setDraftId] = useState('');
  const [busy, setBusy] = useState(''),
    [message, setMessage] = useState(''),
    [error, setError] = useState(''),
    [review, setReview] = useState(false),
    [hydrated, setHydrated] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null),
    [posts, setPosts] = useState<{ slug: string; url: string }[]>([]),
    [showPosts, setShowPosts] = useState(false),
    [removeSlug, setRemoveSlug] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);
  const actionLock = useRef(false);
  const api = useCallback(
    async (path: string, body?: unknown) => {
      if (!navigator.onLine)
        throw new Error(
          'You are offline. Reconnect and try again; keep this page open to retain your draft.',
        );
      const response = await fetch(`${site.publisherUrl}${path}`, {
        method: body === undefined ? 'GET' : 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
        signal: AbortSignal.timeout(90000),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          setToken('');
          sessionStorage.removeItem('gurus-session');
        }
        throw new Error(data.error || 'The request did not finish. Please try again.');
      }
      return data;
    },
    [token],
  );
  function update(name: keyof Fields, value: string | string[]) {
    setFields((previous) => ({ ...previous, [name]: value }));
    setReview(false);
  }
  async function choose(file: File) {
    setError('');
    setMessage('');
    if (draftId || image || fields.title) {
      if (!window.confirm('Replace the current draft with this image?')) return;
    }
    setBusy('Preparing your image…');
    try {
      const value = await imageData(file);
      setImage(value);
      setFields({ ...empty });
      setDraftId('');
      setReceipt(null);
      setReview(false);
      setMessage('Image ready. Next, prepare the lesson draft.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy('');
    }
  }
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('gurus-session');
      if (stored) setToken(stored);
      const draft = JSON.parse(localStorage.getItem('gurus-draft') || 'null');
      if (draft?.id && draft?.fields) {
        setDraftId(draft.id);
        setFields({ ...empty, ...draft.fields });
        setMessage(
          'Your last draft is restored. The image is saved privately by the publisher for 24 hours.',
        );
      }
      const saved = JSON.parse(localStorage.getItem('gurus-receipt') || 'null');
      if (saved) setReceipt(saved);
    } catch {}
    setHydrated(true);
    const params = new URLSearchParams(window.location.search);
    if (params.get('share') === 'invalid')
      setError('That shared file was not supported. Choose a JPEG, PNG or WebP image.');
    if (params.get('share') === 'ready') {
      takeSharedImage().then(async (file) => {
        if (file) {
          try {
            setImage(await imageData(file));
            setDraftId('');
            setFields({ ...empty });
            setReceipt(null);
            setMessage('Shared image received. Prepare your lesson when you are ready.');
          } catch (e) {
            setError((e as Error).message);
          }
        }
      });
      window.history.replaceState(null, '', '/publish/');
    }
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (draftId) localStorage.setItem('gurus-draft', JSON.stringify({ id: draftId, fields }));
      else localStorage.removeItem('gurus-draft');
      if (receipt) localStorage.setItem('gurus-receipt', JSON.stringify(receipt));
      else localStorage.removeItem('gurus-receipt');
    } catch {}
  }, [hydrated, draftId, fields, receipt]);
  useEffect(() => {
    if (!site.publisherUrl) return;
    const controller = new AbortController();
    fetch(`${site.publisherUrl}/health`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => {
        setReady(data.ready === true);
        if (!data.ready)
          setMessage(
            'The publisher is waiting for its account setup. You can try the editor below.',
          );
      })
      .catch(() =>
        setError('The publisher could not be reached. You can still preview a lesson below.'),
      )
      .finally(() => setChecking(false));
    return () => controller.abort();
  }, []);
  async function checkStatus(target: Receipt = receipt!) {
    if (!target || !ready || !token) return;
    try {
      const result = await api(
        `/status?commit=${encodeURIComponent(target.commit)}&slug=${encodeURIComponent(target.slug)}`,
      );
      setReceipt(result);
      if (result.status === 'failed') setError(result.message);
      return result;
    } catch (e) {
      setError((e as Error).message);
    }
  }
  useEffect(() => {
    if (!receipt || receipt.status !== 'publishing' || !token || !ready) return;
    let active = true;
    let tries = 0;
    let timer: ReturnType<typeof setTimeout>;
    async function poll() {
      if (!active) return;
      if (++tries > 30) {
        setMessage(
          'Deployment is taking longer than usual. Use “Check website status” to check again.',
        );
        return;
      }
      try {
        const result = await api(
          `/status?commit=${encodeURIComponent(receipt!.commit)}&slug=${encodeURIComponent(receipt!.slug)}`,
        );
        if (!active) return;
        setReceipt(result);
        if (result.status === 'failed') setError(result.message);
        if (result.status === 'publishing') timer = setTimeout(poll, 10000);
      } catch (e) {
        if (active) {
          setError((e as Error).message);
          timer = setTimeout(poll, 15000);
        }
      }
    }
    timer = setTimeout(poll, 5000);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [receipt?.commit, receipt?.status, token, ready, api]);
  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    if (actionLock.current) return;
    actionLock.current = true;
    setBusy('Signing in…');
    setError('');
    try {
      const result = await api('/session', { password });
      sessionStorage.setItem('gurus-session', result.token);
      setToken(result.token);
      setPassword('');
      setMessage('Welcome to your desk. Choose an image to begin.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy('');
      actionLock.current = false;
    }
  }
  async function prepare() {
    if (!image || actionLock.current) return;
    actionLock.current = true;
    setBusy('Preparing your lesson and SEO draft…');
    setError('');
    try {
      if (ready && token) {
        const result = await api('/draft', { image });
        setDraftId(result.id);
        if (result.fields) setFields(result.fields);
        setMessage(result.message);
      } else {
        setFields({ ...empty });
        setMessage(
          'Preview mode: add a title and lesson text below. Automatic preparation and publishing need the account setup.',
        );
      }
      setReview(false);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy('');
      actionLock.current = false;
    }
  }
  function completeFields() {
    return {
      ...fields,
      tags: [...new Set(fields.tags.map((tag) => tag.trim()).filter(Boolean))],
      excerpt: fields.excerpt.trim() || fields.content.replace(/[#*>]/g, '').trim().slice(0, 200),
      seoTitle: fields.seoTitle.trim() || fields.title.trim(),
      seoDescription:
        fields.seoDescription.trim() ||
        fields.excerpt.trim() ||
        fields.content.replace(/[#*>]/g, '').trim().slice(0, 160),
      imageAlt: fields.imageAlt.trim() || fields.title.trim(),
    };
  }
  function preview(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const value = completeFields();
    setFields(value);
    setReview(true);
    setMessage('Check the lesson against your image. You can return to editing before publishing.');
  }
  async function publish() {
    if (!ready || !token || !draftId || actionLock.current) return;
    actionLock.current = true;
    setBusy('Saving your post…');
    setError('');
    try {
      const result = await api('/publish', { draftId, ...completeFields() });
      setReceipt(result);
      setDraftId('');
      setImage('');
      setFields({ ...empty });
      setReview(false);
      setMessage('Saved to GitHub. Waiting for the website to finish publishing.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy('');
      actionLock.current = false;
    }
  }
  async function loadPosts() {
    setBusy('Loading your posts…');
    setError('');
    try {
      const data = await api('/posts');
      setPosts(data.posts);
      setShowPosts(true);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy('');
    }
  }
  async function unpublish(slug: string) {
    if (actionLock.current) return;
    actionLock.current = true;
    setBusy('Taking the lesson off the website…');
    setError('');
    try {
      const result = await api('/unpublish', { slug });
      setReceipt(result);
      setPosts((previous) => previous.filter((post) => post.slug !== slug));
      setRemoveSlug('');
      setMessage('The lesson is being removed from the website. Its history stays in GitHub.');
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy('');
      actionLock.current = false;
    }
  }
  const editorVisible = !!draftId || !!image;
  return (
    <div className="shell desk">
      <p className="eyebrow">A LITTLE ENGLISH, SHARED WITH THE WORLD</p>
      <h1>
        Your teacher’s desk<span className="coral-dot">.</span>
      </h1>
      <p className="desk-lead">
        Bring the image you made in ChatGPT. Review the lesson, make it yours, and share it with
        your readers.
      </p>
      <div className="steps">
        <strong>01 / CHOOSE AN IMAGE</strong>
        <span>02 / REVIEW YOUR LESSON</span>
        <span>03 / PUBLISH</span>
      </div>
      {checking ? (
        <p role="status" className="status-message">
          Connecting to your publisher…
        </p>
      ) : !ready ? (
        <p className="status-message">
          Editor preview · Publishing and automatic text preparation are not connected yet. You can
          choose an image and try the lesson preview.
        </p>
      ) : !token ? (
        <form onSubmit={signIn} className="desk-panel">
          <h2>Welcome back.</h2>
          <p className="desk-help">Sign in to prepare and publish your lessons.</p>
          <input
            type="text"
            name="username"
            autoComplete="username"
            defaultValue="teacher"
            hidden
            readOnly
          />
          <label className="field-label" htmlFor="password">
            Your publishing password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="field"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength={512}
          />
          <div className="desk-actions">
            <button className="button" disabled={!!busy}>
              Open my desk →
            </button>
          </div>
        </form>
      ) : (
        <div className="desk-actions">
          <span className="desk-help">Signed in · Your session lasts up to 12 hours.</span>
          <button
            className="text-button"
            onClick={() => {
              setToken('');
              sessionStorage.removeItem('gurus-session');
            }}
          >
            Sign out
          </button>
          <button className="text-button" disabled={!!busy} onClick={loadPosts}>
            Manage published lessons
          </button>
        </div>
      )}
      {receipt && (
        <section className="desk-panel" aria-live="polite">
          <p className="eyebrow">{receipt.removed ? 'POST REMOVAL' : 'YOUR POST'}</p>
          <h2>
            {receipt.status === 'live'
              ? 'Your lesson is live.'
              : receipt.status === 'removed'
                ? 'Lesson taken off the website.'
                : receipt.status === 'failed'
                  ? 'Your post is saved. Deployment needs attention.'
                  : receipt.removed
                    ? 'Removing from the website…'
                    : 'Saved. Now publishing…'}
          </h2>
          <p className="desk-help">
            {receipt.status === 'live'
              ? 'Ready to share with your learners.'
              : receipt.status === 'removed'
                ? 'The public page is no longer available. The image file and Git history are retained.'
                : 'Website updates can take a few minutes. This page checks automatically while it is open.'}
          </p>
          <div className="desk-actions">
            {receipt.status === 'live' && (
              <>
                <a className="button" href={receipt.url} target="_blank" rel="noopener noreferrer">
                  View post ↗
                </a>
                <a
                  className="button button-outline"
                  href={`https://wa.me/?text=${encodeURIComponent(receipt.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on WhatsApp ↗
                </a>
              </>
            )}
            {receipt.status !== 'removed' && (
              <button
                className="button button-outline"
                onClick={() => checkStatus()}
                disabled={!!busy || !token}
              >
                Check website status
              </button>
            )}
            <button className="text-button" onClick={() => setReceipt(null)}>
              Dismiss
            </button>
          </div>
        </section>
      )}
      {((ready && token) || (!ready && !checking)) && (
        <>
          <section className="desk-panel">
            <h2>Start with your image.</h2>
            <p className="desk-help">
              Save the image from ChatGPT, then choose it here. On Android, you can also install
              this site and try sharing an image to Guru’s from your Gallery.
            </p>
            <label className="upload-zone">
              <strong>Choose your lesson image</strong>
              <input
                ref={fileInput}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                disabled={!!busy}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void choose(file);
                  e.target.value = '';
                }}
              />
              <span className="desk-help">
                JPEG, PNG or WebP · Images are resized for clear text and faster loading.
              </span>
            </label>
            {image && (
              <img className="upload-preview" src={image} alt="Your selected lesson image" />
            )}
            {image && !draftId && (
              <div className="desk-actions">
                <button className="button" onClick={prepare} disabled={!!busy}>
                  {ready ? 'Prepare my lesson →' : 'Try the editor →'}
                </button>
              </div>
            )}
          </section>
          {editorVisible && (
            <section className="desk-panel">
              {review ? (
                <>
                  <p className="eyebrow">ONE LAST LOOK</p>
                  <h2>{fields.title}</h2>
                  <p className="desk-help">
                    {fields.category} · {fields.excerpt}
                  </p>
                  {image && <img className="upload-preview" src={image} alt={fields.imageAlt} />}
                  <LessonBody content={fields.content} />
                  <details className="seo-details">
                    <summary>Search preview</summary>
                    <h3>{fields.seoTitle}</h3>
                    <p className="desk-help">{fields.seoDescription}</p>
                    <p className="desk-help">Image description: {fields.imageAlt}</p>
                  </details>
                  <div className="desk-actions">
                    <button
                      className="button button-outline"
                      onClick={() => setReview(false)}
                      disabled={!!busy}
                    >
                      ← Edit lesson
                    </button>
                    <button
                      className="button"
                      onClick={publish}
                      disabled={!!busy || !ready || !token || !draftId}
                    >
                      {ready && token ? 'Publish lesson ↗' : 'Publishing not connected'}
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={preview}>
                  <h2>Make the lesson yours.</h2>
                  <p className="desk-help">
                    Check the text against your image. Everything below can be edited.
                  </p>
                  <label htmlFor="post-title" className="field-label">
                    Lesson title
                  </label>
                  <input
                    id="post-title"
                    className="field"
                    value={fields.title}
                    onChange={(e) => update('title', e.target.value)}
                    required
                    maxLength={160}
                  />
                  <label htmlFor="post-category" className="field-label">
                    Topic
                  </label>
                  <select
                    id="post-category"
                    className="field"
                    value={fields.category}
                    onChange={(e) => update('category', e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <label htmlFor="post-content" className="field-label">
                    Lesson text
                  </label>
                  <textarea
                    id="post-content"
                    className="field field-area"
                    value={fields.content}
                    onChange={(e) => update('content', e.target.value)}
                    required
                    maxLength={20000}
                    placeholder="Write or paste the lesson from your image. Use ## for a heading and - for a bullet point."
                  />
                  <label htmlFor="post-summary" className="field-label">
                    Short introduction (optional)
                  </label>
                  <textarea
                    id="post-summary"
                    className="field"
                    rows={3}
                    value={fields.excerpt}
                    onChange={(e) => update('excerpt', e.target.value)}
                    maxLength={240}
                  />
                  <details className="seo-details">
                    <summary>
                      Search & image details · Prepared automatically when connected
                    </summary>
                    <label className="field-label" htmlFor="seo-title">
                      Search title
                    </label>
                    <input
                      id="seo-title"
                      className="field"
                      value={fields.seoTitle}
                      onChange={(e) => update('seoTitle', e.target.value)}
                      maxLength={160}
                    />
                    <label className="field-label" htmlFor="seo-description">
                      Search description
                    </label>
                    <textarea
                      id="seo-description"
                      className="field"
                      rows={3}
                      value={fields.seoDescription}
                      onChange={(e) => update('seoDescription', e.target.value)}
                      maxLength={240}
                    />
                    <label className="field-label" htmlFor="image-alt">
                      Describe the image for readers who cannot see it
                    </label>
                    <textarea
                      id="image-alt"
                      className="field"
                      rows={3}
                      value={fields.imageAlt}
                      onChange={(e) => update('imageAlt', e.target.value)}
                      maxLength={500}
                    />
                    <label className="field-label" htmlFor="post-tags">
                      Tags (up to six, separated by commas)
                    </label>
                    <input
                      id="post-tags"
                      className="field"
                      value={fields.tags.join(', ')}
                      onChange={(e) => update('tags', e.target.value.split(',').slice(0, 6))}
                      maxLength={300}
                    />
                  </details>
                  <div className="desk-actions">
                    <button className="button" disabled={!!busy}>
                      Review my lesson →
                    </button>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => {
                        if (
                          window.confirm(
                            'Discard this draft? Your original image stays on your phone.',
                          )
                        ) {
                          setDraftId('');
                          setImage('');
                          setFields({ ...empty });
                          setReview(false);
                          setMessage('Draft discarded.');
                        }
                      }}
                      disabled={!!busy}
                    >
                      Discard draft
                    </button>
                  </div>
                </form>
              )}
            </section>
          )}
        </>
      )}
      {showPosts && (
        <section className="desk-panel">
          <h2>Your published lessons</h2>
          <p className="desk-help">
            Only lessons published from this desk are shown. Changes take effect after the website
            rebuilds.
          </p>
          {!posts.length ? (
            <p className="desk-help">No lessons published from this desk yet.</p>
          ) : (
            <ul className="desk-list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    {post.slug} ↗
                  </a>
                  <button
                    className="text-button"
                    disabled={!!busy}
                    onClick={() => setRemoveSlug(post.slug)}
                  >
                    Unpublish
                  </button>
                </li>
              ))}
            </ul>
          )}
          {removeSlug && (
            <div className="status-message">
              <p>
                Take “{removeSlug}” off the public website? Its image and Git history will remain
                stored.
              </p>
              <div className="desk-actions">
                <button className="button" disabled={!!busy} onClick={() => unpublish(removeSlug)}>
                  Unpublish this lesson
                </button>
                <button className="button button-outline" onClick={() => setRemoveSlug('')}>
                  Keep it published
                </button>
              </div>
            </div>
          )}
        </section>
      )}
      {busy && (
        <p className="status-message" role="status">
          {busy}
        </p>
      )}
      {message && !busy && (
        <p className="status-message" role="status">
          {message}
        </p>
      )}
      {error && (
        <p className="status-message error-message" role="alert">
          {error}
        </p>
      )}
      <p className="desk-help" style={{ marginTop: 24 }}>
        Tip: In Chrome on Android, open the browser menu and choose “Add to Home screen” or “Install
        app”. Gallery sharing depends on your phone and browser; choosing an image here always
        remains available.
      </p>
    </div>
  );
}
