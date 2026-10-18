import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'You are offline',
  robots: { index: false, follow: false },
};
export default function Offline() {
  return (
    <section className="shell section">
      <h1 style={{ fontSize: 40, fontFamily: 'Georgia,serif' }}>Let’s reconnect.</h1>
      <p className="desk-lead">
        You need an internet connection to load lessons or publish a post. Reconnect, then refresh
        this page. Your saved image stays on your phone.
      </p>
    </section>
  );
}
