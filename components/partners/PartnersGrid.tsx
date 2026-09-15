"use client";

import { useState } from "react";
import type { Partner } from "@/types";
import PartnerCard from "@/components/partners/PartnerCard";

type Category = "All" | "Academic" | "Government" | "NGO" | "Funder";

export default function PartnersGrid({
  partners,
}: {
  partners: Partner[];
}) {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");

  const categories: Category[] = [
    "All",
    "Academic",
    "Government",
    "NGO",
    "Funder",
  ];

  const filteredPartners =
    activeCategory === "All"
      ? partners
      : partners.filter(
          (partner) => partner.category === activeCategory
        );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={
              activeCategory === category
                ? "rounded-full bg-mca-orange px-5 py-2 text-sm text-white"
                : "rounded-full border border-mca-steel/20 bg-white px-5 py-2 text-sm text-mca-steel hover:border-mca-orange hover:text-mca-orange"
            }
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPartners.map((partner) => (
          <PartnerCard
            key={partner.name}
            partner={partner}
          />
        ))}

        <a
          href="/contact"
          className="flex min-h-[235px] flex-col items-center justify-center rounded-xl border border-dashed border-mca-steel/40 bg-white p-6 text-center hover:border-mca-orange hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mca-orange/10 text-2xl text-mca-orange">
            +
          </div>

          <span className="mt-4 text-sm font-medium text-mca-steel">
            Become a partner
          </span>
        </a>
      </div>
    </div>
  );
}