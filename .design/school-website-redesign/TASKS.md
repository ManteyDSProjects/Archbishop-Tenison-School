# Build Tasks: Archbishop Tenison's CE High School — Website Redesign

Generated from: .design/school-website-redesign/DESIGN_BRIEF.md, INFORMATION_ARCHITECTURE.md
Date: 2026-09-28

Aesthetic direction (established first, everything below builds against it): modern editorial institutional — Fraunces display serif over Public Sans body, navy/crimson/gold-as-accent palette sampled from the real crest, no drop shadows, two intentional registers (structural/hairline for data pages, warm/rounded for parent-facing CTA moments). See the design tokens artifact for the reference implementation.

## Foundation

- [ ] **Restyle Navbar to locked tokens**: navy wordmark lockup, active-link state as bold colour + thin underline (not a pill — pill is reserved for the CTA), primary CTA as a navy pill button, mobile hamburger revealing the same 6 primary items stacked. _Modifies: `Navbar.js`._
- [ ] **Restyle Footer to locked tokens**: navy background (not the warm register), thin gold top rule as the only gold usage, crest watermark faint in one corner, four-column layout (school info / For parents / School / newsletter signup) per the IA's naming conventions. _Modifies: `Footer.js`._
- [ ] **Build FilterBar component**: a shared, reusable filter-chip row (not a dropdown) driven by URL query params, horizontally scrollable on mobile rather than stacking into multiple dropdowns. Used by Curriculum (key stage), Parents/Letters (year group), Parents/Policies (category), and Vacancies (role type). _New component._

## Core UI

- [ ] **Home hero + admissions CTA**: hero establishes the aesthetic direction immediately — serif headline, real crest, admissions CTA as the single highest-priority action per the IA's content hierarchy. _Modifies: `HeroBanner.js`, `app/page.js`._
- [ ] **Home — news teaser + Parents quick links**: 2-3 latest news items plus direct links into the Parents hub (letters, term dates), per Home's #3 and #4 content-hierarchy items. _Modifies: `NewsCard.js`, `app/page.js`. Depends on: Parents hub existing (can stub links first)._
- [ ] **Admissions page**: CTA-forward hero variant distinct from Home's ethos-led hero, in-year vs. standard entry as the top-priority split (the two real applicant types found in the migrated content), key dates, application links, appeals lower on the page. _Modifies: `app/admissions/page.js`, `HeroBanner.js` (CTA variant)._
- [ ] **Curriculum index + subject detail**: key-stage FilterBar at the top of the index, subject grid below, detail page template rendering the real Intent → Implementation → Impact content already migrated into the CMS for all 24 subjects. _Depends on: FilterBar. Modifies: `app/curriculum/page.js`; new `app/curriculum/[slug]/page.js`._
- [ ] **Parents hub + Letters Home**: `/parents` landing ordered term dates → letters → policies per the IA's visit-frequency ranking; `/parents/letters` with year-group FilterBar over the 86 migrated letters, PDFLink given a proper treatment (dated, descriptive link text — not a bare file list). _Depends on: FilterBar. Modifies: `PDFLink.js`; new `app/parents/page.js`, `app/parents/letters/page.js`._
- [ ] **Parents/Term Dates + Policies**: term dates pulled from the CMS settings collection; policies index with category FilterBar over the 68 migrated policies, plus a "last reviewed" sort so recently-updated policies surface — directly relevant given the real site's own policies hadn't been updated in some time. _Depends on: FilterBar. New: `app/parents/term-dates/page.js`, `app/parents/policies/page.js`._
- [ ] **Work with us (merged vacancies + staff recruitment)**: single page/section per the IA's naming-conventions merge; VacancyCard already matches the locked tokens (flat card, closing date prominent, navy top-rule) — this task wires real vacancy data and adds auto-hide-when-expired logic, the direct fix for the real site's stale-listing problem (2 of 3 live vacancies had already expired). _Modifies: `app/vacancies/page.js` → `app/work-with-us/page.js`, `VacancyCard.js` (expiry logic)._
- [ ] **News index + article page**: reverse-chronological listing, pagination past ~20 items per the IA's content growth plan. _Modifies: `app/news/page.js`, `app/news/[slug]/page.js`, `NewsCard.js`._
- [ ] **About, Christian Distinctiveness, Contact**: lower-traffic static content pages restyled to tokens; Contact reuses the existing form/YouTube components. _Modifies: `app/about/page.js`, `app/christian-distinctiveness/page.js`, `app/contact/page.js`, `ContactForm.js`, `YouTubeEmbed.js`._

## Interactions & States

- [ ] **FilterBar states**: selected/active chip, empty state per section (e.g. "No letters for this year group yet"), and URL query-param sync so filtered views are shareable/bookmarkable per the IA's URL strategy. Covers: default, active-filter, empty-result, mobile horizontal-scroll.
- [ ] **Vacancy expiry states**: visually distinct "closing soon" (within 7 days) vs. normal vs. auto-hidden-when-expired, since this is the brief's single most concrete, evidence-backed requirement.

## Responsive & Polish

- [ ] **Responsive pass**: 375 / 768 / 1024 / 1280 per the IA's breakpoints, with particular attention to the FilterBar's mobile chip-scroll pattern and the Navbar's hamburger collapse.
- [ ] **Accessibility pass**: WCAG AA contrast check across all colour combinations — gold-on-cream and navy-on-cream specifically called out in the brief as needing verification; full keyboard navigation through nav, filters, and PDF-heavy index pages; descriptive PDF link text (never "click here") given the volume of PDFs across Letters and Policies.

## Review

- [ ] **Design review**: Run `/design-review` against the brief once the above is built, checking specifically for consistency between the "structural" register (Curriculum/Parents/Policies/Vacancies) and the "warm" register (Home hero, Admissions CTA, Navbar/Footer) — the two are meant to contrast deliberately, not blur together.
