"use client";

import Link from "next/link";
import Papa from "papaparse";
import { Download, Menu, Moon, Search, Sun, X } from "lucide-react";
import { startTransition, useEffect, useMemo, useState } from "react";
import styles from "./reports.module.css";

const DATA_URL = "/data/Limpopo_Risk_Jan25_Jan26_Safe.csv";
const PAGE_SIZE = 50;
const DEFAULT_MONTH = "Sep 2025";

type RiskLevel = "High" | "Moderate" | "Low";
type RiskFilter = "all" | "high" | "moderate" | "low";
type Status = "loading" | "ready" | "empty" | "error";
type SortKey = "ward" | "municipality" | "province" | "lst" | "soil" | "risk";
type ReportRow = {
  month: string;
  ward: string;
  municipality: string;
  province: string;
  lst: number;
  soil: number;
  risk: number;
  level: RiskLevel;
};
type SourceRow = {
  Month?: string;
  WardLabel?: string;
  Municipali?: string;
  Province?: string;
  LST_Surface_C?: number | string;
  Soil_Moisture?: number | string;
  NDWI_Water?: number | string;
  Population_Density_Per_KM2?: number | string;
};

const NAV_LINKS = [
  { label: "Dashboard", href: "/eoha/malaria" },
  { label: "Forecasting", href: "/eoha/forecasting" },
  { label: "Resource Center", href: "/eoha/resource-center" },
  { label: "Reports", href: "/eoha/reports" },
];

const COLUMNS: { key: SortKey; label: string; numeric?: boolean }[] = [
  { key: "ward", label: "Ward" },
  { key: "municipality", label: "Municipality" },
  { key: "province", label: "Province" },
  { key: "lst", label: "LST (°C)", numeric: true },
  { key: "soil", label: "Soil Moisture", numeric: true },
  { key: "risk", label: "Risk %", numeric: true },
];

const riskButtonStyles: Record<RiskFilter, string> = {
  all: "",
  high: "riskHigh",
  moderate: "riskModerate",
  low: "riskLow",
};

const badgeStyles: Record<RiskLevel, string> = {
  High: "badgeHigh",
  Moderate: "badgeModerate",
  Low: "badgeLow",
};

function numeric(value: number | string | undefined): number {
  const result = Number(value);
  return Number.isFinite(result) ? result : 0;
}

function calculateRisk(row: SourceRow): number {
  const soil = numeric(row.Soil_Moisture);
  const lst = numeric(row.LST_Surface_C);
  const ndwi = numeric(row.NDWI_Water);
  const population = numeric(row.Population_Density_Per_KM2);
  let risk = 0;

  if (soil > 0.35) risk += 40;
  else if (soil > 0.25) risk += 20;
  if (lst >= 25 && lst <= 30) risk += 30;
  if (ndwi > -0.1) risk += 20;
  if (population > 300) risk += 10;

  return risk;
}

function getRiskLevel(risk: number): RiskLevel {
  if (risk >= 50) return "High";
  if (risk >= 25) return "Moderate";
  return "Low";
}

