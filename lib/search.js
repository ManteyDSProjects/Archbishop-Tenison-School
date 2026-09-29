// Client-side search over the index built in lib/search-data.js.

export const GROUPS = ["Pages", "Curriculum", "Policies", "Letters", "News", "Documents"];

export const POPULAR = [
  { label: "Term Dates", href: "/parents/term-dates" },
  { label: "Letters Home", href: "/parents/letters" },
  { label: "Admissions", href: "/admissions" },
  { label: "School Uniform", href: "/schooluniform" },
  { label: "Policies", href: "/parents/policies" },
  { label: "Contact Us", href: "/contact" },
];

export const SUGGESTIONS = ["Term dates", "Letters", "Admissions", "Uniform", "Curriculum", "Contact"];

export const OFFICE_PHONE = "0208 688 4014";

export function tokens(query) {
  return (query || "")
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.replace(/[^\p{L}\p{N}'’-]/gu, ""))
    .filter(Boolean);
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Adds lowercase copies once, after the index has loaded.
export function prepareIndex(entries) {
  return entries.map((e, i) => ({
    ...e,
    id: i,
    _title: e.title.toLowerCase(),
    _section: (e.section || "").toLowerCase(),
    _text: (e.text || "").toLowerCase(),
  }));
}

// Adds the text inside PDFs. A document that already has an entry (a policy, a
// letter, a news item) gives that entry its full text; any other PDF becomes
// its own "Documents" result.
export function mergeDocuments(index, docs) {
  if (!docs || !docs.length) return index;
  const byHref = new Map(docs.map((d) => [d.href, d]));
  const used = new Set();

  const merged = index.map((e) => {
    const doc = byHref.get(e.href);
    if (!doc) return e;
    used.add(e.href);
    return { ...e, text: doc.text, _text: `${e._text} ${doc.text.toLowerCase()}` };
  });

  let id = merged.length;
  for (const doc of docs) {
    if (used.has(doc.href)) continue;
    merged.push({
      id: id++,
      type: "Documents",
      title: doc.title,
      section: "Document · PDF",
      href: doc.href,
      newTab: true,
      text: doc.text,
      _title: doc.title.toLowerCase(),
      _section: "document · pdf",
      _text: doc.text.toLowerCase(),
    });
  }
  return merged;
}

export function titleMatches(title, query) {
  const lower = (title || "").toLowerCase();
  return tokens(query).some((t) => lower.includes(t));
}

export function textMatches(text, query) {
  const lower = (text || "").toLowerCase();
  return tokens(query).some((t) => lower.includes(t));
}

export function runSearch(index, query) {
  const toks = tokens(query);
  if (!toks.length) return [];
  const phrase = toks.join(" ");
  const results = [];

  for (const e of index) {
    let score = 0;
    let ok = true;
    for (const t of toks) {
      let s = 0;
      if (new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegExp(t)}`, "u").test(e._title)) s += 10;
      else if (e._title.includes(t)) s += 6;
      if (e._section.includes(t)) s += 3;
      if (e._text.includes(t)) {
        const count = e._text.split(t).length - 1;
        s += 1 + Math.min(count, 5) * 0.3;
      }
      if (s === 0) {
        ok = false;
        break;
      }
      score += s;
    }
    if (!ok) continue;
    if (e._title.includes(phrase)) score += 10;
    results.push({ entry: e, score });
  }

  results.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, undefined, { numeric: true }));
  return results.map((r) => r.entry);
}

export function groupResults(results) {
  return GROUPS.map((group) => ({ group, items: results.filter((r) => r.type === group) })).filter(
    (g) => g.items.length > 0
  );
}

// Splits text into plain and matched parts, for highlighting.
export function highlightParts(text, query) {
  const toks = tokens(query);
  if (!toks.length || !text) return [{ text, match: false }];
  const re = new RegExp(`(${toks.map(escapeRegExp).join("|")})`, "giu");
  return text
    .split(re)
    .filter((part) => part !== "")
    .map((part) => ({ text: part, match: toks.includes(part.toLowerCase()) }));
}

// A short excerpt around the first match in the page text.
export function snippet(text, query, radius = 90) {
  if (!text) return "";
  const toks = tokens(query);
  const lower = text.toLowerCase();
  let at = -1;
  for (const t of toks) {
    const i = lower.indexOf(t);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return text.length > radius * 2 ? `${text.slice(0, radius * 2).trim()}…` : text;
  let start = Math.max(0, at - radius);
  let end = Math.min(text.length, at + radius);
  if (start > 0) start = text.indexOf(" ", start) === -1 ? start : text.indexOf(" ", start) + 1;
  if (end < text.length) end = text.lastIndexOf(" ", end) > start ? text.lastIndexOf(" ", end) : end;
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}
