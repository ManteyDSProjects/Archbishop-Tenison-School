"use client";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * Shared filter-chip row, driven by a URL query param so filtered views
 * stay shareable/bookmarkable (per INFORMATION_ARCHITECTURE.md's URL
 * strategy). Renders as a horizontally scrollable row rather than a
 * dropdown, so it doesn't stack into a "dropdown wall" on mobile when a
 * page needs more than one FilterBar (e.g. year group + category).
 *
 * @param {string} paramName - the query param this bar reads/writes, e.g. "year"
 * @param {{ value: string, label: string }[]} options
 * @param {string} [allLabel] - label for the "no filter" chip; omit to hide it
 */
export default function FilterBar({ paramName, options, allLabel = "All" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get(paramName) ?? "";

  function setFilter(value) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(paramName, value);
    } else {
      params.delete(paramName);
    }
    const query = params.toString();
    router.push(query ? `?${query}` : "?", { scroll: false });
  }

  const chips = allLabel
    ? [{ value: "", label: allLabel }, ...options]
    : options;

  return (
    <div
      role="group"
      aria-label="Filter"
      className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {chips.map((chip) => {
        const isActive = chip.value === active;
        return (
          <button
            key={chip.value || "all"}
            type="button"
            onClick={() => setFilter(chip.value)}
            aria-pressed={isActive}
            className={`font-body shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "border-[var(--color-accent-primary)] bg-[var(--color-accent-primary)] text-[var(--color-text-inverse)]"
                : "border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
