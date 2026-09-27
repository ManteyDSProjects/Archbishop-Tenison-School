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
        title="Our History and Ethos"
        subtitle="A Church of England school with a proud history of serving the Kennington community."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="prose prose-zinc max-w-none">
          <h2 className="text-2xl font-bold text-[#0b2545]">Our Story</h2>
          <p className="mt-4 text-zinc-700">
            Archbishop Tenison&apos;s CE High School has served the Kennington
            community for generations, providing a Christian foundation for
            education that combines academic excellence with strong pastoral
            care.
          </p>

          <h2 className="mt-10 text-2xl font-bold text-[#0b2545]">
            Headteacher&apos;s Welcome
          </h2>
          <p className="mt-4 text-zinc-700">
            Welcome to Archbishop Tenison&apos;s. We are proud of our
            community, our staff, and above all, our students, who
            consistently demonstrate the values of respect, resilience, and
            compassion that define our school.
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
