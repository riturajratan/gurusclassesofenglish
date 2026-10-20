'use client';
import { useState } from 'react';
import { Facebook } from 'lucide-react';
export default function ShareLesson({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setError('');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setError('Copy the address from your browser to share this lesson.');
    }
  }
  return (
    <>
      <div className="share-row">
        <span>Pass a little learning along.</span>
        <a
          className="button button-small"
          href={`https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on WhatsApp ↗
        </a>
        <a
          className="button button-small button-outline share-facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook size={18} aria-hidden="true" /> Share on Facebook <span aria-hidden="true">↗</span>
        </a>
        <a
          className="button button-small button-outline share-twitter"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span aria-hidden="true">𝕏</span> Share on X (Twitter) <span aria-hidden="true">↗</span>
        </a>
        <button className="button button-small button-outline" onClick={copy}>
          {copied ? 'Link copied ✓' : 'Copy link'}
        </button>
      </div>
      <p role="status" className="desk-help">
        {error}
      </p>
    </>
  );
}
