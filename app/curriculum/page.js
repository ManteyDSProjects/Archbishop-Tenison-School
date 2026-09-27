import HeroBanner from "../components/HeroBanner";
import PDFLink from "../components/PDFLink";

export const metadata = {
  title: "Curriculum | Archbishop Tenison's CE High School",
};

const SUBJECTS = [
  "English", "Mathematics", "Science", "Religious Education",
  "Modern Foreign Languages", "History", "Geography", "Art & Design",
  "Music", "Physical Education", "Computing", "Design & Technology",
];

export default function CurriculumPage() {
  return (
    <>
      <HeroBanner
        compact
        eyebrow="Curriculum"
        title="A Broad and Balanced Education"
        subtitle="Our curriculum is designed to challenge, inspire, and prepare every student for their next steps."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0b2545]">
          Subjects We Teach
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SUBJECTS.map((subject) => (
            <div
              key={subject}
              className="rounded-md border border-zinc-200 px-4 py-3 text-center text-sm font-medium text-zinc-700"
            >
              {subject}
            </div>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-bold text-[#0b2545]">
          Key Stage 3 and 4
        </h2>
        <p className="mt-4 text-zinc-700">
          Students follow a broad curriculum through Key Stage 3, building
          strong foundations before selecting GCSE options at the end of
          Year 9. We are committed to the principles of the EBacc while
          offering a range of creative and vocational subjects.
        </p>

        <div className="mt-10 rounded-lg border border-zinc-200 bg-zinc-50 p-6">
          <h3 className="font-semibold text-[#0b2545]">Curriculum Documents</h3>
          <ul className="mt-4 space-y-3">
            <li>
              <PDFLink href="/documents/curriculum-overview.pdf">
                Curriculum Overview by Year Group
              </PDFLink>
            </li>
            <li>
              <PDFLink href="/documents/gcse-options-booklet.pdf">
                GCSE Options Booklet
              </PDFLink>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
