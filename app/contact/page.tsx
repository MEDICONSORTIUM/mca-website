
import PageHeroBanner from "@/components/shared/PageHeroBanner";
import ContactForm from "@/components/shared/ContactForm";
import MapEmbed from "@/components/shared/MapEmbed";

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
      <section className="mx-auto grid max-w-6xl gap-10 bg-white px-6 py-12 sm:px-8 sm:py-16 md:grid-cols-2 md:gap-12">
        
        {/* Contact form */}
        <div>
          <ContactForm />
        </div>

        {/* Map and contact information */}
        <div>
          
          {/* Interactive office map */}
          <MapEmbed
            latitude={-25.755398932781038}  
            longitude={28.231070248556257}
            officeName="Medical Consortium of Africa"
            address="TODO: confirm with MCA"
          />

          {/* Contact details */}
          <ul className="mt-6 space-y-3 text-sm text-[#6B7280]">
            
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C85A1A]" />
                TUKS-NOVATION
                Room 14-4, Humanities Building
                University of Pretoria
                Hatfield, 0002
                Pretoria, South Africa
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C85A1A]" />
              Info@medicalconsortiumofafrica.co.za
            </li>

            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1 flex-shrink-0 rounded-full bg-[#C85A1A]" />
              <a
                href="https://www.linkedin.com/company/medical-consortium-of-africa-mca"
                className="transition-colors hover:text-[#C85A1A]"
              >
                LinkedIn : Medical Consortium of Africa
              </a>
            </li>

          </ul>
        </div>
      </section>
    </main>
  );
}
