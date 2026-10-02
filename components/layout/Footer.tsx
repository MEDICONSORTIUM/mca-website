import Link from "next/link";
import { FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mca-charcoal text-white">
      {/* HOME-FTR-01 — three-column footer */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-3">

        {/* Company */}
        <div>
          <p className="text-lg font-semibold text-white">
            Medical Consortium of Africa
          </p>

          <p className="mt-2 text-sm leading-6 text-mca-steel">
            Helping the world through Medical Innovation
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm">
          <p className="mb-1 font-semibold text-white">
            Navigation
          </p>

          <Link
            href="/"
            className="text-mca-steel transition-colors hover:text-mca-orange"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-mca-steel transition-colors hover:text-mca-orange"
          >
            About
          </Link>

          <Link
            href="/partners"
            className="text-mca-steel transition-colors hover:text-mca-orange"
          >
            Partners
          </Link>

          <Link
            href="/contact"
            className="text-mca-steel transition-colors hover:text-mca-orange"
          >
            Contact
          </Link>
        </nav>

        {/* Contact and social */}
        <div className="text-sm">
          <p className="mb-3 font-semibold text-white">Contact</p>

          <ul className="space-y-3 text-mca-steel">
            <li className="flex items-start gap-3">
              <FaPhoneAlt
                size={14}
                aria-hidden="true"
                className="mt-1 shrink-0 text-mca-orange"
              />
              <a
                href="tel:+27124203003"
                className="transition-colors hover:text-mca-orange"
              >
                +27 12 420 3003
              </a>
            </li>

            <li className="flex items-start gap-3">
              <FaEnvelope
                size={14}
                aria-hidden="true"
                className="mt-1 shrink-0 text-mca-orange"
              />
              <a
                href="mailto:Info@MedicalConsortiumOfAfrica.co.za"
                className="break-all transition-colors hover:text-mca-orange"
              >
                Info@MedicalConsortiumOfAfrica.co.za
              </a>
            </li>

            <li className="flex items-start gap-3">
              <FaMapMarkerAlt
                size={14}
                aria-hidden="true"
                className="mt-1 shrink-0 text-mca-orange"
              />
              <address className="not-italic leading-6">
                Medical Consortium of Africa<br />
                TUKSNOVATION<br />
                Room 14-4, Humanities Building<br />
                University of Pretoria<br />
                Hatfield, 0002<br />
                Pretoria, South Africa
              </address>
            </li>
          </ul>

          {/* HOME-FTR-02: LinkedIn */}
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.linkedin.com/company/medical-consortium-of-africa-mca"
              target="_blank"
              aria-label="Medical Consortium of Africa on LinkedIn (opens in a new tab)"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-mca-steel/40 text-mca-steel transition-colors hover:border-mca-orange hover:bg-mca-orange hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mca-orange"
            >
              <FaLinkedinIn size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright and privacy */}
      <div className="border-t border-white/10 bg-black/10 px-6 py-4 text-center text-xs text-mca-steel sm:px-8">
        {/* HOME-FTR-03 */}
        <p>
          © {year} Medical Consortium of Africa (PTY) LTD. All rights
          reserved.
        </p>

        {/* HOME-FTR-04 — POPIA notice */}
        <p className="mt-1">
          Read our{" "}
          <Link
            href="/privacy"
            className="text-mca-steel underline transition-colors hover:text-mca-orange"
          >
            Privacy Policy
          </Link>{" "}
          — data submitted via our contact form is handled in line with
          POPIA.
        </p>
      </div>
    </footer>
  );
}
