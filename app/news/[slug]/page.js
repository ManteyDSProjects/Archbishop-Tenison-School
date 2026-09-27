import { notFound } from "next/navigation";
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
        <div className="prose prose-zinc max-w-none whitespace-pre-line text-zinc-700">
          {item.content}
        </div>
      </article>
    </>
  );
}
