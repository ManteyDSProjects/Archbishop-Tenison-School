// Extracts the text of every PDF in public/documents into data/pdf-text.json so
// site search can look inside documents. Only PDFs that are new or changed are
// read (the cache is committed), so this is quick on every build. It never fails
// the build: a PDF that cannot be read is simply left out of search.
//
// Usage: node scripts/extract-pdf-text.mjs        (also runs before `next build`)

import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS = path.join(ROOT, "public", "documents");
const CACHE = path.join(ROOT, "data", "pdf-text.json");
const MAX_CHARS = 60000;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.toLowerCase().endsWith(".pdf") ? [p] : [];
  });
}

function clean(text) {
  return (text || "")
    .replace(/\u0000/g, " ")
    .replace(/[​\s]+/g, " ")
    .trim()
    .slice(0, MAX_CHARS);
}

function viaPdftotext(file) {
  const r = spawnSync("pdftotext", ["-enc", "UTF-8", file, "-"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return r.error || r.status !== 0 ? null : r.stdout;
}

async function viaPdfParse(file) {
  const { default: pdf } = await import("pdf-parse/lib/pdf-parse.js");
  const data = await pdf(fs.readFileSync(file));
  return data.text;
}

async function main() {
  let cache = {};
  try {
    cache = JSON.parse(fs.readFileSync(CACHE, "utf8"));
  } catch {}

  const files = walk(DOCS);
  const keep = new Set();
  let added = 0;
  let failed = 0;

  for (const file of files) {
    const key = path.relative(path.join(ROOT, "public"), file).split(path.sep).join("/");
    keep.add(key);
    const size = fs.statSync(file).size;
    if (cache[key] && cache[key].size === size) continue;
    try {
      const raw = viaPdftotext(file) ?? (await viaPdfParse(file));
      cache[key] = { size, text: clean(raw) };
      added += 1;
    } catch (err) {
      failed += 1;
      console.log(`pdf text: skipped ${key} (${String(err.message).split("\n")[0]})`);
    }
  }

  for (const key of Object.keys(cache)) if (!keep.has(key)) delete cache[key];

  const sorted = Object.fromEntries(Object.entries(cache).sort(([a], [b]) => a.localeCompare(b)));
  fs.mkdirSync(path.dirname(CACHE), { recursive: true });
  fs.writeFileSync(CACHE, JSON.stringify(sorted));
  const withText = Object.values(sorted).filter((v) => v.text.length > 50).length;
  console.log(`pdf text: ${files.length} PDFs, ${added} newly read, ${failed} failed, ${withText} with searchable text`);
}

main().catch((err) => {
  console.log(`pdf text: extraction skipped (${err.message})`);
});
