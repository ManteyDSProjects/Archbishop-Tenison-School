import { notFound } from "next/navigation";
import { marked } from "marked";
import HeroBanner from "../components/HeroBanner";
import PDFLink from "../components/PDFLink";
import YouTubeEmbed from "../components/YouTubeEmbed";
import { getAllPages, getPageBySlug } from "@/lib/content";

// Only slugs that exist in content/pages are prerendered; anything else 404s.
// Static routes (about, admissions, ...) win over this dynamic segment.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);
  return {
    title: page
      ? `${page.title} | Archbishop Tenison's CE High School`
      : "Archbishop Tenison's CE High School",
  };
}

const PROSE =
  "font-body max-w-none text-[var(--color-text-secondary)] " +
  "[&_p]:my-4 [&_p]:leading-relaxed " +
  "[&_h2]:font-display [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-[var(--color-text-primary)] " +
  "[&_h3]:font-display [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-[var(--color-text-primary)] " +
  "[&_h4]:font-display [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:text-lg [&_h4]:font-medium [&_h4]:text-[var(--color-text-primary)] " +
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 " +
  "[&_a]:font-medium [&_a]:text-[var(--color-accent-primary)] [&_a]:underline [&_a:hover]:text-[var(--color-accent-primary-hover)] " +
  "[&_strong]:text-[var(--color-text-primary)] " +
  "[&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:border [&_img]:border-[var(--color-border-primary)] " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--color-accent-gold)] [&_blockquote]:pl-5";

const YOUTUBE = /^::youtube\[([\w-]+)\]$/;
const VIDEO = /^::video\[(https:\/\/[^\]]+)\]$/;

// Splits the markdown into renderable blocks: embeds and standalone PDF
// links become design-system components, everything else stays HTML.
function toBlocks(content) {
  const blocks = [];
  for (const token of marked.lexer(content)) {
    if (token.type === "space") continue;
    if (token.type === "paragraph") {
      const text = token.text.trim();
      const yt = YOUTUBE.exec(text);
      if (yt) {
        blocks.push({ type: "youtube", id: yt[1] });
        continue;
      }
      const video = VIDEO.exec(text);
      if (video) {
        blocks.push({ type: "video", src: video[1] });
        continue;
      }
      // Ignore trailing hard breaks / whitespace when deciding what the paragraph is.
      const parts = (token.tokens || []).filter((t) => !(t.type === "br" || (t.type === "text" && !t.text.trim())));
      const only = parts.length === 1 ? parts[0] : null;
      if (only?.type === "strong" && only.text.length <= 100 && !only.text.trim().startsWith("(")) {
        const level = /^(Intent|Implementation|Impact)\b/i.test(only.text.trim()) ? 3 : 2;
        blocks.push({ type: "html", html: `<h${level}>${marked.parseInline(only.text)}</h${level}>` });
        continue;
      }
      if (only?.type === "link" && /^\/documents\/.+\.pdf$/i.test(only.href)) {
        const item = { href: only.href, label: marked.parseInline(only.text) };
        const last = blocks[blocks.length - 1];
        if (last?.type === "pdfs") last.items.push(item);
        else blocks.push({ type: "pdfs", items: [item] });
        continue;
      }
    }
    blocks.push({ type: "html", html: marked.parser([token]) });
  }
  return blocks;
}

export default async function GenericPage({ params }) {
  const { slug } = await params;
  const page = getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const blocks = toBlocks(page.content);

  return (
    <>
      <HeroBanner compact eyebrow={page.section || undefined} title={page.title} />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        {blocks.map((block, i) => {
          if (block.type === "youtube") {
            return (
              <div key={i} className="my-8">
                <YouTubeEmbed videoId={block.id} title={page.title} />
              </div>
            );
          }
          if (block.type === "video") {
            return (
              <div key={i} className="my-8 overflow-hidden rounded-lg">
                <video
                  className="w-full"
                  controls
                  preload="metadata"
                  src={block.src}
                  aria-label={page.title}
                />
              </div>
            );
          }
          if (block.type === "pdfs") {
            return (
              <div
                key={i}
                className="my-6 border border-[var(--color-border-primary)] px-5"
              >
                {block.items.map((item) => (
                  <PDFLink key={item.href + item.label} href={item.href}>
                    <span dangerouslySetInnerHTML={{ __html: item.label }} />
                  </PDFLink>
                ))}
              </div>
            );
          }
          return (
            <div
              key={i}
              className={PROSE}
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        })}
      </article>
    </>
  );
}
