// The CDN SDK is loaded only in the browser. Keep this small boundary typed
// without making the Next.js build depend on a runtime network download.
import { mapPoints } from "@/data/map-points";

export type LngLat = [number, number];
export type Bounds = [LngLat, LngLat];
export type MapLayer = {
  id: string;
  type: string;
  layout?: Record<string, unknown>;
  paint?: Record<string, unknown>;
  [key: string]: unknown;
};
export type MapStyle = {
  version: 8;
  sources: Record<string, unknown>;
  layers: MapLayer[];
  glyphs?: string;
  [key: string]: unknown;
};
type CameraOptions = {
  duration?: number;
  padding?: number | { top: number; bottom: number; left: number; right: number };
  maxZoom?: number;
};
export interface BrowserMap {
  on(event: string, handler: () => void): void;
  off(event: string, handler: () => void): void;
  project(coordinates: LngLat): { x: number; y: number };
  unproject(point: { x: number; y: number }): { lng: number; lat: number };
  getZoom(): number;
  fitBounds(bounds: Bounds, options?: CameraOptions): void;
  flyTo(options: { center: LngLat; zoom: number; duration?: number }): void;
  zoomIn(): void;
  zoomOut(): void;
  resize(): void;
  remove(): void;
}
export interface BrowserMarker {
  setLngLat(coordinates: LngLat): BrowserMarker;
  addTo(map: BrowserMap): BrowserMarker;
  remove(): void;
}
export type MapLibreSdk = {
  Marker: new (options: { element: HTMLElement; anchor: "center"; subpixelPositioning: true }) => BrowserMarker;
  Map: new (options: {
    container: HTMLElement;
    style: MapStyle;
    center: LngLat;
    zoom: number;
    minZoom: number;
    maxZoom: number;
    attributionControl: false;
    renderWorldCopies: false;
    dragRotate: false;
    pitchWithRotate: false;
  }) => BrowserMap;
};

declare global {
  interface Window {
    tehnikumMapLibre?: MapLibreSdk;
    tehnikumMapLibreError?: boolean;
  }
}

export const MAPLIBRE_VERSION = "6.16.0";
// Fit all bistro points and the city placeholders for future openings.
export const OVERVIEW_BOUNDS: Bounds = [
  [Math.min(...mapPoints.map((point) => point.coordinates[0])), Math.min(...mapPoints.map((point) => point.coordinates[1]))],
  [Math.max(...mapPoints.map((point) => point.coordinates[0])), Math.max(...mapPoints.map((point) => point.coordinates[1]))],
];

export function prepareMapStyle(style: MapStyle, fontFamily: string): MapStyle {
  const prepared = structuredClone(style);
  // MapLibre v6 renders labels using loaded local fonts when glyphs is omitted.
  delete prepared.glyphs;
  for (const layer of prepared.layers) {
    if (layer.type !== "symbol" || !layer.layout?.["text-field"]) continue;
    layer.layout["text-font"] = [fontFamily];
    if (JSON.stringify(layer.layout["text-field"]).includes("name")) {
      layer.layout["text-field"] = ["coalesce", ["get", "name:ru"], ["get", "name"]];
    }
  }
  prepared.sources["tehnikum-terrain"] = {
    type: "raster-dem",
    tiles: ["https://tiles.mapterhorn.com/{z}/{x}/{y}.webp"],
    tileSize: 512,
    encoding: "terrarium",
    maxzoom: 12,
    attribution: '<a href="https://mapterhorn.com/attribution">© Mapterhorn</a>',
  };
  const firstRoadOrLabel = prepared.layers.findIndex((layer) => layer.type === "line" || layer.type === "symbol");
  prepared.layers.splice(firstRoadOrLabel < 0 ? prepared.layers.length : firstRoadOrLabel, 0, {
    id: "tehnikum-hillshade",
    type: "hillshade",
    source: "tehnikum-terrain",
    paint: {
      "hillshade-exaggeration": 0.35,
      "hillshade-shadow-color": "#2C2A26",
      "hillshade-highlight-color": "#E4E1E5",
      "hillshade-accent-color": "#2C2A26",
    },
  });
  return prepared;
}
