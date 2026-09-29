import Image from "next/image";
import Link from "next/link";

// Navy-on-navy default focus ring would be invisible here, so every link
// in this navy-chrome footer gets a gold ring instead.
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold-300)]";

const FOOTER_COLUMNS = [
  {
    label: "For Parents",
    items: [
      { label: "Letters Home", href: "/parents/letters" },
      { label: "Term Dates", href: "/parents/term-dates" },
      { label: "Policies", href: "/parents/policies" },
    ],
  },
  {
    label: "School",
    items: [
      { label: "Curriculum", href: "/curriculum" },
      { label: "Admissions", href: "/admissions" },
      { label: "Staff Recruitment", href: "/work-with-us" },
      { label: "Christian Distinctiveness", href: "/christian-distinctiveness" },
    ],
  },
];

export default function Footer() {
  const columns = FOOTER_COLUMNS;
  return (
    <footer className="relative mt-auto border-t-[3px] border-[var(--color-accent-gold)] bg-[var(--brand-navy-900)] text-[var(--brand-cream-50)]">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:px-8">
        <div>
          <Image
            src="/images/brand/logo.png"
            alt="Archbishop Tenison's CE High School crest"
            width={280}
            height={90}
            className="mb-4 h-14 w-auto sm:h-16"
          />
          <p className="font-body text-sm text-[var(--brand-cream-50)]/70">
            Archbishop Tenison&apos;s CE High School, Selborne Road, Croydon, CR0 5JQ
          </p>
          <p className="font-body mt-1 text-sm text-[var(--brand-cream-50)]/70">
            Tenaciter
          </p>

          <h4 className="font-body mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
            Contact Us
          </h4>
          <p className="font-body mt-4 text-sm text-[var(--brand-cream-50)]/70">
            Tel: 0208 688 4014
            <br />
            Email: reception@archten.croydon.sch.uk
          </p>
          <Link
            href="/contact"
            className={`font-body mt-4 inline-block rounded-full bg-[var(--brand-cream-50)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-navy-900)] transition-opacity hover:opacity-90 ${FOCUS_RING}`}
          >
            Contact us
          </Link>
        </div>

        <nav
          aria-label="Footer"
          className="grid gap-x-8 gap-y-10 sm:grid-cols-3"
        >
          {columns.map((col) => (
            <div key={col.label}>
              <h4 className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
                {col.href ? (
                  <Link href={col.href} className={`hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}>
                    {col.label}
                  </Link>
                ) : (
                  col.label
                )}
              </h4>
              <ul className="mt-4 space-y-2.5 font-body text-sm text-[var(--brand-cream-50)]/80">
                {col.items.map((item) => (
                  <li key={item.label + item.href}>
                    {item.newTab ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={`hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
              All pages
            </h4>
            <p className="font-body mt-4 text-sm text-[var(--brand-cream-50)]/80">
              <Link href="/site-index" className={`underline hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}>
                Site index &rarr;
              </Link>
            </p>
          </div>
        </nav>
      </div>

      <div className="relative border-t border-[var(--brand-cream-50)]/15 px-4 py-4 text-center font-body text-xs text-[var(--brand-cream-50)]/50 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Archbishop Tenison&apos;s CE High School.
        All rights reserved.
      </div>
    </footer>
  );
}
