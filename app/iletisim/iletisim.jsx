// app/iletisim/iletisim.jsx
"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

const ILETISIM_NEDENLERI = [
  "Bilgi Talebi", "Transfer Rezervasyonu", "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık", "Geri Bildirim / Öneri", "Şikayet Bildirimi", "Diğer"
];
const ILETISIM_TERCIHLERI = [
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

export default function IletisimForm() {
  const fileInput = useRef(null);
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", kvkkOnay: false, ek: null
  });
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [selectedFileName, setSelectedFileName] = useState("");

  const handleEkChange = e => {
    const file = e.target.files[0];
    if (!file) { setForm(f => ({ ...f, ek: null })); setSelectedFileName(""); return; }
    if (file.size > 10 * 1024 * 1024) {
      alert("Maksimum dosya boyutu 10 MB olmalı.");
      setForm(f => ({ ...f, ek: null })); setSelectedFileName("");
      e.target.value = "";
      return;
    }
    const ext = file.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png", "pdf", "doc", "docx", "xls", "xlsx", "zip"].includes(ext)) {
      alert("JPG, PNG, PDF, DOC, XLS, ZIP uzantıları desteklenir.");
      setForm(f => ({ ...f, ek: null })); setSelectedFileName("");
      e.target.value = "";
      return;
    }
    setForm(f => ({ ...f, ek: file }));
    setSelectedFileName(file.name);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.ad || form.ad.length < 3) newErrors.ad = "Adınız en az 3 harf olmalı.";
    if (!form.soyad || form.soyad.length < 3) newErrors.soyad = "Soyadınız en az 3 harf olmalı.";
    if (!form.telefon || !/^05\d{9}$/.test(form.telefon)) newErrors.telefon = "Telefon hatalı. 05xx xxx xx xx";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Geçersiz e-posta.";
    if (!form.mesaj || form.mesaj.length < 15) newErrors.mesaj = "Mesaj en az 15 karakter olmalı.";
    if (!form.iletisimTercihi) newErrors.iletisimTercihi = "İletişim tercihi zorunlu.";
    if (!form.kvkkOnay) newErrors.kvkkOnay = "Koşulları kabul etmelisiniz.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setButtonStatus("error"); setButtonMsg("Eksik alanlar var"); setTimeout(() => setButtonMsg("Mesajı Gönder"), 3000); return;
    }

    setButtonStatus("loading"); setButtonMsg("Gönderiliyor...");
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "ek" && val) formData.append("ek", val);
      else if (key !== "ek") formData.append(key, val);
    });

    try {
      await fetch("/api/iletisim", { method: "POST", body: formData });
      setButtonStatus("success"); setButtonMsg("Teşekkürler, mesajınız alındı.");
      setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", kvkkOnay: false, ek: null });
      setSelectedFileName("");
      if (fileInput.current) fileInput.current.value = "";
      setTimeout(() => setButtonMsg("Mesajı Gönder"), 4000);
    } catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası, tekrar deneyin."); setTimeout(() => setButtonMsg("Mesajı Gönder"), 3000);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">İletişim</h1>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow" encType="multipart/form-data">
        <div className="flex gap-2">
          <input type="text" name="ad" placeholder="Ad" value={form.ad} onChange={handleChange}
            className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7]" minLength={3} required />
          <input type="text" name="soyad" placeholder="Soyad" value={form.soyad} onChange={handleChange}
            className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7]" minLength={3} required />
        </div>
        <div className="flex gap-2">
          <input type="tel" name="telefon" placeholder="05xx xxx xx xx" value={form.telefon} onChange={handleChange}
            className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7]" maxLength={11} required />
          <input type="email" name="email" placeholder="E-posta" value={form.email} onChange={handleChange}
            className="p-3 rounded-lg border flex-1 bg-[#181611] text-[#e7e7e7]" required />
        </div>
        <select name="neden" value={form.neden} onChange={handleChange}
          className="p-3 rounded-lg border bg-[#181611] text-[#e7e7e7] text-base" required>
          {ILETISIM_NEDENLERI.map((neden, i) => (
            <option key={neden} value={neden}>{neden}</option>
          ))}
        </select>
        <textarea name="mesaj" placeholder="Mesajınız" value={form.mesaj} onChange={handleChange}
          className="p-3 rounded-lg border bg-[#181611] text-[#e7e7e7]" minLength={15} required rows={3} />
        {/* --- Dosya seç --- */}
        <div className="flex flex-col">
          <label className="relative w-1/4" style={{ minWidth: 120 }}>
            <input
              type="file"
              name="ek"
              ref={fileInput}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
              onChange={handleEkChange}
              className="opacity-0 absolute left-0 top-0 w-full h-full z-10 cursor-pointer"
              style={{ width: "100%", height: 35, cursor: "pointer" }}
            />
            <div
              className="flex items-center justify-start w-full py-2 rounded-xl bg-[#bfa658] text-black font-semibold text-sm shadow cursor-pointer hover:bg-yellow-600 transition pl-4"
              style={{ minHeight: 35, fontSize: 14 }}
            >
              {selectedFileName ? (
                <span className="truncate w-full">{selectedFileName}</span>
              ) : (
                <span>📎 Dosya Seç (opsiyonel)</span>
              )}
            </div>
          </label>
        </div>
        {/* --- /Dosya seç --- */}
        <span className="text-sm text-gray-300 font-bold ml-1 mt-2">İletişim tercihinizi seçiniz</span>
        <div className="flex flex-row gap-3 w-full mb-2 flex-wrap">
          {ILETISIM_TERCIHLERI.map((item) => (
            <label key={item.value} className="flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
              select-none shadow-md transition
              bg-black border-[#bfa658] text-white hover:bg-gray-900 hover:border-gray-400"
              style={{ minWidth: 90, justifyContent: 'center' }}>
              <input
                type="radio"
                name="iletisimTercihi"
                value={item.value}
                checked={form.iletisimTercihi === item.value}
                onChange={() => setForm({ ...form, iletisimTercihi: item.value })}
                className="hidden"
              />
              {item.icon}
              {item.label}
            </label>
          ))}
        </div>
        {errors.iletisimTercihi && <span className="text-xs text-red-400 font-bold pl-2">{errors.iletisimTercihi}</span>}
        <div className="flex items-center gap-2 mt-1">
          <input type="checkbox" name="kvkkOnay" checked={form.kvkkOnay} onChange={handleChange} required className="accent-[#FFD700] w-4 h-4" />
          <span className="text-xs text-gray-200">YolcuTransferi.com politika ve koşullarını okudum, kabul ediyorum.</span>
        </div>
        {errors.kvkkOnay && <span className="text-xs text-red-400 font-bold pl-2">{errors.kvkkOnay}</span>}
        <button type="submit"
          className={`font-bold py-3 px-8 rounded-xl text-lg mt-2 w-full shadow transition text-black
            ${buttonStatus === "success" ? "bg-green-500" : buttonStatus === "error" ? "bg-red-600" : "bg-[#bfa658] hover:bg-yellow-600"}`}
          style={{ minHeight: 50, minWidth: 180 }}
          disabled={buttonStatus === "loading"}>
          {buttonMsg}
        </button>
        {Object.keys(errors).length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {Object.values(errors).map((err, i) => (
              <span key={i} className="text-xs text-red-400 pl-2 font-bold">{err}</span>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}
