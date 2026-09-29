"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchIndex } from "@/lib/use-search-index";
import {
  OFFICE_PHONE,
  POPULAR,
  SUGGESTIONS,
  groupResults,
  highlightParts,
  runSearch,
} from "@/lib/search";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]";
const MAX_PER_GROUP = 4;

export function Highlight({ text, query }) {
  return highlightParts(text, query).map((part, i) =>
    part.match ? (
      <strong key={i} className="font-semibold text-[var(--color-text-primary)]">
        {part.text}
      </strong>
    ) : (
      <span key={i}>{part.text}</span>
    )
  );
}

export function MagnifierIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

export default function SearchOverlay({ open, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);
  const returnFocus = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const { index, error } = useSearchIndex(open);

  const grouped = useMemo(() => {
    if (!index || !query.trim()) return [];
    return groupResults(runSearch(index, query)).map((g) => {
      const seen = new Set();
      const unique = g.items.filter((item) => {
        const key = item.title.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      return { ...g, shown: unique.slice(0, MAX_PER_GROUP) };
    });
  }, [index, query]);

  const offsets = useMemo(
    () => grouped.map((_, i) => grouped.slice(0, i).reduce((sum, g) => sum + g.shown.length, 0)),
    [grouped]
  );

  const flat = useMemo(() => grouped.flatMap((g) => g.shown), [grouped]);
  const total = useMemo(() => grouped.reduce((n, g) => n + g.items.length, 0), [grouped]);
  const searching = query.trim().length > 0;

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = previous;
      returnFocus.current?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  function updateQuery(value) {
    setQuery(value);
    setActive(-1);
  }

  function close() {
    updateQuery("");
    onClose();
  }

  function submit() {
    const q = query.trim();
    if (active >= 0 && flat[active]) {
      const item = flat[active];
      if (item.newTab) window.open(item.href, "_blank", "noopener");
      else router.push(item.href);
      close();
      return;
    }
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      close();
    }
  }

  function onKeyDown(e) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown" && flat.length) {
      e.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (e.key === "ArrowUp" && flat.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? flat.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the school website"
      className="fixed inset-0 z-[70] overflow-y-auto bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]"
      onKeyDown={onKeyDown}
    >
      <div className="border-b border-[var(--color-border-primary)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            onClick={close}
            className={`shrink-0 rounded-md bg-[var(--brand-navy-900)] px-2 py-1 ${FOCUS}`}
          >
            <Image
              src="/images/brand/logo.png"
              alt="Archbishop Tenison's CE High School crest"
              width={280}
              height={90}
              className="h-11 w-auto sm:h-12"
            />
          </Link>
          <button
            type="button"
            onClick={close}
            className={`font-body rounded-full border border-[var(--brand-navy-900)] px-5 py-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--brand-navy-900)] transition-colors hover:bg-[var(--brand-navy-900)] hover:text-[var(--brand-cream-50)] ${FOCUS}`}
          >
            Close
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6 sm:pt-16">
        <div className="flex items-center gap-3 border-b-2 border-[var(--color-accent-gold)] pb-3">
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={searching && flat.length > 0}
            aria-controls="search-overlay-results"
            aria-activedescendant={active >= 0 ? `search-option-${active}` : undefined}
            aria-label="Search the school website"
            autoComplete="off"
            spellCheck="false"
            value={query}
            onChange={(e) => updateQuery(e.target.value)}
            placeholder="Search the website"
            className="font-display min-w-0 flex-1 bg-transparent text-3xl font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none sm:text-5xl"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                updateQuery("");
                inputRef.current?.focus();
              }}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border-primary)] text-[var(--color-text-secondary)] ${FOCUS}`}
            >
              <span aria-hidden="true">×</span>
            </button>
          )}
          <button
            type="button"
            aria-label="Search"
            onClick={submit}
            className={`shrink-0 text-[var(--brand-navy-900)] ${FOCUS}`}
          >
            <MagnifierIcon className="h-6 w-6" />
          </button>
        </div>

        {!searching && (
          <section className="mt-10">
            <h2 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-gold)]">
              Popular
            </h2>
            <ul className="mt-4 divide-y divide-[var(--color-border-primary)]">
              {POPULAR.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    onClick={close}
                    className={`font-body block py-3 text-lg text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] ${FOCUS}`}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {searching && error && (
          <p className="font-body mt-10 text-[var(--color-text-secondary)]">
            Search could not load just now. Please try again, or call the school office on{" "}
            <a href="tel:02086884014" className="underline">
              {OFFICE_PHONE}
            </a>
            .
          </p>
        )}

        {searching && !error && !index && (
          <p className="font-body mt-10 text-[var(--color-text-tertiary)]" role="status">
            Loading…
          </p>
        )}

        {searching && index && total === 0 && (
          <section className="mt-10" aria-live="polite">
            <p className="font-display text-2xl font-medium sm:text-3xl">
              Sorry, no results matched &ldquo;{query.trim()}&rdquo;
            </p>
            <h2 className="font-body mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-gold)]">
              Try searching for
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    updateQuery(s);
                    inputRef.current?.focus();
                  }}
                  className={`font-body rounded-full border border-[var(--color-border-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] ${FOCUS}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        )}

        {searching && index && total > 0 && (
          <div id="search-overlay-results" role="listbox" aria-label="Search results" className="mt-8">
            {grouped.map((g, gi) => (
              <section key={g.group} className="mb-8">
                <h2 className="font-display text-xl font-medium">{g.group}</h2>
                <ul className="mt-2 divide-y divide-[var(--color-border-primary)]">
                  {g.shown.map((item, ii) => {
                    const i = offsets[gi] + ii;
                    const isActive = i === active;
                    const content = (
                      <>
                        <span className="font-body block text-lg leading-snug text-[var(--color-text-secondary)]">
                          <Highlight text={item.title} query={query} />
                        </span>
                        <span className="font-body mt-0.5 block text-xs text-[var(--color-text-tertiary)]">
                          {item.section || item.type.replace(/s$/, "")}
                        </span>
                      </>
                    );
                    const cls = `block py-3 ${isActive ? "bg-[var(--color-bg-tertiary)]" : ""} ${FOCUS}`;
                    return (
                      <li key={item.id} role="option" id={`search-option-${i}`} aria-selected={isActive}>
                        {item.newTab ? (
                          <a href={item.href} target="_blank" rel="noopener noreferrer" onClick={close} className={cls}>
                            {content}
                          </a>
                        ) : (
                          <Link href={item.href} onClick={close} className={cls}>
                            {content}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

            <p className="font-body text-base">
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={close}
                className={`text-[var(--color-text-primary)] underline ${FOCUS}`}
              >
                Press Enter to see all {total} results for &ldquo;
                <strong className="font-semibold">{query.trim()}</strong>&rdquo;
              </Link>
            </p>
            <p className="font-body mt-2 text-sm text-[var(--color-text-secondary)]">
              Can&apos;t find what you&apos;re looking for? Call the school office on{" "}
              <a href="tel:02086884014" className="underline">
                {OFFICE_PHONE}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
