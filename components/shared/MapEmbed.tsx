
const OFFICE_LAT = -25.7479;
const OFFICE_LNG = 28.2293;

export default function MapEmbed() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // ERR-002 — static fallback if the API key is missing/invalid
  if (!apiKey) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center gap-2 rounded-lg bg-mca-offwhite text-center">
        <p className="font-medium text-mca-charcoal">
          [PLACEHOLDER: office address]
        </p>
        <p className="text-sm text-mca-steel">
          Map unavailable — Google Maps API key not configured.
        </p>
      </div>
    );
  }

  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${OFFICE_LAT},${OFFICE_LNG}`;

  return (
    // CON-MAP-04 — 100% width, ~400px on desktop, stacks below the form on mobile
    <iframe
      title="Medical Consortium of Africa office location"
      src={src}
      width="100%"
      height={400}
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-lg"
    />
  );
}
