import HeroBanner from "../components/HeroBanner";
import VacancyCard from "../components/VacancyCard";
import { getOpenVacancies } from "@/lib/content";

export const metadata = {
  title: "Work with us | Archbishop Tenison's CE High School",
};

export default function WorkWithUsPage() {
  const vacancies = getOpenVacancies();

  return (
    <>
      <HeroBanner
        compact
        eyebrow="Work with us"
        title="Join our staff team"
        subtitle="We are always keen to hear from talented people who share our vision and values."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {vacancies.length === 0 ? (
          <p className="font-body text-[var(--color-text-secondary)]">
            There are no current vacancies. Please check back soon.
          </p>
        ) : (
          <div className="space-y-6">
            {vacancies.map((vacancy) => (
              <VacancyCard
                key={vacancy.slug}
                title={vacancy.title}
                contractType={vacancy.contractType}
                salary={vacancy.salary}
                closingDate={vacancy.closingDate}
                documentHref={vacancy.documentHref}
              />
            ))}
          </div>
        )}

        <div className="font-body mt-12 border border-[var(--color-border-primary)] p-6 text-sm text-[var(--color-text-secondary)]">
          Archbishop Tenison&apos;s CE High School is committed to
          safeguarding and promoting the welfare of children. All
          appointments are subject to satisfactory references and an
          enhanced DBS check.
        </div>
      </section>
    </>
  );
}
