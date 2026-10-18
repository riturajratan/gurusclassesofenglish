# Gurus Classes of English — The English Notebook

An English-first, mobile-friendly lesson website for S.D. Singh Ratan. A static Next.js site stays on GitHub Pages; a separate authenticated Worker prepares image-based drafts and saves reviewed posts.

## Develop

```sh
npm ci
npm run dev
npm run test:worker
npm run typecheck
npm run build
```

Open the URL printed by Next.js. `/publish/` works as an explicitly labelled editor preview until a publisher URL and its accounts are configured. It never silently publishes from preview mode.

## Contents

- `app/`: homepage, searchable lesson archive, article pages and teacher's desk.
- `content/posts/`: published lesson JSON and labelled samples.
- `lib/blogData.ts`: the original sample articles, preserved at their existing URLs.
- `public/images/lessons/`: lesson images; `public/sw.js`: Android image share receiver.
- `worker/`: authenticated Cloudflare publishing API.
- `tests/worker.test.mjs`: auth, validation and publication failure tests.
- `.github/workflows/pages.yml`: build and Pages deployment.

[Read the account setup and deployment guide](PUBLISHING_SETUP.md) before publishing. All secrets belong in the Worker, never in public frontend variables. The original standalone HTML files remain for rollback; the new workflow deploys the Next.js `out/` directory.

Sample lessons are labelled, excluded from the sitemap and set to noindex. Real teacher-published lessons appear first. No student counts, degrees, reviews or other unverified claims are used in the new pages.
