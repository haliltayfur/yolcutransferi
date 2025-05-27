"use client";
import { useState } from "react";

export default function RezervasyonTeklif() {
  const [teklif, setTeklif] = useState(null);
  const [loading, setLoading] = useState(false);

  // Basit örnek form (kendine göre düzenle)
  async function teklifAl(e) {
    e.preventDefault();
    setLoading(true);
    setTeklif(null);

    const req = {
      from: "Bodrum",
      to: "Dalaman",
      arac: "Maybach",
      kisi: 3,
      tarih: "2025-06-01T23:30"
    };
    const res = await fetch("/api/teklif", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req)
    });
    const data = await res.json();
    setTeklif(data.teklif);
    setLoading(false);
  }

  return (
    <main className="max-w-xl mx-auto mt-16 px-4 py-8 bg-black/80 rounded-2xl shadow">
      <button
        className="bg-gold text-black py-2 px-6 rounded font-bold"
        onClick={teklifAl}
        disabled={loading}
      >
        {loading ? "Teklif Hesaplanıyor..." : "Teklif Al"}
      </button>
      {teklif && (
        <div className="text-3xl font-extrabold text-gold mt-6">
          Teklif: {teklif} TL
        </div>
      )}
    </main>
  );
}
