import Link from "next/link";
import HeroBanner from "../components/HeroBanner";
import { getTermDates, getAllLetters, getAllPolicies } from "@/lib/content";

export const metadata = {
  title: "Parents | Archbishop Tenison's CE High School",
};

const SECTIONS = [
  {
    href: "/parents/term-dates",
    label: "Term Dates",
    desc: "",
  },
  {
    href: "/parents/letters",
    label: "Letters Home",
    desc: "Year 7, Year 8, Year 9, Year 10, Year 11, Sixth Form, Whole School Letters",
  },
  {
    href: "/parents/policies",
    label: "Policies",
    desc: "",
  },
];

export default function ParentsPage() {
  const termDates = getTermDates().slice(0, 3);
  const letters = getAllLetters().slice(0, 4);
  const policies = getAllPolicies().slice(0, 4);

  return (
    <>
      <HeroBanner
        compact
        eyebrow="Parents"
        title="Information"
        subtitle="Letters Home"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-3">
          {SECTIONS.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group border border-[var(--color-border-primary)] p-6 transition-colors hover:border-[var(--color-accent-primary)]"
            >
              <h3 className="font-display text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
                {s.label}
              </h3>
              {s.desc && (
                <p className="font-body mt-2 text-sm text-[var(--color-text-secondary)]">
                  {s.desc}
                </p>
              )}
            </Link>
          ))}
        </div>

        {termDates.length > 0 && (
          <div className="mt-14">
            <h2 className="font-display text-xl font-medium text-[var(--color-text-primary)]">
              Term Dates
            </h2>
            <dl className="font-body mt-4 divide-y divide-[var(--color-border-secondary)]">
              {termDates.map((d) => (
                <div
                  key={d.term}
                  className="flex justify-between gap-4 py-3 text-sm"
                >
                  <dt className="font-medium text-[var(--color-text-primary)]">
                    {d.term}
                  </dt>
                  <dd className="text-[var(--color-text-secondary)]">
                    {d.range}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {letters.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-medium text-[var(--color-text-primary)]">
                Letters Home
              </h2>
              <Link
                href="/parents/letters"
                className="font-body text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
              >
                View all →
              </Link>
            </div>
            <ul className="font-body mt-4 divide-y divide-[var(--color-border-secondary)]">
              {letters.map((l) => (
                <li key={l.slug} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-[var(--color-text-primary)]">{l.title}</span>
                  <span className="text-[var(--color-text-tertiary)]">{l.yearGroup}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {policies.length > 0 && (
          <div className="mt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-medium text-[var(--color-text-primary)]">
                Policies
              </h2>
              <Link
                href="/parents/policies"
                className="font-body text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
              >
                View all →
              </Link>
            </div>
            <ul className="font-body mt-4 divide-y divide-[var(--color-border-secondary)]">
              {policies.map((p) => (
                <li key={p.slug} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-[var(--color-text-primary)]">{p.title}</span>
                  <span className="text-[var(--color-text-tertiary)]">{p.category}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
