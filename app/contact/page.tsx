import PageHeroBanner from "@/components/shared/PageHeroBanner";
import ContactForm from "@/components/shared/ContactForm";

export const CONTACT_SUBJECTS = [
  "General Enquiry",
  "Research Collaboration",
  "Partnership Opportunity",
  "Media / Press",
  "Technical Support",
] as const;

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Page hero */}
      <PageHeroBanner title="Contact Us" />

      {/* Contact section */}
      <section className="mx-auto grid max-w-6xl gap-12 bg-white px-4 py-16 md:grid-cols-2">
        {/* Contact form */}
        <div>
          <ContactForm />
        </div>

        {/* Map and contact information */}
        <div>
          {/* Map placeholder */}
          <div className="flex h-[400px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#6B7280]/40 bg-[#F5F5F5] text-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="#C85A1A"
              className="h-8 w-8"
            >
              <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 8 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z" />
            </svg>

            <p className="font-medium text-[#2C2C2C]">
              Interactive office map
            </p>

            <p className="text-sm text-[#6B7280]">
              [Google Maps / Leaflet]
            </p>
          </div>

          {/* Contact details */}
          <ul className="mt-6 space-y-3 text-sm text-[#6B7280]">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C85A1A]" />
              [Placeholder: MCA address, South Africa]
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C85A1A]" />
              Info@medicalconsortiumofafrica.co.za
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C85A1A]" />
              https://www.linkedin.com/company/medical-consortium-of-africa-mca
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}