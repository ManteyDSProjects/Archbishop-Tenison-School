import PDFLink from "./PDFLink";

function closingSoon(closingDate) {
  if (!closingDate) return false;
  const days = (new Date(closingDate) - Date.now()) / (1000 * 60 * 60 * 24);
  return days >= 0 && days <= 7;
}

export default function VacancyCard({
  title,
  contractType,
  closingDate,
  salary,
  documentHref,
}) {
  const soon = closingSoon(closingDate);

  return (
    <div className="border border-[var(--color-border-primary)] border-t-[3px] border-t-[var(--brand-navy-700)] bg-[var(--color-bg-secondary)] p-9">
      <p className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-secondary)]">
        {contractType || "Vacancy"}
      </p>
      <h3 className="font-display mt-3 text-xl font-medium text-[var(--color-text-primary)]">
        {title}
      </h3>
      {salary && (
        <p className="font-body mt-1.5 text-sm text-[var(--color-text-secondary)]">
          {salary}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--color-border-secondary)] pt-4">
        {documentHref ? (
          <a
            href={documentHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-semibold text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
          >
            View job pack (PDF)
          </a>
        ) : (
          <span />
        )}
        {closingDate && (
          <span
            className={`font-body text-xs font-semibold ${
              soon
                ? "text-[var(--color-accent-secondary)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            Closes {closingDate}
          </span>
        )}
      </div>
    </div>
  );
}
