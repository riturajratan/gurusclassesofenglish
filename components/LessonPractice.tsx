'use client';
import { useEffect, useState } from 'react';
import { Lightbulb, PenLine } from 'lucide-react';

export default function LessonPractice({ slug, recall }: {
  slug: string;
  recall: { term: string; answer: string } | null;
}) {
  const [revealed, setRevealed] = useState(false);
  const [sentence, setSentence] = useState('');
  const [message, setMessage] = useState('');
  const storageKey = `gurus-practice:${slug}`;
  useEffect(() => {
    setRevealed(false);
    setMessage('');
    try { setSentence(localStorage.getItem(storageKey) || ''); } catch { setSentence(''); }
  }, [storageKey]);
  function saveSentence(event: React.FormEvent) {
    event.preventDefault();
    try {
      localStorage.setItem(storageKey, sentence.trim());
      setMessage('A little practice, a little progress. Your sentence is saved in this browser.');
    } catch {
      setMessage('Your browser could not save this. You can still practise here or copy your sentence.');
    }
  }
  return (
    <section className="practice-card" aria-labelledby="practice-heading">
      <div className="practice-heading">
        <span className="friendly-icon" aria-hidden="true"><Lightbulb size={24} /></span>
        <div><p className="eyebrow">A LITTLE PRACTICE</p><h2 id="practice-heading">Now, give it a try.</h2></div>
      </div>
      {recall && <div className="recall-exercise">
        <p className="recall-question">Can you remember what <strong>“{recall.term}”</strong> means?</p>
        <p className="desk-help">Take a moment. Then have a look at the answer.</p>
        <button className="button button-outline" aria-expanded={revealed} aria-controls="recall-answer"
          onClick={() => setRevealed(!revealed)}>{revealed ? 'Hide answer' : 'Show answer'} <span aria-hidden="true">{revealed ? '−' : '+'}</span></button>
        <div id="recall-answer" hidden={!revealed} className="recall-answer">
          <strong>From this lesson</strong><p>{recall.answer}</p>
        </div>
      </div>}
      <form onSubmit={saveSentence} className="sentence-practice">
        <label htmlFor="practice-sentence"><PenLine size={19} aria-hidden="true" />
          {recall ? `Try a sentence with “${recall.term}”.` : 'Write one sentence using something you learned.'}
        </label>
        <p className="desk-help">No rush. A simple sentence is a lovely place to start.</p>
        <textarea id="practice-sentence" className="field" rows={3} maxLength={1000}
          placeholder="My sentence…" value={sentence} onChange={(event) => {setSentence(event.target.value); setMessage('');}} />
        <div className="practice-actions"><button className="button" disabled={!sentence.trim()}>Save my sentence <span aria-hidden="true">✓</span></button>
          <span>Only saved in this browser. No account needed.</span></div>
        <p className="practice-message" role="status">{message}</p>
      </form>
    </section>
  );
}
