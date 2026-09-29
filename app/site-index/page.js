import Link from "next/link";
import HeroBanner from "../components/HeroBanner";
import { getAllPages } from "@/lib/content";
import { MENU_SECTIONS } from "@/lib/nav-data";

export const metadata = {
  title: "Site Index | Archbishop Tenison's CE High School",
};

function columns() {
  const linked = new Set(
    MENU_SECTIONS.flatMap((s) => [s.href, ...s.items.map((i) => i.href)])
  );
  const more = getAllPages()
    .filter((p) => !linked.has("/" + p.slug))
    .map((p) => ({ label: p.title, href: "/" + p.slug }));
  const cols = MENU_SECTIONS.map((s) => ({ label: s.label, href: s.href, items: s.items }));
  return more.length ? [...cols, { label: "More", items: more }] : cols;
}

const LINK =
  "hover:text-[var(--color-accent-primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-primary)]";

export default function SiteIndexPage() {
  return (
    <>
      <HeroBanner compact eyebrow="Archbishop Tenison's" title="Site Index" />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {columns().map((col) => (
            <div key={col.label}>
              <h2 className="font-display text-xl font-medium text-[var(--color-text-primary)]">
                {col.href ? (
                  <Link href={col.href} className={LINK}>
                    {col.label}
                  </Link>
                ) : (
                  col.label
                )}
              </h2>
              <ul className="font-body mt-4 space-y-2 text-sm text-[var(--color-text-secondary)]">
                {col.items.map((item) => (
                  <li key={item.label + item.href}>
                    {item.newTab ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className={LINK}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
