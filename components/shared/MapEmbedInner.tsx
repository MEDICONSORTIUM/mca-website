"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Spec CON-MAP-03 — custom pin in MCA brand orange (#C85A1A), replacing
// Leaflet's default blue marker. Built as an inline SVG divIcon so no
// image asset has to be bundled or hosted separately.
const officeMarkerIcon = L.divIcon({
  className: "mca-map-marker",
  html: `
    <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 26 16 26s16-15 16-26C32 7.163 24.837 0 16 0z" fill="#C85A1A"/>
      <circle cx="16" cy="16" r="6" fill="#FFFFFF"/>
    </svg>
  `,
  iconSize: [32, 42],
  iconAnchor: [16, 42], // tip of the pin sits on the coordinate
  popupAnchor: [0, -38],
});

export interface MapEmbedProps {
  /** Spec CON-MAP-02 — office latitude, to be supplied by MCA */
  latitude: number;
  /** Spec CON-MAP-02 — office longitude, to be supplied by MCA */
  longitude: number;
  officeName?: string;
  address?: string;
  /** Spec CON-MAP-04 — desktop height in px; width is always 100% */
  height?: number;
  zoom?: number;
  /** Spec CON-MAP-05 (optional, spec says "confirm with designer") */
  linkToGoogleMaps?: boolean;
}

export default function MapEmbedInner({
  latitude,
  longitude,
  officeName = "Medical Consortium of Africa",
  address,
  height = 400,
  zoom = 15,
  linkToGoogleMaps = true,
}: MapEmbedProps) {
  const position: [number, number] = [latitude, longitude];

  return (
    <div className="relative w-full" style={{ height }}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        className="z-0 h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={officeMarkerIcon}>
          <Popup>
            <strong>{officeName}</strong>
            {address ? <div>{address}</div> : null}
          </Popup>
        </Marker>
      </MapContainer>

      {linkToGoogleMaps && (
        // Spec CON-MAP-05 (optional) — open full Google Maps in a new tab.
        // Set linkToGoogleMaps={false} if the designer doesn't want this.
        <a
          href={`https://www.google.com/maps?q=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 z-[1000] rounded bg-white px-2.5 py-1.5 text-xs font-semibold text-[#C85A1A] shadow-md"
        >
          Open in Google Maps ↗
        </a>
      )}
    </div>
  );
}
