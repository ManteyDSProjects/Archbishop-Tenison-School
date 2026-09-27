# Archbishop Tenison's CE High School

Self-directed redesign demo by Mantey Design Studio. Built as a portfolio
piece ahead of approaching the school, so content here uses placeholder
school details, colours, and PDFs. Swap these for the school's actual
branding and documents before this becomes a live pitch.

## Stack

- Next.js (App Router) + Tailwind CSS
- Decap CMS for staff content editing (news, vacancies, staff profiles, term dates)
- Netlify Identity + Git Gateway for CMS authentication
- Netlify Forms for the contact form
- Netlify hosting, deployed from this repo

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. To test the CMS locally:

```bash
npm install -D decap-server
npx decap-server
```

Then visit `http://localhost:3000/admin/` in a second terminal while `npm run dev`
is running in the first. The local backend is only for previewing the
CMS UI; real content edits need the deployed site (see below).

## Content structure

- `content/news/*.md` — news posts (title, date, excerpt, body)
- `content/vacancies/*.md` — job vacancies (title, contract type, salary, closing date, job pack PDF)
- `content/staff/*.md` — staff profiles (name, role, photo, bio)
- `content/settings/term-dates.md` — single-file collection for term dates shown on the Information page

All of the above are editable through `/admin` once Netlify Identity is
set up (see below). Editing these files directly and pushing to `main`
also works and is how this repo is built for now.

## Setting up the CMS on Netlify (do this once, after first deploy)

1. Deploy the site to Netlify (connect this repo, build command `npm run build`, publish directory `.next`, the `@netlify/plugin-nextjs` plugin from `netlify.toml` handles the rest).
2. In the Netlify dashboard: **Site configuration → Identity → Enable Identity**.
3. Set registration to **Invite only**.
4. **Identity → Services → Git Gateway → Enable Git Gateway.**
5. **Identity → Invite users** and add the school's staff email(s).
6. Staff follow the invite link, set a password, and can then log in at `yoursite.netlify.app/admin`.

Non-technical staff manage content entirely through that `/admin` panel.
No code, no GitHub access, no developer needed for routine updates.

## PDF handling approach

- Short reference documents: embedded inline where practical.
- Forms and long compliance documents: new-tab download links via the `PDFLink` component.
- Frequently changing content (term dates): a proper CMS-managed page/collection rather than a PDF (see `content/settings/term-dates.md`).

## Deployment notes

- Auto-publishing should stay off on the client Netlify account to preserve free-tier build minutes; trigger manual deploys as needed, per studio standard.
- Domain, DNS, and email setup follow the studio's usual process once the school proceeds.
