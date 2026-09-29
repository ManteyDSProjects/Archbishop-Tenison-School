import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import HeroBanner from "../../components/HeroBanner";
import { getAllNews, getNewsBySlug } from "@/lib/content";

const PROSE =
  "font-body text-[var(--color-text-secondary)] [&_p]:my-4 [&_p]:leading-relaxed [&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:text-[var(--color-text-primary)] [&_h3]:font-display [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:text-[var(--color-text-primary)] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:font-medium [&_a]:text-[var(--color-accent-primary)] [&_a]:underline [&_strong]:text-[var(--color-text-primary)] [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full";

export function generateStaticParams() {
  return getAllNews()
    .filter((item) => !item.href)
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  return {
    title: item
      ? `${item.title} | Archbishop Tenison's CE High School`
      : "News | Archbishop Tenison's CE High School",
  };
}

export default async function NewsPostPage({ params }) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);

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
        <div
          className={`mt-8 ${PROSE}`}
          dangerouslySetInnerHTML={{ __html: marked.parse(item.content || "") }}
        />
      </article>
    </>
  );
}
