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
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24 text-white sm:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Medical Consortium of Africa
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