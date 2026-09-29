import { Suspense } from "react";
import Link from "next/link";
import HeroBanner from "../components/HeroBanner";
import FilterBar from "../components/FilterBar";
import { getAllCurriculum } from "@/lib/content";

export const metadata = {
  title: "Curriculum | Archbishop Tenison's CE High School",
};

const KEY_STAGE_OPTIONS = [
  { value: "KS3", label: "KS3" },
  { value: "KS4", label: "KS4" },
  { value: "Sixth Form", label: "Sixth Form" },
];

export default async function CurriculumPage({ searchParams }) {
  const { stage } = (await searchParams) || {};
  const allSubjects = getAllCurriculum();
  const subjects = stage
    ? allSubjects.filter((s) => (s.keyStage || []).includes(stage))
    : allSubjects;

  return (
    <>
      <HeroBanner
        compact
        eyebrow="Curriculum"
        title="A broad and balanced education"
        subtitle="Every subject follows the same Intent, Implementation and Impact structure — what we set out to achieve, how we teach it, and the difference it makes."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <FilterBar
            paramName="stage"
            options={KEY_STAGE_OPTIONS}
            allLabel="All key stages"
          />
        </Suspense>

        {subjects.length === 0 ? (
          <p className="font-body mt-10 text-[var(--color-text-secondary)]">
            No subjects found for this key stage.
          </p>
        ) : (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/curriculum/${subject.slug}`}
                className="group border border-[var(--color-border-primary)] p-6 transition-colors hover:border-[var(--color-accent-primary)]"
              >
                <h3 className="font-display text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
                  {subject.title}
                </h3>
                <p className="font-body mt-2 text-xs uppercase tracking-[0.08em] text-[var(--color-text-tertiary)]">
                  {(subject.keyStage || []).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
