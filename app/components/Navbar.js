"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";
import { NAV_LINKS, UTILITY_LINK } from "@/lib/nav-data";
import SearchOverlay, { MagnifierIcon } from "./SearchOverlay";

// Navy-on-navy default focus ring would be invisible here, so every
// interactive element in this navy-chrome header gets a gold ring instead.
const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-gold-300)]";

function isActive(pathname, href) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function MenuLink({ item, className, onClick }) {
  const props = item.newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  // PDFs and external pages are plain anchors; site pages use next/link.
  if (item.newTab) {
    return (
      <a href={item.href} className={className} onClick={onClick} {...props}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

function Chevron({ open }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DropdownPanel({ link, id, alignRight, onNavigate }) {
  const multi = link.sections.length > 1;
  return (
    <div
      id={id}
      className={`absolute top-full z-50 pt-2 ${alignRight ? "right-0" : "left-0"}`}
    >
      <div
        className={`max-h-[75vh] overflow-y-auto rounded-md border border-[var(--brand-cream-50)]/15 bg-[var(--brand-navy-900)] p-5 ${
          multi ? "grid w-[34rem] grid-cols-2 gap-8" : "w-72"
        }`}
      >
        {link.sections.map((section, i) => (
          <div key={section.heading || i}>
            {section.heading && (
              <p className="font-body mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
                {section.headingHref ? (
                  <Link
                    href={section.headingHref}
                    onClick={onNavigate}
                    className={`hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}
                  >
                    {section.heading}
                  </Link>
                ) : (
                  section.heading
                )}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.label + item.href}>
                  <MenuLink
                    item={item}
                    onClick={onNavigate}
                    className={`font-body block rounded px-2 py-1.5 text-sm text-[var(--brand-cream-50)]/80 hover:bg-[var(--brand-cream-50)]/10 hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopItem({ link, pathname, index, className }) {
  // Open on hover, or pinned open by the toggle button / keyboard.
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const open = hovered || pinned;
  const setOpen = (v) => {
    setHovered(v);
    setPinned(v);
  };
  const wrapRef = useRef(null);
  const toggleRef = useRef(null);
  const panelId = useId();
  const active = isActive(pathname, link.href);
  const hasMenu = Boolean(link.sections);

  const linkClass = `font-body whitespace-nowrap text-sm font-semibold pb-2 transition-colors ${FOCUS_RING} ${
    active
      ? "border-b-2 border-[var(--color-accent-gold)] text-[var(--brand-cream-50)]"
      : "border-b-2 border-transparent text-[var(--brand-cream-50)]/75 hover:text-[var(--brand-cream-50)]"
  }`;

  if (!hasMenu) {
    return (
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={className || linkClass}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      ref={wrapRef}
      className="relative flex items-start"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={className || linkClass}
      >
        {link.label}
      </Link>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`${link.label} menu`}
        onClick={() => (pinned ? setOpen(false) : setPinned(true))}
        className={`ml-1 rounded p-1 text-[var(--brand-cream-50)]/75 hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}
      >
        <Chevron open={open} />
      </button>
      {open && (
        <DropdownPanel
          link={link}
          id={panelId}
          alignRight={index >= 3}
          onNavigate={() => setOpen(false)}
        />
      )}
    </div>
  );
}

function MobileItem({ link, pathname, close }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const active = isActive(pathname, link.href);
  const rowClass = `font-body rounded px-2 py-2 text-sm font-semibold ${FOCUS_RING} ${
    active
      ? "bg-[var(--brand-cream-50)]/10 text-[var(--brand-cream-50)]"
      : "text-[var(--brand-cream-50)]/75 hover:bg-[var(--brand-cream-50)]/10"
  }`;

  if (!link.sections) {
    return (
      <Link
        href={link.href}
        onClick={close}
        aria-current={active ? "page" : undefined}
        className={rowClass}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <div className="flex items-center">
        <Link
          href={link.href}
          onClick={close}
          aria-current={active ? "page" : undefined}
          className={`${rowClass} flex-1`}
        >
          {link.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          aria-label={`${link.label} menu`}
          onClick={() => setOpen((v) => !v)}
          className={`rounded p-2 text-[var(--brand-cream-50)]/75 ${FOCUS_RING}`}
        >
          <Chevron open={open} />
        </button>
      </div>
      {open && (
        <div id={panelId} className="mb-2 ml-3 border-l border-[var(--brand-cream-50)]/15 pl-3">
          {link.sections.map((section, i) => (
            <div key={section.heading || i} className="mt-2">
              {section.heading && (
                <p className="font-body px-2 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-gold)]">
                  {section.heading}
                </p>
              )}
              <ul>
                {section.items.map((item) => (
                  <li key={item.label + item.href}>
                    <MenuLink
                      item={item}
                      onClick={close}
                      className={`font-body block rounded px-2 py-1.5 text-sm text-[var(--brand-cream-50)]/80 hover:bg-[var(--brand-cream-50)]/10 ${FOCUS_RING}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search"
      aria-haspopup="dialog"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--brand-cream-50)]/40 text-[var(--brand-cream-50)] transition-colors hover:border-[var(--brand-cream-50)] ${FOCUS_RING} ${className}`}
    >
      <MagnifierIcon className="h-[18px] w-[18px]" />
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[var(--brand-navy-900)] text-[var(--brand-cream-50)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className={`flex shrink-0 items-center gap-3 ${FOCUS_RING}`}>
          <Image
            src="/images/brand/logo.png"
            alt="Archbishop Tenison's CE High School crest"
            width={280}
            height={90}
            className="h-14 w-auto sm:h-16"
            priority
          />
        </Link>

        <nav aria-label="Main" className="hidden items-start gap-4 xl:flex">
          {NAV_LINKS.map((link, i) => (
            <DesktopItem key={link.href} link={link} pathname={pathname} index={i} />
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 xl:flex">
          <SearchButton onClick={() => setSearchOpen(true)} />
          <DesktopItem
            link={UTILITY_LINK}
            pathname={pathname}
            index={9}
            className={`font-body whitespace-nowrap pb-1 text-sm text-[var(--brand-cream-50)]/60 hover:text-[var(--brand-cream-50)] ${FOCUS_RING}`}
          />
          <Link
            href="/admissions"
            className={`font-body whitespace-nowrap rounded-full bg-[var(--brand-cream-50)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-navy-900)] transition-opacity hover:opacity-90 ${FOCUS_RING}`}
          >
            Book a visit
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <SearchButton onClick={() => setSearchOpen(true)} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`font-body rounded-full border border-[var(--brand-cream-50)]/40 px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-cream-50)] transition-colors hover:border-[var(--brand-cream-50)] ${FOCUS_RING}`}
            aria-expanded={open}
          >
            {open ? "Close" : "Explore"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-[var(--brand-cream-50)]/10 bg-[var(--brand-navy-900)] xl:hidden"
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <MobileItem
                key={link.href}
                link={link}
                pathname={pathname}
                close={() => setOpen(false)}
              />
            ))}
            <MobileItem
              link={UTILITY_LINK}
              pathname={pathname}
              close={() => setOpen(false)}
            />
            <Link
              href="/admissions"
              onClick={() => setOpen(false)}
              className={`font-body mt-2 rounded-full bg-[var(--brand-cream-50)] px-5 py-2.5 text-center text-sm font-semibold text-[var(--brand-navy-900)] ${FOCUS_RING}`}
            >
              Book a visit
            </Link>
          </div>
        </nav>
      )}

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
