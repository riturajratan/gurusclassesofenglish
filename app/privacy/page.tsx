import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import AnalyticsPreferences from "@/components/AnalyticsPreferences";

export const metadata = pageMetadata(
  "Privacy & cookies",
  "How Gurus Classes of English uses optional analytics, cookies, local practice storage and contact information. Manage your analytics choice.",
  "/privacy/",
);

export default function Privacy() {
  return (
    <div className="shell privacy-page">
      <div className="page-intro">
        <p className="eyebrow">A LITTLE CLARITY</p>
        <h1>
          Your privacy.
          <br />
          <em>Your choices.</em>
        </h1>
        <p>Privacy and cookie information for Gurus Classes of English.</p>
        <p className="desk-help">Last updated: 2 November 2026</p>
      </div>
      <div className="privacy-copy">
        <p>
          This English-learning website is published by Gurus Classes of
          English, with lessons by {site.author}. For questions about this page
          or information you have shared with us, email{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
        <AnalyticsPreferences />
        <h2>Reading lessons and saving practice</h2>
        <p>
          You do not need a student account to read the lessons. A practice
          sentence you save is stored in local storage in your browser. The
          practice feature does not send the sentence to our publishing service
          or Google Analytics. Your reading colour and text size are also
          remembered locally.
        </p>
        <p>
          These settings can remain until you clear your browser's site data.
          Other people using the same browser may see saved sentences. You can
          edit a saved sentence in its lesson, or remove all local settings
          through your browser's site-data controls.
        </p>
        <h2>Optional Google Analytics</h2>
        <p>
          If you allow analytics, we use Google Analytics 4 to understand
          visits, page views and engagement, including topic-filter choices,
          share-button use, contact-link clicks and successful practice saves.
          These events help us improve the notebook. A contact-link click does
          not tell us whether a call or email was completed.
        </p>
        <p>
          Google receives technical information through analytics requests,
          including the page address, referrer and device/browser information.
          Requests also reach Google from your IP address, which can be used to
          derive a general location. Google Analytics cookies, commonly named{" "}
          <code>_ga</code> and <code>_ga_…</code>, help distinguish visits.
          Their expiry depends on the tag settings; you can remove them using
          the controls above or your browser.
        </p>
        <p>
          We do not intentionally include your practice sentence, name, email
          address or telephone number in our custom analytics events. Google
          signals and advertising personalization signals are disabled in our
          tag. We do not load the optional Google Analytics tag until you choose
          to allow analytics.
        </p>
        <p>
          Read{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            how Google uses information from partner sites
          </a>{" "}
          and{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google's Privacy Policy
          </a>
          . Google may process information on infrastructure outside your
          country. You can also use the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Analytics browser opt-out add-on
          </a>
          .
        </p>
        <h2>Contacting the teacher</h2>
        <p>
          The public contact page offers phone, email and Facebook links. If you
          contact us, we receive the details and message you choose to share and
          use them to respond to your enquiry. Avoid sending sensitive personal
          information in lesson enquiries. Phone, email and social providers
          process communications under their own policies. This site does not
          currently submit student enquiry forms to a backend.
        </p>
        <h2>Hosting and external links</h2>
        <p>
          The public site is hosted on GitHub Pages. Hosting providers receive
          ordinary web-request information, such as IP addresses and requested
          pages, to deliver and protect the service. See the{" "}
          <a
            href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Privacy Statement
          </a>
          . Opening Facebook, WhatsApp, X or other external links takes you to
          services with their own privacy and cookie policies.
        </p>
        <h2>Teacher publishing tools</h2>
        <p>
          The teacher's desk is a separate publishing tool. An image shared to
          that tool may be held locally in the browser until the teacher
          prepares a draft. Preparing or publishing a draft sends the selected
          image and lesson information to the configured publishing service; an
          AI service may be used to prepare text. Published lessons and images
          become public. This workflow is for the teacher, and is not needed to
          read lessons or save student practice. Do not upload student records
          or private personal images.
        </p>
        <h2>Advertising</h2>
        <p>
          Google AdSense advertising is not currently enabled on this site. If
          advertising is introduced, we will update this page to describe the
          providers and choices before enabling it. Advertising services may
          place or read cookies or use web beacons, IP addresses and other
          identifiers to deliver and measure ads. Any advertising consent
          controls required for the audience and regions served will need to be
          configured separately; the analytics choice above is for analytics
          only.
        </p>
        <h2>Young learners</h2>
        <p>
          Children can use the public learning material without creating an
          account or enabling analytics. A parent or guardian can help manage
          browser privacy settings. We do not ask learners to provide their age,
          school records or other sensitive information through the lesson
          practice feature.
        </p>
        <h2>Questions, requests and changes</h2>
        <p>
          Contact <a href={`mailto:${site.email}`}>{site.email}</a> to ask about
          information you have sent us or to request correction or deletion of
          enquiry information. Browser-only practice must be removed on the
          device where it was saved; we cannot retrieve it from the website. We
          will update the date on this page when our practices change.
        </p>
        <Link className="text-link" href="/blog/">
          Back to the lessons →
        </Link>
      </div>
    </div>
  );
}
