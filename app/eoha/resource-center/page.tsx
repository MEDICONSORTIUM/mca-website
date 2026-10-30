"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import styles from "./resource-center.module.css";

type Category = "research" | "data" | "methodology" | "tools";
type CategoryFilter = "all" | Category;
type Resource = {
  title: string;
  description: string;
  category: Category;
  icon: string;
  href?: string;
  linkLabel?: string;
  snippet?: string;
  staticLabel?: string;
};

const NAV_LINKS = [
  { label: "Dashboard", href: "/eoha/malaria" },
  { label: "Forecasting", href: "/eoha/forecasting" },
  { label: "Resource Center", href: "/eoha/resource-center" },
  { label: "Reports", href: "/eoha/reports" },
];

const FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "research", label: "Research" },
  { key: "data", label: "Data" },
  { key: "methodology", label: "Methodology" },
  { key: "tools", label: "Tools" },
];

const badgeStyles: Record<Category, string> = {
  research: "badgeResearch",
  data: "badgeData",
  methodology: "badgeMethodology",
  tools: "badgeTools",
};

const RESOURCES: Resource[] = [
  {
    title: "WHO World Malaria Report 2024",
    description: "Comprehensive annual assessment of malaria trends, interventions, and outcomes across Africa.",
    category: "research",
    icon: "📄",
    href: "https://www.who.int/teams/global-malaria-programme/reports/world-malaria-report-2024",
    linkLabel: "View Report →",
  },
  {
    title: "Earth Observation for Malaria Control",
    description: "Peer-reviewed review of satellite-derived environmental indicators and their role in malaria risk modelling in sub-Saharan Africa.",
    category: "research",
    icon: "📄",
    href: "https://www.mdpi.com/2072-4292/13/3/431",
    linkLabel: "Read Paper →",
  },
  {
    title: "NASA MODIS Land Surface Temperature",
    description: "MOD11A1 daily LST product at 1 km resolution — a key input to the EOHA malaria risk model.",
    category: "data",
    icon: "🛰️",
    href: "https://lpdaac.usgs.gov/products/mod11a1v061/",
    linkLabel: "Access Data →",
  },
  {
    title: "Sentinel-2 Multispectral Imagery",
    description: "ESA Copernicus Sentinel-2 surface reflectance data used to derive NDWI water indices and habitat classification.",
    category: "data",
    icon: "🌍",
    href: "https://dataspace.copernicus.eu/",
    linkLabel: "Access Data →",
  },
  {
    title: "South Africa Ward Boundaries (GeoJSON)",
    description: "Administrative level 3 boundaries used to aggregate risk scores at ward level across all provinces.",
    category: "data",
    icon: "📦",
    href: "https://www.geoboundaries.org/countryDownloads.html",
    linkLabel: "Access Data →",
  },
  {
    title: "EOHA Risk Scoring Methodology",
    description: "How EOHA combines soil moisture, land surface temperature, NDWI, and population density into a composite malaria risk score.",
    category: "methodology",
    icon: "📐",
    snippet: "Risk = SM(40) + LST(30) + NDWI(20) + PopDensity(10)",
    staticLabel: "Internal Document",
  },
  {
    title: "Random Forest Forecasting Model",
    description: "The 14-month time-series forecasting model trained on Limpopo ward-level EO data (Jan 2025 – Jan 2026) with 91.4% accuracy.",
    category: "methodology",
    icon: "🤖",
    staticLabel: "Internal Model",
  },
  {
    title: "Leaflet.js Interactive Maps",
    description: "Open-source mapping library powering the EOHA dashboard maps and heatmap overlays.",
    category: "tools",
    icon: "🗺️",
    href: "https://leafletjs.com",
    linkLabel: "Documentation →",
  },
  {
    title: "Chart.js Data Visualisation",
    description: "JavaScript charting library used in the Forecasting module to render time-series risk predictions.",
    category: "tools",
    icon: "📊",
    href: "https://www.chartjs.org/docs/latest/",
    linkLabel: "Documentation →",
  },
];

export default function ResourceCenterPage() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setTheme(window.localStorage.getItem("eoha-theme") === "dark" ? "dark" : "light");
    });
  }, []);

  const changeTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("eoha-theme", nextTheme);
    setTheme(nextTheme);
  };

  const visibleResources = category === "all" ? RESOURCES : RESOURCES.filter((resource) => resource.category === category);

  return (
    <div className={styles.pageLayout} data-theme={theme}>
      <header className={styles.topBar}>
        <div className={styles.brandPill}><h1>Malaria Guard</h1></div>

        <nav className={styles.navPill} aria-label="Malaria Guard">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.label === "Resource Center" ? "page" : undefined}
              className={link.label === "Resource Center" ? styles.activeLink : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="resource-center-mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>

          <button type="button" className={styles.iconButton} onClick={changeTheme} title="Toggle dark mode" aria-label="Toggle dark mode">
            {theme === "dark" ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>
          <Link href="/eoha" className={styles.eohaButton}>EOHA</Link>
        </div>

        {mobileMenuOpen && (
          <nav id="resource-center-mobile-navigation" className={styles.mobileNav} aria-label="Malaria Guard">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={link.label === "Resource Center" ? "page" : undefined}
                className={link.label === "Resource Center" ? styles.mobileActiveLink : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <main className={styles.contentArea}>
        <div className={styles.contentHeader}>
          <div>
            <h2>Resource Center</h2>
            <p className={styles.contentSubtitle}>Research papers, datasets, and methodology documentation</p>
          </div>
        </div>

        <div className={styles.filterBar} role="group" aria-label="Filter resources by category">
          {FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              aria-pressed={category === filter.key}
              className={`${styles.filterButton} ${category === filter.key ? styles.filterActive : ""}`}
              onClick={() => setCategory(filter.key)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <section className={styles.resourceGrid} aria-label="Resources">
          {visibleResources.map((resource) => (
            <article key={resource.title} className={styles.resourceCard}>
              <div className={styles.cardTop}>
                <span className={styles.resourceIcon} aria-hidden="true">{resource.icon}</span>
                <span className={`${styles.badge} ${styles[badgeStyles[resource.category]]}`}>{resource.category}</span>
              </div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              {resource.snippet && (
                <div className={styles.methodSnippet}><code>{resource.snippet}</code></div>
              )}
              {resource.href ? (
                <a href={resource.href} target="_blank" rel="noopener noreferrer" className={styles.resourceButton}>
                  {resource.linkLabel}
                </a>
              ) : (
                <span className={`${styles.resourceButton} ${styles.resourceButtonStatic}`}>{resource.staticLabel}</span>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
