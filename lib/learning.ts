// A recall question uses only an explicit definition already present in the lesson.
// Other lessons get an open writing exercise, without invented answers or AI calls.
export function recallFromLesson(content: string): { term: string; answer: string } | null {
  const blocks = content.trim().split(/\n\s*\n/);
  const index = blocks.findIndex((block) => /^#{1,3}\s+(meaning|definition)\s*:?\s*$/i.test(block));
  if (index < 1) return null;
  const heading = blocks.slice(0, index).find((block) => /^#{1,3}\s+/.test(block));
  const term = heading?.replace(/^#{1,3}\s+/, '').replace(/\*\*/g, '').trim();
  const answer = blocks[index + 1]?.replace(/\*\*/g, '').trim();
  if (!term || term.length > 70 || !answer || answer.length > 500 || /^[#>-]/.test(answer)) return null;
  return { term, answer };
}
