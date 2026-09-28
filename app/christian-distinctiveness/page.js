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
        title="Faith at the heart of our school"
        subtitle="As a Church of England school, our Christian values shape everything we do."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="font-body space-y-10 text-[var(--color-text-secondary)]">
          <div>
            <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
              Our vision statement
            </h2>
            <p className="mt-4">
              &ldquo;Let your light shine before others, so that they may see
              your good works.&rdquo; (Matthew 5:16) We are a school
              community where every person is valued as made in the image of
              God, and where faith inspires academic excellence, kindness,
              and service.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
              Collective worship
            </h2>
            <p className="mt-4">
              All students take part in regular acts of collective worship,
              reflecting the traditions of the Church of England while
              welcoming and respecting students of all faiths and none.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
              SIAMS inspection
            </h2>
            <p className="mt-4">
              As a Church of England school, we are inspected under the
              Statutory Inspection of Anglican and Methodist Schools (SIAMS)
              framework, assessing the effectiveness of our Christian
              distinctiveness.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
              Chaplaincy and pastoral care
            </h2>
            <p className="mt-4">
              Our chaplaincy team supports students and staff of all faiths
              and backgrounds, offering a space for reflection, prayer, and
              pastoral support throughout the school year.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