function exportCsv(rows: ReportRow[]) {
  const header = ["Month", "Ward", "Municipality", "Province", "LST_C", "Soil_Moisture", "Risk_%", "Risk_Level"];
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const body = rows.map((row) => [
    row.month,
    row.ward,
    row.municipality,
    row.province,
    row.lst.toFixed(1),
    row.soil.toFixed(3),
    row.risk,
    row.level,
  ]);
  const csv = [header, ...body].map((line) => line.map(escape).join(",")).join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "malaria_risk_report.csv";
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function MalariaReportsPage() {
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState("");
  const [month, setMonth] = useState(DEFAULT_MONTH);
  const [municipality, setMunicipality] = useState("all");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: SortKey; direction: 1 | -1 }>({ key: "risk", direction: -1 });
  const [page, setPage] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const loadRows = async () => {
      try {
        const response = await fetch(DATA_URL);
        if (!response.ok) throw new Error(`Could not load report data (HTTP ${response.status})`);
        const csv = await response.text();
        if (!active) return;

        const result = Papa.parse<SourceRow>(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        if (result.errors.length) throw new Error(result.errors[0].message);

        const parsed = result.data
          .filter((row) => row.Month && row.WardLabel)
          .map((row) => {
            const risk = calculateRisk(row);
            return {
              month: String(row.Month),
              ward: String(row.WardLabel || "Unnamed ward"),
              municipality: String(row.Municipali || "Unknown"),
              province: String(row.Province || "Limpopo"),
              lst: numeric(row.LST_Surface_C),
              soil: numeric(row.Soil_Moisture),
              risk,
              level: getRiskLevel(risk),
            };
          });
        setRows(parsed);
        setMonth(parsed.some((row) => row.month === DEFAULT_MONTH) ? DEFAULT_MONTH : parsed.at(-1)?.month ?? "");
        setStatus(parsed.length ? "ready" : "empty");
      } catch (loadError) {
        if (!active) return;
        setError(loadError instanceof Error ? loadError.message : "Unknown error");
        setStatus("error");
      }
    };

    void loadRows();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    startTransition(() => {
      setTheme(window.localStorage.getItem("eoha-theme") === "dark" ? "dark" : "light");
    });
  }, []);

  const months = useMemo(() => [...new Set(rows.map((row) => row.month))], [rows]);
  const municipalities = useMemo(
    () => [...new Set(rows.filter((row) => month === "all" || row.month === month).map((row) => row.municipality))].sort(),
    [rows, month]
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (month !== "all" && row.month !== month) return false;
      if (municipality !== "all" && row.municipality !== municipality) return false;
      if (riskFilter === "high" && row.risk < 50) return false;
      if (riskFilter === "moderate" && (row.risk < 25 || row.risk >= 50)) return false;
      if (riskFilter === "low" && row.risk >= 25) return false;
      if (normalizedQuery && !row.ward.toLowerCase().includes(normalizedQuery)) return false;
      return true;
    });
  }, [rows, month, municipality, riskFilter, query]);

  const sorted = useMemo(() => {
    const { key, direction } = sort;
    return [...filtered].sort((first, second) => {
      const left = first[key];
      const right = second[key];
      if (typeof left === "string" && typeof right === "string") {
        return left.localeCompare(right, undefined, { numeric: true }) * direction;
      }
      return (Number(left) - Number(right)) * direction;
    });
  }, [filtered, sort]);

  const stats = useMemo(() => {
    const high = filtered.filter((row) => row.risk >= 50).length;
    const moderate = filtered.filter((row) => row.risk >= 25 && row.risk < 50).length;
    const low = filtered.filter((row) => row.risk < 25).length;
    const average = filtered.length
      ? Math.round(filtered.reduce((sum, row) => sum + row.risk, 0) / filtered.length)
      : 0;
    return { total: filtered.length, high, moderate, low, average };
  }, [filtered]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const visibleRows = sorted.slice(safePage * PAGE_SIZE, (safePage + 1) * PAGE_SIZE);
  const defaultMonth = months.includes(DEFAULT_MONTH) ? DEFAULT_MONTH : months.at(-1) ?? "";
  const hasFilters = month !== defaultMonth || municipality !== "all" || riskFilter !== "all" || query.length > 0;

  const changeTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("eoha-theme", nextTheme);
    setTheme(nextTheme);
  };

  const resetFilters = () => {
    setMonth(defaultMonth);
    setMunicipality("all");
    setRiskFilter("all");
    setQuery("");
    setPage(0);
  };

  const toggleSort = (key: SortKey) => {
    setSort((current) => ({
      key,
      direction: current.key === key ? (current.direction === 1 ? -1 : 1) : 1,
    }));
    setPage(0);
  };

  const statCards = [
    { label: "Wards Monitored", value: stats.total, tone: "" },
    { label: "High Risk Wards", value: stats.high, tone: styles.statDanger },
    { label: "Moderate Risk Wards", value: stats.moderate, tone: styles.statWarn },
    { label: "Low Risk Wards", value: stats.low, tone: styles.statOk },
    { label: "Average Risk", value: `${stats.average}%`, tone: "" },
  ];

  return (
    <div className={styles.pageLayout} data-theme={theme}>
      <header className={styles.topBar}>
        <div className={styles.brandPill}><h1>Malaria Guard</h1></div>

        <nav className={styles.navPill} aria-label="Malaria Guard">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={link.label === "Reports" ? "page" : undefined}
              className={link.label === "Reports" ? styles.activeLink : undefined}
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
            aria-controls="reports-mobile-navigation"
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
          <nav id="reports-mobile-navigation" className={styles.mobileNav} aria-label="Malaria Guard">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                aria-current={link.label === "Reports" ? "page" : undefined}
                className={link.label === "Reports" ? styles.mobileActiveLink : undefined}
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
            <h2>Malaria Risk Reports</h2>
            <p className={styles.contentSubtitle}>
              Ward-level risk summary — Limpopo Province · {status === "loading" ? "Loading…" : month === "all" ? "All Months" : month || "All Months"}
            </p>
          </div>
          <button type="button" className={styles.exportButton} onClick={() => exportCsv(sorted)} disabled={!sorted.length}>
            <Download size={16} aria-hidden="true" />
            Export CSV
          </button>
        </div>

        <section className={styles.filterBar} aria-label="Report filters">
          <label className={styles.filterGroup}>
            <span className={styles.filterLabel}>Month</span>
            <select className={styles.filterSelect} value={month} onChange={(event) => { setMonth(event.target.value); setMunicipality("all"); setPage(0); }}>
              <option value="all">All Months</option>
              {months.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <label className={styles.filterGroup}>
            <span className={styles.filterLabel}>Municipality</span>
            <select className={styles.filterSelect} value={municipality} onChange={(event) => { setMunicipality(event.target.value); setPage(0); }}>
              <option value="all">All Municipalities</option>
              {municipalities.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Risk Level</span>
            <div className={styles.riskToggle} role="group" aria-label="Filter by risk level">
              {(["all", "high", "moderate", "low"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={riskFilter === item}
                  className={`${styles.riskButton} ${riskFilter === item ? styles.riskActive : ""} ${styles[riskButtonStyles[item]] ?? ""}`}
                  onClick={() => { setRiskFilter(item); setPage(0); }}
                >
                  {item === "all" ? "All" : item[0].toUpperCase() + item.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <label className={`${styles.filterGroup} ${styles.searchGroup}`}>
            <span className={styles.filterLabel}>Search Ward</span>
            <span className={styles.searchWrap}>
              <Search className={styles.searchIcon} size={15} aria-hidden="true" />
              <input
                className={styles.filterInput}
                value={query}
                onChange={(event) => { setQuery(event.target.value); setPage(0); }}
                placeholder="e.g. LIM331_1"
                type="search"
              />
            </span>
          </label>

          <button type="button" className={styles.resetButton} onClick={resetFilters} disabled={!hasFilters}>× Reset</button>
        </section>

        <section className={styles.statRow} aria-label="Filtered report summary">
          {statCards.map((card) => (
            <div key={card.label} className={`${styles.statCard} ${card.tone}`}>
              <p className={styles.statLabel}>{card.label}</p>
              <h3 className={styles.statValue}>{status === "ready" ? card.value : "—"}</h3>
            </div>
          ))}
        </section>

        <section className={styles.tableWrapper} aria-label="Ward-level malaria risk report">
          <table className={styles.reportTable}>
            <thead>
              <tr>
                {COLUMNS.map((column) => {
                  const active = sort.key === column.key;
                  return (
                    <th key={column.key} scope="col" aria-sort={active ? (sort.direction === 1 ? "ascending" : "descending") : "none"} className={column.numeric ? styles.numericCell : undefined}>
                      <button type="button" className={styles.sortButton} onClick={() => toggleSort(column.key)}>
                        {column.label}<span aria-hidden="true">{active ? (sort.direction === 1 ? "↑" : "↓") : "⇅"}</span>
                      </button>
                    </th>
                  );
                })}
                <th scope="col">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {status === "loading" && <tr><td colSpan={7} className={styles.messageCell}>Loading report data…</td></tr>}
              {status === "error" && <tr><td colSpan={7} className={styles.messageCell}>{error || "Failed to load report data."}</td></tr>}
              {status === "empty" && <tr><td colSpan={7} className={styles.messageCell}>No report records are available.</td></tr>}
              {status === "ready" && visibleRows.length === 0 && <tr><td colSpan={7} className={styles.messageCell}>No wards match the current filters.</td></tr>}
              {status === "ready" && visibleRows.map((row, index) => (
                <tr key={`${row.month}-${row.ward}-${index}`}>
                  <td>{row.ward}</td>
                  <td>{row.municipality}</td>
                  <td>{row.province}</td>
                  <td className={styles.numericCell}>{row.lst.toFixed(1)}</td>
                  <td className={styles.numericCell}>{row.soil.toFixed(3)}</td>
                  <td className={styles.numericCell}><strong>{row.risk}%</strong></td>
                  <td><span className={`${styles.badge} ${styles[badgeStyles[row.level]]}`}>{row.level}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {status === "ready" && sorted.length > PAGE_SIZE && (
          <div className={styles.pagination}>
            <span>{safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, sorted.length)} of {sorted.length} wards</span>
            <div>
              <button type="button" onClick={() => setPage(safePage - 1)} disabled={safePage === 0}>Previous</button>
              <button type="button" onClick={() => setPage(safePage + 1)} disabled={safePage >= pageCount - 1}>Next</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}