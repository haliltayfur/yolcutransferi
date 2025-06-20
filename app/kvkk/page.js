"use client";
import { useState } from "react";

export default function KvkkFormu() {
  const [form, setForm] = useState({
    adsoyad: "",
    telefon: "",
    eposta: "",
    talep: "",
    aciklama: "",
    kvkkOnay: false,
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.adsoyad) newErrors.adsoyad = "Ad Soyad zorunlu";
    if (!form.telefon) newErrors.telefon = "Telefon zorunlu";
    if (!form.eposta) newErrors.eposta = "E-posta zorunlu";
    if (!form.talep) newErrors.talep = "Talep Türü zorunlu";
    if (!form.aciklama) newErrors.aciklama = "Açıklama zorunlu";
    if (!form.kvkkOnay) newErrors.kvkkOnay = "KVKK onayı gerekli";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      await fetch("/api/kvkk/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setMsg("Başvurunuz alınmıştır. Teşekkür ederiz.");
      setForm({
        adsoyad: "",
        telefon: "",
        eposta: "",
        talep: "",
        aciklama: "",
        kvkkOnay: false,
      });
    } catch {
      setMsg("Başvuru kaydedilemedi. Lütfen tekrar deneyiniz.");
    }
  };

  return (
<main className="max-w-2xl mx-auto px-4 py-8 mt-12">
      <h1 className="text-2xl font-bold text-[#bfa658] mb-4">KVKK Başvuru Formu</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-black/80 rounded-2xl p-6 border-2 border-[#bfa658]">
        <input name="adsoyad" value={form.adsoyad} onChange={handleChange} placeholder="Ad Soyad" className="p-3 rounded" />
        {errors.adsoyad && <span className="text-red-400 text-xs">{errors.adsoyad}</span>}

        <input name="telefon" value={form.telefon} onChange={handleChange} placeholder="Telefon" className="p-3 rounded" />
        {errors.telefon && <span className="text-red-400 text-xs">{errors.telefon}</span>}

        <input name="eposta" value={form.eposta} onChange={handleChange} placeholder="E-posta" className="p-3 rounded" />
        {errors.eposta && <span className="text-red-400 text-xs">{errors.eposta}</span>}

        <select name="talep" value={form.talep} onChange={handleChange} className="p-3 rounded">
          <option value="">Talep Türü Seçin</option>
          <option value="veri_duzeltme">Veri Düzeltme</option>
          <option value="veri_silme">Veri Silme</option>
          <option value="veri_ogr_enme">Veri Öğrenme</option>
          <option value="tazminat">Tazminat</option>
        </select>
        {errors.talep && <span className="text-red-400 text-xs">{errors.talep}</span>}

        <textarea name="aciklama" value={form.aciklama} onChange={handleChange} placeholder="Açıklama" className="p-3 rounded" />
        {errors.aciklama && <span className="text-red-400 text-xs">{errors.aciklama}</span>}

        <div className="flex items-center gap-2">
          <input type="checkbox" name="kvkkOnay" checked={form.kvkkOnay} onChange={handleChange} />
          <span className="text-xs text-gray-200">
            <a href="/gizlilik" target="_blank" rel="noopener noreferrer" className="underline text-[#FFD700]">
              KVKK & Gizlilik Sözleşmesi'ni
            </a>{" "}
            okudum, kabul ediyorum.
          </span>
        </div>
        {errors.kvkkOnay && <span className="text-red-400 text-xs">{errors.kvkkOnay}</span>}

        <button className="py-3 rounded bg-[#bfa658] font-bold text-black" type="submit">
          Gönder
        </button>
        {msg && <div className="mt-2 text-green-500 text-center">{msg}</div>}
      </form>
    </main>
  );
}
