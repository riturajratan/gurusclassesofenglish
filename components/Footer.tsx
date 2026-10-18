import Link from 'next/link';
import { site } from '@/lib/site';
import { Facebook, Mail, Phone } from 'lucide-react';
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
            <nav className="footer-contact" aria-label="Contact and social links">
              <a href={`tel:${site.telephone}`}><Phone size={19} aria-hidden="true" /><span>{site.phone}</span></a>
              <a href={`mailto:${site.email}`}><Mail size={19} aria-hidden="true" /><span>{site.email}</span></a>
              <a href={site.facebook} target="_blank" rel="noopener noreferrer"><Facebook size={19} aria-hidden="true" /><span>Facebook <span aria-hidden="true">↗</span></span></a>
            </nav>
          </div>
          <div className="footer-links">
            <Link href="/blog/">Explore lessons ↗</Link>
            <Link href="/about/">Meet your teacher ↗</Link>
            <Link href="/contact/">Say hello ↗</Link>
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
