import fs from 'node:fs';
import path from 'node:path';
import { blogPosts } from './blogData';

export interface Lesson {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  publishedAt: string;
  image?: string;
  imageAlt?: string;
  seoTitle?: string;
  seoDescription?: string;
  sample?: boolean;
  dateEstimated?: boolean;
  seriesNumber?: number;
  seriesPart?: string;
}
export const topics = [
  'All lessons',
  'Quiz',
  'Word Power',
  'Vocabulary',
  'Grammar',
  'Common Mistakes',
  'Writing',
  'Speaking',
];
export function getLessons(): Lesson[] {
  const directory = path.join(process.cwd(), 'content/posts');
  const files = fs.readdirSync(directory).filter((name) => name.endsWith('.json'));
  const lessons = files.map(
    (name) => JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8')) as Lesson,
  );
  const legacy: Lesson[] = blogPosts.map((post) => ({ ...post, sample: true }));
  return [
    ...lessons,
    ...legacy.filter((post) => !lessons.some((item) => item.slug === post.slug)),
  ].map((post) => {
    // Keep future publisher posts in their numbered series without another AI call.
    const wp = post.title.match(/\bword\s*power\s*[-–—:]?\s*(\d+)\b/i);
    const quiz = post.title.match(/\bquiz\s*[-–—:]?\s*(\d+)([A-Z]?)\b/i);
    const match = wp || quiz;
    return match ? { ...post, category: wp ? 'Word Power' : 'Quiz',
      seriesNumber: Number(match[1]), seriesPart: wp ? '' : (match[2] || '').toUpperCase() } : post;
  }).sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}
export function getLesson(slug: string) {
  return getLessons().find((item) => item.slug === slug);
}
export function readingTime(content: string) {
  return Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 180));
}
