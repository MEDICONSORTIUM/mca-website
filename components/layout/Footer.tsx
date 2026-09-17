import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mca-charcoal text-white">
      {/* HOME-FTR-01 — three-column footer */}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">

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
          <p className="mb-2 font-semibold text-white">
            Contact
          </p>

          <p className="mt-1 text-mca-steel">
            Info@MedicalConsortiumOfAfrica.co.za
          </p>

          <p className="text-mca-steel">
            Medical Consortium of Africa<br />
            TUKSNOVATION<br />
            Room 14-4, Humanities Building<br />
            University of Pretoria<br />
            Hatfield, 0028<br />
            Pretoria, South Africa
          </p>
          {/* HOME-FTR-02 — LinkedIn placeholder */}
          <div className="mt-4 flex gap-3">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full border border-mca-steel/40 text-mca-steel transition-colors hover:border-mca-orange hover:bg-mca-orange hover:text-white"
              aria-hidden="true"
            >
              <FaLinkedinIn size={16} />
            </span>
          </div>
        </div>
      </div>

      {/* Copyright and privacy */}
      <div className="border-t border-white/10 bg-black/10 px-4 py-4 text-center text-xs text-mca-steel">
        {/* HOME-FTR-03 */}
        <p className="left">
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