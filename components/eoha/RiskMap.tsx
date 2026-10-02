"use client";

import { useEffect } from "react";
import { CircleMarker, MapContainer, Pane, TileLayer, Tooltip, useMap } from "react-leaflet";

export type LatLng = [number, number];

export type RiskPoint = {
  id: string;
  position: LatLng;
  color: string;
  label: string;
};

export type MapView = { center: LatLng; zoom: number };

export type MapFocus =
  | { kind: "home" }
  | { kind: "bounds"; bounds: LatLng[] }
  | { kind: "point"; center: LatLng; zoom: number };

type RiskMapProps = {
  points: RiskPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  focus: MapFocus;
  home: MapView;
  radius?: number;
  showTooltips?: boolean;
};

function FocusController({ focus, home }: { focus: MapFocus; home: MapView }) {
  const map = useMap();

  useEffect(() => {
    if (focus.kind === "home") {
      map.flyTo(home.center, home.zoom, { duration: 1 });
    } else if (focus.kind === "bounds") {
      if (focus.bounds.length > 0) {
        map.flyToBounds(focus.bounds, { padding: [40, 40], maxZoom: 12, duration: 1 });
      }
    } else {
      map.flyTo(focus.center, focus.zoom, { duration: 1 });
    }
  }, [map, focus, home]);

  return null;
}

export default function RiskMap({
  points,
  selectedId,
  onSelect,
  focus,
  home,
  radius = 5,
  showTooltips = false,
}: RiskMapProps) {
  return (
    <MapContainer
      center={home.center}
      zoom={home.zoom}
      preferCanvas
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />

      {points.map((point) => {
        const selected = point.id === selectedId;
        return (
          <CircleMarker
            key={point.id}
            center={point.position}
            radius={selected ? radius * 1.8 : radius}
            pathOptions={{
              color: selected ? "#0f172a" : point.color,
              weight: selected ? 3 : 0,
              fillColor: point.color,
              fillOpacity: selected ? 0.95 : 0.65,
            }}
            eventHandlers={{ click: () => onSelect(point.id) }}
          >
            {(showTooltips || selected) && <Tooltip>{point.label}</Tooltip>}
          </CircleMarker>
        );
      })}

      <Pane name="labels" style={{ zIndex: 650, pointerEvents: "none" }}>
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png" />
      </Pane>

      <FocusController focus={focus} home={home} />
    </MapContainer>
  );
}
