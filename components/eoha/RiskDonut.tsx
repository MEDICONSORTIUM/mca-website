const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type RiskDonutProps = {
  score: number | null;
  color: string;
  label: string;
  suffix: string;
};

export default function RiskDonut({ score, color, label, suffix }: RiskDonutProps) {
  const value = score ?? 0;
  const offset = CIRCUMFERENCE - (Math.min(Math.max(value, 0), 100) / 100) * CIRCUMFERENCE;

  return (
    <div className="relative mx-auto h-36 w-36">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold" style={{ color }}>
          {score === null ? "--" : label}
        </span>
        <span className="text-xs font-semibold text-mca-steel">
          {score === null ? `0% ${suffix}` : `${Math.round(value)}% ${suffix}`}
        </span>
      </div>
    </div>
  );
}
