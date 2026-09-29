// Extracts the main body of crawled Wix pages into content/pages/<slug>.md.
//
// Usage: node scripts/extract-pages.mjs            (all pages listed in PAGES)
//        node scripts/extract-pages.mjs slug ...   (only these)
//
// Copy is carried over verbatim: this script only converts markup to
// markdown. It never writes or edits wording. Linked PDFs are copied into
// public/documents/pages/, page images into public/images/pages/. A report of
// links/images that could not be wired is written to scripts/extract-report.json.

import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp"; // ships with next; used to downsize page photos

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC = path.resolve(
  ROOT,
  "../01-Discovery/Assets-Received/Live-Site-Content"
);
const PAGES_DIR = path.join(SRC, "pages");
const DOCS_DIR = path.join(SRC, "documents");
const PHOTO_DIR = path.join(SRC, "Photography");
const OUT_DIR = path.join(ROOT, "content", "pages");
const OUT_DOCS = path.join(ROOT, "public", "documents", "pages");
const OUT_IMGS = path.join(ROOT, "public", "images", "pages");

// old slug -> section label (the original menu group the page sits under)
export const PAGES = {
  "ethos-and-aims": "About Us",
  alumni: "About Us",
  ourgovernors: "About Us",
  dataprotection: "About Us",
  "development-trust": "About Us",
  vision312x: "About Us",
  vision312: "About Us",
  tenacioustogether: "About Us",
  academicresults: "Information",
  careers: "Information",
  schooltrips: "Information",
  "pupil-premium": "Information",
  schoolmeals: "Information",
  schooluniform: "Information",
  youngcarers: "Information",
  ourcurriculum: "Curriculum",
  extracurricular: "Curriculum",
  "file-share": "Curriculum",
  homeworkinformation: "Curriculum",
  "copy-of-sixth-form-subject-overview": "Curriculum",
  "school-services": "School Services",
  "teacher-training": "Staff Recruitment",
  welcomeinformation2026: "Admissions",
  applicationsforyear72027: "Admissions",
  "inyearapplicationsyears7-11": "Admissions",
  "sixth-form-admissions": "Admissions",
  appeals: "Admissions",
  chaplaincy: "Christian Distinctiveness",
  collectiveworship: "Christian Distinctiveness",
  courageousadvocacy: "Christian Distinctiveness",
  spirituality: "Christian Distinctiveness",
  // pages that exist on the old site but are not in its menu
  careersskills: "",
  dofe: "",
  "pastoral-studies": "",
  geography: "",
  applicationsforyear72025: "",
  "copy-of-admissions": "",
  "copy-of-welcome-information-for-year": "",
  sixthformsubjectoverviews: "",
  year7subjectoverviews: "",
  yeargrouppresentations: "",
  informationeveningsautumn2023: "",
  "sixth-form-subject-presentations": "",
  "welcome-video": "",
};

// old slug -> route in the new build, for pages built elsewhere
const BUILT_ELSEWHERE = {
  home: "/",
  aboutus: "/about",
  admissions: "/admissions",
  christiandistinctiveness: "/christian-distinctiveness",
  "contact-us": "/contact",
  curriculum: "/curriculum",
  lettershome: "/parents/letters",
  wholeschoolletters: "/parents/letters",
  year7letters: "/parents/letters",
  year8: "/parents/letters",
  year9letters: "/parents/letters",
  year10lettershome: "/parents/letters",
  year11lettershome: "/parents/letters",
  sixthformletters: "/parents/letters",
  "copy-of-year-7-letters": "/parents/letters",
  policies: "/parents/policies",
  staffrecruitment: "/work-with-us",
  information: "/parents",
};

const CURRICULUM_SLUGS = fs
  .readdirSync(path.join(ROOT, "content", "curriculum"))
  .map((f) => f.replace(/\.md$/, ""));

// pages whose only content is photography set as column backgrounds
const IMAGE_ONLY = new Set(["schooltrips"]);

