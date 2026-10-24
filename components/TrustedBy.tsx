"use client";

const brands = [
  "Next.js",
  "React",
  "Netlify",
  "Stripe",
  "WhatsApp API",
  "Meta",
  "Vercel",
  "Shopify",
];

export default function TrustedBy() {
  const looped = [...brands, ...brands];

  return (
    <section className="py-16 relative z-10 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl mb-10">
        <p className="text-center text-sm font-mono text-text-muted tracking-[0.2em] uppercase">
          Technologies we build with
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex animate-marquee gap-16 w-max items-center">
          {looped.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="shrink-0 text-2xl md:text-3xl font-display font-bold text-white/40 hover:text-white/80 transition-colors whitespace-nowrap select-none tracking-tight"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
