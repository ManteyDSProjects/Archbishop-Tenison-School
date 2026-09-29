import Image from "next/image";
import HeroBanner from "../components/HeroBanner";

export const metadata = {
  title: "About Us | Archbishop Tenison's CE High School",
};

export default function AboutPage() {
  return (
    <>
      <HeroBanner
        compact
        eyebrow="About Us"
        title="About Us"
        subtitle="Archbishop Tenison&apos;s is a 310 year-old Church of England, mixed, comprehensive, 11-18 High School in Croydon with an excellent track record at both GCSE and A Level over many years."
      />

      <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8">
        <Image
          src="/images/photography/staff.jpg"
          alt="Senior leaders at Archbishop Tenison's CE High School"
          width={1200}
          height={800}
          className="h-auto w-full border border-[var(--color-border-primary)] object-cover"
        />
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="font-body space-y-6 text-[var(--color-text-secondary)]">
          <p>
            The school was founded by the then Archbishop of Canterbury, Thomas Tenison, in 1714, for &ldquo;ten poor boys and ten poor girls of the Parish of Croydon&rdquo;. At that time it was a radical new departure to educate boys and girls together in the same school. This is possibly the longest continuously running mixed school in the world under the same foundation as when it started.
          </p>

          <p>
            Today the school serves the Archdeaconry of Croydon and Deaconry of Sutton, giving priority through its admission arrangements to children from Church of England and other Christian families who live within that area, with 20% per cent of places allocated to feeder schools and 20% of places open to families geographically.
          </p>

          <p>
            Archbishop Tenison&apos;s is a relatively small secondary school, with an admission number in Year 7 of 150. The curriculum in Years 7-11 follows a traditional model, with a particular emphasis on the core subjects of English, Maths, Science, French and German, History, Geography, Physical Education and Religious Studies, as well as on artistic and practical subjects such as Art, Music, Drama and Technology. All pupils follow a programme of Personal and Social Development, which includes Citizenship. Food Technology is a very popular subject within the school, as is Computing.
          </p>

          <p>
            The strong Sixth Form has over 100 students (2018-19 numbers), which is well established at both GCSE and A Level. Continuation or entrance to the Sixth Form is on an academic basis. In the Sixth Form the range of subjects increases considerably to include Economics, Business Studies, Psychology, Sociology, Film Studies and courses in both English Language and English Literature, as well as Further Maths.
          </p>

          <p>
            The school also enjoys a very high level of participation in extra-curricular activities ranging from spectacular concerts and sporting success to exchanges with both France and Germany and charitable connections at home and abroad.
          </p>

          <p>
            The school is a well-established Church of England school, which has as its motto: Tenaciter - Academic excellence for each person in a Christian community. The school&apos;s strong sense of its educational purpose is reflected in its commitment to providing a strong academic foundation for its pupils in a secure Christian context which gives them in their turn the confidence to contribute well to a good, free and just society.
          </p>
        </div>
      </section>
    </>
  );
}
