# Gurus Classes of English — The English Notebook

An English-first, mobile-friendly lesson website for S.D. Singh Ratan. A static Next.js site stays on GitHub Pages; a separate authenticated Worker prepares image-based drafts and saves reviewed posts.

## Develop

```sh
npm ci
npm run dev
npm run test:worker
npm run typecheck
npm run build
npm run test:seo
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

## Google Analytics and Search Console

The production site is the Next.js export from `app/`; the root `index.html`,
`robots.txt` and `sitemap.xml` are legacy rollback files and are not deployed.

Set these **GitHub repository Actions variables** (Settings → Secrets and variables
→ Actions → Variables), then run the Publish notebook workflow again. They are
public identifiers, not API keys:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: optional override for the **Gurus** GA4 web data
  stream. Production defaults to `G-ED1TVZS6LQ` (Gurus Classes website, stream
  `16251788328` in the existing `gurusclass` account `41361260`). Do not use a
  numeric property ID or another site's stream.
- `NEXT_PUBLIC_GOOGLE_VERIFICATION`: optional override for the Search Console HTML
  verification tag. The public tag issued for this site's URL-prefix property in
  Rituraj's account is included in `lib/site.ts`; keep it to retain verification.

For local builds copy `.env.example` to `.env.local`. Analytics deliberately stays
off on localhost and preview domains, and when the Measurement ID is empty or
invalid. The tag loads after the page becomes interactive. In GA4's web stream,
keep Enhanced measurement → Page views → **Page changes based on browser history
events** enabled, so Next.js navigation is measured. The app does not emit a
second manual `page_view` event.
Automatic form interactions are turned off for this stream. The app sends only
the explicit `practice_saved` event after a successful local save, without the
student's sentence or publisher form values.

Events added by the app:

| Event            | Meaning                                                          | Parameters                          |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------- |
| `contact_click`  | A phone/email link was clicked; not proof of a completed enquiry | `contact_method`                    |
| `share`          | A share link was clicked, or copying the lesson URL succeeded    | `method`, `content_type`, `item_id` |
| `select_content` | A lesson topic filter was selected                               | `content_type`, `item_id`           |
| `practice_saved` | A practice sentence was saved in the visitor's browser           | `lesson_id`                         |

No practice text, email addresses or phone numbers are added to custom event
parameters. Google signals and ad personalization signals are disabled in the tag.
No tag is loaded when the teacher's desk or offline page is the initial page;
contact-click handling also ignores the teacher's desk.

After deployment, confirm events in GA4 Realtime/DebugView. Register
`contact_method`, `lesson_id` or other custom parameters as event-scoped custom
dimensions if needed in reports. Mark `contact_click` as a key event only if you
want contact intent counted; it is not a verified lead or enrolment.

In Search Console, verify the URL-prefix property after the tag is deployed, then
submit `https://gurusclassesofenglish.com/sitemap.xml`. Use URL Inspection for the
homepage and a published lesson. The sitemap contains only real lessons and
public pages; samples and utility/editor pages stay noindex. Indexing and rankings
are determined by Google and are not guaranteed by a successful build.

`npm run test:seo` checks the actual exported pages, sitemap coverage, canonical
URLs, social metadata and image files, JSON-LD, breadcrumbs, single H1 headings,
and sample/utility exclusions. The deployment workflow runs this audit before
uploading the site.
