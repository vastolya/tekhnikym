import { mapCities } from "./map-cities";

export type MapPoint = {
  id: string;
  cityId: string;
  coordinates: [number, number];
  precision: "building" | "city";
};

// Building coordinates verified against Yandex Maps on 06.11.2026.
// Sources and limitations: docs/MAP.md. These are not verified entrances.
const buildings: Record<string, [number, number]> = {
  "moscow-dmitrovka": [37.614743, 55.760849],
  "moscow-atrium": [37.659173, 55.757340],
  "rosa-khutor": [40.296456, 43.671261],
  tyumen: [65.523081, 57.159799],
  novosibirsk: [82.916773, 55.030189],
  rostov: [39.710934, 47.219257],
};

export const mapPoints: MapPoint[] = mapCities.flatMap((city) =>
  city.locationIds.map((id) => ({
    id,
    cityId: city.id,
    coordinates: buildings[id] ?? city.coordinates,
    precision: buildings[id] ? "building" : "city",
  })),
);
