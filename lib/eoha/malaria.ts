// Shared malaria data + risk logic for the EOHA pages.
// Ported from scripts/malaria/risk.js, scripts/malaria/data.js and scripts/malaria-reports.js.

export type RiskLevel = "High" | "Moderate" | "Low";

export type WardRecord = {
  month: string; // e.g. "Jan 2025"
  wardId: string; // WardID, stable across months
  ward: string; // WardLabel
  municipality: string; // Municipali (raw, e.g. "Polokwane Local Municipality")
  province: string;
  lst: number; // LST_Surface_C
  soilMoisture: number; // Soil_Moisture
  ndwi: number; // NDWI_Water
  populationDensity: number; // Population_Density_Per_KM2
  agricPercentage: number; // Agric_Percentage
  latitude: number;
  longitude: number;
  risk: number; // 0-100, from calculateRisk()
};

// The CSV must be reachable by the browser, so it lives under /public.
export const MALARIA_DATA_URL = "/data/Limpopo_Risk_Jan25_Jan26_Safe.csv";

/* ---------------------------- Risk logic ---------------------------- */

type RiskInputs = Pick<WardRecord, "soilMoisture" | "lst" | "ndwi" | "populationDensity">;

export type RiskFactor = {
  label: string;
  display: string;
  fill: number;
  points: number;
  maxPoints: number;
};

export function riskBreakdown(w: RiskInputs): RiskFactor[] {
  const soilPoints = w.soilMoisture > 0.35 ? 40 : w.soilMoisture > 0.25 ? 20 : 0;

  return [
    {
      label: "Soil moisture",
      display: `${(w.soilMoisture * 100).toFixed(0)}%`,
      fill: w.soilMoisture * 100,
      points: soilPoints,
      maxPoints: 40,
    },
    {
      label: "Land surface temp",
      display: `${w.lst.toFixed(1)}°C`,
      fill: (w.lst / 50) * 100,
      points: w.lst >= 25 && w.lst <= 30 ? 30 : 0,
      maxPoints: 30,
    },
    {
      label: "Water index (NDWI)",
      display: w.ndwi.toFixed(2),
      fill: ((w.ndwi + 1) / 2) * 100,
      points: w.ndwi > -0.1 ? 20 : 0,
      maxPoints: 20,
    },
    {
      label: "Population density",
      display: `${Math.round(w.populationDensity).toLocaleString()}/km²`,
      fill: (w.populationDensity / 1000) * 100,
      points: w.populationDensity > 300 ? 10 : 0,
      maxPoints: 10,
    },
  ];
}

export function calculateRisk(w: RiskInputs): number {
  const score = riskBreakdown(w).reduce((total, factor) => total + factor.points, 0);
  return Math.min(score, 100);
}

export function riskLevel(score: number): RiskLevel {
  if (score >= 50) return "High";
  if (score >= 25) return "Moderate";
  return "Low";
}

export const RISK_COLORS = {
  high: "#d93025",
  moderate: "#f9bb06",
  low: "#34a853",
  empty: "#cbd5e1",
  average: "#5c6c85",
} as const;

export function riskColor(score: number): string {
  const level = riskLevel(score);
  if (level === "High") return RISK_COLORS.high;
  if (level === "Moderate") return RISK_COLORS.moderate;
  return RISK_COLORS.low;
}

export function formatMunicipalityName(name: string): string {
  return name.replace(/ Local Municipality$/i, "");
}

/* ---------------------------- CSV parsing --------------------------- */

// Minimal CSV parser: quoted fields, escaped quotes, CRLF and a BOM.
export function parseCsv(text: string): Record<string, string>[] {
  const table: string[][] = [];
  let row: string[] = [];
  let cur = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        cur += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cur);
      cur = "";
      if (row.length > 1 || row[0] !== "") table.push(row);
      row = [];
    } else {
      cur += c;
    }
  }
  if (cur !== "" || row.length) {
    row.push(cur);
    table.push(row);
  }

  const [head, ...body] = table;
  if (!head) return [];
  const keys = head.map((h) => h.replace(/^\uFEFF/, "").trim());
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}

/* ----------------------------- Loading ------------------------------ */

function num(v: string | undefined): number {
  if (v === undefined || v === "") return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function toWards(rows: Record<string, string>[]): WardRecord[] {
  const wards: WardRecord[] = [];
  for (const r of rows) {
    if (!r.Month || !r.WardLabel) continue; // same filter as the original page

    const base = {
      lst: num(r.LST_Surface_C),
      soilMoisture: num(r.Soil_Moisture),
      ndwi: num(r.NDWI_Water),
      populationDensity: num(r.Population_Density_Per_KM2),
    };

    wards.push({
      month: r.Month,
      wardId: r.WardID || `${r.Municipali}-${r.WardLabel}`,
      ward: r.WardLabel,
      municipality: r.Municipali || "—",
      province: r.Province || "Limpopo",
      ...base,
      agricPercentage: num(r.Agric_Percentage),
      latitude: num(r.latitude),
      longitude: num(r.longitude),
      risk: calculateRisk(base),
    });
  }
  return wards;
}

// The file is about 14 MB, so download and parse it once and share the result
// between pages (reports, dashboard, forecasting).
let cache: Promise<WardRecord[]> | null = null;

export function loadWards(): Promise<WardRecord[]> {
  if (!cache) {
    cache = fetch(MALARIA_DATA_URL)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Could not load ${MALARIA_DATA_URL} (HTTP ${res.status})`);
        return toWards(parseCsv(await res.text()));
      })
      .catch((e) => {
        cache = null; // allow a retry
        throw e;
      });
  }
  return cache;
}
