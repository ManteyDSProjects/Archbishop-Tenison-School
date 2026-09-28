"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/admissions", label: "Admissions" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/parents", label: "Parents" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

const UTILITY_LINK = { href: "/work-with-us", label: "Work with us" };

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--brand-navy-900)] text-[var(--brand-cream-50)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/images/brand/logo.png"
            alt="Archbishop Tenison's CE High School crest"
            width={280}
            height={90}
            className="h-14 w-auto sm:h-16"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`font-body text-sm font-semibold pb-2 transition-colors ${
                  active
                    ? "border-b-2 border-[var(--color-accent-gold)] text-[var(--brand-cream-50)]"
                    : "border-b-2 border-transparent text-[var(--brand-cream-50)]/75 hover:text-[var(--brand-cream-50)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href={UTILITY_LINK.href}
            className="font-body text-sm text-[var(--brand-cream-50)]/60 hover:text-[var(--brand-cream-50)]"
          >
            {UTILITY_LINK.label}
          </Link>
          <Link
            href="/admissions"
            className="font-body rounded-full bg-[var(--brand-cream-50)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-navy-900)] transition-opacity hover:opacity-90"
          >
            Book a visit
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-[var(--brand-cream-50)]/10 bg-[var(--brand-navy-900)] lg:hidden">
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`font-body rounded px-2 py-2 text-sm font-semibold ${
                    active
                      ? "bg-[var(--brand-cream-50)]/10 text-[var(--brand-cream-50)]"
                      : "text-[var(--brand-cream-50)]/75 hover:bg-[var(--brand-cream-50)]/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={UTILITY_LINK.href}
              onClick={() => setOpen(false)}
              className="font-body rounded px-2 py-2 text-sm text-[var(--brand-cream-50)]/60 hover:bg-[var(--brand-cream-50)]/10"
            >
              {UTILITY_LINK.label}
            </Link>
            <Link
              href="/admissions"
              onClick={() => setOpen(false)}
              className="font-body mt-2 rounded-full bg-[var(--brand-cream-50)] px-5 py-2.5 text-center text-sm font-semibold text-[var(--brand-navy-900)]"
            >
              Book a visit
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
