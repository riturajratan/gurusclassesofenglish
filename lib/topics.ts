type TopicLesson = { category: string; tags: string[] };
const topics = [
  "Quiz",
  "Word Power",
  "Vocabulary",
  "Grammar",
  "Common Mistakes",
  "Writing",
  "Speaking",
];
export function matchesTopic(lesson: TopicLesson, topic: string) {
  return (
    topic === "All lessons" ||
    (topic === "Vocabulary" && lesson.category === "Word Power") ||
    lesson.category === topic ||
    lesson.tags.some((tag) => tag.toLowerCase() === topic.toLowerCase())
  );
}
export function availableTopics(lessons: TopicLesson[]) {
  return topics.filter((topic) =>
    lessons.some((lesson) => matchesTopic(lesson, topic)),
  );
}
