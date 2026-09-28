# Information Architecture: Archbishop Tenison's CE High School — Website Redesign

## Site Map

- Home `/`
- About `/about`
- Admissions `/admissions`
- Curriculum `/curriculum`
  - Subject detail `/curriculum/[slug]` (24 subjects, filterable by key stage on the index)
- Parents `/parents`
  - Letters Home `/parents/letters` (filterable by year group)
  - Term Dates `/parents/term-dates`
  - Policies `/parents/policies` (filterable by category)
- News `/news`
  - Article `/news/[slug]`
- Work with us `/work-with-us`
  - Vacancies `/work-with-us/vacancies`
  - Staff Recruitment info `/work-with-us` (merged into this page — was a near-duplicate of Vacancies)
- Christian Distinctiveness `/christian-distinctiveness`
- Contact `/contact`

Note against the current build: `information`, `staff-recruitment`, and `vacancies` exist today as separate flat routes. This IA folds `information` into `Parents` (its actual content — letters, term dates, policies), and folds `staff-recruitment` into `work-with-us` alongside `vacancies`, since they were serving the same audience with overlapping content.

## Navigation Model

- **Primary navigation** (6 items, max): About · Admissions · Curriculum · Parents · News · Contact. Logo links home.
- **Secondary navigation**: within Curriculum, Parents (Letters/Term Dates/Policies), and the Vacancy listing — filter/tab controls, not nested menu items. This is the direct fix for the real site's problem: 7 top-level sections with dozens of buried subpages that made content unfindable.
- **Utility navigation**: "Work with us" sits outside the primary 6 — a secondary/utility-style link (top-right or footer-prominent), since it serves a narrower audience (job seekers) than the primary 6, which serve prospective and current parents.
- **Mobile navigation**: hamburger menu revealing the same 6 primary items as a stacked list; filter controls on Curriculum/Parents/Vacancies collapse to a horizontal scrollable chip row (not a dropdown wall — multiple simultaneous filters like year-group + date on Letters would otherwise stack into 3+ dropdowns on a small screen).

## Content Hierarchy

### Home `/`
1. Admissions CTA (hero) — the single highest-value action for a first-time visitor
2. Ethos/motto snapshot (Tenaciter, 300+ year history) — credibility in one scroll
3. Latest news (2-3 items) — signals an actively maintained site
4. Quick links to Parents hub (letters, term dates) — serves the recurring-visit audience without making them hunt
5. Christian Distinctiveness teaser

### Parents `/parents`
1. Term dates (most time-sensitive, checked most often)
2. Letters Home, filtered by year group by default to the visitor's likely need
3. Policies
This ordering follows recurring-visit frequency, not administrative importance.

### Curriculum `/curriculum`
1. Key-stage filter (KS3/KS4/Sixth Form) — visitors normally know their child's year group before their subject interest
2. Subject grid/list
3. Subject detail page: Intent → Implementation → Impact (matches the real content structure already migrated)

### Admissions `/admissions`
1. In-year vs. standard entry point (the two real applicant types found in the migrated content)
2. Key dates/deadlines
3. Application links/forms
4. Appeals info (lower priority, still needed)

## User Flows

### Prospective parent researching the school
1. Lands on Home via search/referral
2. Sees Admissions CTA immediately (hero)
3. Clicks through to Admissions
   - If deadline has passed → In-year applications path shown prominently, not buried
   - If within standard window → standard entry info shown first
4. Cross-checks Curriculum for subject offerings before deciding to apply
5. Arrives at application form/contact

### Current parent looking for a letter home
1. Lands on Home or directly on `/parents/letters` (bookmarked/searched)
2. Filters by year group (defaults to most recent if no prior selection stored)
3. Scans dated list, opens PDF
4. This flow must be faster than the real site's, where letters sat in a long undifferentiated list mixed with unrelated links (SIAMS, Financial Information, etc. appeared inline with actual letters)

### Job seeker checking vacancies
1. Lands on `/work-with-us`
2. Sees only currently-open vacancies with visible closing dates (per design brief: real site had 2 of 3 listed vacancies already expired — closing-date visibility is a hard requirement here, not decorative)
3. Downloads job pack PDF or applies

## Naming Conventions

| Concept | Label in UI | Notes |
|---|---|---|
| Letters sent to parents/students | "Letters Home" | Matches existing CMS collection name and real-site terminology parents already recognize |
| Subject curriculum pages | "Curriculum" (not "Academics" or "Subjects") | Matches real site and CMS collection naming |
| Job openings | "Vacancies" | Matches CMS collection; "Careers" implies internal staff development, which is a different (out of scope) concept |
| The combined info hub | "Parents" (not "Information" or "School Services") | The real site's "Information" and "School Services" labels were vague; "Parents" is a direct audience-based label, consistent with the brief's parent-facing findability goal |
| Non-teaching job openings under Work with us | Included under "Vacancies", not split out | Real site conflated "Staff Recruitment" and "Vacancies" as near-duplicates; this IA merges them |

## Component Reuse Map

| Component | Used on | Behavior differences |
|---|---|---|
| Navbar | All pages | "Admissions" gets active-state underline treatment per finalized token system; CTA pill ("Book a visit" or similar) persists across all pages |
| Footer | All pages | Static, navy, no per-page variation |
| FilterBar (new) | Curriculum, Parents/Letters, Parents/Policies, Work with us/Vacancies | Filter dimension changes per page (key stage / year group / category / role type), same visual pattern |
| PDFLink | Parents/Letters, Parents/Policies, Curriculum subject detail, Vacancies | Existing component; needs the "not a bare file-manager list" treatment called out in the design brief |
| VacancyCard | Work with us/Vacancies | Already restyled per design tokens (flat card, closing date prominent) |
| NewsCard | Home, News | Existing component, restyled per tokens |
| HeroBanner | Home, Admissions | Admissions variant needs a CTA-forward treatment distinct from Home's more ethos-led hero |

## Content Growth Plan

- **Letters Home** (86 now): grows every term per year group. Needs pagination or "load more" past a threshold (e.g., 12 per year group visible by default) rather than one ever-growing flat list.
- **Policies** (68 now): grows/updates on a review cycle, not termly. Category filter is the primary growth accommodation; a "last reviewed" sort option helps surface recently-updated policies.
- **Curriculum** (24 subjects): stable count, content updates yearly per subject. No pagination needed — a filterable grid is sufficient at this scale.
- **News**: grows continuously. Standard reverse-chronological listing with pagination once past ~20 items.
- **Vacancies**: rotates (opens/closes), doesn't accumulate — the "closing date must be visible" requirement matters more than growth handling here; expired vacancies should auto-hide, not just sit stale (the exact failure found on the real site).

## URL Strategy

- Pattern: `/section/item-slug` for detail pages, `/section` for index/hub pages
- Dynamic segments: `[slug]` for curriculum subjects and news articles (matches existing `content/curriculum/*.md` and `content/news/*.md` CMS slugs)
- Query parameters: filters are query-param driven, not route-segment driven, so they're shareable/bookmarkable without multiplying routes — e.g. `/parents/letters?year=year-7`, `/curriculum?stage=ks3`, `/work-with-us/vacancies?type=teaching`. This also means the filter state can be deep-linked directly from an email or newsletter ("here are Year 7 letters" → direct link).
