// Official MapLibre CDN build; pinned to match the map page stylesheet.
const retry = new URL(import.meta.url).searchParams.get("retry");
const sdkUrl = "https://unpkg.com/maplibre-gl@6.16.0/dist/maplibre-gl.mjs";
import(retry ? `${sdkUrl}?retry=${encodeURIComponent(retry)}` : sdkUrl)
  .then((sdk) => {
    window.tehnikumMapLibre = sdk;
    window.tehnikumMapLibreError = false;
    window.dispatchEvent(new Event("tehnikum:map-ready"));
  })
  .catch(() => {
    window.tehnikumMapLibreError = true;
    window.dispatchEvent(new Event("tehnikum:map-error"));
  });