const NEW_SLUGS = new Set(Object.keys(PAGES));

export function routeForOldSlug(slug) {
  if (NEW_SLUGS.has(slug)) return "/" + slug;
  if (BUILT_ELSEWHERE[slug]) return BUILT_ELSEWHERE[slug];
  if (CURRICULUM_SLUGS.includes(slug)) return "/curriculum/" + slug;
  return null;
}

const report = { navDocs: {}, missingDocs: [], unbuiltLinks: [], missingImages: [], images: [], skippedGalleryImages: [] };

// ---------- documents ----------
const docNameByHash = new Map(); // hash -> public filename
// A full run rebuilds the output folders from scratch so names stay stable.
const FULL_RUN = process.argv.length <= 2;
if (FULL_RUN) {
  fs.rmSync(OUT_DOCS, { recursive: true, force: true });
  fs.rmSync(OUT_IMGS, { recursive: true, force: true });
}
const usedNames = new Set(
  fs.existsSync(OUT_DOCS) ? fs.readdirSync(OUT_DOCS) : []
);
const imageJobs = [];

function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

const GENERIC = /^(click here|here|link|button|download|read more|view|pdf|document|form)$/i;

function wireDocument(hash, ext, label, pageSlug) {
  const file = `3094c8_${hash}.${ext}`;
  if (docNameByHash.has(file)) return docNameByHash.get(file);
  const srcPath = path.join(DOCS_DIR, file);
  if (!fs.existsSync(srcPath)) return null;
  let base = /^https?:/i.test(label || "") ? "" : slugify(label || "");
  if (!base || GENERIC.test(label.trim()) || base.length < 4 || base.length > 40) {
    base = slugify(`${pageSlug} ${/^https?:/i.test(label || "") ? "" : label || ""} ${hash.slice(0, 6)}`);
  }
  let name = `${base}.${ext}`;
  let n = 2;
  while (usedNames.has(name)) name = `${base}-${n++}.${ext}`;
  usedNames.add(name);
  fs.mkdirSync(OUT_DOCS, { recursive: true });
  fs.copyFileSync(srcPath, path.join(OUT_DOCS, name));
  docNameByHash.set(file, name);
  return name;
}

