// === Dosya: components/KvkkPopup.jsx ===
import React, { useEffect, useState } from "react";

export default function KvkkPopup({ onClose }) {
  const [policyText, setPolicyText] = useState("Yükleniyor...");

  useEffect(() => {
    async function fetchPolicy() {
      try {
        const res = await fetch("https://yolcutransferi.com/mesafeli-satis");
        const html = await res.text();
        // Sadece ana içerik div'ini ayıkla:
        const start = html.indexOf('<div class="policy-content">');
        const end = html.indexOf('</div>', start);
        let policy = html.substring(start, end);
        // Temizlik: HTML taglarını sil vs (gerekirse ileri düzeyde ayıkla)
        policy = policy.replace(/<[^>]*>?/gm, "");
        setPolicyText(policy || "Metin bulunamadı.");
      } catch {
        setPolicyText("Metin alınamadı, lütfen siteyi ziyaret ediniz.");
      }
    }
    fetchPolicy();
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#00000099] flex items-center justify-center">
      <div className="bg-[#19160a] border border-[#bfa658] rounded-2xl p-8 w-full max-w-3xl shadow-lg relative" style={{maxWidth: "80vw"}}>
        <button
          className="absolute right-7 top-7 text-[#bfa658] text-xl font-bold hover:scale-110"
          onClick={onClose}
        >
          Kapat ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#bfa658] text-center">
          Mesafeli Satış Sözleşmesi, KVKK ve Tüm Politika Metinleri
        </h2>
        <div className="text-[#ffeec2] max-h-[60vh] overflow-y-auto whitespace-pre-line text-base px-3" style={{fontFamily:"inherit"}}>
          {policyText}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-3 px-10 rounded-xl text-lg shadow hover:scale-105 transition"
            onClick={onClose}
          >
            Tümünü Okudum ve Onayladım
          </button>
        </div>
      </div>
    </div>
  );
}
