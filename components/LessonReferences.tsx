const britishCouncil =
  "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/";
export default function LessonReferences({ title }: { title: string }) {
  const lower = title.toLowerCase();
  let links: [string, string][] = [];
  if (lower.includes("passive"))
    links = [["British Council: passive voice", britishCouncil + "passives"]];
  else if (lower.includes("conditional"))
    links = [
      [
        "British Council: zero, first and second conditionals",
        britishCouncil + "conditionals-zero-first-second",
      ],
      [
        "British Council: third and mixed conditionals",
        britishCouncil + "conditionals-third-mixed",
      ],
    ];
  else if (/reported|reporting|indirect/.test(lower))
    links = [
      [
        "British Council: reported statements",
        britishCouncil + "reported-speech-statements",
      ],
      [
        "British Council: reported questions",
        britishCouncil + "reported-speech-questions",
      ],
    ];
  else if (lower.includes("modal"))
    links = [
      [
        "Cambridge Grammar: modal verbs",
        "https://dictionary.cambridge.org/grammar/british-grammar/modal",
      ],
    ];
  else if (lower.includes("non-finite"))
    links = [
      [
        "Cambridge Grammar: finite and non-finite verbs",
        "https://dictionary.cambridge.org/grammar/british-grammar/finite-and-non-finite-",
      ],
    ];
  if (!links.length) return null;
  return (
    <aside className="lesson-references" aria-label="Further reading">
      <h2>Keep exploring</h2>
      <p>For another explanation of the grammar pattern:</p>
      <ul>
        {links.map(([label, url]) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {label} ↗
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
