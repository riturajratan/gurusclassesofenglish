export default function LessonArt({
  kind = 'Grammar',
  small = false,
}: {
  kind?: string;
  small?: boolean;
}) {
  return (
    <div
      className={`lesson-art art-${kind.toLowerCase().replaceAll(' ', '-')} ${small ? 'art-small' : ''}`}
      aria-hidden="true"
    >
      <span className="art-label">THE ENGLISH NOTEBOOK</span>
      <span className="art-word">
        {kind === 'Vocabulary'
          ? 'Words\nworth knowing.'
          : kind === 'Writing'
            ? 'A thought.\nA sentence.\nA beginning.'
            : kind === 'Speaking'
              ? 'Find your\nvoice.'
              : 'Little lessons.\nLasting clarity.'}
      </span>
      <span className="art-footer">
        Gurus Classes of English <span>↗</span>
      </span>
    </div>
  );
}
