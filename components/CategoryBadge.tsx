import Link from 'next/link';

export default function CategoryBadge({ category }: { category: string }) {
  if (!['Quiz', 'Word Power', 'Vocabulary', 'Grammar', 'Common Mistakes', 'Writing', 'Speaking'].includes(category)) {
    return <span className="category-badge" data-category={category}>{category}</span>;
  }
  return (
    <Link className="category-badge" data-category={category}
      href={`/blog/?topic=${encodeURIComponent(category)}`} aria-label={`Explore ${category} lessons`}>
      {category}
    </Link>
  );
}
