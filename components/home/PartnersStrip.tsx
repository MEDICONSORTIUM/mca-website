import Link from "next/link";
import Image from "next/image";
import { partners } from "@/data/partners";

export default function PartnersStrip() {
  const featuredPartners = partners.slice(0, 5);

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mca-orange">
            Collaboration
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-mca-charcoal">
            Our Partners
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {featuredPartners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-28 items-center justify-center rounded-lg border border-mca-steel/20 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <div className="relative h-16 w-full">
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/partners"
            className="font-semibold text-mca-orange hover:underline"
          >
            View all partners →
          </Link>
        </div>
      </div>
    </section>
  );
}