import { Suspense } from "react";
import HeroBanner from "../../components/HeroBanner";
import FilterBar from "../../components/FilterBar";
import PDFLink from "../../components/PDFLink";
import { getAllPolicies } from "@/lib/content";

export const metadata = {
  title: "Policies | Parents | Archbishop Tenison's CE High School",
};

const CATEGORY_OPTIONS = [
  { value: "Safeguarding", label: "Safeguarding" },
  { value: "Admissions", label: "Admissions" },
  { value: "Data Protection", label: "Data Protection" },
  { value: "SEND & Pupil Premium", label: "SEND & Pupil Premium" },
  { value: "Curriculum", label: "Curriculum" },
  { value: "Behaviour & Attendance", label: "Behaviour & Attendance" },
  { value: "Health & Safety", label: "Health & Safety" },
  { value: "Other", label: "Other" },
];

export default function PoliciesPage({ searchParams }) {
  const category = searchParams?.category;
  const allPolicies = getAllPolicies();
  const policies = category
    ? allPolicies.filter((p) => p.category === category)
    : allPolicies;

  return (
    <>
      <HeroBanner
        compact
        eyebrow="Parents"
        title="Policies"
        subtitle="Filter by category."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Suspense fallback={null}>
          <FilterBar
            paramName="category"
            options={CATEGORY_OPTIONS}
            allLabel="All categories"
          />
        </Suspense>

        {policies.length === 0 ? (
          <p className="font-body mt-10 text-[var(--color-text-secondary)]">
            No policies found for this category.
          </p>
        ) : (
          <div className="mt-8">
            {policies.map((policy) => (
              <PDFLink
                key={policy.slug}
                href={policy.documentHref}
                meta={policy.lastReviewed ? `Reviewed ${policy.lastReviewed}` : policy.category}
              >
                {policy.title}
              </PDFLink>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
