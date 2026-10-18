import type { Metadata } from 'next';
import { getLessons } from '@/lib/lessons';
import LessonArchive from '@/components/LessonArchive';
import { absolute } from '@/lib/site';
export const metadata: Metadata = {
  title: 'The English Notebook — Vocabulary, Grammar & Writing',
  description:
    'Explore short English lessons, vocabulary, grammar tips and writing practice. Find a topic and learn at your own pace.',
  alternates: { canonical: absolute('/blog/') },
};
export default function Blog() {
  return (
    <div className="shell">
      <div className="page-intro">
        <p className="eyebrow">THE ENGLISH NOTEBOOK</p>
        <h1>
          A little discovery.
          <br />
          <em>A lasting understanding.</em>
        </h1>
        <p>
          Words to remember, rules to understand and ideas to try. Open a lesson and make a little
          progress today.
        </p>
      </div>
      <LessonArchive lessons={getLessons()} />
    </div>
  );
}
