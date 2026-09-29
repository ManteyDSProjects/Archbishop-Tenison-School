import {
  getAllCurriculum,
  getAllLetters,
  getAllNews,
  getAllPages,
  getAllPolicies,
  getTermDates,
} from "@/lib/content";

// Built once at build time and served as /search-index.json. Search itself
// runs in the visitor's browser, so there is no search service and no server
// cost per query.

const MAX_TEXT = 12000;

function plain(markdown) {
  return (markdown || "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/^::.*$/gm, " ")
    .replace(/[*_`>#]/g, "")
    .replace(/[​\s]+/g, " ")
    .trim()
    .slice(0, MAX_TEXT);
}

// Pages that are written in code rather than in content/pages.
const CODED_PAGES = [
  { title: "About Us", href: "/about", section: "About Us" },
  { title: "Admissions", href: "/admissions", section: "Admissions" },
  { title: "Christian Distinctiveness", href: "/christian-distinctiveness", section: "Christian Distinctiveness" },
  { title: "Contact Us", href: "/contact", section: "Contact" },
  { title: "Curriculum", href: "/curriculum", section: "Curriculum" },
  { title: "Information", href: "/parents", section: "Parents" },
  { title: "Letters Home", href: "/parents/letters", section: "Parents" },
  { title: "Policies", href: "/parents/policies", section: "Parents" },
  { title: "Staff Recruitment", href: "/work-with-us", section: "Work with us" },
  { title: "News", href: "/news", section: "News" },
  { title: "Site Index", href: "/site-index", section: "All pages" },
];

export function buildSearchIndex() {
  const entries = [];

  for (const p of CODED_PAGES) {
    entries.push({ type: "Pages", title: p.title, section: p.section, href: p.href, text: "" });
  }

  const dates = getTermDates();
  entries.push({
    type: "Pages",
    title: "Term Dates",
    section: "Parents",
    href: "/parents/term-dates",
    text: dates.map((d) => `${d.term} ${d.range}`).join(". "),
  });

  for (const page of getAllPages()) {
    entries.push({
      type: "Pages",
      title: page.title,
      section: page.section || "",
      href: `/${page.slug}`,
      text: plain(page.content),
    });
  }

  for (const s of getAllCurriculum()) {
    entries.push({
      type: "Curriculum",
      title: s.title,
      section: (s.keyStage || []).join(" · ") || "Curriculum",
      href: `/curriculum/${s.slug}`,
      text: plain(s.content),
    });
  }

  for (const p of getAllPolicies()) {
    entries.push({
      type: "Policies",
      title: p.title,
      section: "Policy · PDF",
      href: p.documentHref,
      newTab: true,
      text: p.category || "",
    });
  }

  for (const l of getAllLetters()) {
    entries.push({
      type: "Letters",
      title: l.title,
      section: `${l.yearGroup} · PDF`,
      href: l.documentHref,
      newTab: true,
      text: l.yearGroup || "",
    });
  }

  for (const n of getAllNews()) {
    entries.push({
      type: "News",
      title: n.title,
      section: "News",
      href: n.href || `/news/${n.slug}`,
      newTab: Boolean(n.newTab),
      text: plain(n.content),
    });
  }

  return entries;
}
