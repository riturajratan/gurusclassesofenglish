import type { Metadata } from "next";
import { absolute, site } from "./site";

export const siteTitle =
  "Gurus Classes of English — A little English, every day";
export const siteDescription =
  "Discover English vocabulary, grammar explanations and practice quizzes with Gurus Classes of English and S.D. Singh Ratan. Learn a little, every day.";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absolute(path) },
    openGraph: {
      type: "website",
      url: absolute(path),
      title,
      description,
      siteName: site.name,
      locale: "en_IN",
      images: [{ url: absolute("/logo.jpeg"), alt: site.name }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [absolute("/logo.jpeg")],
    },
  };
}

export function lessonBreadcrumbs(title: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: site.name,
        item: absolute("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "English lessons",
        item: absolute("/blog/"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: absolute(`/blog/${slug}/`),
      },
    ],
  };
}
