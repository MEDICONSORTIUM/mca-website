"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 14, label: "Countries Covered" },
  { value: 27, label: "Research Partners" },
  { value: 340, label: "Datasets Processed" },
  { value: 18, label: "Publications" },
];

const DURATION = 1500;

export default function MetricCounter() {
  const sectionRef = useRef<HTMLElement>(null);
  const [displayed, setDisplayed] = useState<number[]>(() =>
    metrics.map(() => 0),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        if (reduceMotion) {
          setDisplayed(metrics.map((metric) => metric.value));
          return;
        }

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayed(metrics.map((metric) => Math.round(metric.value * eased)));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-mca-charcoal py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div key={metric.label}>
              <div className="text-4xl font-bold text-white sm:text-5xl">
                {displayed[index]}
              </div>
              <div className="mt-2 text-sm font-semibold text-mca-orange">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
