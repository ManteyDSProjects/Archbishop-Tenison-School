import HeroBanner from "../components/HeroBanner";
import PDFLink from "../components/PDFLink";

export const metadata = {
  title: "Admissions | Archbishop Tenison's CE High School",
};

const STEPS = [
  {
    title: "Attend an Open Evening",
    desc: "Visit us to tour the school, meet our staff and students, and learn about what we offer.",
  },
  {
    title: "Apply through your Local Authority",
    desc: "Applications for Year 7 places are made through your home local authority's admissions portal.",
  },
  {
    title: "Supplementary Information Form",
    desc: "As a Church of England school, some places are allocated using faith-based criteria. Complete our SIF if this applies to you.",
  },
  {
    title: "Offer Day",
    desc: "National offer day is 1 March. You will be notified by your local authority of the outcome.",
  },
];

export default function AdmissionsPage() {
  return (
    <>
      <HeroBanner
        compact
        eyebrow="Admissions"
        title="Joining Archbishop Tenison's"
        subtitle="Everything you need to know about applying for a place at our school."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
          Standard entry: how to apply
        </h2>
        <div className="mt-8 space-y-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="font-display flex h-10 w-10 shrink-0 items-center justify-center bg-[var(--brand-navy-900)] text-base font-medium text-[var(--brand-cream-50)]">
                {i + 1}
              </div>
              <div>
                <h3 className="font-body font-semibold text-[var(--color-text-primary)]">
                  {step.title}
                </h3>
                <p className="font-body mt-1 text-sm text-[var(--color-text-secondary)]">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-[var(--color-border-primary)] pt-10">
          <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
            In-year applications
          </h2>
          <p className="font-body mt-4 text-[var(--color-text-secondary)]">
            If you need a place outside the standard Year 7 admissions round
            — for example your family has moved into the area, or your
            child needs a place mid-year — contact us directly to discuss
            current availability.
          </p>
        </div>

        <div className="mt-14 border-t border-[var(--color-border-primary)] pt-10">
          <h3 className="font-display text-lg font-medium text-[var(--color-text-primary)]">
            Key documents
          </h3>
          <div className="mt-4">
            <PDFLink href="/documents/admissions-policy.pdf">
              Admissions Policy 2027/28
            </PDFLink>
            <PDFLink href="/documents/supplementary-information-form.pdf">
              Supplementary Information Form
            </PDFLink>
            <PDFLink href="/documents/appeals-process.pdf">
              Appeals Process
            </PDFLink>
          </div>
        </div>
      </section>
    </>
  );
}
