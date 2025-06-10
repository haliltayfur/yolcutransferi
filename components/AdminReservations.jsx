"use client";
import { useState } from "react";

const demoReservations = [
  { id: 1, name: "Mehmet Yılmaz", from: "İstanbul Havalimanı", to: "Kadıköy", date: "2024-06-01", time: "12:30", driver: "Onaysız", status: "Bekliyor" },
  { id: 2, name: "Elif Karaca", from: "Antalya Havalimanı", to: "Lara", date: "2024-06-02", time: "10:00", driver: "Onaylı", status: "Aktif" }
];

export default function AdminReservations() {
  const [reservations, setReservations] = useState(demoReservations);

  function approveDriver(idx) {
    const next = [...reservations];
    next[idx].driver = "Onaylı";
    next[idx].status = "Aktif";
    setReservations(next);
  }

  function disableDriver(idx) {
    const next = [...reservations];
    next[idx].driver = "Onaysız";
    next[idx].status = "Bekliyor";
    setReservations(next);
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-4xl bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl font-bold text-gold mb-6 text-center">Admin Paneli</h1>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gold text-black">
                <th className="py-2 px-2">Ad Soyad</th>
                <th className="py-2 px-2">Nereden</th>
                <th className="py-2 px-2">Nereye</th>
                <th className="py-2 px-2">Tarih</th>
                <th className="py-2 px-2">Saat</th>
                <th className="py-2 px-2">Şoför Durumu</th>
                <th className="py-2 px-2">Transfer Durumu</th>
                <th className="py-2 px-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r, i) => (
                <tr key={r.id} className="border-b border-gold/30">
                  <td className="py-2 px-2">{r.name}</td>
                  <td className="py-2 px-2">{r.from}</td>
                  <td className="py-2 px-2">{r.to}</td>
                  <td className="py-2 px-2">{r.date}</td>
                  <td className="py-2 px-2">{r.time}</td>
                  <td className="py-2 px-2">{r.driver}</td>
                  <td className="py-2 px-2">{r.status}</td>
                  <td className="py-2 px-2">
                    {r.driver !== "Onaylı" ? (
                      <button onClick={() => approveDriver(i)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700">
                        Onayla
                      </button>
                    ) : (
                      <button onClick={() => disableDriver(i)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">
                        Pasifleştir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
