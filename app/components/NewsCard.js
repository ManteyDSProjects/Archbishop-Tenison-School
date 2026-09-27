import Link from "next/link";

export default function NewsCard({ slug, title, date, excerpt }) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group block rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-[#0b2545]/60">
        {date}
      </p>
      <h3 className="mt-2 text-lg font-semibold text-[#0b2545] group-hover:underline">
        {title}
      </h3>
      {excerpt && (
        <p className="mt-2 text-sm text-zinc-600 line-clamp-3">{excerpt}</p>
      )}
      <span className="mt-3 inline-block text-sm font-medium text-[#c9a961]">
        Read more →
      </span>
    </Link>
  );
}
