# Design Brief: Archbishop Tenison's CE High School — Website Redesign

## Problem

Prospective parents researching secondary schools for their children can't get a real sense of Archbishop Tenison's from its current website — it's a dated, template-driven Wix build that undersells a 300+ year old school with a genuine, distinctive identity (a real coat of arms, the motto "Tenaciter," a strong Christian ethos). Current parents and staff face the opposite problem: practical information (letters home, term dates, policies, vacancies) is buried in an unclear navigation structure, and the recruitment page has been showing expired vacancies since at least August — a live symptom of a site nobody can maintain confidently.

## Solution

A fresh, modern website that does two jobs equally well: gives prospective families a confident, credible first impression that makes them want to apply, and gives current parents/staff fast, obvious access to the information they need day-to-day (letters, term dates, policies, curriculum). Content is managed through a CMS (Decap CMS via Netlify Identity/Git Gateway) so the vacancies-going-stale problem can't recur — non-technical staff can update it directly.

## Experience Principles

1. **Heraldic, not template** — the school's real crest and colours are the foundation, not a stock template with a school photo dropped in. Every design decision should feel like it was made *for* this school, not applied to it.
2. **Confidence over ornamentation** — gold and crest motifs are used sparingly and precisely (borders, dividers, small marks). Overusing them is what makes school sites look dated; restraint is what makes them look premium.
3. **Findability for both audiences** — a prospective parent and a current parent looking for a letter home should each reach their goal in the same number of clicks. Neither audience is the "default" the other is bolted onto.

## Aesthetic Direction

- **Philosophy**: Modern editorial institutional — confident serif headlines over a clean grotesk sans body, generous whitespace, photography-led where real photography exists. Closer to a well-designed university or independent school site than a typical UK state-school Wix build.
- **Tone**: Approachable/modern, leaning warm rather than stiff-formal, while still reading as credible and rooted in the school's Christian, heraldic identity. Explicitly targeting "fresh, award-winning caliber" — not a template look.
- **Reference points**: Contemporary independent-school and university websites that pair strong typography with restrained use of heraldic/institutional marks.
- **Anti-references**: The current live site (archten.croydon.sch.uk) — dated Wix template, cluttered navigation, heavy/default use of gold and crest imagery, stale content. Also avoid generic "SchoolPress"-style template output.

## Existing Patterns

The codebase currently has **no established design system** — this is a clean slate, not an extension.

- Typography: Tailwind v4 defaults only; `--font-sans: "Inter"` fallback declared but never deliberately chosen. No serif in use.
- Colors: Tailwind v4 default `--background: #ffffff` / `--foreground: #171717`. No brand colours implemented anywhere.
- Spacing: Tailwind default scale, unmodified.
- Components: Navbar, Footer, HeroBanner, NewsCard, VacancyCard, PDFLink, ContactForm, YouTubeEmbed exist as placeholder-styled scaffolding (built during an earlier self-directed demo phase, before this brief). Treat these as a structural starting point to restyle, not a visual system to preserve.

### Real brand assets now available

Sourced from the live school site and saved to `01-Discovery/Assets-Received/Brand-Assets/`:

- `ArchTen_Tenaciter_Logo_White.png` — the school's wordmark + coat of arms (white version)
- `ShadowCrest.png` — a monochrome tonal crest, likely intended as a watermark/background device

The crest is a genuine heraldic shield: left half blue field with a gold cross and white Y-shaped crozier motif; right half crimson/red field with gold fleur-de-lis and a diagonal gold band; gold border throughout; black linework detail.

**Proposed palette** (derived from the crest, to be finalized in the tokens step):
- Navy / heraldic blue — primary
- Crimson / red — secondary, used sparingly
- Gold — accent only (borders, dividers, small marks), never a fill colour
- Off-white/cream base rather than pure white
- Ink (near-black, not pure black) for text

**Font pairing — confirmed and locked:**
- **Fraunces** (display serif) — editorial weight without stuffy institutional feel
- **Public Sans** (body/UI grotesk) — chosen over an earlier Archivo/Inter default specifically for legibility: built by the U.S. Web Design System for accessibility across sizes and devices (large x-height, open counters), which matters given the breadth of the parent audience and the accessibility requirements below

## Component Inventory

| Component | Status | Notes |
| --- | --- | --- |
| Navbar | Modify | Needs real crest/logo, new type system, nav structure re-checked against both audiences |
| Footer | Modify | Same brand restyle; should surface practical links (letters, policies, term dates) prominently |
| HeroBanner | Modify | Currently placeholder; needs real photography or a strong typographic/crest-led treatment where photography doesn't exist yet |
| NewsCard | Modify | Restyle only; content (Vision 312, Headteacher update) is real |
| VacancyCard | Modify | Restyle; must visibly surface closing dates given the stale-vacancy problem found on the live site |
| PDFLink | Modify | Used heavily — letters (86), policies (68) are all PDF-linked. Needs a treatment that doesn't look like a bare file-manager list |
| ContactForm | Modify | Restyle only |
| YouTubeEmbed | Modify | Restyle only |
| Curriculum subject template | New | 24 real subjects now in CMS; needs a proper page template, not a generic content dump |
| Letters Home index (by year group) | New | 86 real letters in CMS, tagged by year group — needs a browsable/filterable view |
| Policies index (by category) | New | 68 real policies in CMS, tagged by category with review dates — needs a browsable/filterable view |

## Key Interactions

- **Curriculum browsing**: visitor picks a subject → sees intent/implementation/impact content, tagged by key stage, with an optional subject-overview PDF.
- **Letters/policies lookup**: visitor filters by year group (letters) or category (policies) rather than scrolling a flat list — this is the direct fix for the current site's "everything in one long list" problem.
- **Vacancy visibility**: closing dates are visually prominent enough that a stale/expired vacancy is obviously wrong at a glance, not just in the data.
- **Admissions path**: a clear, singular call-to-action for prospective parents, not competing equally with every other nav item.

## Responsive Behavior

Mobile-first given parents are a primary audience and will very likely be on phones. Key stage/year-group/category filters (curriculum, letters, policies) need a mobile pattern that doesn't collapse into an unusable dropdown wall — to be resolved at IA/component stage.

## Accessibility Requirements

- WCAG AA contrast minimum for all text, including gold-on-cream and navy-on-cream combinations (gold in particular needs contrast-checking before use on text — restrict it to non-text decorative use if it fails)
- Full keyboard navigation for nav, filters, and the CMS-driven index pages
- PDF links must have clear, descriptive link text (not "click here") given the volume of PDFs in letters/policies

## Out of Scope

- Sourcing final real photography (school building, students, staff) — not yet available; hero treatment must work without it for now
- Netlify Identity/Git Gateway/CMS backend work — already complete, not part of this design pass
- Any further content migration — curriculum/letters/policies content is already real and complete in the CMS
