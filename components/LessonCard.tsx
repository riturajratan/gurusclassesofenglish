import Link from 'next/link';
import type { Lesson } from '@/lib/lessons';
import LessonArt from './LessonArt';
export default function LessonCard({ lesson }: { lesson: Lesson }) {
  return (
    <article className="lesson-card">
      <Link
        href={`/blog/${lesson.slug}/`}
        className="card-art-link"
        aria-label={`Read ${lesson.title}`}
      >
        {lesson.image ? (
          <img
            className="card-image"
            src={lesson.image}
            alt={lesson.imageAlt || lesson.title}
            loading="lazy"
            width="720"
            height="540"
          />
        ) : (
          <LessonArt kind={lesson.category} small />
        )}
      </Link>
      <div className="card-copy">
        <div className="card-meta">
          <span>{lesson.category}</span>
          {lesson.sample && <span className="sample-label">Sample lesson</span>}
        </div>
        <h3>
          <Link href={`/blog/${lesson.slug}/`}>{lesson.title}</Link>
        </h3>
        <p>{lesson.excerpt}</p>
        <Link className="text-link" href={`/blog/${lesson.slug}/`}>
          Read lesson <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
