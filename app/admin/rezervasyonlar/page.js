// app/admin/rezervasyonlar/page.js

"use client";
import React, { useState, useEffect, useRef } from "react";

function formatTL(n) {
  return (n || 0).toLocaleString("tr-TR") + " ₺";
}

const columns = [
  { name: "Sipariş No", key: "orderId", className: "min-w-[120px]" },
  { name: "Tarih", key: "createdAt", className: "min-w-[130px]" },
  { name: "Ad Soyad", key: "nameSurname", className: "min-w-[120px]" },
  { name: "Telefon", key: "phone", className: "min-w-[120px]" },
  { name: "E-posta", key: "email", className: "min-w-[150px]" },
  { name: "Transfer Türü", key: "transfer", className: "min-w-[140px]" },
  { name: "Kalkış / Varış", key: "route", className: "min-w-[180px]" },
  { name: "Tutar", key: "total", className: "min-w-[90px] text-right" },
  { name: "Durum", key: "status", className: "min-w-[100px]" },
  { name: "İşlem", key: "actions", className: "min-w-[120px]" }
];

export default function AdminRezervasyonlar() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showHidden, setShowHidden] = useState(false);
  const [modalRez, setModalRez] = useState(null);

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, [showHidden]);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/rezervasyonlar?showHidden=${showHidden}`);
      const json = await res.json();
      setList(json.items || []);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleHideToggle = async (id, hide) => {
    await fetch("/api/admin/rezervasyonlar", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, hide }),
    });
    fetchList();
    setModalRez(null);
  };

  // Detay popup aynı kalabilir, yukarıdan kopyalanabilir...

  return (
    <main className="w-full flex flex-col items-center justify-center px-2 py-10">
      <h1 className="text-3xl font-bold text-[#bfa658] mb-7 text-left w-full max-w-5xl">Rezervasyon Kayıtları</h1>
      <div className="flex flex-wrap gap-2 mb-4 max-w-5xl w-full">
        <button
          onClick={() => setShowHidden(!showHidden)}
          className="bg-[#444] border border-[#bfa658] text-[#ffeec2] font-semibold px-4 py-2 rounded hover:bg-[#bfa658] hover:text-black text-sm shadow"
        >
          {showHidden ? "Kaldırılanları Gizle" : "Kaldırılanları Göster"}
        </button>
        <button
          onClick={fetchList}
          className="bg-[#bfa658] border border-[#bfa658] text-black font-semibold px-4 py-2 rounded hover:bg-[#ffeec2] hover:text-[#bfa658] text-sm shadow"
        >Şimdi Yenile</button>
        <span className="ml-2 text-sm text-[#bfa658] font-bold">{list.length} kayıt listelendi.</span>
      </div>
      {/* TABLO KUTUSU */}
      <div className="w-full max-w-5xl bg-[#19160a] border-2 border-[#bfa658] rounded-2xl p-2 pt-3 pb-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-[15px]">
            <thead>
              <tr>
                {columns.map((col, i) => (
                  <th
                    key={col.name}
                    className={`py-2 px-2 bg-[#19160a] text-[#ffeec2] font-semibold border-b-2 border-[#bfa658] ${col.className}`}
                    style={{
                      borderTopLeftRadius: i === 0 ? 12 : 0,
                      borderTopRightRadius: i === columns.length - 1 ? 12 : 0,
                      borderRight: i !== columns.length - 1 ? "1px solid #bfa658" : undefined
                    }}
                  >{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-7 text-[#ffeec2] font-bold text-xl">Yükleniyor...</td>
                </tr>
              ) : list.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8 text-[#ffeec2] font-semibold text-lg">Hiç kayıt yok.</td>
                </tr>
              ) : (
                list.map((item, idx) => (
                  <tr key={item._id}
                    className={`transition ${item.hide ? "bg-[#322b16] text-[#bfa658]" : "hover:bg-[#221d11]"}`}
                    style={{ borderBottom: "1px solid #bfa658" }}>
                    <td className="px-2 py-2 font-semibold text-[#ffeec2]">{item.orderId}</td>
                    <td className="px-2 py-2">{item.createdAt ? new Date(item.createdAt).toLocaleString("tr-TR") : "-"}</td>
                    <td className="px-2 py-2">{item.name} {item.surname}</td>
                    <td className="px-2 py-2">{item.phone}</td>
                    <td className="px-2 py-2">{item.email}</td>
                    <td className="px-2 py-2">{item.transfer}</td>
                    <td className="px-2 py-2">{item.from} → {item.to}</td>
                    <td className="px-2 py-2 font-bold text-right">{formatTL(item.summary?.toplam)}</td>
                    <td className="px-2 py-2">{item.status || "-"}</td>
                    <td className="px-2 py-2 flex flex-wrap gap-1 justify-center">
                      <button
                        className="bg-[#bfa658] text-black px-2 py-1 rounded font-bold text-xs hover:opacity-80 shadow border border-[#a08b50]"
                        onClick={() => setModalRez(item)}
                        type="button"
                      >Oku</button>
                      {!item.hide ? (
                        <button
                          onClick={() => handleHideToggle(item._id, true)}
                          className="bg-yellow-800 text-[#ffeec2] px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-[#bfa658] hover:text-black transition"
                        >Kaldır</button>
                      ) : (
                        <button
                          onClick={() => handleHideToggle(item._id, false)}
                          className="bg-green-800 text-[#ffeec2] px-2 py-1 rounded text-xs font-semibold border border-[#bfa658] hover:bg-green-400 hover:text-black transition"
                        >Geri Al</button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Detay popup */}
      {modalRez && /* Buraya RezervasyonDetayPopup'u ekle */ null}
    </main>
  );
}

// app/admin/rezervasyonlar/page.js --- SON
