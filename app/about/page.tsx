import { pageMetadata } from "@/lib/seo";
import AuthorPhoto from "@/components/AuthorPhoto";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = pageMetadata(
  "Meet S.D. Singh Ratan",
  "Meet S.D. Singh Ratan, the English teacher behind Gurus Classes of English and its collection of everyday language lessons.",
  "/about/",
);
export default function About() {
  return (
    <div className="shell">
      <div className="page-intro">
        <p className="eyebrow">THE TEACHER BEHIND THE NOTEBOOK</p>
        <h1>
          A love for English.
          <br />
          <em>A love for teaching.</em>
        </h1>
      </div>
      <div className="about-author-layout">
        <figure className="author-figure">
          <AuthorPhoto />
          <figcaption>
            <span className="teacher-signature">S.D. Singh Ratan</span>
            <span className="eyebrow">GURUS CLASSES OF ENGLISH</span>
          </figcaption>
        </figure>
        <div className="about-note">
          <p className="eyebrow">MEET YOUR TEACHER</p>
          <h2>S.D. Singh Ratan</h2>
          <p>
            Gurus Classes of English brings together S.D. Singh Ratan’s English
            lessons in a notebook you can return to, one word, one sentence and
            one idea at a time.
          </p>
          <p>
            The aim is simple: make English learning part of everyday life. A
            useful word or a clear explanation can become something you remember
            and use long after the lesson is over.
          </p>
          <h2>Learn a little. Use it often.</h2>
          <p>
            Explore vocabulary, grammar and practice quizzes. Read at your own
            pace, try an example, and share a lesson with someone who might
            enjoy it.
          </p>
          <h2>How the notebook is prepared</h2>
          <p>
            Original classroom cards sit alongside reading notes, worked answers
            and additional practice. The typed explanations may expand on a card
            or revise an example for clarity. Suggested answers show one
            suitable form; other answers can be correct when they preserve the
            meaning and fit the context.
          </p>
          <p>
            Older lessons with an estimated publication date are labelled. When
            a lesson is expanded or corrected, its update date is shown
            separately. If you find an error or an unclear answer, please{" "}
            <Link href="/contact/">contact the teacher</Link> with the lesson
            title so it can be checked.
          </p>
          <Link className="button" href="/blog/">
            Explore the notebook ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
