"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

function Arrow({ direction, onClick }) {
  const left = direction === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      aria-hidden="true"
      style={{
        backgroundImage: `linear-gradient(to ${left ? "right" : "left"}, var(--color-bg-primary) 55%, transparent)`,
      }}
      className={`absolute top-0 z-10 flex h-[38px] w-14 items-center ${left ? "left-0 justify-start" : "right-0 justify-end"}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-accent-primary)] bg-[var(--color-bg-primary)] text-[var(--color-accent-primary)] transition-colors hover:bg-[var(--color-accent-primary)] hover:text-[var(--color-text-inverse)]">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d={left ? "M12 4l-6 6 6 6" : "M8 4l6 6-6 6"} />
        </svg>
      </span>
    </button>
  );
}

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
  const rowRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update]);

  function scrollByDir(dir) {
    const el = rowRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  }

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
    <div className="relative">
      {canLeft && <Arrow direction="left" onClick={() => scrollByDir(-1)} />}
      {canRight && <Arrow direction="right" onClick={() => scrollByDir(1)} />}
    <div
      ref={rowRef}
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
    </div>
  );
}
