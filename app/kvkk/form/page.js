// ✅ Dosya: app/kvkk/form/page.js
"use client";
import { useState } from "react";

export default function KvkkFormPage() {
  const [form, setForm] = useState({
    adsoyad: "",
    telefon: "",
    eposta: "",
    talep: "",
    aciklama: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/kvkk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus("success");
        setForm({ adsoyad: "", telefon: "", eposta: "", talep: "", aciklama: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        KVKK Başvuru Formu
      </h1>

      {status === "success" && <p className="text-green-500 font-semibold mb-6">Başvurunuz alındı. Teşekkür ederiz.</p>}
      {status === "error" && <p className="text-red-500 font-semibold mb-6">Bir hata oluştu. Lütfen tekrar deneyin.</p>}

      <form onSubmit={handleSubmit} className="space-y-6 text-gray-100">
        <div>
          <label className="block mb-2 font-semibold">Adınız Soyadınız</label>
          <input type="text" name="adsoyad" required onChange={handleChange} value={form.adsoyad} className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]" />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Telefon Numaranız</label>
          <input type="tel" name="telefon" onChange={handleChange} value={form.telefon} className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]" />
        </div>
        <div>
          <label className="block mb-2 font-semibold">E-posta Adresiniz</label>
          <input type="email" name="eposta" required onChange={handleChange} value={form.eposta} className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]" />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Talep Türünüz</label>
          <select name="talep" required onChange={handleChange} value={form.talep} className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]">
            <option value="">Bir seçim yapınız</option>
            <option value="veri_ogrenme">Kişisel verilerim işleniyor mu?</option>
            <option value="veri_duzeltme">Eksik/yanlış verilerimin düzeltilmesi</option>
            <option value="veri_silme">Kişisel verilerimin silinmesi</option>
            <option value="veri_aktarim">Verilerim kimlerle paylaşıldı?</option>
            <option value="diger">Diğer</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Açıklamanız</label>
          <textarea
            name="aciklama"
            rows="5"
            onChange={handleChange}
            value={form.aciklama}
            className="w-full p-3 rounded bg-gray-800 border border-[#bfa658]"
            placeholder="Lütfen detaylı açıklama yazınız."
          ></textarea>
        </div>
        <button type="submit" className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-6 rounded-xl text-lg shadow">
          Başvuruyu Gönder
        </button>
      </form>
    </main>
  );
}
