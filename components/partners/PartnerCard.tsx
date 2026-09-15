import Image from "next/image";
import type { Partner } from "@/types";

export default function PartnerCard({
  partner,
}: {
  partner: Partner;
}) {
  return (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-[235px] flex-col rounded-xl border border-mca-steel/20 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-24 w-full overflow-hidden rounded-md border border-mca-steel/20 bg-white">
        <Image
          src={partner.logoSrc}
          alt={partner.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-mca-charcoal">
          {partner.name}
        </h3>

        <span className="mt-2 inline-block rounded-full bg-mca-offwhite px-3 py-1 text-xs text-mca-steel">
          {partner.category}
        </span>
      </div>
    </a>
  );
}