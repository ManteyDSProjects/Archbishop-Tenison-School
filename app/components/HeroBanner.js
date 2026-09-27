export default function HeroBanner({
  title,
  subtitle,
  eyebrow,
  children,
  compact = false,
}) {
  return (
    <section
      className={`relative overflow-hidden bg-[#0b2545] text-white ${
        compact ? "py-16" : "py-24 sm:py-32"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #c9a961 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-[#c9a961]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-lg text-white/80">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
