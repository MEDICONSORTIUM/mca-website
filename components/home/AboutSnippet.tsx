import Link from "next/link";

export default function AboutSnippet() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-mca-charcoal sm:text-4xl">
              <Link href="/about" className="hover:text-mca-orange">
                About Medical Consortium of Africa
              </Link>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-mca-charcoal">
              Medical Consortium of Africa applies Earth Observation technologies
              and data-driven analytics to advance health outcomes across the
              African continent. We work with academic, scientific, and
              institutional partners to turn satellite data into practical
              insight for public health.
            </p>
            <p className="mt-4 text-base leading-relaxed text-mca-charcoal">
              The consortium operates the Earth Observation Health Analytics
              platform, a research tool that connects environmental data with
              health analytics to help institutions understand and respond to
              disease patterns.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-block font-semibold text-mca-orange hover:underline"
            >
              Read More
            </Link>
          </div>
          <div className="flex aspect-[4/3] w-full items-center justify-center rounded-lg border border-mca-steel/30 bg-mca-offwhite">
            <span className="text-sm text-mca-steel">
              Satellite imagery placeholder
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
