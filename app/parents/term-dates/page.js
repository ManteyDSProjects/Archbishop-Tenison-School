import HeroBanner from "../../components/HeroBanner";
import { getTermDates } from "@/lib/content";

export const metadata = {
  title: "Term Dates | Parents | Archbishop Tenison's CE High School",
};

export default function TermDatesPage() {
  const dates = getTermDates();

  return (
    <>
      <HeroBanner compact eyebrow="Parents" title="Term Dates" />

      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        {dates.length === 0 ? (
          <p className="font-body text-[var(--color-text-secondary)]">
            Term dates will be published here shortly.
          </p>
        ) : (
          <dl className="font-body divide-y divide-[var(--color-border-secondary)]">
            {dates.map((d) => (
              <div key={d.term} className="flex flex-wrap justify-between gap-2 py-4">
                <dt className="font-medium text-[var(--color-text-primary)]">
                  {d.term}
                </dt>
                <dd className="text-[var(--color-text-secondary)]">{d.range}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
    </>
  );
}
