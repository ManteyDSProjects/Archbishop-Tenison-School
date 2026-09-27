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
        title="Faith at the Heart of Our School"
        subtitle="As a Church of England school, our Christian values shape everything we do."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-zinc max-w-none">
          <h2 className="text-2xl font-bold text-[#0b2545]">
            Our Vision Statement
          </h2>
          <p className="mt-4 text-zinc-700">
            &ldquo;Let your light shine before others, so that they may see
            your good works.&rdquo; (Matthew 5:16) We are a school
            community where every person is valued as made in the image of
            God, and where faith inspires academic excellence, kindness,
            and service.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#0b2545]">
            Collective Worship
          </h2>
          <p className="mt-4 text-zinc-700">
            All students take part in regular acts of collective worship,
            reflecting the traditions of the Church of England while
            welcoming and respecting students of all faiths and none.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#0b2545]">
            SIAMS Inspection
          </h2>
          <p className="mt-4 text-zinc-700">
            As a Church of England school, we are inspected under the
            Statutory Inspection of Anglican and Methodist Schools (SIAMS)
            framework, assessing the effectiveness of our Christian
            distinctiveness.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#0b2545]">
            Chaplaincy and Pastoral Care
          </h2>
          <p className="mt-4 text-zinc-700">
            Our chaplaincy team supports students and staff of all faiths
            and backgrounds, offering a space for reflection, prayer, and
            pastoral support throughout the school year.
          </p>
        </div>
      </section>
    </>
  );
}
