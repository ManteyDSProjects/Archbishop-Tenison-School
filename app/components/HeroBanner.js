import Image from "next/image";

export default function HeroBanner({
  eyebrow,
  title,
  subtitle,
  children,
  compact = false,
}) {
  return (
    <section
      className={`bg-[var(--brand-navy-900)] text-[var(--brand-cream-50)] ${
        compact ? "py-14" : "py-16 sm:py-20"
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-16 lg:px-8">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="font-body text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-gold)]">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-7 h-px w-full bg-[var(--brand-cream-50)]/20" />
          {subtitle && (
            <p className="font-body mt-7 max-w-[62ch] text-base leading-relaxed text-[var(--brand-cream-50)]/75">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>

        <Image
          src="/images/brand/logo.png"
          alt="Archbishop Tenison's CE High School crest"
          width={280}
          height={90}
          className="h-24 w-auto max-w-[280px] shrink-0 self-start lg:mt-2"
          priority
        />
      </div>
    </section>
  );
}
