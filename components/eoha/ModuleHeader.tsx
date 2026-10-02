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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="min-w-0 rounded-full bg-mca-charcoal px-4 py-2 sm:px-5">
          <h1 className="truncate text-sm font-bold text-white sm:text-lg">{title}</h1>
        </div>

        {links.length > 0 && (
          <nav aria-label={title} className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === activeHref ? "page" : undefined}
                className={
                  link.href === activeHref
                    ? "border-b-2 border-mca-orange pb-1 text-sm font-semibold"
                    : "text-sm font-medium text-mca-steel hover:text-mca-orange"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <Link
          href="/eoha"
          className="shrink-0 rounded-full border border-mca-steel/30 px-4 py-2 text-sm font-semibold hover:border-mca-orange hover:text-mca-orange"
        >
          EOHA
        </Link>
      </div>

      {links.length > 0 && (
        <nav aria-label={`${title} sections`} className="border-t border-mca-steel/10 md:hidden">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-2 sm:px-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={link.href === activeHref ? "page" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm ${
                  link.href === activeHref
                    ? "bg-mca-orange font-semibold text-white"
                    : "bg-mca-offwhite font-medium text-mca-steel"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
