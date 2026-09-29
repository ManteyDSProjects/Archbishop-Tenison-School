import { notFound } from "next/navigation";
import Link from "next/link";
import HeroBanner from "../../components/HeroBanner";
import PDFLink from "../../components/PDFLink";
import { getAllCurriculum, getCurriculumBySlug } from "@/lib/content";


// The source text is one line per paragraph or list item, with no blank lines.
// Show it as readable blocks without changing a single word: full paragraphs get
// space around them, runs of short lines sit tightly together, and short
// year/stage/section labels become sub-headings.
const HEADING = /^(?:Years? \d+[^.]*|Key Stage \d[^.]*|KS\d[^.]*|Sixth Form[^.]*|Year 1[0-3][^.]*|Intent:?|Implementation:?|Impact:?)$/i;
const SHORT = 90;

function toBlocks(content) {
  const blocks = [];
  let run = null;
  for (const raw of (content || "").split("\n")) {
    const line = raw.replace(/[​\s]+/g, " ").trim();
    if (!line) {
      run = null;
      continue;
    }
    if (line.length <= 50 && HEADING.test(line)) {
      blocks.push({ type: "heading", lines: [raw.trim()] });
      run = null;
    } else if (line.length <= SHORT) {
      if (!run) {
        run = { type: "list", lines: [] };
        blocks.push(run);
      }
      run.lines.push(raw.trim());
    } else {
      blocks.push({ type: "paragraph", lines: [raw.trim()] });
      run = null;
    }
  }
  return blocks;
}

export function generateStaticParams() {
  return getAllCurriculum().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getCurriculumBySlug(slug);
  return {
    title: item
      ? `${item.title} | Curriculum | Archbishop Tenison's CE High School`
      : "Curriculum | Archbishop Tenison's CE High School",
  };
}

export default async function CurriculumSubjectPage({ params }) {
  const { slug } = await params;
  const subject = getCurriculumBySlug(slug);

  if (!subject) {
    notFound();
  }

  return (
    <>
      <HeroBanner
        compact
        eyebrow={(subject.keyStage || []).join(" · ") || "Curriculum"}
        title={subject.title}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/curriculum"
          className="font-body text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
        >
          ← All subjects
        </Link>

        {subject.documentHref && (
          <div className="mt-8 border border-[var(--color-border-primary)] px-5">
            <PDFLink href={subject.documentHref}>
              {subject.title} subject overview
            </PDFLink>
          </div>
        )}

        <div className="font-body mt-8 text-[var(--color-text-secondary)]">
          {toBlocks(subject.content).map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="font-display mb-3 mt-10 text-2xl font-medium leading-tight text-[var(--color-text-primary)]"
                >
                  {block.lines[0]}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <div key={i} className="my-4 space-y-1.5 leading-relaxed">
                  {block.lines.map((l, j) => (
                    <p key={j}>{l}</p>
                  ))}
                </div>
              );
            }
            return (
              <p key={i} className="my-4 leading-relaxed">
                {block.lines[0]}
              </p>
            );
          })}
        </div>
      </article>
    </>
  );
}
