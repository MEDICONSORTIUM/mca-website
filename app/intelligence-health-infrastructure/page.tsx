import PageHeroBanner from "@/components/shared/PageHeroBanner";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    name: "Intelligent Portable Bathing Machine",
    image: "/products/portable-bathing-machine.png",
    description:
      "A convenient and professional portable bathing solution designed to provide comfortable assisted bathing and care for people who are bedridden or have limited mobility.",
  },
  {
    name: "Institutional Medical Grade Bedside Personal Cleaning Station",
    image: "/products/bedside-cleaning-station.png",
    description:
      "A professional bedside cleaning solution designed for hospitals, senior care facilities and other environments requiring strict infection prevention and professional personal care.",
  },
  {
    name: "SmartCare System",
    image: "/products/smartcare-system.png",
    description:
      "A multifunctional nursing bed that enables bedside bathing, washing and care without transferring the individual from the bed.",
  },
  {
    name: "DN-360-WB Wheelchair-Style Bathtub",
    image: "/products/dn-360-wb.png",
    description:
      "A wheelchair-accessible bathing solution designed to make bathing easier and safer while reducing physical strain on caregivers.",
  },
  {
    name: "DN-360-BB Automatic Bathing Machine",
    image: "/products/dn-360-bb.png",
    description:
      "An automatic horizontal bathing solution providing comfortable, efficient and safe bathing with adjustable settings and sound therapy.",
  },
  {
    name: "Toilet-Care Integrated Bed",
    image: "/products/toilet-care-bed.png",
    description:
      "A multifunctional nursing bed designed for bedridden individuals, providing bedside toileting assistance while supporting dignity, comfort and personal care.",
  },
  {
    name: "Medical Beds",
    image: "/products/medical-beds.png",
    description:
      "A range of electric medical and nursing beds designed for institutional and home care, including adjustable functions to support patient care and caregiver needs.",
  },
  {
    name: "Foldable Power Wheelchair",
    image: "/products/foldable-wheelchair.png",
    description:
      "A foldable electric wheelchair designed for convenient mobility, with a compact folded design and removable battery.",
  },
  {
    name: "Smart Wearing & Health Monitoring",
    image: "/products/smart-wearing.png",
    description:
      "Smart wearable solutions supporting location tracking, emergency alerts, two-way communication and remote health monitoring.",
  },
];

export default function AccessIHIPage() {
  return (
    <main className="bg-mca-offwhite min-h-screen">
      {/* Page heading */}
      <section className="bg-mca-charcoal py-20 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Intelligence Health Infrastructure (IHI)
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-200">
            Intelligent health infrastructure focuses on the intelligent rehabilitation care field, leveraging technological innovation to empower the silver economy ecosystem, enhance the new quality productivity of the industry, and drive the upgrading of the entire industrial chain of institutional rehabilitation care and home-based elderly care. Its full-stack products, such as Intelli-
           gent Portable Bathing Machine, Thoughtful Care System for Flexi- ble Home Care, intelligent companionship robots, intelligent wash and care
           beds, intelligent urination and defecation care robots, intelligent electric
           wheelchairs and electric assistive vehicles, directly address industry pain points and reshape the care process.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Product image */}
                <div className="relative flex h-64 items-center justify-center bg-white p-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-5"
                  />
                </div>

                {/* Product information */}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold text-mca-charcoal">
                    {product.name}
                  </h2>

                  <p className="mt-4 flex-1 text-sm leading-6 text-mca-steel">
                    {product.description}
                  </p>

                  {/* Enquire */}
                  <Link
                    href={`/contact?product=${encodeURIComponent(
                      product.name
                    )}`}
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-mca-orange px-5 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    Enquire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}