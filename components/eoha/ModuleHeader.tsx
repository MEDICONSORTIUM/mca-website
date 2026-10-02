import Link from "next/link";

type ModuleLink = { href: string; label: string };

type ModuleHeaderProps = {
  title: string;
  links?: ModuleLink[];
  activeHref?: string;
};

export default function ModuleHeader({ title, links = [], activeHref }: ModuleHeaderProps) {
  return (
    <header className="border-b border-mca-steel/20 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="rounded-full bg-mca-charcoal px-5 py-2">
          <h1 className="text-base font-bold text-white sm:text-lg">{title}</h1>
        </div>

        {links.length > 0 && (
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) =>
              link.href === activeHref ? (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current="page"
                  className="border-b-2 border-mca-orange pb-1 text-sm font-semibold"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-mca-steel hover:text-mca-orange"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        )}

        <Link
          href="/eoha"
          className="rounded-full border border-mca-steel/30 px-4 py-2 text-sm font-semibold hover:border-mca-orange hover:text-mca-orange"
        >
          EOHA
        </Link>
      </div>
    </header>
  );
}
