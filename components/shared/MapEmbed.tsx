"use client";

import dynamic from "next/dynamic";
import type { MapEmbedProps } from "./MapEmbedInner";

// Leaflet touches `window`/`document` at import time, which breaks Next.js
// server rendering ("window is not defined"). Loading it through
// next/dynamic with ssr:false keeps it out of the server-rendered HTML —
// it only mounts once the browser takes over.
const MapEmbedInner = dynamic(() => import("./MapEmbedInner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[400px] w-full items-center justify-center rounded-lg bg-neutral-100 text-sm text-neutral-500">
      Loading map…
    </div>
  ),
});

export default function MapEmbed(props: MapEmbedProps) {
  return <MapEmbedInner {...props} />;
}
