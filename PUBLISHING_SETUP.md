# Guru’s notebook: deployment and account connection

The new site and publisher are implemented in this checkout. **They are not live yet.** The original project folder is unchanged. Do not paste private keys into chat, Git, screenshots, or frontend environment variables.

## Architecture

- Next.js statically exports pages to `out/`; GitHub Pages serves them.
- `content/posts/*.json` stores published lessons; `public/images/lessons/` stores their web images. Existing blog slugs are preserved.
- `worker/src/index.mjs` is a separate Cloudflare Worker. It signs teacher sessions, validates images, prepares optional OpenAI drafts, and commits an image and its post together to GitHub. No GitHub or OpenAI secret is shipped to the browser.
- Workers KV holds temporary image drafts for 24 hours and publication receipts for 30 days. Signed sessions expire after 12 hours. The browser stores the editable draft text locally and the session token in session storage.
- A GitHub push starts `.github/workflows/pages.yml`. The desk checks the generated page's lesson marker before saying **Live**. Failed builds are surfaced when the GitHub token has Actions read access.
- Unpublish removes the post JSON, then rebuilds. The image and Git history stay in the public repository. It is not a privacy-erasure operation.

## 1. Review and integrate the code

This working copy was made from the user's local `gurus-classes-of-english` checkout. The latest GitHub main branch was fetched and fast-forwarded into this working branch before the handoff. Check for any subsequent remote changes before merging. Do not overwrite remote changes.

```sh
npm ci
npm run test:worker
npm run typecheck
npm run build
```

The root `index.html`, `styles.css`, `robots.txt` and `sitemap.xml` belong to the old branch-deployment version. The Actions workflow deliberately deploys **only `out/`** from Next.js. They are retained for rollback and are not the deployed entry point after switching Pages to Actions.

There are sample lessons, including the original sample blog articles. They are clearly labelled, have noindex on their individual pages, and are excluded from the sitemap. Published lessons appear above them. Remove samples or replace their content once the real notebook is populated. Do not change sample flags to false without reviewing authorship and content.

## 2. GitHub settings

1. Merge the reviewed branch into `riturajratan/gurusclassesofenglish`, preserving any newer main changes.
2. Repository **Settings → Pages → Source → GitHub Actions**.
3. Keep the custom domain `gurusclassesofenglish.com`, verify the www redirect, and enable HTTPS when GitHub reports it available. Do not change DNS blindly.
4. Create a fine-grained personal access token restricted to this single repository. Permissions: **Contents: read/write**, **Actions: read** (for failed-build status); metadata read is automatic. The teacher does not need GitHub access. Use a non-expired token and rotate it when needed. The Worker never edits workflow files, so it does not require Workflows write permission.
5. Keep the token out of frontend variables. It goes only into the Worker's `GITHUB_TOKEN` secret.
6. If main has branch protection preventing direct content commits, use a dedicated publication branch and update both `GITHUB_BRANCH` and the Pages workflow trigger. Do not silently bypass protection.

GitHub's default `GITHUB_TOKEN` is not the publisher credential: pushes using that built-in workflow token do not start another normal push workflow. The separately configured fine-grained token is used here.

## 3. Cloudflare Worker

The website remains on GitHub Pages; moving DNS to Cloudflare is unnecessary for a `workers.dev` backend.

1. Create a Cloudflare account and a Worker project from `worker/`.
2. Create a KV namespace and replace `REPLACE_WITH_KV_NAMESPACE_ID` in `worker/wrangler.toml` with its actual ID.
3. Confirm the non-secret vars in that file. `SITE_URL` must be the canonical HTTPS site origin with no path. `ALLOWED_ORIGINS` contains the exact www and apex origins, without a trailing slash.
4. Add these **secrets** in the Cloudflare dashboard:
   - `ADMIN_PASSWORD`: a unique password with at least 16 characters. Save it in the phone's password manager.
   - `SESSION_SECRET`: at least 32 random characters. Changing it invalidates existing signed sessions.
   - `GITHUB_TOKEN`: the restricted token from step 2.
   - `OPENAI_API_KEY`: optional until AI preparation is connected.
5. Set `OPENAI_MODEL` as a non-secret variable to a model available to the API project that supports image input, the Responses API and strict structured outputs.
6. Deploy using the dashboard integration or Wrangler from the `worker/` directory:

```sh
npx wrangler deploy
```

Wrangler may require an interactive Cloudflare login. Do not add secrets to wrangler.toml or shell command arguments. The manifest also declares native login/API rate-limit bindings; use a current Wrangler release that supports `[[ratelimits]]`.

7. Copy the returned HTTPS Worker URL. In GitHub repository **Settings → Secrets and variables → Actions → Variables**, set `NEXT_PUBLIC_PUBLISHER_URL` to it, without a trailing slash. This is a public address, not a secret.
8. Run the Pages workflow again; public frontend variables are embedded at build time.

