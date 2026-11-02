import AuthorPhoto from "@/components/AuthorPhoto";
import CategoryBadge from "@/components/CategoryBadge";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLessons,
  getPublishedLessons,
  getLesson,
  readingTime,
} from "@/lib/lessons";
import { absolute, jsonLd, site } from "@/lib/site";
import LessonBody from "@/components/LessonBody";
import LessonCard from "@/components/LessonCard";
import ShareLesson from "@/components/ShareLesson";
import ReadingControls from "@/components/ReadingControls";
import LessonPractice from "@/components/LessonPractice";
import { recallFromLesson } from "@/lib/learning";
import { lessonBreadcrumbs } from "@/lib/seo";
import LessonReferences from "@/components/LessonReferences";
import LessonAd from "@/components/LessonAd";
import { hasLessonAd } from "@/lib/advertising";
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
  if (!post) return { title: "Lesson not found", robots: { index: false } };
  const url = absolute(`/blog/${post.slug}/`);
  const image = absolute(post.image || "/logo.jpeg");
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: url },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      ...(post.updatedAt ? { modifiedTime: post.updatedAt } : {}),
      authors: [post.author],
      siteName: site.name,
      locale: "en_IN",
      images: [{ url: image, alt: post.imageAlt || post.title }],
    },
    twitter: {
      card: "summary_large_image",
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
  const related = getPublishedLessons()
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category),
    )
    .slice(0, 3);
  return (
    <>
      <div className="shell">
        <article className="lesson-article" data-lesson-id={post.slug}>
          <nav aria-label="Breadcrumb" className="lesson-breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/blog/">English lessons</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{post.title}</span>
          </nav>
          <Link className="back-link" href="/blog/">
            ← Back to all lessons
          </Link>
          <header className="article-heading">
            <CategoryBadge category={post.category} />
            <h1>{post.title}</h1>
            <div className="article-meta">
              <span className="article-author">
                <AuthorPhoto small /> <span>By {post.author}</span>
              </span>
              <span>{readingTime(post.content)} min read</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Asia/Kolkata",
                })}
              </time>
              {post.dateEstimated && (
                <span title="The original date was not recorded. This date was estimated from the lesson counter and dated archive posts.">
                  Estimated archive date
                </span>
              )}
              {post.updatedAt && (
                <span>
                  Updated{" "}
                  <time dateTime={post.updatedAt}>
                    {new Date(post.updatedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "Asia/Kolkata",
                    })}
                  </time>
                </span>
              )}
            </div>
          </header>
          <ReadingControls />
          {post.sample && (
            <p className="sample-notice">
              Sample lesson · This example shows how the notebook will look. New
              lessons published from the teacher’s desk will appear here.
            </p>
          )}
          {post.image && (
            <figure className="source-card">
              <img
                className="article-image"
                src={post.image}
                alt={post.imageAlt || post.title}
                width="960"
                height="720"
              />
              {!post.sample && (
                <figcaption>
                  Original classroom card. The reading notes and practice below
                  may expand on the card or use revised examples. Historical
                  examples are language exercises, not current news or medical
                  guidance.
                </figcaption>
              )}
            </figure>
          )}
          <LessonBody content={post.content} />
          {!post.sample && <LessonReferences title={post.title} />}
          <LessonPractice
            slug={post.slug}
            recall={recallFromLesson(post.content)}
          />
          <div className="article-tags">
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ShareLesson
            title={post.title}
            url={absolute(`/blog/${post.slug}/`)}
          />
          <aside className="ask-teacher">
            <AuthorPhoto small />
            <div>
              <strong>A little question? Ask your teacher.</strong>
              <p>
                S.D. Singh Ratan is a call away.{" "}
                <a href={`tel:${site.telephone}`}>{site.phone}</a>
              </p>
            </div>
            <Link className="text-link" href="/contact/">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </aside>
        </article>
        {hasLessonAd(post) && <LessonAd key={post.slug} />}
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
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "@id": absolute(`/blog/${post.slug}/#article`),
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
            mainEntityOfPage: absolute(`/blog/${post.slug}/`),
            url: absolute(`/blog/${post.slug}/`),
            author: {
              "@type": post.author === site.author ? "Person" : "Organization",
              name: post.author,
              ...(post.author === site.author
                ? {
                    "@id": absolute("/about/#teacher"),
                    image: absolute("/images/sd-singh-ratan.png"),
                    url: absolute("/about/"),
                  }
                : {}),
            },
            publisher: {
              "@type": "Organization",
              "@id": absolute("/#organization"),
              name: site.name,
              logo: { "@type": "ImageObject", url: absolute("/logo.jpeg") },
            },
            ...(post.image ? { image: absolute(post.image) } : {}),
            inLanguage: "en-IN",
            articleSection: post.category,
            keywords: post.tags.join(", "),
            isAccessibleForFree: true,
            articleBody: post.content,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(lessonBreadcrumbs(post.title, post.slug)),
        }}
      />
    </>
  );
}
