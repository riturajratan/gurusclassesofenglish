import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getPublishedLessons } from "@/lib/lessons";
import LessonArchive from "@/components/LessonArchive";
export const metadata: Metadata = pageMetadata(
  "The English Notebook — Vocabulary, Grammar & Quizzes",
  "Explore English vocabulary, grammar explanations and practice quizzes with worked answers. Find a topic and learn at your own pace.",
  "/blog/",
);
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
          Words to remember, rules to understand and ideas to try. Open a lesson
          and make a little progress today.
        </p>
      </div>
      <LessonArchive lessons={getPublishedLessons()} />
    </div>
  );
}
