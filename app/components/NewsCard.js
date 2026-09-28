import Link from "next/link";

export default function NewsCard({ slug, title, date, excerpt }) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group block border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-[var(--color-accent-primary)]"
    >
      <p className="font-body text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
        {date}
      </p>
      <h3 className="font-display mt-2 text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
        {title}
      </h3>
      {excerpt && (
        <p className="font-body mt-2 line-clamp-3 text-sm text-[var(--color-text-secondary)]">
          {excerpt}
        </p>
      )}
      <span className="font-body mt-3 inline-block text-sm font-semibold text-[var(--color-accent-primary)]">
        Read more →
      </span>
    </Link>
  );
}
