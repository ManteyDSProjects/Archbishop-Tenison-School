import HeroBanner from "../components/HeroBanner";
import NewsCard from "../components/NewsCard";
import { getAllNews } from "@/lib/content";

export const metadata = {
  title: "News | Archbishop Tenison's CE High School",
};

export default function NewsListPage() {
  const news = getAllNews();

  return (
    <>
      <HeroBanner
        compact
        eyebrow="News"
        title="Latest news from Archbishop Tenison's"
        subtitle="Stay up to date with what's happening across our school community."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {news.length === 0 ? (
          <p className="font-body text-[var(--color-text-secondary)]">
            No news posts yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
