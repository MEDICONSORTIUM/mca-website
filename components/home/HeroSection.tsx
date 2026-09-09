export default function HeroSection() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-mca-charcoal">
      <div aria-hidden className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-white sm:px-8">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Medical Consortium of Africa
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
          Helping the world through Medical Innovation
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-mca-orange px-7 py-3.5 text-base font-semibold text-white transition hover:brightness-95"
          >
            Access the EOHA Platform
          </a>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-white/60 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
