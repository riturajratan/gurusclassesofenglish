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
      <section className="education-hero shell">
        <div className="education-intro">
          <p className="eyebrow">GURUS CLASSES OF ENGLISH</p>
          <h1>English made clearer.<br /><em>One lesson at a time.</em></h1>
          <p className="education-lead">
            Understand a new word. Make sense of a grammar rule. Learn to express yourself
            with clear, practical English lessons from S.D. Singh Ratan.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/blog/">Browse lessons <span aria-hidden="true">→</span></Link>
            <Link className="quiet-link" href="/about/">Meet your teacher <span aria-hidden="true">↗</span></Link>
          </div>
          <p className="education-note">Read at your pace. Revisit anytime. Share what you learn.</p>
        </div>
        <figure className="education-teacher">
          <AuthorPhoto />
          <figcaption>
            <span className="teacher-label">YOUR ENGLISH TEACHER</span>
            <strong>S.D. Singh Ratan</strong>
            <span>A love for language. A life of teaching.</span>
          </figcaption>
        </figure>
      </section>

      <section className="education-topics shell" aria-labelledby="topics-heading">
        <div className="compact-heading">
          <h2 id="topics-heading">What would you like to learn?</h2>
          <span>Choose a topic to get started</span>
        </div>
        <div className="topic-grid">
          {[
            ['Vocabulary', 'Aa', 'Useful words, clearly explained.'],
            ['Grammar', 'Gg', 'Understand how English works.'],
            ['Common Mistakes', '✓', 'Clear up everyday confusions.'],
            ['Writing', '✎', 'Put your thoughts into words.'],
          ].map(([name, icon, description]) => (
            <Link key={name} href={`/blog/?topic=${encodeURIComponent(name)}`} className="education-topic">
              <span className="subject-icon" aria-hidden="true">{icon}</span>
              <span><strong>{name}</strong><span>{description}</span></span>
              <span className="subject-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell" aria-labelledby="featured-heading">
        <div className="section-heading">
          <div><p className="eyebrow">A LITTLE PRACTICE, EVERY DAY</p><h2 id="featured-heading">Start with a lesson</h2></div>
          <Link className="quiet-link" href="/blog/">All lessons <span aria-hidden="true">→</span></Link>
        </div>
        <article className="education-feature">
          <Link href={`/blog/${latest.slug}/`} className="education-feature-image" aria-label={`Read ${latest.title}`}>
            {latest.image ? <img src={latest.image} width="720" height="540" alt={latest.imageAlt || latest.title} /> : <LessonArt kind={latest.category} />}
          </Link>
          <div className="education-feature-copy">
            <div className="card-meta"><span>{latest.category}</span><span>{latest.sample ? 'Sample lesson' : 'Latest lesson'}</span></div>
            <h3><Link href={`/blog/${latest.slug}/`}>{latest.title}</Link></h3>
            <p>{latest.excerpt}</p>
            <Link className="button" href={`/blog/${latest.slug}/`}>Read this lesson <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      </section>

      <section className="education-library" aria-labelledby="library-heading">
        <div className="section shell">
          <div className="section-heading">
            <div><p className="eyebrow">KEEP LEARNING</p><h2 id="library-heading">More to explore</h2></div>
            <p className="section-description">Small lessons you can return to, whenever you need them.</p>
          </div>
          <div className="lesson-grid">
            {lessons.filter((lesson) => lesson.slug !== latest.slug).slice(0, 3).map((lesson) => <LessonCard key={lesson.slug} lesson={lesson} />)}
          </div>
          <div className="library-action"><Link className="button button-outline" href="/blog/">Explore all lessons <span aria-hidden="true">→</span></Link></div>
        </div>
      </section>

      <section className="education-invitation shell">
        <div><p className="eyebrow">LEARNING BEGINS WITH CURIOSITY</p><h2>A question about English?</h2><p>Get in touch with Gurus Classes of English.</p></div>
        <Link className="button" href="/contact/">Get in touch <span aria-hidden="true">→</span></Link>
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
