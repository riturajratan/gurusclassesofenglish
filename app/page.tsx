import AuthorPhoto from '@/components/AuthorPhoto';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLessons } from '@/lib/lessons';
import LessonCard from '@/components/LessonCard';
import LessonArt from '@/components/LessonArt';
import { absolute, jsonLd, site } from '@/lib/site';
import { BookOpen, Lightbulb, Heart } from 'lucide-react';
export const metadata: Metadata = { alternates: { canonical: absolute('/') } };
export default function Home() {
  const lessons = getLessons();
  const latest = lessons.find((item) => !item.sample) || lessons[0];
  return (
    <>
      <section className="education-hero shell">
        <div className="education-intro">
          <p className="welcome-note"><span aria-hidden="true">☀</span> A little English, for every age.</p>
          <h1>Come, learn a little.<br /><em>Grow a little.</em></h1>
          <p className="education-lead">
            A new word, a clearer sentence, a lovely little discovery.
            Join S.D. Singh Ratan and make English a happy part of your day.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/blog/">Let’s learn something <span aria-hidden="true">→</span></Link>
            <Link className="quiet-link" href="/about/">Meet your teacher <span aria-hidden="true">↗</span></Link>
          </div>
          <p className="education-note">No rush. No big words needed. Just a little curiosity.</p>
        </div>
        <figure className="education-teacher">
          <AuthorPhoto />
          <figcaption>
            <span className="teacher-label">A WARM HELLO FROM YOUR TEACHER</span>
            <strong>S.D. Singh Ratan</strong>
            <span>Here to make English a little easier.</span>
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
          <div><p className="eyebrow">PICK UP A LITTLE SOMETHING TODAY</p><h2 id="featured-heading">Here’s a lovely place to start.</h2></div>
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
            <Link className="button" href={`/blog/${latest.slug}/`}>Read &amp; give it a try <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      </section>

      <section className="learning-path shell" aria-label="Learn at your own pace">
        <div className="learning-path-intro"><p className="eyebrow">SMALL STEPS ARE GOOD STEPS</p><h2>Make it your own.</h2></div>
        <div className="learning-step"><BookOpen size={25} aria-hidden="true" /><h3>Read a little</h3><p>Choose a lesson that catches your eye.</p></div>
        <div className="learning-step"><Lightbulb size={25} aria-hidden="true" /><h3>Try a little</h3><p>Recall a meaning or write a sentence of your own.</p></div>
        <div className="learning-step"><Heart size={25} aria-hidden="true" /><h3>Keep it with you</h3><p>Come back for a reminder. Share a little learning.</p></div>
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
        <div><p className="eyebrow">A LITTLE HELP GOES A LONG WAY</p><h2>A question? Sir is a call away.</h2><p>You’re welcome to ask. Call <a href={`tel:${site.telephone}`}>{site.phone}</a> or say hello.</p></div>
        <Link className="button" href="/contact/">Say hello <span aria-hidden="true">→</span></Link>
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
            telephone: site.telephone,
            ...(site.email ? { email: site.email } : {}),
            sameAs: [site.facebook],
          }),
        }}
      />
    </>
  );
}
