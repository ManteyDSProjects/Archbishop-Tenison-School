// Crawls the running site (default http://localhost:3111) starting from every
// route, and reports internal links/assets that do not return 200.
// Usage: node scripts/check-links.mjs [baseUrl]
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const BASE = process.argv[2] || "http://localhost:3111";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slugs = fs.readdirSync(path.join(ROOT, "content/pages")).map((f) => "/" + f.replace(/\.md$/, ""));
const start = new Set(["/", "/about", "/admissions", "/christian-distinctiveness", "/contact", "/curriculum", "/news", "/parents", "/parents/letters", "/parents/policies", "/parents/term-dates", "/work-with-us", ...slugs]);
const seen = new Map();
const bad = [];
const queue = [...start];
const checkedAssets = new Map();

async function status(url) {
  if (checkedAssets.has(url)) return checkedAssets.get(url);
  let s;
  try { s = (await fetch(url, { method: "HEAD" })).status; } catch { s = 0; }
  checkedAssets.set(url, s);
  return s;
}

while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  const res = await fetch(BASE + p);
  seen.set(p, res.status);
  if (res.status !== 200) { bad.push(`${res.status} ${p}`); continue; }
  const $ = cheerio.load(await res.text());
  const refs = [];
  $("a[href]").each((_, a) => refs.push($(a).attr("href")));
  $("img[src]").each((_, a) => refs.push($(a).attr("src")));
  $("video[src]").each((_, a) => refs.push($(a).attr("src")));
  for (let href of refs) {
    if (!href || /^(https?:|mailto:|tel:|#|data:)/i.test(href)) continue;
    href = href.split("#")[0].split("?")[0];
    if (!href) continue;
    if (href.startsWith("/documents/") || href.startsWith("/images/") || href.startsWith("/_next/image")) {
      if (!href.startsWith("/_next/image")) {
        const s = await status(BASE + href);
        if (s !== 200) bad.push(`${s} ${href} (on ${p})`);
      }
    } else if (href.startsWith("/") && !seen.has(href)) queue.push(href);
  }
}
console.log(`crawled ${seen.size} pages, ${checkedAssets.size} assets`);
console.log(bad.length ? "BROKEN:\n" + [...new Set(bad)].join("\n") : "no broken internal links");
