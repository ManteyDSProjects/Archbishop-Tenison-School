import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t-[3px] border-[var(--color-accent-gold)] bg-[var(--brand-navy-900)] text-[var(--brand-cream-50)]">
      <Image
        src="/images/brand/crest-watermark.png"
        alt=""
        aria-hidden="true"
        width={340}
        height={400}
        className="pointer-events-none absolute -bottom-16 -right-12 h-[340px] w-auto opacity-[0.08] invert"
      />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/images/brand/logo.png"
            alt="Archbishop Tenison's CE High School crest"
            width={120}
            height={40}
            className="mb-4 h-9 w-auto"
          />
          <p className="font-body text-sm text-[var(--brand-cream-50)]/70">
            Selborne Road, Croydon, CR0 5JQ
          </p>
          <p className="font-body mt-1 text-sm text-[var(--brand-cream-50)]/70">
            Tenaciter — steadfastly
          </p>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
            For parents
          </h4>
          <ul className="mt-4 space-y-2.5 font-body text-sm text-[var(--brand-cream-50)]/80">
            <li>
              <Link href="/parents/letters" className="hover:text-[var(--brand-cream-50)]">
                Letters Home
              </Link>
            </li>
            <li>
              <Link href="/parents/term-dates" className="hover:text-[var(--brand-cream-50)]">
                Term Dates
              </Link>
            </li>
            <li>
              <Link href="/parents/policies" className="hover:text-[var(--brand-cream-50)]">
                Policies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
            School
          </h4>
          <ul className="mt-4 space-y-2.5 font-body text-sm text-[var(--brand-cream-50)]/80">
            <li>
              <Link href="/curriculum" className="hover:text-[var(--brand-cream-50)]">
                Curriculum
              </Link>
            </li>
            <li>
              <Link href="/admissions" className="hover:text-[var(--brand-cream-50)]">
                Admissions
              </Link>
            </li>
            <li>
              <Link href="/work-with-us" className="hover:text-[var(--brand-cream-50)]">
                Vacancies
              </Link>
            </li>
            <li>
              <Link
                href="/christian-distinctiveness"
                className="hover:text-[var(--brand-cream-50)]"
              >
                Christian Distinctiveness
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
            Stay in touch
          </h4>
          <p className="font-body mt-4 text-sm text-[var(--brand-cream-50)]/70">
            0208 688 4014
            <br />
            reception@archten.croydon.sch.uk
          </p>
          <Link
            href="/contact"
            className="font-body mt-4 inline-block rounded-full bg-[var(--brand-cream-50)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-navy-900)] transition-opacity hover:opacity-90"
          >
            Contact us
          </Link>
        </div>
      </div>

      <div className="relative border-t border-[var(--brand-cream-50)]/15 px-4 py-4 text-center font-body text-xs text-[var(--brand-cream-50)]/50 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Archbishop Tenison&apos;s CE High School.
        All rights reserved.
      </div>
    </footer>
  );
}
