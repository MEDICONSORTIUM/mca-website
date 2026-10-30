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

const platforms = [
  { href: "/eoha", label: "Access EOHA" },
  { href: "/intelligence-health-infrastructure", label: "Access IHI" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-mca-steel/20 bg-mca-charcoal">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image
            src="/mca-logo.jpg"
            alt="Medical Consortium of Africa logo"
            width={36}
            height={36}
            className="shrink-0 rounded-md"
          />

          <span className="text-sm font-bold leading-tight text-white sm:text-lg">
            Medical Consortium of Africa
          </span>
        </Link>

        <ul className="hidden items-center gap-x-6 text-sm xl:flex">
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

          {platforms.map((platform) => (
            <li key={platform.href}>
              <Link
                href={platform.href}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-md bg-mca-orange px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 ${
                  pathname.startsWith(platform.href) ? "ring-2 ring-white/40" : ""
                }`}
              >
                {platform.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/10 xl:hidden"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-6 w-6"
          >
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-nav-menu" className="border-t border-mca-steel/20 bg-mca-charcoal xl:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8">
            <ul className="flex flex-col gap-1 text-sm">
              {links.map((link) => {
                const active = pathname === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-md px-3 py-2.5 transition-colors ${
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
            </ul>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {platforms.map((platform) => (
                <Link
                  key={platform.href}
                  href={platform.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-mca-orange px-3 py-2.5 text-center text-sm font-semibold text-white transition hover:brightness-95"
                >
                  {platform.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
