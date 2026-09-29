import HeroBanner from "../components/HeroBanner";
import PDFLink from "../components/PDFLink";

export const metadata = {
  title: "Admissions | Archbishop Tenison's CE High School",
};

export default function AdmissionsPage() {
  return (
    <>
      <HeroBanner
        compact
        eyebrow="Admissions"
        title="Applications for Year 7 2027"
        subtitle="We are delighted that you are considering Archbishop Tenison's School for your child's secondary school journey."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="font-body space-y-6 text-[var(--color-text-secondary)]">
          <p>
            We are a school with a distinctive character and purpose and aim
            to provide an enriching experience for each of our pupils. Our
            school motto is &lsquo;Academic Excellence for each person as part
            of a Christian Community&rsquo; and these values are instilled in
            all that goes on at Tenison&apos;s.
          </p>
          <p>
            To find out more about the school, we would encourage you to
            attend one of our Year 7 Open Events in the Autumn Term. Dates to
            follow.
          </p>
          <p>
            In the meantime, if you have any questions about how to make an
            application to the school, please contact our Admissions Officer
            by emailing admissions@archten.croydon.sch.uk
          </p>
        </div>

        <div className="mt-14 border-t border-[var(--color-border-primary)] pt-10">
          <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
            In-Year Applications
          </h2>
          <p className="font-body mt-2 text-sm text-[var(--color-text-tertiary)]">
            (Applications for school places during the school year for Years
            7-11)
          </p>
          <div className="font-body mt-4 space-y-4 text-[var(--color-text-secondary)]">
            <p>
              Those applying for admission outside the normal admissions
              cycle, for example, families moving into the area during the
              course of the year.
            </p>
            <p>
              As Archbishop Tenison&apos;s is part of Croydon Local
              Authority&apos;s In-Year co-ordination scheme, all In-Year
              applications should initially be made to the applicant&rsquo;s
              Local Authority.
            </p>
            <p>
              If applying for an In-Year Foundation Place at Archbishop
              Tenison&apos;s School, please also complete the school&apos;s
              In-Year Supplementary Information Form (SIF), and return it
              directly to the school.
            </p>
            <p>
              If applying for an In-Year Open Place at Archbishop
              Tenison&rsquo;s School applicants are not required to complete
              the school&rsquo;s SIF.
            </p>
            <p>
              In accordance with the school&apos;s admission criteria, In-Year
              applications will be reviewed and added to the school&apos;s
              waiting lists for the relevant year group.
            </p>
            <p>
              If you have any queries regarding making an application (for
              Year 7-11) to the school please email
              admissions@archten.croydon.sch.uk
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-[var(--color-border-primary)] pt-10">
          <h3 className="font-display text-lg font-medium text-[var(--color-text-primary)]">
            Key documents
          </h3>
          <div className="mt-4">
            <PDFLink href="/documents/admissions/2027-admission-criteria.pdf">
              2027 Admission Criteria
            </PDFLink>
            <PDFLink href="/documents/admissions/supplementary-information-form-2027.pdf">
              Supplementary Information Form (Printable) 2027
            </PDFLink>
            <PDFLink href="/documents/admissions/how-to-appeal.pdf">
              How to Appeal
            </PDFLink>
          </div>
        </div>
      </section>
    </>
  );
}
