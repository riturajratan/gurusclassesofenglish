import type { MetadataRoute } from "next";
import { getLessons } from "@/lib/lessons";
import { absolute } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...["/", "/blog/", "/about/", "/contact/", "/courses/", "/privacy/"].map(
      (path) => ({
        url: absolute(path),
      }),
    ),
    ...getLessons()
      .filter((post) => !post.sample)
      .map((post) => ({
        url: absolute(`/blog/${post.slug}/`),
        lastModified: new Date(post.updatedAt || post.publishedAt),
        ...(post.image ? { images: [absolute(post.image)] } : {}),
      })),
  ];
}
