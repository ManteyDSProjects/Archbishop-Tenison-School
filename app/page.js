import Link from "next/link";
import HeroBanner from "./components/HeroBanner";
import NewsCard from "./components/NewsCard";
import { getAllNews } from "@/lib/content";

const QUICK_LINKS = [
  { href: "/admissions", label: "Admissions", desc: "How to apply for a place" },
  { href: "/curriculum", label: "Curriculum", desc: "What your child will learn" },
  { href: "/vacancies", label: "Vacancies", desc: "Join our staff team" },
  { href: "/contact", label: "Contact Us", desc: "Get in touch with the school" },
];

export default function Home() {
  const news = getAllNews().slice(0, 3);

  return (
    <>
      <HeroBanner
        eyebrow="Archbishop Tenison's CE High School"
        title="An outstanding education, rooted in Christian values"
        subtitle="Serving the community of Kennington and beyond, we equip every student to flourish academically, spiritually, and personally."
      >
        <Link
          href="/admissions"
          className="inline-flex items-center rounded-md bg-[#c9a961] px-6 py-3 text-sm font-semibold text-[#0b2545] shadow-sm transition-colors hover:bg-[#c9a961]/90"
        >
          Apply for a place
        </Link>
      </HeroBanner>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0b2545]">Quick Links</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-lg border border-zinc-200 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="font-semibold text-[#0b2545] group-hover:text-[#c9a961]">
                {link.label}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#0b2545]">Latest News</h2>
            <Link
              href="/news"
              className="text-sm font-medium text-[#0b2545] hover:text-[#c9a961]"
            >
              View all news →
            </Link>
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0b2545]">Our Vision</h2>
        <p className="mt-4 text-lg text-zinc-600">
          &ldquo;Let your light shine before others.&rdquo; We nurture
          confident, compassionate young people who are ready to make a
          positive difference in the world.
        </p>
        <Link
          href="/christian-distinctiveness"
          className="mt-4 inline-block text-sm font-medium text-[#0b2545] underline hover:text-[#c9a961]"
        >
          Read about our Christian distinctiveness
        </Link>
      </section>
    </>
  );
}
