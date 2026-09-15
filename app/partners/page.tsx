import type { Metadata } from "next";
import Link from "next/link";
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import PartnersGrid from "@/components/partners/PartnersGrid";
import { partners } from "@/data/partners";

export const metadata: Metadata = {
  title: "Partners | Medical Consortium of Africa",
  description:
    "Discover the Medical Consortium of Africa's academic, government, NGO and funding partners.",
};

// UC-3 — User Views Partners
export default function PartnersPage() {
  return (
    <>
      {/* PTR-01 */}
      <PageHeroBanner title="Our Partners" />

      {/* PTR-02 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-1 w-8 rounded-full bg-mca-orange" />

            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-mca-orange">
              Collaboration
            </span>
          </div>

          <p className="max-w-2xl text-mca-steel">
            The Medical Consortium of Africa collaborates with academic,
            government, NGO and funding partners to advance research,
            innovation and health outcomes across Africa.
          </p>
        </div>

        <PartnersGrid partners={partners} />
      </section>

      {/* PTR-06 */}
      <section className="bg-mca-offwhite py-16 text-center">
        <h2 className="mb-4 text-2xl font-semibold text-mca-charcoal">
          Become a Partner
        </h2>

        <p className="mx-auto mb-8 max-w-xl text-mca-steel">
          Interested in collaborating with the Medical Consortium of Africa?
          Get in touch with our team.
        </p>

        <Link
          href="/contact"
          className="inline-block rounded-md bg-mca-orange px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Become a Partner — Contact Us
        </Link>
      </section>
    </>
  );
}