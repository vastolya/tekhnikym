"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { BrowserMap, BrowserMarker, LngLat, MapLibreSdk } from "@/lib/maplibre-browser";

export default function NativeMapMarker({ map, sdk, coordinates, children }: {
  map: BrowserMap;
  sdk: MapLibreSdk;
  coordinates: LngLat;
  children: ReactNode;
}) {
  // This component mounts only after the browser map has loaded.
  const [element] = useState(() => document.createElement("div"));
  const markerRef = useRef<BrowserMarker | null>(null);
  const [longitude, latitude] = coordinates;

  useLayoutEffect(() => {
    const marker = new sdk.Marker({ element, anchor: "center", subpixelPositioning: true });
    markerRef.current = marker;
    return () => {
      marker.remove();
      markerRef.current = null;
    };
  }, [map, sdk, element]);

  useLayoutEffect(() => {
    markerRef.current?.setLngLat([longitude, latitude]).addTo(map);
  }, [map, longitude, latitude]);

  // MapLibre owns the wrapper transform. React only renders the button content.
  return createPortal(children, element);
}
