import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

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
      return { slug, ...data, content };
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
