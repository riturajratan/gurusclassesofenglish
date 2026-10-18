import { Fragment } from 'react';
// Render the deliberately small Markdown subset as React nodes, never raw HTML.
function inline(text: string) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part, i) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <Fragment key={i}>{part}</Fragment>
      ),
    );
}
export default function LessonBody({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\s*\n/);
  return (
    <div className="lesson-body">
      {blocks.map((block, index) => {
        if (/^#{1,3} /.test(block)) {
          const level = block.match(/^#+/)![0].length;
          const text = block.replace(/^#+\s*/, '');
          return level <= 2 ? (
            <h2 key={index}>{inline(text)}</h2>
          ) : (
            <h3 key={index}>{inline(text)}</h3>
          );
        }
        const lines = block.split('\n');
        if (lines.every((line) => /^[-*] /.test(line)))
          return (
            <ul key={index}>
              {lines.map((line, i) => (
                <li key={i}>{inline(line.slice(2))}</li>
              ))}
            </ul>
          );
        if (lines.every((line) => /^\d+\. /.test(line)))
          return (
            <ol key={index}>
              {lines.map((line, i) => (
                <li key={i}>{inline(line.replace(/^\d+\. /, ''))}</li>
              ))}
            </ol>
          );
        if (block.startsWith('> '))
          return <blockquote key={index}>{inline(block.replace(/^> /gm, ''))}</blockquote>;
        return (
          <p key={index}>
            {lines.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {inline(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
