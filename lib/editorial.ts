// Draft-only language must be resolved rather than published as a student lesson.
export function hasUnresolvedReviewNote(content: string) {
  return /note for teacher review|teacher should review|review these details before publication|add or confirm the answers before publication/i.test(
    content,
  );
}
