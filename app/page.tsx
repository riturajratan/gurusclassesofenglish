import AuthorPhoto from '@/components/AuthorPhoto';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLessons } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';
import LessonArt from '@/components/LessonArt';
import { absolute, jsonLd, site } from '@/lib/site';
export const metadata: Metadata = { alternates: { canonical: absolute('/') } };
export default function Home() {
  const lessons = getLessons();
  const latest = lessons.find((item) => !item.sample) || lessons[0];
  return (
    <>
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-star">✳</span> YOUR EVERYDAY ENGLISH COMPANION
          </p>
          <h1>
            Small lessons.
            <br />A world of
            <br />
            <em>possibilities.</em>
          </h1>
          <p className="hero-description">
            A new word. A clearer sentence. A little more confidence. Discover the joy of learning
            English, one lesson at a time.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/blog/">
              Open the notebook <span>↗</span>
            </Link>
            <Link className="quiet-link" href="/about/">
              Meet S.D. Singh Ratan <span>→</span>
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="mini-book">Aa</span>
            <span>
              For curious minds.
              <br />
              <strong>At every stage of learning.</strong>
            </span>
          </div>
        </div>
        <div className="hero-feature">
          <div className="feature-sticker">
            <span>One little lesson.</span>
            <strong>
              Something
              <br />
              to take with you.
            </strong>
            <span className="sticker-star">✳</span>
          </div>
          <Link href={`/blog/${latest.slug}/`} className="featured-notebook">
            {latest.image ? (
              <img
                src={latest.image}
                width="720"
                height="540"
                alt={latest.imageAlt || latest.title}
                fetchPriority="high"
              />
            ) : (
              <LessonArt kind={latest.category} />
            )}
            <div className="notebook-copy">
              <div className="card-meta">
                <span>{latest.sample ? 'FROM THE SAMPLE NOTEBOOK' : 'LATEST LESSON'}</span>
                <span>{latest.category}</span>
              </div>
              <h2>{latest.title}</h2>
              <span className="text-link">Explore this lesson ↗</span>
            </div>
          </Link>
          <span className="handwritten">A little practice goes a long way.</span>
        </div>
      </section>
      <div className="topic-ribbon">
        <div className="shell">
          <span>WORDS THAT STAY WITH YOU</span>
          <span>✳</span>
          <span>GRAMMAR THAT MAKES SENSE</span>
          <span>✳</span>
          <span>CONFIDENCE THAT GROWS</span>
        </div>
      </div>
      <section className="section shell" id="lessons">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A FRESH PAGE, A NEW DISCOVERY</p>
            <h2>
              From the notebook<span className="coral-dot">.</span>
            </h2>
          </div>
          <Link className="quiet-link" href="/blog/">
            View all lessons <span>↗</span>
          </Link>
        </div>
        <div className="lesson-grid">
          {lessons.slice(0, 3).map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      </section>
      <section className="teacher-section">
        <div className="shell teacher-grid">
          <div className="teacher-visual">
            <span className="eyebrow">THE HEART BEHIND THE LESSONS</span>
            <AuthorPhoto />
            <span className="teacher-signature">S.D. Singh Ratan</span>
            <div className="teacher-seal">
              A LOVE FOR
              <br />
              <strong>LANGUAGE</strong>
              <br />A LIFE OF LEARNING
            </div>
          </div>
          <div className="teacher-copy">
            <p className="eyebrow">MEET YOUR TEACHER</p>
            <h2>
              Good teaching
              <br />
              stays with you.
            </h2>
            <p>
              At the heart of Gurus Classes of English is S.D. Singh Ratan’s love for language and
              teaching. This notebook brings English lessons together in one place, ready to revisit
              and share.
            </p>
            <p>Come for a word. Stay for the understanding.</p>
            <Link className="text-link" href="/about/">
              More about your teacher ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="section shell explore-section">
        <p className="eyebrow">FOLLOW YOUR CURIOSITY</p>
        <h2>What will you learn today?</h2>
        <div className="topic-grid">
          {[
            ['Vocabulary', '01', 'Find just the right word.'],
            ['Grammar', '02', 'Make the rules make sense.'],
            ['Common Mistakes', '03', 'Clear up the little confusions.'],
            ['Writing', '04', 'Give your thoughts a voice.'],
          ].map(([name, number, description]) => (
            <Link
              key={name}
              href={`/blog/?topic=${encodeURIComponent(name)}`}
              className="topic-card"
            >
              <span className="topic-number">{number}</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <span className="topic-arrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: site.name,
            url: site.url,
            logo: absolute('/logo.jpeg'),
            founder: { '@type': 'Person', name: site.author },
            sameAs: [site.facebook],
          }),
        }}
      />
    </>
  );
}
