import HeroBanner from "../components/HeroBanner";
import PDFLink from "../components/PDFLink";
import { getTermDates } from "@/lib/content";

export const metadata = {
  title: "Information | Archbishop Tenison's CE High School",
};

const POLICIES = [
  { title: "Safeguarding Policy", href: "/documents/safeguarding-policy.pdf" },
  { title: "Behaviour Policy", href: "/documents/behaviour-policy.pdf" },
  { title: "SEND Information Report", href: "/documents/send-report.pdf" },
  { title: "Uniform List", href: "/documents/uniform-list.pdf" },
  { title: "School Calendar", href: "/documents/school-calendar.pdf" },
];

export default function InformationPage() {
  const termDates = getTermDates();

  return (
    <>
      <HeroBanner
        compact
        eyebrow="Information"
        title="Term Dates, Policies & Key Documents"
        subtitle="Everything current parents and carers need in one place."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0b2545]">Term Dates</h2>
        <div className="mt-6 overflow-hidden rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <tbody>
              {termDates.map((row, i) => (
                <tr
                  key={row.term}
                  className={i % 2 === 0 ? "bg-white" : "bg-zinc-50"}
                >
                  <td className="px-4 py-3 font-medium text-[#0b2545]">
                    {row.term}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{row.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Term dates are managed and updated directly by the school office.
        </p>

        <h2 className="mt-12 text-2xl font-bold text-[#0b2545]">
          Policies &amp; Documents
        </h2>
        <div className="mt-6 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
          <ul className="space-y-3">
            {POLICIES.map((doc) => (
              <li key={doc.title}>
                <PDFLink href={doc.href}>{doc.title}</PDFLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
