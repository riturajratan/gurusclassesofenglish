import AuthorPhoto from '@/components/AuthorPhoto';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLessons, getLesson, readingTime } from '@/lib/lessons';
import { absolute, jsonLd, site } from '@/lib/site';
import LessonBody from '@/components/LessonBody';
import LessonCard from '@/components/LessonCard';
import ShareLesson from '@/components/ShareLesson';
interface Props {
  params: Promise<{ slug: string }>;
}
export const dynamicParams = false;
export function generateStaticParams() {
  return getLessons().map((item) => ({ slug: item.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getLesson(slug);
  if (!post) return { title: 'Lesson not found', robots: { index: false } };
  const url = absolute(`/blog/${post.slug}/`);
  const image = absolute(post.image || '/logo.jpeg');
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: image, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
    ...(post.sample ? { robots: { index: false, follow: true } } : {}),
  };
}
export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const post = getLesson(slug);
  if (!post) notFound();
  const related = getLessons()
    .filter((item) => item.slug !== slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, 3);
  return (
    <>
      <div className="shell">
        <article className="lesson-article" data-lesson-id={post.slug}>
          <Link className="back-link" href="/blog/">
            ← Back to the notebook
          </Link>
          <header className="article-heading">
            <p className="eyebrow">{post.category}</p>
            <h1>{post.title}</h1>
            <div className="article-meta">
              <span className="article-author">
                <AuthorPhoto small /> <span>By {post.author}</span>
              </span>
              <span>{readingTime(post.content)} min read</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  timeZone: 'Asia/Kolkata',
                })}
              </time>
            </div>
          </header>
          {post.sample && (
            <p className="sample-notice">
              Sample lesson · This example shows how the notebook will look. New lessons published
              from the teacher’s desk will appear here.
            </p>
          )}
          {post.image && (
            <img
              className="article-image"
              src={post.image}
              alt={post.imageAlt || post.title}
              width="960"
              height="720"
            />
          )}
          <LessonBody content={post.content} />
          <div className="article-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ShareLesson title={post.title} url={absolute(`/blog/${post.slug}/`)} />
        </article>
        <section className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">KEEP YOUR CURIOSITY GOING</p>
              <h2>Another page to explore.</h2>
            </div>
          </div>
          <div className="lesson-grid">
            {related.map((item) => (
              <LessonCard key={item.slug} lesson={item} />
            ))}
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            mainEntityOfPage: absolute(`/blog/${post.slug}/`),
            url: absolute(`/blog/${post.slug}/`),
            author: {
              '@type': post.author === site.author ? 'Person' : 'Organization',
              name: post.author,
              ...(post.author === site.author
                ? { image: absolute('/images/sd-singh-ratan.png'), url: absolute('/about/') }
                : {}),
            },
            publisher: {
              '@type': 'Organization',
              name: site.name,
              logo: { '@type': 'ImageObject', url: absolute('/logo.jpeg') },
            },
            ...(post.image ? { image: absolute(post.image) } : {}),
            articleBody: post.content,
          }),
        }}
      />
    </>
  );
}
