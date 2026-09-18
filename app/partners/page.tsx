import PageHeroBanner from "@/components/shared/PageHeroBanner";

const logos = [
  { name: "SANSA", src: "/SANSA_Logo.jpg" },
  { name: "TuksNovation", src: "/TuksNovation-Logo.png" },
  { name: "TuksNovation", src: "/up-logo.jpg" },
  { name: "TuksNovation", src: "/nrf-logo.png" },
  // ...
];

const repeatedLogos = [...logos, ...logos, ...logos, ...logos];

export default function PartnersPage() {
  return (
    <main className="bg-white text-black">
      <PageHeroBanner title="Our Partners" />

      <section className="flex flex-col gap-8 px-6 py-10 sm:px-8 sm:py-12 md:flex-row">
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">Meet our Partners</h2>
          <p className="mt-2 text-gray-600">We are not doing this alone.</p>
          <a href="https://tuksnovation.co.za/portfolio/medical-consortium-of-africa/" className="mt-4 inline-block text-blue-600">Read more →</a>
        </div>
        <div className="h-48 flex-1 bg-gray-200 sm:h-64" />
      </section>

      <section className="overflow-hidden py-12">
        <div className="scroll-row flex w-max items-center gap-10 sm:gap-16">
          {repeatedLogos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-14 w-auto object-contain sm:h-20"
            />
          ))}
        </div>
      </section>

      <style>{`
        @keyframes scroll {
          to { transform: translateX(-25%); }
        }
        .scroll-row {
          animation: scroll 30s linear infinite;
        }
        .scroll-row:hover {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  );
}