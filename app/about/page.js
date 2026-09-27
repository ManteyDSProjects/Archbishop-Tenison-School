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
        title="310 Years of Tenaciter"
        subtitle="Possibly the longest continuously running mixed school in the world under the same foundation as when it started."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-zinc max-w-none">
          <h2 className="text-2xl font-bold text-[#0b2545]">Our Story</h2>
          <p className="mt-4 text-zinc-700">
            Archbishop Tenison&apos;s was founded in 1714 by the then
            Archbishop of Canterbury, Thomas Tenison, for &ldquo;ten poor
            boys and ten poor girls of the Parish of Croydon.&rdquo; More
            than 310 years later, we remain a Church of England
            comprehensive school, now serving students aged 11 to 18 with
            the same founding commitment to academic excellence and
            Christian community.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#0b2545]">
            Our Motto: Tenaciter
          </h2>
          <p className="mt-4 text-zinc-700">
            &ldquo;Tenaciter, academic excellence for each person in a
            Christian community.&rdquo; We provide a strong academic
            foundation in a secure Christian context, giving every student
            the confidence to contribute well to a good, free, and just
            society.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#0b2545]">
            Our Values
          </h2>
          <ul className="mt-4 list-disc pl-6 text-zinc-700">
            <li>Faith rooted in Christian teaching</li>
            <li>Academic ambition for every student</li>
            <li>Respect for one another and our wider community</li>
            <li>Service to others, locally and globally</li>
          </ul>
        </div>
      </section>
    </>
  );
}