// Resolves an href from the old site. Returns { href } (rewritten, maybe the
// same), or { href: null, reason } when the target isn't available.
function rewriteHref(href, label, pageSlug) {
  if (!href) return { href: null, reason: "none" };
  href = href.trim();
  if (href.startsWith("#")) return { href: null, reason: "anchor" };
  if (/^(mailto:|tel:)/i.test(href)) return { href };
  const m = /^https?:\/\/(?:www\.)?archten\.croydon\.sch\.uk(\/[^?#]*)?/i.exec(href);
  if (m) {
    const p = (m[1] || "/").replace(/\/+$/, "") || "/";
    const f = /^\/_files\/ugd\/3094c8_([0-9a-f]+)\.([a-z0-9]+)$/i.exec(p);
    if (f) {
      const name = wireDocument(f[1], f[2].toLowerCase(), label, pageSlug);
      if (name) return { href: `/documents/pages/${name}` };
      report.missingDocs.push({ page: pageSlug, label, href });
      return { href: null, reason: "missing-doc" };
    }
    if (p === "/") return { href: "/" };
    const route = routeForOldSlug(p.slice(1));
    if (route) return { href: route };
    report.unbuiltLinks.push({ page: pageSlug, label, href });
    return { href: null, reason: "unbuilt" };
  }
  if (/^https?:\/\//i.test(href)) return { href };
  if (/^\/_files\/ugd\//.test(href)) return rewriteHref("https://www.archten.croydon.sch.uk" + href, label, pageSlug);
  return { href: null, reason: "unknown" };
}

// ---------- markdown helpers ----------
const ZW = /[​‌‍⁠﻿]/g;

function escapeText(s) {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/([*_`\[\]<>~|])/g, "\\$1");
}

function escapeLineStart(line) {
  return line
    .replace(/^(\s*)([#>+\-])/, "$1\\$2")
    .replace(/^(\s*)(\d+)([.)])/, "$1$2\\$3");
}

function wrapMarks(inner, mark) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(inner);
  if (!m[2]) return inner;
  return `${m[1]}${mark}${m[2]}${mark}${m[3]}`;
}

function isBold($, el) {
  const tag = el.tagName;
  if (tag === "strong" || tag === "b") return true;
  const st = $(el).attr("style") || "";
  return /font-weight:\s*(bold|[6-9]00)/i.test(st);
}
function isItalic($, el) {
  const tag = el.tagName;
  if (tag === "em" || tag === "i") return true;
  return /font-style:\s*italic/i.test($(el).attr("style") || "");
}

function inline($, node, ctx) {
  let out = "";
  $(node)
    .contents()
    .each((_, c) => {
      if (c.type === "text") {
        out += escapeText(c.data.replace(/ /g, " ").replace(ZW, ""));
      } else if (c.type === "tag") {
        const tag = c.tagName;
        if (tag === "br") out += "  \n";
        else if (tag === "a") {
          const inner = inline($, c, ctx);
          const label = $(c).text().replace(ZW, "").replace(/\s+/g, " ").trim();
          const r = rewriteHref($(c).attr("href"), label, ctx.slug);
          out += r.href && inner.trim() ? wrapLink(inner, r.href) : inner;
        } else if (tag === "img") {
          // inline images inside rich text: none observed; ignore
        } else {
          let inner = inline($, c, ctx);
          if (isBold($, c) && inner.trim()) inner = wrapMarks(inner, "**");
          if (isItalic($, c) && inner.trim()) inner = wrapMarks(inner, "*");
          out += inner;
        }
      }
    });
  return out;
}

function wrapLink(inner, href) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(inner);
  return `${m[1]}[${m[2]}](${href.replace(/ /g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29")})${m[3]}`;
}

function fixLines(text) {
  return text
    .split("\n")
    .map((l) => escapeLineStart(l))
    .join("\n");
}

function headingLevel($, el) {
  const tag = el.tagName;
  if (!/^h[1-6]$/.test(tag)) return 0;
  const cls = ($(el).attr("class") || "").split(" ").find((x) => /^font_\d+$/.test(x));
  let size = 0;
  $(el)
    .find("[style]")
    .addBack()
    .each((_, s) => {
      const m = /font-size:\s*([\d.]+)px/.exec($(s).attr("style") || "");
      if (m) size = Math.max(size, parseFloat(m[1]));
    });
  if (cls === "font_0" && size <= 16) return 0; // styled as body text
  if (size && size <= 16 && cls === "font_8") return 0;
  const n = parseInt(tag[1], 10);
  return n <= 2 ? 2 : n === 3 ? 3 : 4;
}

function listMd($, el, ctx, depth = 0) {
  const ordered = el.tagName === "ol";
  const lines = [];
  let i = 1;
  $(el)
    .children("li")
    .each((_, li) => {
      let text = "";
      let nested = "";
      $(li)
        .contents()
        .each((__, c) => {
          if (c.type === "tag" && (c.tagName === "ul" || c.tagName === "ol")) {
            nested += listMd($, c, ctx, depth + 1) + "\n";
          } else if (c.type === "tag" && /^(p|div|h[1-6])$/.test(c.tagName)) {
            const t = inline($, c, ctx).trim();
            if (t) text += (text ? "  \n" : "") + t;
          } else if (c.type === "text") {
            text += escapeText(c.data.replace(/ /g, " ").replace(ZW, ""));
          } else if (c.type === "tag") {
            text += inlineOne($, c, ctx);
          }
        });
      text = text.trim();
      if (!text && !nested.trim()) return;
      const pad = "  ".repeat(depth);
      const marker = ordered ? `${i++}.` : "-";
      lines.push(`${pad}${marker} ${text.replace(/\n/g, "\n" + pad + "  ")}`);
      if (nested.trim()) lines.push(nested.replace(/\n+$/, ""));
    });
  return lines.join("\n");
}

function inlineOne($, c, ctx) {
  const wrapper = $("<span></span>");
  wrapper.append($(c).clone());
  return inline($, wrapper[0], ctx);
}

function richTextMd($, root, ctx) {
  const blocks = [];
  $(root)
    .children()
    .each((_, c) => {
      const tag = c.tagName;
      // wrapper elements holding block children: recurse
      if (
        (tag === "div" || tag === "section" || tag === "blockquote") &&
        $(c).children("p,h1,h2,h3,h4,h5,h6,ul,ol,div").length
      ) {
        blocks.push(...richTextMd($, c, ctx));
        return;
      }
      if (tag === "ul" || tag === "ol") {
        const l = listMd($, c, ctx);
        if (l.trim()) blocks.push(l);
        return;
      }
      const raw = inline($, c, ctx);
      const text = raw.replace(/\s+$/g, "").replace(/^\s+/, "");
      if (!text.trim()) return;
      let lvl = headingLevel($, c);
      // Wix styles link lists as headings; a heading that is only a link is a link.
      if (lvl && /^(\*\*)?\[[^\]]*\]\([^)]*\)(\*\*)?$/.test(text.trim())) lvl = 0;
      // Wix sometimes wraps whole passages (with line breaks) in one heading tag.
      if (lvl && (text.includes("  \n") || text.length > 140)) lvl = 0;
      if (lvl) {
        const t = text.replace(/\s*\n\s*/g, " ").replace(/^\*\*([^*]+)\*\*$/, "$1");
        blocks.push(`${"#".repeat(lvl)} ${t}`);
      } else blocks.push(fixLines(text));
    });
  return blocks;
}

// ---------- page walk ----------
const has = ($, el, c) => ($(el).attr("class") || "").split(/\s+/).includes(c);

function youtubeId(src) {
  const m = /(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{6,})/.exec(src || "");
  return m ? m[1] : null;
}

function findImageFile(uri) {
  if (!uri) return null;
  for (const dir of [PHOTO_DIR, path.join(SRC, "graphics")]) {
    if (!fs.existsSync(dir)) continue;
    const p = path.join(dir, uri);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// Decorative artwork (crest watermarks, stock card backdrops) that only
// dresses the old site's link tiles; not content.
const DECORATIVE_ALT = /^(crest|shadowcrest.*|watermark crest.*|tenaciter 1714 crest|writing with pen|money|form|computers?|christian wellbeing|british pound notes|judiciam)$/i;
const seenImages = new Set();

function wireImage(uri, slug, alt) {
  if (DECORATIVE_ALT.test(alt.trim())) return null;
  if (seenImages.has(slug + uri)) return null;
  seenImages.add(slug + uri);
  const file = findImageFile(uri);
  if (!file) {
    report.missingImages.push({ page: slug, uri });
    return null;
  }
  const ext = path.extname(uri);
  const name = `${slugify(uri.replace(/~mv2.*$/, "").replace(/^[0-9a-f]+_/, "")) || "img"}${ext}`;
  fs.mkdirSync(OUT_IMGS, { recursive: true });
  imageJobs.push({ file, out: path.join(OUT_IMGS, name) });
  report.images.push({ page: slug, name, alt });
  return `/images/pages/${name}`;
}

function extractBlocks($, ctx) {
  const blocks = [];
  const seenIframes = new Set();
  function walk(el) {
    const $el = $(el);
    if (el.type !== "tag") return;
    if (has($, el, "wixui-rich-text")) {
      blocks.push(...richTextMd($, el, ctx));
      return;
    }
    if (has($, el, "wixui-gallery")) {
      $el.find(".wixui-gallery__item").each((_, item) => {
        const a = $(item).find("a").first();
        const title = $(item).text().replace(ZW, "").replace(/\s+/g, " ").trim();
        if (!title) {
          report.skippedGalleryImages.push({ page: ctx.slug });
          return;
        }
        const r = rewriteHref(a.attr("href"), title, ctx.slug);
        blocks.push(r.href ? `[${escapeText(title)}](${r.href})` : escapeText(title));
      });
      return;
    }
    if (has($, el, "wixui-button")) {
      const a = $el.is("a") ? $el : $el.find("a").first();
      const label = $el.text().replace(ZW, "").replace(/\s+/g, " ").trim();
      if (!label) return;
      const r = rewriteHref(a.attr("href"), label, ctx.slug);
      blocks.push(r.href ? `[${escapeText(label)}](${r.href})` : escapeText(label));
      return;
    }
    if (has($, el, "wixui-image")) {
      const img = $el.find("img").first();
      const um = /\/media\/([^/"]+)\/v1\//.exec(img.attr("src") || "");
      const uri = um ? decodeURIComponent(um[1]) : null;
      let alt = (img.attr("alt") || "").trim();
      if (/\.(png|jpe?g|jfif|gif)$/i.test(alt)) alt = ""; // filename, not a description
      const src = wireImage(uri, ctx.slug, alt);
      if (src) {
        const a = $el.find("a").first();
        const r = a.length ? rewriteHref(a.attr("href"), alt, ctx.slug) : { href: null };
        const md = `![${escapeText(alt)}](${src})`;
        blocks.push(r.href ? `[${md}](${r.href})` : md);
      }
      return;
    }
    if (has($, el, "wixui-video-box")) {
      const html = $.html($el).replace(/&quot;/g, '"').replace(/\\\//g, "/");
      const m = /video\/(3094c8_[0-9a-f]+)\/\d+p\/mp4\/file\.mp4/.exec(html);
      if (m) blocks.push(`::video[https://video.wixstatic.com/video/${m[1]}/720p/mp4/file.mp4]`);
      return;
    }
    if (IMAGE_ONLY.has(ctx.slug) && has($, el, "wixui-column-strip__column")) {
      const img = $el.find("img").first();
      const um = /\/media\/([^/"]+)\/v1\//.exec(img.attr("src") || "");
      const src = um ? wireImage(decodeURIComponent(um[1]), ctx.slug, "") : null;
      if (src) blocks.push(`![](${src})`);
      return;
    }
    if (el.tagName === "iframe") {
      const srcs = [];
      if (el.tagName === "iframe") srcs.push($el.attr("src"));
      $el.find("iframe").each((_, f) => srcs.push($(f).attr("src")));
      const html = $.html($el);
      for (const m of html.matchAll(/(?:youtube(?:-nocookie)?\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([\w-]{6,})/g)) srcs.push("youtube.com/embed/" + m[1]);
      for (const s of srcs) {
        const id = youtubeId(s);
        if (id && !seenIframes.has(id)) {
          seenIframes.add(id);
          blocks.push(`::youtube[${id}]`);
        }
      }
      return;
    }
    if (has($, el, "wixui-google-map")) return;
    $el.children().each((_, c) => walk(c));
  }
  walk($("#SITE_PAGES")[0]);
  return blocks;
}

function extractPage(slug) {
  const html = fs.readFileSync(path.join(PAGES_DIR, slug + ".html"), "utf8");
  const $ = cheerio.load(html);
  const title = ($("title").first().text() || slug)
    .replace(/\s*\|\s*archbishop-tenisons\s*$/i, "")
    .replace(/ /g, " ")
    .trim();
  const blocks = extractBlocks($, { slug });
  // The page's own title is rendered as the page heading; drop an exact
  // repeat as the first body block (it stays in frontmatter).
  for (let i = blocks.length - 1; i > 0; i--) {
    if (/^#+\s/.test(blocks[i]) && blocks[i].replace(/^#+\s*/, "").replaceAll("**", "").trim().toLowerCase() === title.toLowerCase()) blocks.splice(i, 1);
  }
  if (blocks.length && blocks[0].replace(/^#+\s*/, "").replaceAll("**", "").trim().toLowerCase() === title.toLowerCase()) {
    blocks.shift();
  }
  // Link tiles on the old site are a thumbnail plus a text link to the same
  // target; keep the text link, drop the thumbnail that repeats it.
  for (let i = blocks.length - 1; i > 0; i--) {
    const img = /^\[!\[[^\]]*\]\([^)]*\)\]\(([^)]*)\)$/.exec(blocks[i]);
    if (img && blocks[i - 1].endsWith(`](${img[1]})`) && !blocks[i - 1].startsWith("[!")) blocks.splice(i, 1);
  }
  const fm = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `slug: ${JSON.stringify(slug)}`,
    `section: ${JSON.stringify(PAGES[slug] || "")}`,
    `sourceUrl: ${JSON.stringify("https://www.archten.croydon.sch.uk/" + slug)}`,
    "---",
    "",
  ].join("\n");
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, slug + ".md"), fm + blocks.join("\n\n") + "\n");
  return blocks.length;
}

// ---------- documents linked only from the old site's menu ----------
export const NAV_DOCS = {
  "3094c8_17bf3d00b3aa443fba51c329dc08d55f.pdf": "SIAMS",
  "3094c8_44081c3c66ed44dcbeb9f731abb7f969.pdf": "Financial Information",
  "3094c8_849eaefbd2ef4a4dbede980128b5e143.pdf": "SEND Information Report",
  "3094c8_32f29bcf51b448c092b5e3dd5743bfe0.pdf": "Remote Education Statement",
  "3094c8_9e909253d79c40e7993bbafc0e99c8b8.pdf": "Term Dates 2026-2027",
  "3094c8_800c59cd226643f7b2543d14898dc344.pdf": "The School Day",
  "3094c8_bef230a491f34316b608e8dd674f72ed.pdf": "Dinner Fob",
  "3094c8_4c9a8c1649f241dbaa489699d41c179d.pdf": "How to use MCAS",
  "3094c8_f8907dd6e191499e920bdc766426b02d.pdf": "Office365",
};

async function writeImages() {
  const used = fs
    .readdirSync(OUT_DIR)
    .map((f) => fs.readFileSync(path.join(OUT_DIR, f), "utf8"))
    .join("\n");
  for (const { file, out } of imageJobs) {
    if (!used.includes(`/images/pages/${path.basename(out)}`)) continue; // dropped as a repeated tile
    const img = sharp(file, { failOn: "none" }).rotate().resize({ width: 1400, withoutEnlargement: true });
    if (/.jpe?g$/i.test(out)) await img.jpeg({ quality: 80, mozjpeg: true }).toFile(out);
    else await img.toFile(out);
  }
}

const args = process.argv.slice(2);
const targets = args.length ? args : Object.keys(PAGES);
for (const slug of targets) {
  const n = extractPage(slug);
  console.log(slug.padEnd(40), n, "blocks");
}
if (!args.length) {
  for (const [file, label] of Object.entries(NAV_DOCS)) {
    const m = /^3094c8_([0-9a-f]+)\.(\w+)$/.exec(file);
    const name = wireDocument(m[1], m[2], label, "nav");
    if (!name) report.missingDocs.push({ page: "(menu)", label, href: file });
    else report.navDocs[label] = "/documents/pages/" + name;
  }
}
await writeImages();
fs.writeFileSync(path.join(ROOT, "scripts", "extract-report.json"), JSON.stringify(report, null, 2));
console.log(
  `missing docs: ${report.missingDocs.length}, unbuilt links: ${report.unbuiltLinks.length}, missing images: ${report.missingImages.length}, images: ${report.images.length}`
);
