import type { Metadata } from 'next';
import { absolute, site } from '@/lib/site';
import AuthorPhoto from '@/components/AuthorPhoto';
import { Phone, Mail, MessageCircle } from 'lucide-react';
export const metadata: Metadata = {
  title: 'Get in touch',
  description:
    'Have a question about English? Get in touch with S.D. Singh Ratan at Gurus Classes of English. Call 9829112945.',
  alternates: { canonical: absolute('/contact/') },
};
export default function Contact() {
  return (
    <div className="shell">
      <div className="page-intro">
        <p className="eyebrow">YOU’RE ALWAYS WELCOME TO ASK</p>
        <h1>
          A little question?
          <br />
          <em>Let’s talk.</em>
        </h1>
        <p>
          A word you’re curious about, a rule that feels tricky, or a simple hello.
          Get in touch with your teacher, S.D. Singh Ratan.
        </p>
      </div>
      <div className="contact-layout">
        <figure className="contact-teacher">
          <AuthorPhoto />
          <figcaption><strong>{site.author}</strong><span>Gurus Classes of English</span><p>Learning is a little easier when we can ask.</p></figcaption>
        </figure>
        <div className="contact-options">
          <section className="contact-option">
            <span className="friendly-icon" aria-hidden="true"><Phone size={23} /></span>
            <div><h2>Give Sir a call</h2><p>For your English questions and learning enquiries.</p>
              <a className="contact-number" href={`tel:${site.telephone}`}>{site.phone}</a>
              <span className="contact-hint">Tap the number to call from your phone.</span>
            </div>
          </section>
          {site.email && <section className="contact-option">
            <span className="friendly-icon" aria-hidden="true"><Mail size={23} /></span>
            <div><h2>Write a little note</h2><p>Prefer to write? Send your question by email.</p>
              <a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </section>}
          <section className="contact-option">
            <span className="friendly-icon" aria-hidden="true"><MessageCircle size={23} /></span>
            <div><h2>Say hello on Facebook</h2><p>Visit the Gurus Classes page and send a message.</p>
              <a className="text-link" href={site.facebook} target="_blank" rel="noopener noreferrer">Open our Facebook page <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
