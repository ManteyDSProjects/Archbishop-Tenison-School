import HeroBanner from "../components/HeroBanner";

export const metadata = {
  title: "Christian Distinctiveness | Archbishop Tenison's CE High School",
};

export default function ChristianDistinctivenessPage() {
  return (
    <>
      <HeroBanner
        compact
        eyebrow="Christian Distinctiveness"
        title="Christian Distinctiveness"
        subtitle="Academic excellence for each person as part of a Christian Community"
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="font-body space-y-6 text-[var(--color-text-secondary)]">
          <p>
            As the last remaining Church of England secondary school in Croydon, our Christian ethos is at the heart of everything we do at Archbishop Tenison&rsquo;s. It is our Christian distinctiveness, flowing through our academic curriculum and pastoral care, that sets us apart from every other secondary school in the area.
          </p>

          <p>
            As a school community we are constantly looking for opportunities to turn our ethos and vision &ndash; &lsquo;Academic excellence for each person as part of a Christian Community&rsquo; - into a lived-out reality for all those involved in the life of the school.
          </p>

          <p>
            Link to our latest SIAMS report.
          </p>
        </div>
      </section>
    </>
  );
}
