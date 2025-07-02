"use client";
import React, { useRef, useState } from "react";

export default function Iletisim() {
  const fileInput = useRef(null);
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: "Bilgi Talebi", mesaj: "",
    iletisimTercihi: "", kvkkOnay: false, ek: null
  });
  const [selectedFileName, setSelectedFileName] = useState("");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [errors, setErrors] = useState({});

  // Yardımcı validasyonlar eklenebilir (isRealName, isRealEmail vs.)

  const handleEkChange = e => {
    const file = e.target.files[0];
    if (!file) { setForm(f => ({ ...f, ek: null })); setSelectedFileName(""); return; }
    setForm(f => ({ ...f, ek: file }));
    setSelectedFileName(file.name);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonMsg("Gönderiliyor...");
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "ek" && val) formData.append("ek", val);
      else if (key !== "ek") formData.append(key, val);
    });

    try {
      const res = await fetch("/api/iletisim", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Sunucu hatası");
      setButtonMsg("Teşekkürler, mesajınız alındı.");
      setForm({ ad: "", soyad: "", telefon: "", email: "", neden: "Bilgi Talebi", mesaj: "", iletisimTercihi: "", kvkkOnay: false, ek: null });
      setSelectedFileName("");
      if (fileInput.current) fileInput.current.value = "";
    } catch {
      setButtonMsg("Sunucu hatası, tekrar deneyin.");
    }
    setTimeout(() => setButtonMsg("Mesajı Gönder"), 6000);
  };

  return (
    <section className="w-full max-w-3xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">İletişim</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow" encType="multipart/form-data">
        <div className="flex gap-2">
          <input type="text" name="ad" placeholder="Ad" value={form.ad} onChange={handleChange} className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658]" minLength={3} required />
          <input type="text" name="soyad" placeholder="Soyad" value={form.soyad} onChange={handleChange} className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658]" minLength={3} required />
        </div>
        <div className="flex gap-2">
          <input type="tel" name="telefon" placeholder="05xx xxx xx xx" value={form.telefon} onChange={handleChange} className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658]" required />
          <input type="email" name="email" placeholder="E-posta" value={form.email} onChange={handleChange} className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658]" required />
        </div>
        <select name="neden" value={form.neden} onChange={handleChange} className="p-3 rounded-lg border bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658]" required>
          <option>Bilgi Talebi</option>
          <option>Transfer Rezervasyonu</option>
          <option>Teklif Almak İstiyorum</option>
          <option>İş Birliği / Ortaklık</option>
          <option>Geri Bildirim / Öneri</option>
          <option>Şikayet Bildirimi</option>
          <option>Diğer</option>
        </select>
        <textarea name="mesaj" placeholder="Mesajınız" value={form.mesaj} onChange={handleChange} className="p-3 rounded-lg border bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658]" minLength={10} required rows={3} />
        <div className="flex items-center gap-2 mb-1">
          <input type="file" name="ek" ref={fileInput} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip" onChange={handleEkChange} className="w-48 text-sm block" style={{fontSize:"14px",padding:"4px"}} />
          {selectedFileName && <span className="text-xs text-gray-300">{selectedFileName}</span>}
        </div>
        <span className="text-sm text-gray-300 font-bold ml-1 mt-2">İletişim tercihinizi seçiniz</span>
        <div className="flex flex-row gap-3 w-full mb-2 flex-wrap">
          {["WhatsApp", "Telefon", "E-posta"].map((val, i) => (
            <label key={val} className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer ${form.iletisimTercihi === val ? "bg-black border-[#FFD700] text-[#FFD700]" : "bg-black border-[#bfa658] text-white hover:bg-gray-900 hover:border-gray-400"}`}>
              <input type="radio" name="iletisimTercihi" value={val} checked={form.iletisimTercihi === val} onChange={handleChange} className="hidden" />
              {val}
            </label>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <input type="checkbox" name="kvkkOnay" checked={form.kvkkOnay} onChange={handleChange} required className="accent-[#FFD700] w-4 h-4" />
          <span className="text-xs text-gray-200">
            <a href="/kvkk" className="underline text-[#FFD700] hover:text-[#bfa658]" target="_blank" rel="noopener noreferrer">YolcuTransferi.com politika ve koşullarını</a> okudum, kabul ediyorum.
          </span>
        </div>
        <button type="submit" className="font-bold py-3 px-8 rounded-xl text-lg mt-2 w-full shadow text-black bg-[#bfa658] hover:bg-yellow-600">{buttonMsg}</button>
      </form>
    </section>
  );
}
