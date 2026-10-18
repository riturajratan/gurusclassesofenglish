import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="shell section">
      <p className="eyebrow">A LITTLE DETOUR</p>
      <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 48 }}>
        This page isn’t in the notebook.
      </h1>
      <p className="desk-lead">
        The lesson may have moved or been taken down. There is still plenty to explore.
      </p>
      <Link className="button" href="/blog/">
        Back to the lessons ↗
      </Link>
    </section>
  );
}
