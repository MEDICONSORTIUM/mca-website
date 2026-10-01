import PageHeroBanner from "@/components/shared/PageHeroBanner";
import Link from "next/link";

const modules = [
  {
    title: "Malaria Dashboard",
    description:
      "Live heatmap, ward-level risk scores, and environmental factor tracking.",
    href: "/eoha/malaria",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    title: "NCD Prediction",
    description:
      "Africa-wide NCD risk mapping integrating air quality, population density, and lifestyle data.",
    href: "/eoha/ncd",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Forecasting",
    description:
      "90-day risk forecasts using a Random Forest model trained on 13 months of EO data.",
    href: "/eoha/forecasting",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Reports",
    description:
      "Sortable ward-level risk tables with CSV export for health teams and policy makers.",
    href: "/eoha/reports",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-7 w-7"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
];

const steps = [
  {
    number: "1",
    title: "Collect",
    description:
      "Sentinel-2 and MODIS satellites capture LST, soil moisture, NDWI, and vegetation index at ward level.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Analyse",
    description:
      "A Random Forest model scores each ward against malaria vector suitability and NCD risk thresholds with 91% accuracy.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Act",
    description:
      "Health teams receive ward-level risk maps, 90-day forecasts, and exportable reports to guide resource allocation.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8"
      >
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

export default function EOHAHomePage() {
  return (
    <main className="bg-white text-mca-charcoal">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">

        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/fallback.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="/data/8947-215890483.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Dark MCA overlay */}
        <div className="absolute inset-0 bg-mca-charcoal/70" />

        {/* Orange atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-mca-orange/30 via-transparent to-mca-charcoal/70" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col justify-center px-6 py-24 sm:px-8 lg:px-12">

          <div className="max-w-4xl">

            <span className="mb-6 inline-block rounded-full border border-mca-orange/60 bg-mca-orange/20 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Medical Consortium of Africa
            </span>

            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
              Earth Observation
              <span className="block text-mca-orange">
                Health Analytics
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
              A first-of-its-kind platform using real-time Earth observation
              and health data to deliver actionable insights on Malaria and
              NCDs across Africa.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/eoha/malaria"
                className="rounded-md bg-mca-orange px-6 py-3 font-semibold text-white transition hover:bg-mca-orange/90"
              >
                Malaria Dashboard →
              </Link>

              <Link
                href="/eoha/ncd"
                className="rounded-md border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-mca-charcoal"
              >
                NCD Dashboard →
              </Link>
            </div>

          </div>

          {/* Statistics */}
          <div className="mt-16 grid max-w-3xl grid-cols-1 border-t border-white/20 pt-8 sm:grid-cols-3">

            <div className="py-4 sm:border-r sm:border-white/20 sm:pr-8">
              <div className="text-4xl font-bold text-white">
                560<span className="text-mca-orange">+</span>
              </div>
              <p className="mt-2 text-sm uppercase tracking-wider text-white/70">
                Wards Monitored
              </p>
            </div>

            <div className="py-4 sm:px-8 sm:border-r sm:border-white/20">
              <div className="text-4xl font-bold text-white">
                13
              </div>
              <p className="mt-2 text-sm uppercase tracking-wider text-white/70">
                Months of Data
              </p>
            </div>

            <div className="py-4 sm:pl-8">
              <div className="text-4xl font-bold text-white">
                2
              </div>
              <p className="mt-2 text-sm uppercase tracking-wider text-white/70">
                Disease Modules
              </p>
            </div>

          </div>
        </div>

        
      </section>


      {/* =====================================================
          PLATFORM MODULES
      ===================================================== */}
      <section className="bg-mca-offwhite py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mca-orange">
              Platform Modules
            </p>

            <h2 className="mt-3 text-3xl font-bold text-mca-charcoal sm:text-4xl">
              Health intelligence at your fingertips
            </h2>

            <p className="mt-4 max-w-2xl text-mca-steel">
              Explore the EOHA tools designed to transform environmental and
              health data into actionable intelligence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {modules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mca-orange/40 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-mca-orange/10 text-mca-orange transition group-hover:bg-mca-orange group-hover:text-white">
                  {module.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-mca-charcoal">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-mca-steel">
                  {module.description}
                </p>

                <span className="mt-6 inline-block font-semibold text-mca-orange">
                  Explore →
                </span>
              </Link>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          MALARIA
      ===================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">

          <div>
            <span className="inline-block rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
              Malaria Surveillance
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-mca-charcoal sm:text-4xl">
              Real-time vector risk at ward level
            </h2>

            <p className="mt-5 leading-8 text-mca-steel">
              By combining land surface temperature, soil moisture, and NDWI
              water index from Sentinel-2 and MODIS satellites, EOHA models
              mosquito vector suitability down to individual ward boundaries
              across Limpopo.
            </p>

            <Link
              href="/eoha/malaria"
              className="mt-7 inline-flex rounded-md bg-mca-orange px-6 py-3 font-semibold text-white transition hover:bg-mca-orange/90"
            >
              Open Dashboard →
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/hartbeesdam_oli2_20220810_lrg.jpg"
              alt="Satellite view used in malaria risk modelling"
              className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

        </div>
      </section>


      {/* =====================================================
          NCD
      ===================================================== */}
      <section className="bg-mca-offwhite py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">

          <div className="order-2 overflow-hidden rounded-2xl shadow-xl lg:order-1">
            <img
              src="/images/image-01-ncd-wheel-hie_hires.jpg"
              alt="NCD risk wheel"
              className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="order-1 lg:order-2">

            <span className="inline-block rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
              NCD Prediction
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-mca-charcoal sm:text-4xl">
              Modelling non-communicable disease trajectories
            </h2>

            <p className="mt-5 leading-8 text-mca-steel">
              EOHA integrates geospatial demographics, urban sprawl
              indicators, NO₂ and PM2.5 air quality data, and population
              density to forecast NCD risk across African countries and
              provinces.
            </p>

            <Link
              href="/eoha/ncd"
              className="mt-7 inline-flex rounded-md bg-mca-orange px-6 py-3 font-semibold text-white transition hover:bg-mca-orange/90"
            >
              Open Dashboard →
            </Link>

          </div>

        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-block rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
              The Pipeline
            </span>

            <h2 className="mt-5 text-3xl font-bold text-mca-charcoal sm:text-4xl">
              From satellite to health intelligence
            </h2>

            <p className="mt-4 text-mca-steel">
              Three steps between raw Earth observation data and actionable
              public health decisions.
            </p>

          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">

            {steps.map((step) => (
              <div
                key={step.number}
                className="relative text-center"
              >

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-mca-orange/10 text-mca-orange">
                  {step.icon}
                </div>

                <div className="mx-auto mt-[-90px] flex h-7 w-7 translate-x-8 -translate-y-1 items-center justify-center rounded-full bg-mca-orange text-xs font-bold text-white">
                  {step.number}
                </div>

                <h3 className="mt-12 text-xl font-bold text-mca-charcoal">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm leading-7 text-mca-steel">
                  {step.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>


      {/* =====================================================
          EARTH OBSERVATION GALLERY
      ===================================================== */}
      <section className="bg-mca-offwhite py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-block rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
              Earth Observation
            </span>

            <h2 className="mt-5 text-3xl font-bold text-mca-charcoal sm:text-4xl">
              Powered by satellite data
            </h2>

            <p className="mt-4 text-mca-steel">
              Our machine surveillance platform draws from Sentinel-2, MODIS,
              and SANSA satellite archives to deliver environmental
              intelligence.
            </p>

          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">

            <div className="group overflow-hidden rounded-xl">
              <img
                src="/images/hartbeesdam_oli2_20220810_lrg.jpg"
                alt="Dam satellite view"
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="group overflow-hidden rounded-xl">
              <img
                src="/images/iss072e807123_lrg.jpg"
                alt="International Space Station imagery"
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

            <div className="group overflow-hidden rounded-xl">
              <img
                src="/images/northatlantic_tmo_2017197_lrg.jpg"
                alt="North Atlantic satellite view"
                className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          BUILT FOR AFRICA
      ===================================================== */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">

          <div>

            <span className="inline-block rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
              Built for Africa
            </span>

            <h2 className="mt-5 text-3xl font-bold leading-tight text-mca-charcoal sm:text-4xl">
              Purpose-built for the African context
            </h2>

            <p className="mt-5 leading-8 text-mca-steel">
              Leveraging local geospatial demographics and ward-level
              administrative boundaries, EOHA enables real-time disease
              surveillance and evidence-based policy formulation across the
              continent.
            </p>

          </div>

          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="/images/PIA04965.jpg"
              alt="Africa satellite view"
              className="h-[420px] w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>

        </div>
      </section>


      {/* =====================================================
          PARTNERS
      ===================================================== */}
      <section className="border-t border-gray-200 bg-mca-offwhite py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

          <p className="text-center text-sm font-semibold uppercase tracking-[0.2em] text-mca-steel">
            Supported by
          </p>

          <div className="mt-10 grid grid-cols-2 items-center gap-8 md:grid-cols-5">

            <div className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-sm">
              <img
                src="/images/Science-Technology_-and-Innovation-1024x382.jpg"
                alt="Department of Science, Technology and Innovation"
                className="max-h-16 max-w-full object-contain"
              />
            </div>

            <div className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-sm">
              <img
                src="/images/SANSA_Logo_small-1-1.jpg"
                alt="SANSA"
                className="max-h-16 max-w-full object-contain"
              />
            </div>

            <div className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-sm">
              <img
                src="/images/Partner_0010_Layer-1.jpg"
                alt="Partner"
                className="max-h-16 max-w-full object-contain"
              />
            </div>

            <div className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-sm">
              <img
                src="/images/TuksNovation-logo-2-menu-1.png"
                alt="TuksNovation"
                className="max-h-16 max-w-full object-contain"
              />
            </div>

            <div className="flex h-24 items-center justify-center rounded-lg bg-white p-4 shadow-sm">
              <img
                src="/images/uct-research-support-hub-navigator-funder-nrf_0.png"
                alt="National Research Foundation"
                className="max-h-16 max-w-full object-contain"
              />
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          EOHA CTA
      ===================================================== */}
      <section className="bg-mca-charcoal py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mca-orange">
            Medical Consortium of Africa
          </span>

          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Explore Earth Observation Health Analytics
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/70">
            Explore EOHA dashboards and discover how satellite data and
            health analytics can support better health intelligence across
            Africa.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/eoha/malaria"
              className="rounded-md bg-mca-orange px-6 py-3 font-semibold text-white transition hover:bg-mca-orange/90"
            >
              Explore Malaria Dashboard
            </Link>

            <Link
              href="/contact"
              className="rounded-md border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-mca-charcoal"
            >
              Contact MCA
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}