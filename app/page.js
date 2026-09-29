import Image from "next/image";
import Link from "next/link";
import HeroBanner from "./components/HeroBanner";
import NewsCard from "./components/NewsCard";
import { getAllNews } from "@/lib/content";

const QUICK_LINKS = [
  { href: "/parents", label: "Key Information" },
  { href: "/admissions", label: "Year 7 Open Events" },
  { href: "/admissions", label: "Sixth Form Open Events" },
  { href: "/parents/letters", label: "Letters Home" },
  { href: "/documents/news/weekly-news.pdf", label: "Weekly News", newTab: true },
  { href: "/contact", label: "Contact Us" },
];

export default function Home() {
  const news = getAllNews();

  return (
    <>
      <HeroBanner
        eyebrow="Tenaciter"
        title="Academic excellence for each person in a Christian community"
        subtitle="Welcome to Archbishop Tenison's CofE High School. We are delighted that you have expressed an interest in our school."
      >
        <Link
          href="/admissions"
          className="font-body inline-flex items-center rounded-full bg-[var(--brand-cream-50)] px-6 py-3 text-sm font-semibold text-[var(--brand-navy-900)] transition-opacity hover:opacity-90"
        >
          Year 7 Open Events
        </Link>
      </HeroBanner>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
          Quick Links
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] p-6 transition-colors hover:border-[var(--color-accent-primary)]"
            >
              <h3 className="font-body font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)]">
                {link.label}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          <div className="relative aspect-[3/2] overflow-hidden lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:min-h-[420px]">
            <Image
              src="/images/photography/school-building.jpg"
              alt="Archbishop Tenison's CE High School main building and grounds, Croydon"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
              loading="eager"
            />
          </div>
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src="/images/photography/choir-founders-day.jpg"
              alt="Archbishop Tenison's students singing at a Founders Day service in Croydon Minster"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
              loading="eager"
            />
          </div>
          <div className="relative aspect-[3/2] overflow-hidden">
            <Image
              src="/images/photography/whole-school-service.jpg"
              alt="Whole-school church service at Archbishop Tenison's, reflecting its Church of England ethos"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {news.length > 0 && (
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
                image={item.image}
                href={item.href}
                newTab={item.newTab}
              />
            ))}
          </div>
        </div>
      </section>
      )}

      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-medium text-[var(--color-text-primary)]">
          Welcome to Archbishop Tenison&apos;s CofE High School
        </h2>
        <p className="font-body mt-4 text-lg text-[var(--color-text-secondary)]">
          We are delighted that you have expressed an interest in our school.
          We are a school with a distinctive character and purpose, our motto
          &lsquo;Academic excellence for each person in a Christian
          community&rsquo; is reflected in everything we do.
        </p>
        <p className="font-body mt-4 text-lg text-[var(--color-text-secondary)]">
          Our curriculum vision is:
        </p>
        <ul className="font-body mx-auto mt-2 max-w-xl list-none space-y-1 text-lg text-[var(--color-text-secondary)]">
          <li>To learn together as a Christian learning community</li>
          <li>To educate the whole person</li>
          <li>To provide the whole curriculum</li>
          <li>To teach with understanding &ndash; of the subject and the person learning it</li>
          <li>To learn with tenacity, humility and hope.</li>
        </ul>
        <p className="font-body mt-4 text-lg text-[var(--color-text-secondary)]">
          We value 5 things in particular: courtesy, calmness, concentration,
          confidence and consideration.
        </p>
        <p className="font-body mt-4 text-lg text-[var(--color-text-secondary)]">
          We hope you enjoy learning about our school.
        </p>
        <Link
          href="/christian-distinctiveness"
          className="font-body mt-4 inline-block text-sm font-medium text-[var(--color-accent-primary)] underline hover:text-[var(--color-accent-primary-hover)]"
        >
          Christian Distinctiveness
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative aspect-[3/1] overflow-hidden">
          <Image
            src="/images/photography/worship-band.jpg"
            alt="Students and staff leading collective worship together at Archbishop Tenison's"
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="object-cover"
            loading="eager"
          />
        </div>
      </section>
    </>
  );
}
