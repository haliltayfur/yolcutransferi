"use client";
import { useEffect, useState } from "react";

// Rezervasyon datası localStorage’da tutuluyor (geliştirilebilir)
function getReservations() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("reservations") || "[]");
  } catch {
    return [];
  }
}

export default function AdminReservations() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(getReservations());
  }, []);

  // Sadece örnek! Kayıt eklendiğinde PaymentForm’da da aynı şekilde push etmelisin
  // localStorage’a yeni kayıt eklemek için:
  // const all = getReservations();
  // all.push(newReservation);
  // localStorage.setItem("reservations", JSON.stringify(all));

  return (
    <section className="p-8 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gold mb-7">Rezervasyon Talepleri</h2>
      {list.length === 0
        ? <div className="text-gray-400">Henüz rezervasyon talebi bulunamadı.</div>
        : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-[#181818] text-gold border-b">
                <th className="py-2 px-3">Sipariş No</th>
                <th className="py-2 px-3">Yolcu Adı</th>
                <th className="py-2 px-3">Telefon</th>
                <th className="py-2 px-3">Tarih</th>
                <th className="py-2 px-3">Saat</th>
                <th className="py-2 px-3">Araç Tipi</th>
                <th className="py-2 px-3">Nereden</th>
                <th className="py-2 px-3">Nereye</th>
                <th className="py-2 px-3">Durum</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, i) => (
                <tr key={item.siparisNo || i} className="border-b">
                  <td className="py-2 px-3 font-mono">{item.siparisNo}</td>
                  <td className="py-2 px-3">{item.ad} {item.soyad}</td>
                  <td className="py-2 px-3">{item.tel}</td>
                  <td className="py-2 px-3">{item.tarih}</td>
                  <td className="py-2 px-3">{item.saat}</td>
                  <td className="py-2 px-3">{item.arac}</td>
                  <td className="py-2 px-3">{item.from}</td>
                  <td className="py-2 px-3">{item.to}</td>
                  <td className="py-2 px-3">{item.durum || "Bekliyor"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </section>
  );
}