Until the Worker is ready, `/publish/` explicitly runs in **editor preview** mode and cannot claim that a post has been published.

## 4. OpenAI account connection

The Android ChatGPT app remains where the teacher creates the image. The publisher uses an API project to read the selected image and prepare a draft. That API usage needs its own working credentials and billing setup; the app does not read or monitor the teacher's ChatGPT conversations.

Use project-level API credentials, configure an appropriate budget/usage alerts in the provider account, and set the supported model in the Worker. Generated text is always reviewed before publication. If the AI call fails or is not configured, the desk preserves the uploaded image and offers manual text entry instead.

The draft prompt transcribes the supplied educational material; it does not invent credentials, testimonials or extra examples. AI can still make mistakes. Review the lesson against its image.

## 5. Search setup

- Verify both the canonical domain and its redirect in Google Search Console. Use DNS verification if possible, or set the repository Actions variable `NEXT_PUBLIC_GOOGLE_VERIFICATION` to a real HTML verification value and rebuild.
- Submit `https://gurusclassesofenglish.com/sitemap.xml` once. It updates on every build and includes published lessons and their images.
- Check a real lesson with URL Inspection and Google's rich result tooling. Indexing and ranking remain Google's decisions.
- Every lesson has readable HTML text, a unique canonical URL, metadata, social preview and BlogPosting structured data. The generated image description is editable.
- Keep the article text, image and author details accurate. Samples do not belong in search results.

## 6. Android setup and acceptance check

1. Open the live `/publish/` page in Chrome, then **Install app** or **Add to Home screen**.
2. Sign in once; the browser can remember the password.
3. Save an image made in ChatGPT. Choose it from the desk, prepare the draft, review, and publish.
4. Confirm the page progresses from **Saved / Publishing** to **Live**, and the public page shows the correct image and text.
5. Share that page to WhatsApp and verify its link preview on the actual device.
6. Test airplane mode, a failed AI call, an expired login, and a failed deployment. They must not produce a false success state.
7. Test **Gallery → Share → Guru’s** on the installed app. Browser/Android support varies; the Choose Image path remains the fallback. The service worker stores the shared image in IndexedDB until the desk consumes it.
8. Test unpublish on a test post, verify its public page returns 404 after deployment, then publish the first real lesson.

## Storage and recovery

Images are resized in-browser to a maximum long edge of 1800px and encoded as WebP when supported, with high quality for readable text. The server accepts JPEG/PNG/WebP under 5 MB and checks signatures. Published image files accumulate in Git; revisit storage/CDN architecture as the library grows.

Drafts contain the uploaded image in private KV for 24 hours, even if the editor is discarded. Editable text is kept in this browser until cleared or published; a lost/expired session requires signing in again. Original images remain on the teacher's phone.

A failed or racing Git commit leaves the draft intact. Image and JSON are written in one commit, and branch updates never force-push. Immutable draft IDs avoid duplicate posts after a lost success response. Revert a content commit to recover a removed lesson. Restore the prior Pages source only if rolling the whole site back intentionally.

## Verification limits for this handoff

Automated tests mock external services. They do not prove real account permissions, Cloudflare deployment, OpenAI billing, DNS, Google indexing or Android Gallery sharing. Those require the connected-account and phone checks above.

## Cloudflare resource progress

- Account: `72dbaa9606b6dd363b5a50e3e0d656c4`
- Worker: `gurus-notebook-publisher`
- Public endpoint: `https://gurus-notebook-publisher.riturajratan.workers.dev`
- KV namespace: `gurus-notebook-drafts` (`015bec19c4b64c5f83ba16ca3a0b0b76`)
- The tested publishing source was deployed through the dashboard. Bindings, non-secret configuration and secrets must be verified before enabling publishing.

These identifiers and endpoint are public configuration, not credentials.

The `DRAFTS` KV binding was verified in the Worker settings. Rate limiter configuration was opened but not saved: Chrome blocked browser automation while an extension UI was open. Non-secret environment variables and private secrets remain to be configured. No secret values were entered.

Resume update: `DRAFTS`, `LOGIN_LIMIT` (5 per 60 seconds, namespace 1001), and `API_LIMIT` (30 per 60 seconds, namespace 1002) were verified in the dashboard. `GITHUB_REPO`, `GITHUB_BRANCH`, `SITE_URL`, and `ALLOWED_ORIGINS` were saved and verified. The secret-entry form for `ADMIN_PASSWORD` was opened with Secret checked and the value left blank for the user. SESSION_SECRET, GITHUB_TOKEN, OPENAI_API_KEY and OPENAI_MODEL are still pending, as are frontend GitHub deployment and the real end-to-end check. A direct public health request could not be checked from the shell because DNS resolution failed in that environment.
