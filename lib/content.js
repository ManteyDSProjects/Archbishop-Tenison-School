import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

// gray-matter/YAML auto-parses unquoted datetime frontmatter values (e.g.
// `date: 2026-09-28`) into JS Date objects. Left as-is, interpolating one
// into JSX renders the full Date#toString() output ("Mon Sep 28 2026
// 01:00:00 GMT+0100 (British Summer Time)") instead of a clean date.
// Normalize every Date value back to a plain YYYY-MM-DD string here, once,
// so every page that reads content gets a display-ready string.
function normalizeDates(data) {
  const out = {};
  for (const [key, value] of Object.entries(data)) {
    out[key] = value instanceof Date ? value.toISOString().slice(0, 10) : value;
  }
  return out;
}

function readCollection(collection) {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, ...normalizeDates(data), content };
    });
}

export function getAllNews() {
  return readCollection("news").sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

export function getNewsBySlug(slug) {
  return getAllNews().find((item) => item.slug === slug);
}

export function getAllVacancies() {
  return readCollection("vacancies");
}

export function isVacancyOpen(vacancy) {
  if (!vacancy.closingDate) return true;
  const closing = new Date(vacancy.closingDate);
  if (Number.isNaN(closing.getTime())) return true;
  // closing date is inclusive of the whole day
  closing.setHours(23, 59, 59, 999);
  return closing.getTime() >= Date.now();
}

export function getOpenVacancies() {
  return getAllVacancies().filter(isVacancyOpen);
}

export function getAllStaff() {
  return readCollection("staff");
}

export function getTermDates() {
  const file = path.join(CONTENT_DIR, "settings", "term-dates.md");
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  return data.dates || [];
}

export function getGovernors() {
  const file = path.join(CONTENT_DIR, "settings", "governors.md");
  if (!fs.existsSync(file)) return [];
  const raw = fs.readFileSync(file, "utf8");
  const { data } = matter(raw);
  return data.governors || [];
}

export function getAllCurriculum() {
  return readCollection("curriculum").sort((a, b) =>
    (a.title || "").localeCompare(b.title || "")
  );
}

export function getCurriculumBySlug(slug) {
  return getAllCurriculum().find((item) => item.slug === slug);
}

export function getAllLetters() {
  return readCollection("letters").sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

export function getAllPolicies() {
  return readCollection("policies").sort(
    (a, b) => new Date(b.lastReviewed) - new Date(a.lastReviewed)
  );
}
