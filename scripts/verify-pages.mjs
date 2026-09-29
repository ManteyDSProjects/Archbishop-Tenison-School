// Verbatim check: every body line of each crawled .txt must appear in the
// text rendered from the generated content/pages/<slug>.md (frontmatter
// title included). Usage: node scripts/verify-pages.mjs
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TXT = path.resolve(ROOT, "../01-Discovery/Assets-Received/Live-Site-Content/pages-text");
const DIR = path.join(ROOT, "content", "pages");

const norm = (s) =>
  s.replace(/[\u200b\u200c\u200d\u2060\ufeff]/g, "").replace(/[\u00a0\s]+/g, " ").trim();

let bad = 0;
for (const f of fs.readdirSync(DIR).filter((f) => f.endsWith(".md"))) {
  const slug = f.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(DIR, f), "utf8"));
  const html = marked.parse(content.replace(/^::youtube\[[^\]]+\]$/gm, ""));
  const $ = cheerio.load(`<div id="r">${html}</div>`);
  $("br").replaceWith(" ");
  $("p,li,h1,h2,h3,h4,div,ul,ol").each((_, e) => $(e).append(" "));
  const flat = norm(data.title + " " + $("#r").text()).replace(/ /g, "");

  const lines = fs.readFileSync(path.join(TXT, slug + ".txt"), "utf8").split(/\r?\n/);
  const sdbe = lines.findIndex((l, i) => i > 30 && l.trim() === "SDBE");
  const start = sdbe >= 0 ? sdbe + 2 : 0; // SDBE, SIAMS end the menu
  let end = lines.length;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim() === "Contact Us" && /^Tel:/.test(lines[i + 1] || "")) { end = i; break; }
  }
  const missing = lines.slice(start, end).map(norm).filter(Boolean).map((l) => l.replace(/ /g, "")).filter((l) => !flat.includes(l));
  if (missing.length) {
    bad++;
    console.log(`FAIL ${slug}: ${missing.length} missing`);
    missing.slice(0, 6).forEach((l) => console.log("   -", l.slice(0, 110)));
  }
}
console.log(bad ? `${bad} page(s) failed` : "ALL PAGES VERBATIM OK");
