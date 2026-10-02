export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-mca-charcoal">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/saterliteVideo.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 bg-black/55"
      />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-16 text-white sm:px-8 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight min-[380px]:text-4xl sm:text-5xl lg:text-6xl">
          Medical Consortium of Africa
        </h1>

        <p className="mt-6 max-w-2xl text-base text-white/80 sm:text-xl">
          Combining Earth Observation data with health analytics to understand disease patterns across the continent.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <a
            href="/eoha"
            className="inline-flex items-center justify-center bg-mca-orange px-6 py-3.5 text-center text-base font-semibold text-white transition hover:brightness-95 sm:px-7"
          >
            Earth Observational Health Analytics
          </a>
          <a
            href="/intelligence-health-infrastructure"
            className="inline-flex items-center justify-center bg-mca-orange px-6 py-3.5 text-center text-base font-semibold text-white transition hover:brightness-95 sm:px-7"
          >
            Intelligent Health Infrastructure
          </a>

          <a
            href="/about"
            className="inline-flex items-center justify-center border border-white/60 px-6 py-3.5 text-center text-base font-semibold text-white transition hover:bg-white/10 sm:px-7"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}