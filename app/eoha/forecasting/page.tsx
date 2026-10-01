"use client";

import Link from "next/link";
import { useState } from "react";

type ForecastPoint = {
  day: string;
  risk: number;
  upper: number;
  lower: number;
};

const data7: ForecastPoint[] = [
  { day: "Day 1", risk: 32, upper: 42, lower: 22 },
  { day: "Day 2", risk: 36, upper: 47, lower: 25 },
  { day: "Day 3", risk: 41, upper: 52, lower: 29 },
  { day: "Day 4", risk: 45, upper: 57, lower: 33 },
  { day: "Day 5", risk: 51, upper: 63, lower: 39 },
  { day: "Day 6", risk: 55, upper: 67, lower: 43 },
  { day: "Day 7", risk: 58, upper: 70, lower: 46 },
];

const data30: ForecastPoint[] = [
  { day: "Day 1", risk: 32, upper: 42, lower: 22 },
  { day: "Day 5", risk: 38, upper: 48, lower: 28 },
  { day: "Day 10", risk: 45, upper: 56, lower: 34 },
  { day: "Day 15", risk: 51, upper: 63, lower: 39 },
  { day: "Day 20", risk: 47, upper: 59, lower: 35 },
  { day: "Day 25", risk: 56, upper: 68, lower: 44 },
  { day: "Day 30", risk: 61, upper: 73, lower: 49 },
];

const data90: ForecastPoint[] = [
  { day: "Day 1", risk: 32, upper: 42, lower: 22 },
  { day: "Day 15", risk: 41, upper: 52, lower: 30 },
  { day: "Day 30", risk: 61, upper: 73, lower: 49 },
  { day: "Day 45", risk: 55, upper: 67, lower: 43 },
  { day: "Day 60", risk: 48, upper: 60, lower: 36 },
  { day: "Day 75", risk: 57, upper: 69, lower: 45 },
  { day: "Day 90", risk: 64, upper: 76, lower: 52 },
];

