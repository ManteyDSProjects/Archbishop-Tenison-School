import { Suspense } from "react";
import HeroBanner from "../../components/HeroBanner";
import FilterBar from "../../components/FilterBar";
import PDFLink from "../../components/PDFLink";
import { getAllLetters } from "@/lib/content";

export const metadata = {
  title: "Letters Home | Parents | Archbishop Tenison's CE High School",
};

const YEAR_GROUP_OPTIONS = [
  { value: "Whole School", label: "Whole School" },
  { value: "Year 7", label: "Year 7" },
  { value: "Year 8", label: "Year 8" },
  { value: "Year 9", label: "Year 9" },
  { value: "Year 10", label: "Year 10" },
  { value: "Year 11", label: "Year 11" },
  { value: "Sixth Form", label: "Sixth Form" },
];

export default function LettersPage({ searchParams }) {
  const year = searchParams?.year;
  const allLetters = getAllLetters();
  const letters = year
    ? allLetters.filter((l) => l.yearGroup === year)
    : allLetters;

  return (
    <>
      <HeroBanner
        compact
        eyebrow="Parents"
        title="Letters Home"
        subtitle="Filter by year group to find what you're looking for."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <FilterBar
            paramName="year"
            options={YEAR_GROUP_OPTIONS}
            allLabel="All year groups"
          />
        </Suspense>

        {letters.length === 0 ? (
          <p className="font-body mt-10 text-[var(--color-text-secondary)]">
            No letters for this year group yet.
          </p>
        ) : (
          <div className="mt-8">
            {letters.map((letter) => (
              <PDFLink
                key={letter.slug}
                href={letter.documentHref}
                meta={`${letter.yearGroup} · ${letter.date}`}
              >
                {letter.title}
              </PDFLink>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
