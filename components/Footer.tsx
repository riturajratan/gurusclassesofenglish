import Link from 'next/link';
import { site } from '@/lib/site';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Link className="footer-brand" href="/">
              A little English.
              <br />
              <em>A little every day.</em>
            </Link>
            <p>Words, ideas and lessons from Gurus Classes of English.</p>
            <a className="footer-phone" href={`tel:${site.telephone}`}>Call S.D. Singh Ratan · {site.phone}</a>
          </div>
          <div className="footer-links">
            <Link href="/blog/">Explore lessons ↗</Link>
            <Link href="/about/">Meet your teacher ↗</Link>
            <Link href="/contact/">Say hello ↗</Link>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer">
              Find us on Facebook ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Gurus Classes of English</span>
          <span>गुरु का ज्ञान अनमोल है</span>
          <span>Made for the love of learning.</span>
        </div>
      </div>
    </footer>
  );
}