export default function ForecastingPage() {
  const [range, setRange] = useState(7);
  const [province, setProvince] = useState("Limpopo");

  let forecastData = data7;

  if (range === 30) {
    forecastData = data30;
  }

  if (range === 90) {
    forecastData = data90;
  }

  const risks = forecastData.map((item) => item.risk);
  const uppers = forecastData.map((item) => item.upper);
  const lowers = forecastData.map((item) => item.lower);

  const mean = Math.round(
    risks.reduce((total, value) => total + value, 0) /
      risks.length
  );

  const upper = Math.max(...uppers);
  const lower = Math.min(...lowers);

  let peak = forecastData[0];

  forecastData.forEach((item) => {
    if (item.risk > peak.risk) {
      peak = item;
    }
  });

  const firstRisk = forecastData[0].risk;
  const lastRisk =
    forecastData[forecastData.length - 1].risk;

  let trend = "Stable";
  let trendArrow = "→";
  let trendDescription =
    "Risk remains relatively stable";

  if (lastRisk > firstRisk) {
    trend = "Worsening";
    trendArrow = "↗️";
    trendDescription =
      "Risk increasing over forecast window";
  }

  if (lastRisk < firstRisk) {
    trend = "Improving";
    trendArrow = "↘️";
    trendDescription =
      "Risk decreasing over forecast window";
  }

  return (
    <main className="min-h-screen bg-mca-offwhite text-mca-charcoal">

      {/* MALARIA GUARD NAVIGATION */}
      <header className="border-b border-mca-steel/20 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="rounded-full bg-mca-charcoal px-5 py-2">
            <h1 className="text-lg font-bold text-white">
              Malaria Guard
            </h1>
          </div>

          <nav className="hidden items-center gap-6 md:flex">

            <Link
              href="/eoha/malaria"
              className="text-sm font-medium text-mca-steel hover:text-mca-orange"
            >
              Dashboard
            </Link>

            <Link
              href="/eoha/forecasting"
              className="border-b-2 border-mca-orange pb-1 text-sm font-semibold"
            >
              Forecasting
            </Link>

            <Link
              href="/eoha/resource-center"
              className="text-sm font-medium text-mca-steel hover:text-mca-orange"
            >
              Resource Center
            </Link>

            <Link
              href="/eoha/reports"
              className="text-sm font-medium text-mca-steel hover:text-mca-orange"
            >
              Reports
            </Link>

          </nav>

          <Link
            href="/eoha"
            className="rounded-full border border-mca-steel/30 px-4 py-2 text-sm font-semibold hover:border-mca-orange hover:text-mca-orange"
          >
            EOHA
          </Link>

        </div>
      </header>


      {/* DASHBOARD */}
      <div className="mx-auto grid max-w-7xl gap-6 p-6 lg:grid-cols-[250px_1fr_270px]">


        {/* LEFT SIDEBAR */}
        <aside className="space-y-5">

          {/* FORECAST RANGE */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-2 flex items-center gap-3">
              <span className="text-xl text-mca-orange">
                📅
              </span>

              <h2 className="font-bold">
                Forecast Range
              </h2>
            </div>

            <p className="mb-4 text-sm text-mca-steel">
              Select prediction window
            </p>

            <div className="grid grid-cols-3 gap-2">

              <button
                type="button"
                onClick={() => setRange(7)}
                className={`rounded-lg px-2 py-2 text-sm font-semibold ${
                  range === 7
                    ? "bg-mca-orange text-white"
                    : "bg-mca-offwhite text-mca-steel"
                }`}
              >
                7 Days
              </button>

              <button
                type="button"
                onClick={() => setRange(30)}
                className={`rounded-lg px-2 py-2 text-sm font-semibold ${
                  range === 30
                    ? "bg-mca-orange text-white"
                    : "bg-mca-offwhite text-mca-steel"
                }`}
              >
                30 Days
              </button>

              <button
                type="button"
                onClick={() => setRange(90)}
                className={`rounded-lg px-2 py-2 text-sm font-semibold ${
                  range === 90
                    ? "bg-mca-orange text-white"
                    : "bg-mca-offwhite text-mca-steel"
                }`}
              >
                90 Days
              </button>

            </div>
          </section>


          {/* REGION */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-2 flex items-center gap-3">
              <span className="text-xl text-mca-orange">
                📍
              </span>

              <h2 className="font-bold">
                Region
              </h2>
            </div>

            <p className="mb-4 text-sm text-mca-steel">
              Filter by region
            </p>

            <label
              htmlFor="province"
              className="mb-2 block text-sm font-medium"
            >
              Province
            </label>

            <select
              id="province"
              value={province}
              onChange={(event) =>
                setProvince(event.target.value)
              }
              className="w-full rounded-lg border border-mca-steel/30 bg-white px-3 py-2 text-sm focus:border-mca-orange focus:outline-none"
            >
              <option value="Limpopo">
                Limpopo
              </option>

              <option value="Mpumalanga">
                Mpumalanga
              </option>

              <option value="KwaZulu-Natal">
                KwaZulu-Natal
              </option>
            </select>

          </section>


          {/* MODEL INFO */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center gap-3">
              <span className="text-xl text-mca-orange">
                📈
              </span>

              <h2 className="font-bold">
                Model Info
              </h2>
            </div>

            <div className="space-y-3 text-sm">

              <div className="flex justify-between border-b border-mca-steel/10 pb-2">
                <span className="text-mca-steel">
                  Algorithm
                </span>

                <span className="font-semibold">
                  Random Forest
                </span>
              </div>

              <div className="flex justify-between border-b border-mca-steel/10 pb-2">
                <span className="text-mca-steel">
                  Accuracy
                </span>

                <span className="font-semibold">
                  91.4%
                </span>
              </div>

              <div className="flex justify-between border-b border-mca-steel/10 pb-2">
                <span className="text-mca-steel">
                  Last trained
                </span>

                <span className="font-semibold">
                  Jan 2026
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-mca-steel">
                  Data source
                </span>

                <span className="text-right font-semibold">
                  Sentinel-2 / MODIS
                </span>
              </div>

            </div>

          </section>

        </aside>


        {/* MAIN CONTENT */}
        <section className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            <div>

              <p className="text-sm font-medium text-mca-orange">
                {province}
              </p>

              <h2 className="text-2xl font-bold">
                Malaria Risk Forecast
              </h2>

            </div>

            <span className="rounded-full bg-mca-orange/10 px-4 py-2 text-sm font-semibold text-mca-orange">
              Next {range} Days
            </span>

          </div>


          {/* SIMPLE SVG CHART */}
          <div className="w-full overflow-x-auto">

            <svg
              viewBox="0 0 800 400"
              className="min-w-[650px] w-full"
            >

              {/* GRID */}
              <line
                x1="60"
                y1="40"
                x2="770"
                y2="40"
                stroke="#e5e7eb"
              />

              <line
                x1="60"
                y1="115"
                x2="770"
                y2="115"
                stroke="#e5e7eb"
              />

              <line
                x1="60"
                y1="190"
                x2="770"
                y2="190"
                stroke="#e5e7eb"
              />

              <line
                x1="60"
                y1="265"
                x2="770"
                y2="265"
                stroke="#e5e7eb"
              />

              <line
                x1="60"
                y1="340"
                x2="770"
                y2="340"
                stroke="#e5e7eb"
              />


              {/* Y AXIS LABELS */}

              <text
                x="45"
                y="345"
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                0%
              </text>

              <text
                x="45"
                y="270"
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                25%
              </text>

              <text
                x="45"
                y="195"
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                50%
              </text>

              <text
                x="45"
                y="120"
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                75%
              </text>

              <text
                x="45"
                y="45"
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                100%
              </text>


              {/* HIGH RISK LINE */}
              <line
                x1="60"
                y1="190"
                x2="770"
                y2="190"
                stroke="#ef4444"
                strokeDasharray="6 5"
                opacity="0.5"
              />


              {/* FORECAST LINE */}

              <polyline
                points={forecastData
                  .map((item, index) => {
                    const x =
                      60 +
                      index * (710 / (forecastData.length - 1));

                    const y = 340 - item.risk * 3;

                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="#c85a1a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />


              {/* FORECAST POINTS */}

              {forecastData.map((item, index) => {

                const x =
                  60 +
                  index *
                    (710 /
                      (forecastData.length - 1));

                const y =
                  340 -
                  item.risk * 3;

                return (
                  <circle
                    key={item.day}
                    cx={x}
                    cy={y}
                    r="6"
                    fill="white"
                    stroke="#c85a1a"
                    strokeWidth="3"
                  />
                );
              })}


              {/* X AXIS LABELS */}

              {forecastData.map((item, index) => {

                const x =
                  60 +
                  index *
                    (710 /
                      (forecastData.length - 1));

                return (
                  <text
                    key={item.day}
                    x={x}
                    y="370"
                    textAnchor="middle"
                    fontSize="11"
                    fill="#6b7280"
                  >
                    {item.day}
                  </text>
                );
              })}

            </svg>

          </div>


          {/* RISK LEVELS */}
          <div className="mt-6 grid gap-2 text-center text-xs sm:grid-cols-3">

            <div className="rounded-lg bg-green-50 px-3 py-2 text-green-700">
              Low Risk &lt; 25%
            </div>

            <div className="rounded-lg bg-yellow-50 px-3 py-2 text-yellow-700">
              Moderate 25–49%
            </div>

            <div className="rounded-lg bg-red-50 px-3 py-2 text-red-700">
              High Risk ≥ 50%
            </div>

          </div>

        </section>


        {/* RIGHT SIDEBAR */}
        <aside className="space-y-5">


          {/* CONFIDENCE INTERVAL */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="mb-4 text-xs font-bold tracking-wider text-mca-steel">
              CONFIDENCE INTERVAL
            </p>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-sm text-mca-steel">
                  Upper bound
                </span>

                <span className="font-bold text-red-600">
                  {upper}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-mca-steel">
                  Mean forecast
                </span>

                <span className="font-bold">
                  {mean}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm text-mca-steel">
                  Lower bound
                </span>

                <span className="font-bold text-green-600">
                  {lower}%
                </span>
              </div>

            </div>

            <div className="mt-5 h-2 rounded-full bg-mca-offwhite">

              <div
                className="h-2 rounded-full bg-mca-orange"
                style={{
                  width: `${mean}%`,
                }}
              />

            </div>

          </section>


          {/* TREND */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="mb-3 text-xs font-bold tracking-wider text-mca-steel">
              TREND
            </p>

            <div className="flex items-center gap-3">

              <span className="text-3xl text-mca-orange">
                {trendArrow}
              </span>

              <span className="text-xl font-bold">
                {trend}
              </span>

            </div>

            <p className="mt-2 text-sm text-mca-steel">
              {trendDescription}
            </p>

          </section>


          {/* PEAK RISK */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">

            <p className="mb-3 text-xs font-bold tracking-wider text-mca-steel">
              PEAK RISK DAY
            </p>

            <h3 className="text-3xl font-bold text-mca-orange">
              {peak.day}
            </h3>

            <p className="mt-1 text-sm text-mca-steel">
              {peak.risk}% predicted risk
            </p>

          </section>


          {/* LEGEND */}
          <section className="rounded-2xl bg-white p-5 shadow-sm">

            <h2 className="mb-4 font-bold">
              Chart Legend
            </h2>

            <ul className="space-y-3 text-sm">

              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-mca-orange" />
                Predicted Risk
              </li>

              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-mca-orange/30" />
                Confidence Band
              </li>

              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                High Risk ≥ 50%
              </li>

              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                Moderate 25–49%
              </li>

              <li className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-green-500" />
                Low Risk &lt; 25%
              </li>

            </ul>

          </section>

        </aside>

      </div>

    </main>
  );
}