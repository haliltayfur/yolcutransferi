"use client";
import { useEffect, useRef, useState } from "react";

// Mapbox Token (kendi tokenını al, aşağıya ekle)
const MAPBOX_TOKEN = "BURAYA_KENDI_MAPBOX_TOKENIN_GELECEK";

export default function Harita({ from, to }) {
  const mapRef = useRef(null);
  const [mesafe, setMesafe] = useState(null);
  const [sure, setSure] = useState(null);

  useEffect(() => {
    if (!from || !to) return;
    let mapboxgl;
    let map;

    (async () => {
      mapboxgl = (await import("mapbox-gl")).default;
      const mbxDirections = (await import("@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions")).default;

      // Map başlat
      map = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [28.97, 41.01], // İstanbul merkez
        zoom: 8,
        accessToken: MAPBOX_TOKEN,
      });

      // Directions
      const directions = new mbxDirections({
        accessToken: MAPBOX_TOKEN,
        unit: "metric",
        profile: "driving",
        interactive: false,
      });

      map.addControl(directions, "top-left");
      directions.setOrigin(from); // from: "Kadıköy, İstanbul"
      directions.setDestination(to); // to: "Sabiha Gökçen Havalimanı" vs

      directions.on("route", e => {
        if (e.route && e.route.length) {
          setMesafe((e.route[0].distance / 1000).toFixed(1)); // km
          setSure((e.route[0].duration / 60).toFixed(0)); // dakika
        }
      });

      return () => map.remove();
    })();

    return () => {
      if (map) map.remove();
    };
  }, [from, to]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div ref={mapRef} className="w-full h-80 rounded-2xl shadow-lg mb-4" />
      {mesafe && sure && (
        <div className="bg-black/70 text-gold px-6 py-3 rounded-xl font-semibold text-lg">
          Tahmini Mesafe: {mesafe} km &bull; Süre: {sure} dk
        </div>
      )}
    </div>
  );
}
