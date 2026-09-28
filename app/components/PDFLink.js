export default function PDFLink({ href, children, meta }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-body group flex items-center justify-between gap-4 border-b border-[var(--color-border-secondary)] py-3 text-sm"
    >
      <span className="flex items-center gap-3">
        <svg
          className="h-4 w-4 shrink-0 text-[var(--color-text-tertiary)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
          {children}
        </span>
      </span>
      <span className="shrink-0 whitespace-nowrap text-xs text-[var(--color-text-tertiary)]">
        {meta ? `${meta} · PDF` : "PDF"}
      </span>
    </a>
  );
}
