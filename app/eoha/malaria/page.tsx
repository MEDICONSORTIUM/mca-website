"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import ModuleHeader from "@/components/eoha/ModuleHeader";
import RiskDonut from "@/components/eoha/RiskDonut";
import type { LatLng, MapFocus, MapView, RiskPoint } from "@/components/eoha/RiskMap";
import {
  RISK_COLORS,
  formatMunicipalityName,
  loadWards,
  riskBreakdown,
  riskColor,
  riskLevel,
  type RiskLevel,
  type WardRecord,
} from "@/lib/eoha/malaria";

const RiskMap = dynamic(() => import("@/components/eoha/RiskMap"), {
  ssr: false,
  loading: () => <MapMessage text="Loading map…" />,
});

type RiskFilter = "all" | RiskLevel;

const HOME: MapView = { center: [-29, 25.5], zoom: 5 };

const MALARIA_LINKS = [
  { href: "/eoha/malaria", label: "Dashboard" },
  { href: "/eoha/forecasting", label: "Forecasting" },
  { href: "/eoha/reports", label: "Reports" },
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RISK_FILTERS: { value: RiskFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "High", label: "High" },
  { value: "Moderate", label: "Mod" },
  { value: "Low", label: "Low" },
];

const EMPTY: WardRecord[] = [];

const card = "rounded-2xl bg-white p-5 shadow-sm";
const selectClass =
  "w-full rounded-lg border border-mca-steel/30 bg-white px-3 py-2 text-sm focus:border-mca-orange focus:outline-none disabled:bg-mca-offwhite disabled:text-mca-steel";

function monthKey(month: string): number {
  const [name, year] = month.split(" ");
  return Number(year) * 12 + MONTH_NAMES.indexOf(name.slice(0, 3));
}

function boundsOf(wards: WardRecord[]): LatLng[] {
  return wards.map((ward) => [ward.latitude, ward.longitude]);
}

function averageRisk(wards: WardRecord[]): number | null {
  if (wards.length === 0) return null;
  return Math.round(wards.reduce((total, ward) => total + ward.risk, 0) / wards.length);
}

function MapMessage({ text }: { text: string }) {
  return (
    <div className="flex h-full items-center justify-center bg-mca-offwhite px-6 text-center text-sm text-mca-steel">
      {text}
    </div>
  );
}

