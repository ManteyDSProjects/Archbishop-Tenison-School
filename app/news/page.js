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
        title="News"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {news.length === 0 ? (
          <p className="font-body text-[var(--color-text-secondary)]">
            There are no news articles to display.
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
                image={item.image}
                href={item.href}
                newTab={item.newTab}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
