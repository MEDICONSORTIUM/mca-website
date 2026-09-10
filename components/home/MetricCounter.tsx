const metrics = [
  { value: 0, label: "Countries Covered" },
  { value: 0, label: "Research Partners" },
  { value: 0, label: "Datasets Processed" },
  { value: 0, label: "Publications" },
];

export default function MetricCounter() {
  return (
    <section className="bg-mca-charcoal py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-10 text-center lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="text-4xl font-bold text-white sm:text-5xl">
                {metric.value}
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
