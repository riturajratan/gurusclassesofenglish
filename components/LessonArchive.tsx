'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Lesson } from '@/lib/lessons';
import LessonCard from './LessonCard';
const topics = ['All lessons', 'Vocabulary', 'Grammar', 'Common Mistakes', 'Writing', 'Speaking'];
export default function LessonArchive({ lessons }: { lessons: Lesson[] }) {
  const [topic, setTopic] = useState('All lessons');
  const [search, setSearch] = useState('');
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('topic');
    if (initial && topics.includes(initial)) setTopic(initial);
  }, []);
  const filtered = useMemo(
    () =>
      lessons.filter(
        (item) =>
          (topic === 'All lessons' || item.category === topic) &&
          `${item.title} ${item.excerpt} ${item.tags.join(' ')}`
            .toLowerCase()
            .includes(search.toLowerCase().trim()),
      ),
    [lessons, topic, search],
  );
  function choose(value: string) {
    setTopic(value);
    const url = new URL(window.location.href);
    if (value === 'All lessons') url.searchParams.delete('topic');
    else url.searchParams.set('topic', value);
    window.history.replaceState(null, '', url);
  }
  return (
    <>
      <label htmlFor="lesson-search" className="field-label">
        Search by word or lesson topic
      </label>
      <input
        id="lesson-search"
        className="search-input"
        placeholder="Search lessons…"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filter-bar" aria-label="Filter by topic">
        {topics.map((item) => (
          <button
            key={item}
            className="filter-chip"
            aria-pressed={item === topic}
            onClick={() => choose(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'lesson' : 'lessons'} to explore
      </p>
      {filtered.length ? (
        <div className="lesson-grid archive-grid">
          {filtered.map((lesson) => (
            <LessonCard key={lesson.slug} lesson={lesson} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No lessons found just yet.</h2>
          <p>Try a different word or explore another topic.</p>
          <button
            className="button"
            onClick={() => {
              setSearch('');
              choose('All lessons');
            }}
          >
            Show all lessons
          </button>
        </div>
      )}
    </>
  );
}
