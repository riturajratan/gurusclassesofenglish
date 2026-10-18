import AuthorPhoto from '@/components/AuthorPhoto';
import type { Metadata } from 'next';
import Link from 'next/link';
import { absolute, jsonLd, site } from '@/lib/site';
export const metadata: Metadata = {
  title: 'Meet S.D. Singh Ratan',
  description:
    'Meet S.D. Singh Ratan, the English teacher behind Gurus Classes of English and its collection of everyday language lessons.',
  alternates: { canonical: absolute('/about/') },
  openGraph: {
    images: [
      {
        url: absolute('/images/sd-singh-ratan.png'),
        alt: 'S.D. Singh Ratan speaking at a lectern',
      },
    ],
  },
};
export default function About() {
  return (
    <div className="shell">
      <div className="page-intro">
        <p className="eyebrow">THE TEACHER BEHIND THE NOTEBOOK</p>
        <h1>
          A love for English.
          <br />
          <em>A love for teaching.</em>
        </h1>
      </div>
      <div className="about-author-layout">
        <figure className="author-figure">
          <AuthorPhoto />
          <figcaption>
            <span className="teacher-signature">S.D. Singh Ratan</span>
            <span className="eyebrow">GURUS CLASSES OF ENGLISH</span>
          </figcaption>
        </figure>
        <div className="about-note">
          <p className="eyebrow">MEET YOUR TEACHER</p>
          <h2>S.D. Singh Ratan</h2>
          <p>
            Gurus Classes of English brings together S.D. Singh Ratan’s English lessons in a
            notebook you can return to, one word, one sentence and one idea at a time.
          </p>
          <p>
            The aim is simple: make English learning part of everyday life. A useful word or a clear
            explanation can become something you remember and use long after the lesson is over.
          </p>
          <h2>Learn a little. Use it often.</h2>
          <p>
            Explore vocabulary, grammar, common mistakes and writing. Read at your own pace, try an
            example, and share a lesson with someone who might enjoy it.
          </p>
          <Link className="button" href="/blog/">
            Explore the notebook ↗
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: site.author,
            url: absolute('/about/'),
            image: absolute('/images/sd-singh-ratan.png'),
            worksFor: { '@type': 'Organization', name: site.name },
          }),
        }}
      />
    </div>
  );
}
