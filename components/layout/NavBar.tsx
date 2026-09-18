"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mca-steel/20 bg-mca-charcoal">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/mca-logo.jpg"
            alt="Medical Consortium of Africa logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <span className="text-base font-bold text-white sm:text-lg">
            Medical Consortium of Africa
          </span>
        </Link>

        <ul className="hidden items-center gap-x-6 text-sm lg:flex">
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
              href="https://eoha.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-mca-orange px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
            >
              Access the Platform
            </a>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-md text-white lg:hidden"
        >
          <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-nav-menu" className="border-t border-mca-steel/20 bg-mca-charcoal lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4 text-sm sm:px-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-md px-3 py-2 transition-colors ${
                      active
                        ? "bg-white/10 font-semibold text-white"
                        : "font-medium text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li className="mt-2">
              <a
                href="https://eoha.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-mca-orange px-3 py-2 text-center font-semibold text-white transition hover:brightness-95"
              >
                Access the Platform
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
