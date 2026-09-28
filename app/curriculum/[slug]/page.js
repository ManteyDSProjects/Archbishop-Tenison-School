import { notFound } from "next/navigation";
import Link from "next/link";
import HeroBanner from "../../components/HeroBanner";
import PDFLink from "../../components/PDFLink";
import { getAllCurriculum, getCurriculumBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllCurriculum().map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }) {
  const item = getCurriculumBySlug(params.slug);
  return {
    title: item
      ? `${item.title} | Curriculum | Archbishop Tenison's CE High School`
      : "Curriculum | Archbishop Tenison's CE High School",
  };
}

export default function CurriculumSubjectPage({ params }) {
  const subject = getCurriculumBySlug(params.slug);

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

        <div className="font-body prose-tenison mt-8 whitespace-pre-line text-[var(--color-text-secondary)]">
          {subject.content}
        </div>
      </article>
    </>
  );
}
