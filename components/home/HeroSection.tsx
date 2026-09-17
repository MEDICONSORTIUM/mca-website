export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-mca-navy">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-black/55" />

      <svg
        aria-hidden
        viewBox="0 0 500 400"
        className="pointer-events-none absolute right-0 top-1/2 hidden w-[36rem] -translate-y-1/2 opacity-80 lg:block"
      >
        <circle cx="330" cy="200" r="160" fill="none" stroke="white" strokeOpacity="0.12" />
        <circle cx="330" cy="200" r="100" fill="none" stroke="white" strokeOpacity="0.12" />
        <polyline
          points="120,260 210,150 300,280 390,110 460,220"
          fill="none"
          stroke="var(--color-mca-orange)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[
          [120, 260],
          [210, 150],
          [300, 280],
          [390, 110],
          [460, 220],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill="var(--color-mca-orange)" />
        ))}
      </svg>

      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-white sm:px-8">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Advancing African health through satellite intelligence
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          Combining Earth Observation data with health analytics to understand disease patterns across the continent.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://eoha.co.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-mca-orange px-7 py-3.5 text-base font-semibold text-white transition hover:brightness-95"
          >
            Access the EOHA Platform
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center border border-white/60 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
