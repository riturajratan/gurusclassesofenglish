'use client';
import { useEffect, useState } from 'react';

const themes = ['light', 'warm', 'night'] as const;
type Theme = (typeof themes)[number];
export default function ReadingControls() {
  const [theme, setTheme] = useState<Theme>('light');
  const [size, setSize] = useState(19);
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('gurus-reading-theme');
      const savedSize = Number(localStorage.getItem('gurus-reading-size'));
      if (themes.includes(savedTheme as Theme)) {
        setTheme(savedTheme as Theme);
        document.documentElement.dataset.readingTheme = savedTheme!;
      }
      if ([19, 22, 25].includes(savedSize)) {
        setSize(savedSize);
        document.documentElement.style.setProperty('--reading-size', `${savedSize}px`);
      }
    } catch { /* Reading controls also work when storage is unavailable. */ }
  }, []);
  function chooseTheme(value: Theme) {
    setTheme(value);
    document.documentElement.dataset.readingTheme = value;
    try { localStorage.setItem('gurus-reading-theme', value); } catch {}
  }
  function chooseSize(value: number) {
    setSize(value);
    document.documentElement.style.setProperty('--reading-size', `${value}px`);
    try { localStorage.setItem('gurus-reading-size', String(value)); } catch {}
  }
  return (
    <section className="reading-controls" aria-label="Reading preferences">
      <strong>Read comfortably</strong>
      <div className="reading-options" role="group" aria-label="Reading colour">
        <span>Colour</span>
        {themes.map((value) => (
          <button key={value} aria-pressed={theme === value} onClick={() => chooseTheme(value)}>
            {value[0].toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>
      <div className="reading-options" role="group" aria-label="Lesson text size">
        <span>Text</span>
        {[19, 22, 25].map((value, index) => (
          <button key={value} aria-label={['Standard text', 'Large text', 'Extra large text'][index]}
            aria-pressed={size === value} onClick={() => chooseSize(value)}>
            {['A', 'A+', 'A++'][index]}
          </button>
        ))}
      </div>
    </section>
  );
}
