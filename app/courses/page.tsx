import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedLessons } from "@/lib/lessons";
import { availableTopics } from "@/lib/topics";
export const metadata: Metadata = pageMetadata(
  "Explore English topics",
  "Find English vocabulary lessons, grammar explanations and numbered practice quizzes. Choose a topic and start learning.",
  "/courses/",
);
export default function Topics() {
  return (
    <div className="shell">
      <div className="page-intro">
        <p className="eyebrow">ROOM FOR EVERY KIND OF CURIOSITY</p>
        <h1>
          Find your next
          <br />
          <em>little discovery.</em>
        </h1>
        <p>
          Choose a topic and open a lesson. For information about classes,
          please get in touch.
        </p>
      </div>
      <section className="section topic-grid">
        {availableTopics(getPublishedLessons()).map((name, i) => (
          <Link
            className="topic-card"
            key={name}
            href={`/blog/?topic=${encodeURIComponent(name)}`}
          >
            <span className="topic-number">0{i + 1}</span>
            <h2 style={{ fontSize: 26 }}>{name}</h2>
            <p>Explore {name.toLowerCase()} lessons →</p>
          </Link>
        ))}
      </section>
      <div className="about-note">
        <Link className="button" href="/contact/">
          Ask about classes ↗
        </Link>
      </div>
    </div>
  );
}
