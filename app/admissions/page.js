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

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0b2545]">
          How to Apply
        </h2>
        <div className="mt-8 space-y-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0b2545] font-semibold text-white">
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-[#0b2545]">{step.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="font-semibold text-[#0b2545]">Key Documents</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <PDFLink href="/documents/admissions-policy.pdf">
                Admissions Policy 2027/28
              </PDFLink>
            </li>
            <li>
              <PDFLink href="/documents/supplementary-information-form.pdf">
                Supplementary Information Form
              </PDFLink>
            </li>
            <li>
              <PDFLink href="/documents/appeals-process.pdf">
                Appeals Process
              </PDFLink>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
