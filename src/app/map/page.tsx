import type { Metadata } from "next";
import BistroMap from "@/components/BistroMap/BistroMap";
import { MAPLIBRE_VERSION } from "@/lib/maplibre-browser";

export const metadata: Metadata = {
  title: "Выбрать бистро — Техникум",
};

export default function MapPage() {
  return (
    <>
      <link rel="stylesheet" href={`https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.css`} precedence="maplibre" />
      <main>
        <BistroMap />
      </main>
    </>
  );
}