export default function MalariaDashboardPage() {
  const [wards, setWards] = useState<WardRecord[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [monthIndex, setMonthIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [focus, setFocus] = useState<MapFocus>({ kind: "home" });

  useEffect(() => {
    let active = true;
    loadWards()
      .then((data) => {
        if (active) setWards(data);
      })
      .catch((error: unknown) => {
        if (active) setLoadError(error instanceof Error ? error.message : "Unknown error.");
      });
    return () => {
      active = false;
    };
  }, []);

  const byMonth = useMemo(() => {
    const groups = new Map<string, WardRecord[]>();
    for (const ward of wards ?? EMPTY) {
      const list = groups.get(ward.month);
      if (list) list.push(ward);
      else groups.set(ward.month, [ward]);
    }
    return groups;
  }, [wards]);

  const months = useMemo(
    () => Array.from(byMonth.keys()).sort((a, b) => monthKey(a) - monthKey(b)),
    [byMonth],
  );

  useEffect(() => {
    if (!playing || months.length === 0) return;
    const timer = window.setInterval(() => {
      setMonthIndex((current) => ((current ?? months.length - 1) + 1) % months.length);
    }, 1200);
    return () => window.clearInterval(timer);
  }, [playing, months.length]);

  const lastIndex = Math.max(months.length - 1, 0);
  const activeIndex = Math.min(monthIndex ?? lastIndex, lastIndex);
  const activeMonth = months[activeIndex] ?? "";
  const monthWards = byMonth.get(activeMonth) ?? EMPTY;

  const provinces = useMemo(
    () => Array.from(new Set(monthWards.map((ward) => ward.province))).sort(),
    [monthWards],
  );

  const municipalities = useMemo(
    () =>
      province
        ? Array.from(
            new Set(monthWards.filter((ward) => ward.province === province).map((ward) => ward.municipality)),
          ).sort()
        : [],
    [monthWards, province],
  );

  const scopedWards = useMemo(
    () =>
      monthWards.filter(
        (ward) =>
          (!province || ward.province === province) &&
          (!municipality || ward.municipality === municipality),
      ),
    [monthWards, province, municipality],
  );

  const wardOptions = useMemo(
    () =>
      municipality
        ? [...scopedWards].sort((a, b) => a.ward.localeCompare(b.ward, undefined, { numeric: true }))
        : EMPTY,
    [scopedWards, municipality],
  );

  const visibleWards = useMemo(
    () =>
      riskFilter === "all" ? scopedWards : scopedWards.filter((ward) => riskLevel(ward.risk) === riskFilter),
    [scopedWards, riskFilter],
  );

  const points = useMemo<RiskPoint[]>(
    () =>
      visibleWards.map((ward) => ({
        id: ward.wardId,
        position: [ward.latitude, ward.longitude],
        color: riskColor(ward.risk),
        label: `${ward.ward} · ${ward.risk}% risk`,
      })),
    [visibleWards],
  );

  const counts = useMemo(() => {
    const totals: Record<RiskLevel, number> = { High: 0, Moderate: 0, Low: 0 };
    for (const ward of scopedWards) totals[riskLevel(ward.risk)] += 1;
    return totals;
  }, [scopedWards]);

  const selectedWard = useMemo(
    () => (selectedId ? monthWards.find((ward) => ward.wardId === selectedId) ?? null : null),
    [monthWards, selectedId],
  );

  const areaAverage = averageRisk(scopedWards);
  const areaName = municipality ? formatMunicipalityName(municipality) : province || "South Africa";
  const areaLabel = municipality ? "MUNICIPALITY AVERAGE" : province ? "PROVINCE AVERAGE" : "NATIONAL AVERAGE";

  function scopeFocus(nextProvince: string, nextMunicipality: string): MapFocus {
    if (nextMunicipality) {
      return { kind: "bounds", bounds: boundsOf(monthWards.filter((w) => w.municipality === nextMunicipality)) };
    }
    if (nextProvince) {
      return { kind: "bounds", bounds: boundsOf(monthWards.filter((w) => w.province === nextProvince)) };
    }
    return { kind: "home" };
  }

  function handleProvinceChange(value: string) {
    setProvince(value);
    setMunicipality("");
    setSelectedId(null);
    setFocus(scopeFocus(value, ""));
  }

  function handleMunicipalityChange(value: string) {
    setMunicipality(value);
    setSelectedId(null);
    setFocus(scopeFocus(province, value));
  }

  function handleWardSelect(id: string) {
    const ward = monthWards.find((w) => w.wardId === id);
    if (!ward) {
      setSelectedId(null);
      return;
    }
    setSelectedId(ward.wardId);
    setProvince(ward.province);
    setMunicipality(ward.municipality);
    setFocus({ kind: "point", center: [ward.latitude, ward.longitude], zoom: 13 });
  }

  function handleRecenter() {
    if (selectedWard) {
      setFocus({ kind: "point", center: [selectedWard.latitude, selectedWard.longitude], zoom: 13 });
    } else {
      setFocus(scopeFocus(province, municipality));
    }
  }

  function handleReset() {
    setProvince("");
    setMunicipality("");
    setSelectedId(null);
    setRiskFilter("all");
    setPlaying(false);
    setFocus({ kind: "home" });
  }

  const ready = wards !== null;

  return (
    <main className="min-h-screen bg-mca-offwhite text-mca-charcoal">
      <ModuleHeader title="Malaria Guard" links={MALARIA_LINKS} activeHref="/eoha/malaria" />

      <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[260px_minmax(0,1fr)_280px]">
        <aside className="space-y-5">
          <section className={card}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <h2 className="font-bold">Region Selector</h2>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-mca-steel hover:text-mca-orange"
              >
                Reset
              </button>
            </div>
            <p className="mb-4 text-sm text-mca-steel">Refine your spatial analysis</p>

            <div className="space-y-4">
              <div>
                <p className="mb-2 block text-sm font-medium">Country</p>
                <p className="rounded-lg bg-mca-offwhite px-3 py-2 text-sm">South Africa</p>
              </div>

              <div>
                <label htmlFor="province" className="mb-2 block text-sm font-medium">
                  Province
                </label>
                <select
                  id="province"
                  value={province}
                  onChange={(event) => handleProvinceChange(event.target.value)}
                  disabled={!ready}
                  className={selectClass}
                >
                  <option value="">All provinces</option>
                  {provinces.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="municipality" className="mb-2 block text-sm font-medium">
                  Municipality
                </label>
                <select
                  id="municipality"
                  value={municipality}
                  onChange={(event) => handleMunicipalityChange(event.target.value)}
                  disabled={!province}
                  className={selectClass}
                >
                  <option value="">All municipalities</option>
                  {municipalities.map((name) => (
                    <option key={name} value={name}>
                      {formatMunicipalityName(name)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="ward" className="mb-2 block text-sm font-medium">
                  Ward
                </label>
                <select
                  id="ward"
                  value={selectedId ?? ""}
                  onChange={(event) => handleWardSelect(event.target.value)}
                  disabled={!municipality}
                  className={selectClass}
                >
                  <option value="">Select a ward</option>
                  {wardOptions.map((ward) => (
                    <option key={ward.wardId} value={ward.wardId}>
                      {ward.ward}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <section className={card}>
            <h2 className="mb-2 font-bold">Risk Drivers</h2>

            {selectedWard ? (
              <div className="mt-4 space-y-4">
                {riskBreakdown(selectedWard).map((factor) => (
                  <div key={factor.label}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-mca-steel">{factor.label}</span>
                      <span className="font-semibold">{factor.display}</span>
                    </div>
                    <div className="h-2 rounded-full bg-mca-offwhite">
                      <div
                        className="h-2 rounded-full bg-mca-orange"
                        style={{ width: `${Math.min(Math.max(factor.fill, 0), 100)}%` }}
                      />
                    </div>
                    <p className="mt-1 text-xs text-mca-steel">
                      +{factor.points} of {factor.maxPoints} risk points
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm text-mca-steel">
                Select a ward on the map or from the list to see what drives its risk.
              </p>
            )}

            <p className="mt-5 rounded-lg bg-mca-offwhite p-3 text-xs leading-5 text-mca-steel">
              Risk score = soil moisture (40) + land surface temperature (30) + water index (20) +
              population density (10).
            </p>
          </section>
        </aside>

        <div className="min-w-0 space-y-5">
          <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="text-sm font-medium text-mca-orange">{areaName}</p>
                <h2 className="text-2xl font-bold">Ward-level Malaria Risk</h2>
              </div>
              <span className="rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
                {ready ? `${visibleWards.length.toLocaleString()} wards` : "Loading…"}
              </span>
            </div>

            <div className="relative isolate h-[420px] sm:h-[520px]">
              {loadError ? (
                <MapMessage text={`Could not load the ward data. ${loadError}`} />
              ) : !ready ? (
                <MapMessage text="Loading ward data…" />
              ) : (
                <RiskMap
                  points={points}
                  selectedId={selectedId}
                  onSelect={handleWardSelect}
                  focus={focus}
                  home={HOME}
                  radius={municipality ? 8 : 5}
                  showTooltips={points.length <= 400}
                />
              )}
            </div>
          </section>

          <section className={card}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPlaying((current) => !current)}
                  disabled={months.length === 0}
                  aria-label={playing ? "Pause timeline" : "Play timeline"}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mca-orange text-white transition hover:brightness-95 disabled:opacity-50"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    {playing ? (
                      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    ) : (
                      <path d="M7 4l13 8-13 8z" />
                    )}
                  </svg>
                </button>
                <h2 className="font-bold">Risk Timeline</h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-mca-orange/10 px-4 py-1.5 text-sm font-semibold text-mca-orange">
                  {activeMonth || "—"}
                </span>
                <button
                  type="button"
                  onClick={handleRecenter}
                  disabled={!ready}
                  aria-label="Recenter map"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-mca-steel/30 text-mca-steel hover:border-mca-orange hover:text-mca-orange disabled:opacity-50"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
                  </svg>
                </button>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={lastIndex}
              value={activeIndex}
              onChange={(event) => {
                setPlaying(false);
                setMonthIndex(Number(event.target.value));
              }}
              disabled={months.length === 0}
              aria-label="Select month"
              className="mt-5 w-full accent-mca-orange"
            />
            <div className="mt-2 flex justify-between text-xs text-mca-steel">
              <span>{months[0] ?? ""}</span>
              <span>{months[lastIndex] ?? ""}</span>
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className={card}>
            <p className="mb-4 text-xs font-bold tracking-wider text-mca-steel">SELECTED WARD RISK</p>
            <RiskDonut
              score={selectedWard ? selectedWard.risk : null}
              color={selectedWard ? riskColor(selectedWard.risk) : RISK_COLORS.empty}
              label={selectedWard ? riskLevel(selectedWard.risk) : "--"}
              suffix="RISK"
            />
            <h3 className="mt-4 text-center font-bold">{selectedWard ? selectedWard.ward : "Select a ward"}</h3>
            {selectedWard && (
              <p className="text-center text-sm text-mca-steel">
                {formatMunicipalityName(selectedWard.municipality)}, {selectedWard.province}
              </p>
            )}
          </section>

          <section className={card}>
            <p className="mb-4 text-xs font-bold tracking-wider text-mca-steel">{areaLabel}</p>
            <RiskDonut
              score={areaAverage}
              color={RISK_COLORS.average}
              label={areaAverage === null ? "--" : riskLevel(areaAverage)}
              suffix="AVG"
            />
            <h3 className="mt-4 text-center font-bold">{areaName}</h3>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-red-50 px-2 py-2 text-red-700">
                <p className="text-base font-bold">{counts.High}</p>
                High
              </div>
              <div className="rounded-lg bg-yellow-50 px-2 py-2 text-yellow-700">
                <p className="text-base font-bold">{counts.Moderate}</p>
                Moderate
              </div>
              <div className="rounded-lg bg-green-50 px-2 py-2 text-green-700">
                <p className="text-base font-bold">{counts.Low}</p>
                Low
              </div>
            </div>
          </section>

          <section className={card}>
            <h2 className="mb-4 font-bold">Map Legend</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: RISK_COLORS.high }} />
                High Risk ≥ 50%
              </li>
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: RISK_COLORS.moderate }} />
                Moderate 25–49%
              </li>
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: RISK_COLORS.low }} />
                Low Risk &lt; 25%
              </li>
            </ul>

            <p className="mb-2 mt-5 text-xs font-bold tracking-wider text-mca-steel">SHOW ON MAP</p>
            <div className="grid grid-cols-4 gap-1">
              {RISK_FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setRiskFilter(filter.value)}
                  aria-pressed={riskFilter === filter.value}
                  className={`rounded-lg px-1 py-2 text-xs font-semibold ${
                    riskFilter === filter.value ? "bg-mca-orange text-white" : "bg-mca-offwhite text-mca-steel"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
