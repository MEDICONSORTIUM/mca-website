"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-mca-steel/20 bg-mca-charcoal">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link href="/" className="text-lg font-bold text-white">
          MCA
        </Link>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 pb-1 transition-colors ${
                    active
                      ? "border-mca-orange font-semibold text-white"
                      : "border-transparent font-medium text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-mca-orange px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Access the Platform
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
