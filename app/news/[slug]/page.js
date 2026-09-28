import { notFound } from "next/navigation";
import Link from "next/link";
import HeroBanner from "../../components/HeroBanner";
import { getAllNews, getNewsBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllNews().map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }) {
  const item = getNewsBySlug(params.slug);
  return {
    title: item
      ? `${item.title} | Archbishop Tenison's CE High School`
      : "News | Archbishop Tenison's CE High School",
  };
}

export default function NewsPostPage({ params }) {
  const item = getNewsBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <HeroBanner compact eyebrow={item.date} title={item.title} />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/news"
          className="font-body text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary-hover)]"
        >
          ← All news
        </Link>
        <div className="font-body mt-8 whitespace-pre-line text-[var(--color-text-secondary)]">
          {item.content}
        </div>
      </article>
    </>
  );
}
