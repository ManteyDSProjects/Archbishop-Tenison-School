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
        eyebrow="Tenaciter"
        title="Academic excellence for each person in a Christian community"
        subtitle="Founded in 1714, Archbishop Tenison's is possibly the longest continuously running mixed school in the world under the same foundation as when it started."
      >
        <Link
          href="/admissions"
          className="font-body inline-flex items-center rounded-full bg-[var(--brand-cream-50)] px-6 py-3 text-sm font-semibold text-[var(--brand-navy-900)] transition-opacity hover:opacity-90"
        >
          Apply for a place
        </Link>
      </HeroBanner>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
          Quick Links
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-[var(--color-accent-primary)]"
            >
              <h3 className="font-body font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
                {link.label}
              </h3>
              <p className="font-body mt-1 text-sm text-[var(--color-text-secondary)]">
                {link.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-bg-tertiary)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
              Latest News
            </h2>
            <Link
              href="/news"
              className="font-body text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
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
        <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
          Our Vision
        </h2>
        <p className="font-body mt-4 text-lg text-[var(--color-text-secondary)]">
          We provide a strong academic foundation in a secure Christian
          context, giving every student the confidence to contribute well
          to a good, free, and just society.
        </p>
        <Link
          href="/christian-distinctiveness"
          className="font-body mt-4 inline-block text-sm font-medium text-[var(--color-accent-primary)] underline hover:text-[var(--color-accent-primary-hover)]"
        >
          Read about our Christian distinctiveness
        </Link>
      </section>
    </>
  );
}
