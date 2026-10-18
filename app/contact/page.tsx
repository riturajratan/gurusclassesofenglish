import type { Metadata } from 'next';
import { absolute, site } from '@/lib/site';
export const metadata: Metadata = {
  title: 'Get in touch',
  description:
    'Connect with Gurus Classes of English on Facebook for English lessons and learning enquiries.',
  alternates: { canonical: absolute('/contact/') },
};
export default function Contact() {
  return (
    <div className="shell">
      <div className="page-intro">
        <p className="eyebrow">LET’S KEEP THE CONVERSATION GOING</p>
        <h1>
          Learning starts
          <br />
          <em>with a question.</em>
        </h1>
        <p>
          Have a question about English or want to know more about Gurus Classes? Get in touch
          through our Facebook page.
        </p>
      </div>
      <div className="about-note">
        <div className="contact-box">
          <h2>Gurus Classes of English</h2>
          <p>Visit our page and send a message. We would love to hear what you are learning.</p>
          <a className="button" href={site.facebook} target="_blank" rel="noopener noreferrer">
            Visit our Facebook page ↗
          </a>
        </div>
      </div>
    </div>
  );
}
