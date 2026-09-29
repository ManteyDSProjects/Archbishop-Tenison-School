import Link from "next/link";
import HeroBanner from "../components/HeroBanner";
import PDFLink from "../components/PDFLink";

export const metadata = {
  title: "Staff Recruitment | Archbishop Tenison's CE High School",
};

const DOCUMENTS = [
  {
    label: "Standard Teaching Job Description",
    href: "/documents/staff-recruitment/standard-teaching-job-description.pdf",
  },
  {
    label: "Teaching Staff Application Form",
    href: "/documents/staff-recruitment/teaching-staff-application-form.pdf",
  },
  {
    label: "Support Staff Application Form",
    href: "/documents/staff-recruitment/support-staff-application-form.pdf",
  },
];

export default function WorkWithUsPage() {
  return (
    <>
      <HeroBanner compact title="Staff Recruitment" />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="font-body text-[var(--color-text-secondary)]">
          If you are interested in any of our vacancies and would like to
          arrange an informal chat or visit, please email{" "}
          <a
            href="mailto:PAtoHeadteacher@archten.croydon.sch.uk"
            className="font-semibold text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
          >
            PAtoHeadteacher@archten.croydon.sch.uk
          </a>
        </p>

        <div className="mt-8 border-t border-[var(--color-border-secondary)]">
          {DOCUMENTS.map((doc) => (
            <PDFLink key={doc.href} href={doc.href}>
              {doc.label}
            </PDFLink>
          ))}
        </div>

        <p className="font-body mt-8">
          <Link
            href="/teacher-training"
            className="font-semibold text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
          >
            Teacher Training
          </Link>
        </p>
      </section>
    </>
  );
}
