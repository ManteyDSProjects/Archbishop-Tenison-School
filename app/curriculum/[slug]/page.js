import { notFound } from "next/navigation";
import Link from "next/link";
import HeroBanner from "../../components/HeroBanner";
import PDFLink from "../../components/PDFLink";
import { getAllCurriculum, getCurriculumBySlug } from "@/lib/content";


// The source text is one line per paragraph or list item, with no blank lines.
// Show it as readable blocks without changing any wording: the opening title,
// Intent / Implementation / Impact and year or stage labels become headings in
// the site's heading styles, full paragraphs get space around them, and runs of
// short lines sit tightly together.
const IIC =
  /^(?:Curriculum\s+)?(?:Intent|I ?mplementation|Impact)(?:[,\s]+(?:and\s+)?(?:Intent|I ?mplementation|Impact)){0,2}[:.]?$/i;
const LABEL_LEAD = /^(Intent|I ?mplementation|Impact)\s*:\s*(\S[\s\S]*)$/i;
const SUBHEAD = /^(?:Years? \d+[^.]*|Key ?stage \d[^.]*|KS\d[^.]*|Sixth Form[^.]*|Subject content)$/i;
const SHORT = 90;

function toBlocks(content) {
  const blocks = [];
  let run = null;
  let first = true;
  for (const raw of (content || "").split("\n")) {
    const line = raw.replace(/[\u200b\s]+/g, " ").trim();
    if (!line) {
      run = null;
      continue;
    }
    const isFirst = first;
    first = false;
    const lead = LABEL_LEAD.exec(line);
    if (lead) {
      blocks.push({ type: "h3", text: lead[1].replace(/^I ?mplementation$/i, "Implementation") });
      blocks.push({ type: "paragraph", text: lead[2].trim() });
      run = null;
    } else if (isFirst && line.length <= 100) {
      blocks.push({ type: "h2", text: line, first: true });
      run = null;
    } else if (
      IIC.test(line) &&
      blocks.length === 1 &&
      blocks[0].first &&
      /Intent$/i.test(blocks[0].text) &&
      /^(?:Implementation|Impact)/i.test(line)
    ) {
      // A title the source broke over two lines: "... Curriculum Intent" / "Implementation and Impact".
      blocks[0].text = `${blocks[0].text}, ${line.replace(/[:.]$/, "")}`;
      run = null;
    } else if (IIC.test(line)) {
      blocks.push({ type: "h3", text: line.replace(/^I ?mplementation/i, "Implementation").replace(/[:.]$/, "") });
      run = null;
    } else if (line.length <= 50 && SUBHEAD.test(line)) {
      blocks.push({ type: "h4", text: line });
      run = null;
    } else if (line.length <= SHORT) {
      if (!run) {
        run = { type: "list", lines: [] };
        blocks.push(run);
      }
      run.lines.push(line);
    } else {
      blocks.push({ type: "paragraph", text: line });
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
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="font-display mb-3 mt-2 text-2xl font-medium leading-tight text-[var(--color-text-primary)]"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "h3") {
              return (
                <h3
                  key={i}
                  className="font-display mb-2 mt-10 text-xl font-medium leading-tight text-[var(--color-text-primary)]"
                >
                  {block.text}
                </h3>
              );
            }
            if (block.type === "h4") {
              return (
                <h4
                  key={i}
                  className="font-display mb-2 mt-8 text-lg font-medium leading-tight text-[var(--color-text-primary)]"
                >
                  {block.text}
                </h4>
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
                {block.text}
              </p>
            );
          })}
        </div>
      </article>
    </>
  );
}
