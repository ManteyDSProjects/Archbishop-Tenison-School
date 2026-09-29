import fs from "fs";
import path from "path";
import { MENU_SECTIONS } from "@/lib/nav-data";
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

// ---------------------------------------------------------------------------
// Documents index: the text inside every PDF, served as /search-documents.json
// and loaded only when someone searches. Text comes from data/pdf-text.json,
// which scripts/extract-pdf-text.mjs keeps up to date before each build.

function humanise(file) {
  return file
    .replace(/\.pdf$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/ click here/i, "")
    .replace(/ [0-9a-f]{6}$/i, "")
    .replace(/\b3094c8 [0-9a-f]+\b/i, "Document")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

// The label a PDF is linked with on the site, where there is one.
function documentLabels() {
  const labels = new Map();
  const set = (href, label) => {
    const text = (label || "")
      .replace(/\s*[-–:]?\s*click here( to (download|view))?\s*$/i, "")
      .replace(/\s+/g, " ")
      .trim();
    if (href && text && !/^(click )?here\W*$/i.test(text) && !/^click here/i.test(text) && !labels.has(href)) labels.set(href, text);
  };

  for (const page of getAllPages()) {
    for (const m of (page.content || "").matchAll(/\[([^\]]+)\]\((\/documents\/[^)\s]+\.pdf)\)/gi)) {
      set(m[2], m[1].replace(/[*_]/g, ""));
    }
  }

  for (const section of MENU_SECTIONS) {
    for (const item of section.items) {
      if (item.href && item.href.toLowerCase().endsWith(".pdf")) set(item.href, item.label);
    }
  }

  for (const file of ["app/admissions/page.js", "app/work-with-us/page.js"]) {
    let source = "";
    try {
      source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    } catch {}
    for (const m of source.matchAll(/<PDFLink\s+href="(\/documents\/[^"]+\.pdf)">\s*([^<{]+?)\s*<\/PDFLink>/g)) {
      set(m[1], m[2]);
    }
    for (const m of source.matchAll(/label:\s*"([^"]+)",\s*href:\s*"(\/documents\/[^"]+\.pdf)"/g)) {
      set(m[2], m[1]);
    }
  }

  return labels;
}

export function buildDocumentsIndex() {
  let cache = {};
  try {
    cache = JSON.parse(fs.readFileSync(path.join(process.cwd(), "data", "pdf-text.json"), "utf8"));
  } catch {}

  const labels = documentLabels();
  return Object.entries(cache)
    .filter(([, v]) => v.text && v.text.length > 30)
    .map(([key, v]) => {
      const href = `/${key}`;
      return {
        href,
        title: labels.get(href) || humanise(key.split("/").pop()),
        text: v.text,
      };
    });
}
