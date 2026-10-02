"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import ModuleHeader from "@/components/eoha/ModuleHeader";
import RiskDonut from "@/components/eoha/RiskDonut";
import type { LatLng, MapFocus, MapView, RiskPoint } from "@/components/eoha/RiskMap";

const RiskMap = dynamic(() => import("@/components/eoha/RiskMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-mca-offwhite text-sm text-mca-steel">
      Loading map…
    </div>
  ),
});

type Country = {
  name: string;
  position: LatLng;
  risk: number;
  regions: Record<string, string>;
};

const COUNTRIES: Country[] = [
  {
    name: "South Africa",
    position: [-30.5595, 22.9375],
    risk: 58,
    regions: {
      "Eastern Cape": "Bhisho",
      "Free State": "Bloemfontein",
      Gauteng: "Johannesburg",
      "KwaZulu-Natal": "Pietermaritzburg",
      Limpopo: "Polokwane",
      Mpumalanga: "Mbombela",
      "North West": "Mahikeng",
      "Northern Cape": "Kimberley",
      "Western Cape": "Cape Town",
    },
  },
  {
    name: "Botswana",
    position: [-22.3285, 24.6849],
    risk: 45,
    regions: {
      Central: "Serowe",
      Chobe: "Kasane",
      Francistown: "Francistown",
      Gaborone: "Gaborone",
      Ghanzi: "Ghanzi",
      Jwaneng: "Jwaneng",
      Kgalagadi: "Tsabong",
      Kgatleng: "Mochudi",
      Kweneng: "Molepolole",
      Lobatse: "Lobatse",
      Ngamiland: "Maun",
      "North-East": "Masunga",
      "Selebi-Phikwe": "Selebi-Phikwe",
      "South-East": "Ramotswa",
      Southern: "Kanye",
      Sowa: "Sowa Town",
    },
  },
  {
    name: "Zimbabwe",
    position: [-19.0154, 29.1549],
    risk: 63,
    regions: {
      Bulawayo: "Bulawayo",
      Harare: "Harare",
      Manicaland: "Mutare",
      "Mashonaland Central": "Bindura",
      "Mashonaland East": "Marondera",
      "Mashonaland West": "Chinhoyi",
      Masvingo: "Masvingo",
      "Matabeleland North": "Lupane",
      "Matabeleland South": "Gwanda",
      Midlands: "Gweru",
    },
  },
  {
    name: "Lesotho",
    position: [-29.61, 28.2336],
    risk: 52,
    regions: {
      Berea: "Teyateyaneng",
      "Butha-Buthe": "Butha-Buthe",
      Leribe: "Hlotse",
      Mafeteng: "Mafeteng",
      Maseru: "Maseru",
      "Mohale's Hoek": "Mohale's Hoek",
      Mokhotlong: "Mokhotlong",
      "Qacha's Nek": "Qacha's Nek",
      Quthing: "Moyeni",
      "Thaba-Tseka": "Thaba-Tseka",
    },
  },
];

const REGIONAL_AVERAGE = 58;

const FACTORS = [
  { label: "Lifestyle type", display: "Urban", fill: 70, bar: "bg-mca-orange" },
  { label: "Population density", display: "62%", fill: 62, bar: "bg-mca-orange" },
  { label: "Access to healthcare", display: "60%", fill: 60, bar: "bg-mca-orange" },
  { label: "Air quality index", display: "75 AQI", fill: 75, bar: "bg-yellow-400" },
  { label: "Obesity prevalence", display: "28%", fill: 28, bar: "bg-green-500" },
];

const COLORS = { high: "#d93025", moderate: "#f9bb06", low: "#34a853", empty: "#cbd5e1", average: "#5c6c85" };

const HOME: MapView = { center: [-24, 25], zoom: 4 };

const card = "rounded-2xl bg-white p-5 shadow-sm";
const selectClass =
  "w-full rounded-lg border border-mca-steel/30 bg-white px-3 py-2 text-sm focus:border-mca-orange focus:outline-none disabled:bg-mca-offwhite disabled:text-mca-steel";

function ncdLevel(score: number): string {
  if (score >= 70) return "High";
  if (score >= 50) return "Moderate";
  return "Low";
}

function ncdColor(score: number): string {
  if (score >= 70) return COLORS.high;
  if (score >= 50) return COLORS.moderate;
  return COLORS.low;
}

