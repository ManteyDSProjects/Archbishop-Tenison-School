"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSearchIndex } from "@/lib/use-search-index";
import { GROUPS, OFFICE_PHONE, POPULAR, SUGGESTIONS, runSearch, snippet, textMatches } from "@/lib/search";
import { Highlight, MagnifierIcon } from "./SearchOverlay";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]";
const CHIP =
  "font-body shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors";
const CHIP_ON = "border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]";
const CHIP_OFF =
  "border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]";

export default function SearchResults() {
  const router = useRouter();
  const params = useSearchParams();
  const q = (params.get("q") || "").trim();
  const type = GROUPS.includes(params.get("type")) ? params.get("type") : "";
  const [draft, setDraft] = useState(q);
  const [syncedQ, setSyncedQ] = useState(q);
  const { index, error, docsLoading } = useSearchIndex(true, true);

  // Keep the box in step with the address (back/forward, suggestion chips).
  if (syncedQ !== q) {
    setSyncedQ(q);
    setDraft(q);
  }

  const results = useMemo(() => (index && q ? runSearch(index, q) : []), [index, q]);
  const counts = useMemo(() => {
    const c = {};
    for (const r of results) c[r.type] = (c[r.type] || 0) + 1;
    return c;
  }, [results]);
  const shown = type ? results.filter((r) => r.type === type) : results;

  function go(nextQ, nextType) {
    const sp = new URLSearchParams();
    if (nextQ) sp.set("q", nextQ);
    if (nextType) sp.set("type", nextType);
    router.push(`/search${sp.toString() ? `?${sp}` : ""}`);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          go(draft.trim(), "");
        }}
        className="flex items-center gap-2 border border-[var(--color-border-primary)] p-2 focus-within:border-[var(--color-border-focus)]"
      >
        <label htmlFor="search-page-input" className="sr-only">
          Search the school website
        </label>
        <input
          id="search-page-input"
          type="search"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Search the website"
          autoComplete="off"
          className="font-body min-w-0 flex-1 bg-transparent px-3 py-2 text-base text-[var(--color-text-primary)] focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-navy-900)] text-[var(--brand-cream-50)] ${FOCUS}`}
        >
          <MagnifierIcon className="h-5 w-5" />
        </button>
      </form>

      {!q && (
        <div className="mt-10">
          <h2 className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-gold)]">
            Popular
          </h2>
          <ul className="mt-4 divide-y divide-[var(--color-border-primary)]">
            {POPULAR.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={`font-body block py-3 text-lg text-[var(--color-text-primary)] hover:text-[var(--color-accent-primary)] ${FOCUS}`}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {q && error && (
        <p className="font-body mt-10 text-[var(--color-text-secondary)]">
          Search could not load just now. Please try again, or call the school office on{" "}
          <a href="tel:02086884014" className="underline">
            {OFFICE_PHONE}
          </a>
          .
        </p>
      )}

      {q && !error && !index && (
        <p className="font-body mt-10 text-[var(--color-text-tertiary)]" role="status">
          Loading…
        </p>
      )}

      {q && index && results.length > 0 && (
        <>
          <div role="group" aria-label="Filter by type" className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={!type}
              onClick={() => go(q, "")}
              className={`${CHIP} ${!type ? CHIP_ON : CHIP_OFF}`}
            >
              All ({results.length})
            </button>
            {GROUPS.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={type === g}
                onClick={() => go(q, g)}
                className={`${CHIP} ${type === g ? CHIP_ON : CHIP_OFF}`}
              >
                {g} ({counts[g] || 0})
              </button>
            ))}
          </div>

          <p className="font-body mt-6 text-sm text-[var(--color-text-secondary)]" aria-live="polite">
            <strong className="font-semibold text-[var(--color-text-primary)]">{shown.length}</strong>{" "}
            {shown.length === 1 ? "result" : "results"} for &ldquo;
            <strong className="font-semibold text-[var(--color-text-primary)]">{q}</strong>&rdquo;
            {docsLoading && (
              <span className="text-[var(--color-text-tertiary)]"> · Searching inside documents…</span>
            )}
          </p>

          {shown.length === 0 ? (
            <p className="font-body mt-8 text-[var(--color-text-secondary)]">
              No {type.toLowerCase()} match &ldquo;{q}&rdquo;.{" "}
              <button type="button" onClick={() => go(q, "")} className="underline">
                Show all results
              </button>
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-[var(--color-border-primary)] border-b border-[var(--color-border-primary)]">
              {shown.map((item) => {
                const excerpt = textMatches(item.text, q) ? snippet(item.text, q) : "";
                const content = (
                  <>
                    <span className="font-body block text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                      {item.section || item.type}
                    </span>
                    <span className="font-display mt-1 block text-lg font-medium leading-snug text-[var(--color-text-secondary)]">
                      <Highlight text={item.title} query={q} />
                    </span>
                    {excerpt && (
                      <span className="font-body mt-1 block text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        <Highlight text={excerpt} query={q} />
                      </span>
                    )}
                  </>
                );
                const cls = `block py-5 hover:bg-[var(--color-bg-tertiary)] ${FOCUS}`;
                return (
                  <li key={item.id}>
                    {item.newTab ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {content}
                      </a>
                    ) : (
                      <Link href={item.href} className={cls}>
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      {q && index && results.length === 0 && (
        <div className="mt-10" aria-live="polite">
          <p className="font-display text-2xl font-medium text-[var(--color-text-primary)] sm:text-3xl">
            Sorry, no results matched &ldquo;{q}&rdquo;
          </p>
          <h2 className="font-body mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-gold)]">
            Try searching for
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <Link key={s} href={`/search?q=${encodeURIComponent(s)}`} className={`${CHIP} ${CHIP_OFF} ${FOCUS}`}>
                {s}
              </Link>
            ))}
          </div>
          <p className="font-body mt-8 text-sm text-[var(--color-text-secondary)]">
            Can&apos;t find what you&apos;re looking for? Call the school office on{" "}
            <a href="tel:02086884014" className="underline">
              {OFFICE_PHONE}
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
