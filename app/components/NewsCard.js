import Image from "next/image";
import Link from "next/link";

const CARD =
  "group block border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] transition-colors hover:border-[var(--color-accent-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]";

export default function NewsCard({ slug, title, date, excerpt, image, href, newTab }) {
  const body = (
    <>
      {image && (
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {date && (
          <p className="font-body text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
            {date}
          </p>
        )}
        <h3 className="font-display text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
          {title}
        </h3>
        {excerpt && (
          <p className="font-body mt-2 line-clamp-3 text-sm text-[var(--color-text-secondary)]">
            {excerpt}
          </p>
        )}
      </div>
    </>
  );

  if (href && newTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={CARD}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href || `/news/${slug}`} className={CARD}>
      {body}
    </Link>
  );
}