export default function NcdPredictionPage() {
  const [countryName, setCountryName] = useState("");
  const [region, setRegion] = useState("");
  const [focus, setFocus] = useState<MapFocus>({ kind: "home" });

  const country = COUNTRIES.find((item) => item.name === countryName) ?? null;
  const regions = country ? Object.keys(country.regions).sort() : [];
  const city = country && region ? country.regions[region] : "";

  const points = useMemo<RiskPoint[]>(
    () =>
      COUNTRIES.map((item) => ({
        id: item.name,
        position: item.position,
        color: ncdColor(item.risk),
        label: `${item.name} · ${item.risk}% NCD risk`,
      })),
    [],
  );

  function selectCountry(name: string) {
    const next = COUNTRIES.find((item) => item.name === name) ?? null;
    setCountryName(next ? next.name : "");
    setRegion("");
    setFocus(next ? { kind: "point", center: next.position, zoom: 6 } : { kind: "home" });
  }

  function handleReset() {
    setCountryName("");
    setRegion("");
    setFocus({ kind: "home" });
  }

  const regionName = city || region || countryName || "Select a region";

  return (
    <main className="min-h-screen bg-mca-offwhite text-mca-charcoal">
      <ModuleHeader title="NCD Risk Prediction" />

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
                <label htmlFor="country" className="mb-2 block text-sm font-medium">
                  Country
                </label>
                <select
                  id="country"
                  value={countryName}
                  onChange={(event) => selectCountry(event.target.value)}
                  className={selectClass}
                >
                  <option value="">Select a country</option>
                  {COUNTRIES.map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="region" className="mb-2 block text-sm font-medium">
                  Province / Region
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(event) => setRegion(event.target.value)}
                  disabled={!country}
                  className={selectClass}
                >
                  <option value="">Select a region</option>
                  {regions.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-2 block text-sm font-medium">City / Municipality</p>
                <p className="rounded-lg bg-mca-offwhite px-3 py-2 text-sm text-mca-steel">
                  {city || "Select a region first"}
                </p>
              </div>
            </div>
          </section>

          <section className={card}>
            <h2 className="mb-2 font-bold">Environmental &amp; Lifestyle Factors</h2>

            <div className="mt-4 space-y-4">
              {FACTORS.map((factor) => (
                <div key={factor.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-mca-steel">{factor.label}</span>
                    <span className="font-semibold">{factor.display}</span>
                  </div>
                  <div className="h-2 rounded-full bg-mca-offwhite">
                    <div className={`h-2 rounded-full ${factor.bar}`} style={{ width: `${factor.fill}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 rounded-lg bg-mca-offwhite p-3 text-xs leading-5 text-mca-steel">
              These factor values are illustrative placeholders until regional NCD data is connected.
            </p>
          </section>
        </aside>

        <section className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <p className="text-sm font-medium text-mca-orange">{country ? country.name : "Southern Africa"}</p>
              <h2 className="text-2xl font-bold">NCD Risk Overview</h2>
            </div>
            <span className="rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
              Country-level estimates
            </span>
          </div>

          <div className="relative isolate h-[420px] sm:h-[560px]">
            <RiskMap
              points={points}
              selectedId={countryName || null}
              onSelect={selectCountry}
              focus={focus}
              home={HOME}
              radius={14}
              showTooltips
            />
          </div>
        </section>

        <aside className="space-y-5">
          <section className={card}>
            <p className="mb-4 text-xs font-bold tracking-wider text-mca-steel">CURRENT REGIONAL RISK</p>
            <RiskDonut
              score={country ? country.risk : null}
              color={country ? ncdColor(country.risk) : COLORS.empty}
              label={country ? ncdLevel(country.risk) : "--"}
              suffix="RISK"
            />
            <h3 className="mt-4 text-center font-bold">{regionName}</h3>
            {country && <p className="text-center text-sm text-mca-steel">Based on the {country.name} estimate</p>}
          </section>

          <section className={card}>
            <p className="mb-4 text-xs font-bold tracking-wider text-mca-steel">REGIONAL AVERAGE</p>
            <RiskDonut score={REGIONAL_AVERAGE} color={COLORS.average} label={ncdLevel(REGIONAL_AVERAGE)} suffix="AVG" />
            <h3 className="mt-4 text-center font-bold">Southern Africa</h3>

            <ul className="mt-5 space-y-3 text-sm">
              {COUNTRIES.map((item) => (
                <li key={item.name}>
                  <div className="mb-1 flex justify-between">
                    <span className={item.name === countryName ? "font-semibold" : "text-mca-steel"}>{item.name}</span>
                    <span className="font-semibold">{item.risk}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-mca-offwhite">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${item.risk}%`, backgroundColor: ncdColor(item.risk) }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className={card}>
            <h2 className="mb-4 font-bold">Map Legend</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.high }} />
                High Risk ≥ 70%
              </li>
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.moderate }} />
                Moderate 50–69%
              </li>
              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS.low }} />
                Low Risk &lt; 50%
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </main>
  );
}
