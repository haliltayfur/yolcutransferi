// app/iletisim/iletisim.jsx
"use client";
import React, { useState, useRef } from "react";
import { FaWhatsapp, FaPhone, FaEnvelope, FaPaperclip } from "react-icons/fa";

const ILETISIM_TERCIHLERI = [
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

export default function IletisimForm() {
  const [form, setForm] = useState({ ad: "", soyad: "", telefon: "", email: "", neden: "Bilgi Talebi", mesaj: "", iletisimTercihi: "", kvkkOnay: false, ek: null });
  const [errors, setErrors] = useState({});
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [popupOpen, setPopupOpen] = useState(false);
  const fileInput = useRef();

  // ... validation fonksiyonları (kısaltıldı, yukarıdan aynen alabilirsin)

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // ... validation check (kısaltıldı)
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "ek" && val) formData.append("ek", val);
      else if (key !== "ek") formData.append(key, val);
    });
    setButtonStatus("loading"); setButtonMsg("Gönderiliyor...");
    try {
      await fetch("/api/iletisim", { method: "POST", body: formData });
      setButtonStatus("success"); setButtonMsg("Teşekkürler!");
      setForm({ ad: "", soyad: "", telefon: "", email: "", neden: "Bilgi Talebi", mesaj: "", iletisimTercihi: "", kvkkOnay: false, ek: null });
      if (fileInput.current) fileInput.current.value = "";
      setTimeout(() => { setButtonMsg("Mesajı Gönder"); setButtonStatus("normal"); }, 4000);
    } catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası");
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">İletişim</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow" encType="multipart/form-data">
        {/* ... Alanlar, yukarıdan kopyala */}
        {/* Dosya Seç Butonu */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            name="ek"
            ref={fileInput}
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
            onChange={e => setForm(f => ({ ...f, ek: e.target.files[0] }))}
            className="hidden"
            id="ek-dosya"
          />
          <label htmlFor="ek-dosya" className="flex items-center gap-2 px-3 py-2 bg-[#bfa658] rounded-md text-black text-sm font-bold cursor-pointer">
            <FaPaperclip /> Dosya Seç (opsiyonel)
          </label>
        </div>
        {/* İletişim Tercihleri */}
        <span className="text-sm text-gray-300 font-bold ml-1 mt-2">İletişim tercihinizi seçiniz</span>
        <div className="flex flex-row gap-3 w-full mb-2 flex-wrap">
          {ILETISIM_TERCIHLERI.map(item => (
            <label key={item.value}
              className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
                select-none shadow-md transition
                ${form.iletisimTercihi === item.value
                  ? "bg-black border-[#FFD700] text-[#FFD700]"
                  : "bg-black border-[#bfa658] text-white hover:bg-gray-900 hover:border-gray-400"}`}
              style={{ minWidth: 90, justifyContent: 'center' }}>
              <input type="radio" name="iletisimTercihi" value={item.value} checked={form.iletisimTercihi === item.value} onChange={handleChange} className="hidden" />
              {item.icon}{item.label}
            </label>
          ))}
        </div>
        {/* KVKK Link & Onay */}
        <div className="flex items-center gap-2 mt-1">
          <input type="checkbox" name="kvkkOnay" checked={form.kvkkOnay} onChange={handleChange} required className="accent-[#FFD700] w-4 h-4" />
          <button type="button" className="underline text-[#FFD700] hover:text-[#bfa658] bg-transparent border-0 outline-none cursor-pointer p-0" onClick={() => setPopupOpen(true)}>
            YolcuTransferi.com politika ve koşullarını
          </button>
          <span className="text-xs text-gray-200">okudum, kabul ediyorum.</span>
        </div>
        {/* Popup */}
        {popupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setPopupOpen(false)}>
            <div className="bg-[#19160a] rounded-2xl border-2 border-[#bfa658] shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
              <h2 className="text-2xl font-bold mb-4 text-[#bfa658]">Politika ve Koşullar</h2>
              <div className="text-[#ffeec2] text-sm max-h-96 overflow-y-auto">
                {/* Burada sitenden fetch veya direkt html gömebilirsin */}
                YolcuTransferi.com Mesafeli Satış Sözleşmesi ve KVKK metni buraya gelecek.
              </div>
              <button onClick={() => setPopupOpen(false)} className="mt-4 bg-[#bfa658] text-black px-6 py-2 rounded font-bold shadow">Kapat</button>
            </div>
          </div>
        )}
        <button type="submit"
          className={`font-bold py-3 px-8 rounded-xl text-lg mt-2 w-full shadow transition text-black
            ${buttonStatus === "success" ? "bg-green-500" : buttonStatus === "error" ? "bg-red-600" : "bg-[#bfa658] hover:bg-yellow-600"}`}
          style={{ minHeight: 50, minWidth: 180 }}
          disabled={buttonStatus === "loading"}>
          {buttonMsg}
        </button>
      </form>
    </section>
  );
}
