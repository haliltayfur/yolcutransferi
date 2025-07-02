"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Yardımcı fonksiyonlar (kısaltılmadı)
function isRealEmail(val) {
  if (!val) return false;
  const regex = /^[\w.\-]+@([\w\-]+\.)+[\w\-]{2,}$/i;
  return regex.test(val);
}
function isRealName(val) {
  if (!val || val.length < 3) return false;
  if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ ]+$/.test(val)) return false;
  let v = val.trim().toLowerCase();
  if (["asd", "qwe", "poi", "test", "xxx", "zzz", "klm", "asdf", "deneme"].includes(v)) return false;
  if (/^([a-zA-ZğüşöçİĞÜŞÖÇ])\1+$/.test(v)) return false;
  return true;
}
function isRealPhone(val) {
  if (!val) return false;
  return /^05\d{9}$/.test(val);
}
function isRealMsg(val) {
  if (!val || val.length < 15) return false;
  let wordCount = val.trim().split(/\s+/).length;
  if (wordCount < 3) return false;
  if (/([a-z])\1{3,}/.test(val.toLowerCase())) return false;
  return true;
}
function formatDuration(ms) {
  if (!ms || ms < 1000) return "1 sn";
  const totalSec = Math.ceil(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min > 0 ? min + "dk " : ""}${sec}sn`;
}

function useAkilliRateLimit() {
  const [blocked, setBlocked] = useState(false);
  const [msg, setMsg] = useState("");
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      let now = Date.now();
      let log = [];
      try { log = JSON.parse(localStorage.getItem("iletisim_log") || "[]"); } catch { }
      log = log.filter(ts => now - ts < 60 * 60 * 1000);
      const last1dk = log.filter(ts => now - ts < 60 * 1000);
      const last10dk = log.filter(ts => now - ts < 10 * 60 * 1000);

      if (last10dk.length >= 3) {
        setBlocked(true);
        setMsg("10 dakika içinde 3’ten fazla gönderim yapıldı. Lütfen 1 saat sonra tekrar deneyin.");
        setRemaining(60 * 60 * 1000 - (now - log[log.length - 1]));
      } else if (last1dk.length >= 2) {
        setBlocked(true);
        setMsg("Aynı dakika içinde birden fazla gönderim tespit edildi. Lütfen 1 dakika bekleyip tekrar deneyin.");
        setRemaining(60 * 1000 - (now - log[log.length - 1]));
      } else {
        setBlocked(false);
        setMsg("");
        setRemaining(0);
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  function kaydet() {
    let now = Date.now();
    let log = [];
    try { log = JSON.parse(localStorage.getItem("iletisim_log") || "[]"); } catch { }
    log = log.filter(ts => now - ts < 60 * 60 * 1000);
    log.push(now);
    localStorage.setItem("iletisim_log", JSON.stringify(log));
  }
  return [blocked, msg, remaining, kaydet];
}

const ILETISIM_NEDENLERI = [
  "Bilgi Talebi", "Transfer Rezervasyonu", "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık", "Geri Bildirim / Öneri", "Şikayet Bildirimi", "Diğer"
];
const ILETISIM_TERCIHLERI = [
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

// Mesafeli Satış popup - KVKK popup tasarımında
function PolicyPopup({ onClose, onConfirm }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("https://yolcutransferi.com/mesafeli-satis")
      .then(res => res.text())
      .then(htmlStr => {
        const div = document.createElement("div");
        div.innerHTML = htmlStr;
        let content = div.querySelector("main") || div.querySelector("section") || div;
        setHtml(content.innerHTML);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" style={{backdropFilter:"blur(2px)"}}>
      <div
        className="relative rounded-2xl border-2 border-[#bfa658] shadow-2xl overflow-hidden bg-gradient-to-br from-black via-[#19160a] to-[#302811]"
        style={{
          width: "80vw",
          maxWidth: 1024,
          minWidth: 260,
          maxHeight: "93vh",
          padding: 0,
          boxShadow: "0 0 24px 0 #bfa65899"
        }}
      >
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-3xl font-bold text-[#bfa658] hover:text-yellow-400 focus:outline-none z-20"
        >×</button>
        {/* Başlık */}
        <div className="py-5 border-b border-[#bfa658] w-full text-center bg-transparent">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#bfa658] tracking-tight">Politika ve Koşullar</h2>
        </div>
        {/* İçerik */}
        <div
          className="overflow-y-auto text-base px-6 py-6"
          style={{
            maxHeight: "54vh",
            minHeight: 180,
            background: "transparent",
            color: "#ffeec2",
            fontFamily: "inherit",
          }}
        >
          {loading
            ? <div className="text-center py-10 text-lg text-[#ffeec2]/70">Yükleniyor...</div>
            : <div dangerouslySetInnerHTML={{ __html: html }} />
          }
        </div>
        {/* Onay */}
        <div className="w-full px-6 pb-7 pt-3 bg-transparent border-t border-[#bfa658] flex justify-center">
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="w-full py-3 mt-0 rounded-xl font-bold text-lg bg-[#bfa658] hover:bg-yellow-600 text-black transition shadow"
            style={{ border: "none", outline: "none", maxWidth: 300 }}
          >Onaylıyorum</button>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .relative.rounded-2xl {
              width: 98vw !important;
              min-width: 0 !important;
              max-width: 98vw !important;
              padding: 0 !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}

export default function IletisimForm() {
  const fileInput = useRef(null);
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", kvkkOnay: false, ek: null
  });
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupKvkkConfirmed, setPopupKvkkConfirmed] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [blocked, blockedMsg, remaining, kaydetRate] = useAkilliRateLimit();

  useEffect(() => {
    if (popupKvkkConfirmed) {
      setForm(f => ({ ...f, kvkkOnay: true }));
      setPopupKvkkConfirmed(false);
    }
  }, [popupKvkkConfirmed]);

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

  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 11) val = val.slice(0, 11);
    if (val && val[0] !== "0") val = "0" + val;
    if (val.startsWith("00")) val = "0" + val.slice(2);
    setForm(f => ({ ...f, telefon: val }));
    setErrors(er => ({ ...er, telefon: undefined }));
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };
  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
    setErrors({ ...errors, iletisimTercihi: undefined });
  };

  function resetButton() {
    setTimeout(() => { setButtonMsg("Mesajı Gönder"); setButtonStatus("normal"); }, 6000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!isRealName(form.ad)) newErrors.ad = "Adınız en az 3 harf olmalı.";
    if (!isRealName(form.soyad)) newErrors.soyad = "Soyadınız en az 3 harf olmalı.";
    if (!isRealPhone(form.telefon)) newErrors.telefon = "Telefon hatalı. 05xx xxx xx xx";
    if (!isRealEmail(form.email)) newErrors.email = "Geçersiz e-posta.";
    if (!isRealMsg(form.mesaj)) newErrors.mesaj = "Mesaj en az 15 karakter, 3 kelime olmalı.";
    if (!form.iletisimTercihi) newErrors.iletisimTercihi = "İletişim tercihi zorunlu.";
    if (!form.kvkkOnay) newErrors.kvkkOnay = "Koşulları kabul etmelisiniz.";
    if (blocked) newErrors.global = blockedMsg;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setButtonStatus("error"); setButtonMsg("Eksik alanlar var"); resetButton(); return;
    }

    setButtonStatus("loading"); setButtonMsg("Gönderiliyor...");
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "ek" && val) formData.append("ek", val);
      else if (key !== "ek") formData.append(key, val);
    });

    try {
      await fetch("/api/iletisim", { method: "POST", body: formData });
      setButtonStatus("success"); setButtonMsg("Teşekkürler, mesajınız alındı."); resetButton();
      kaydetRate();
      setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", kvkkOnay: false, ek: null });
      setSelectedFileName("");
      if (fileInput.current) fileInput.current.value = "";
    } catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası, tekrar deneyin."); resetButton();
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">İletişim</h1>
      <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">7/24 VIP Müşteri Hattı • Kişiye özel ayrıcalık</div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow" encType="multipart/form-data">
        <div className="flex gap-2">
          <input type="text" name="ad" autoComplete="given-name" placeholder="Ad"
            value={form.ad} onChange={handleChange}
            className={`p-3 rounded-lg border flex-1 ${isRealName(form.ad) ? "border-green-500" : form.ad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition`} minLength={3} required />
          <input type="text" name="soyad" autoComplete="family-name" placeholder="Soyad"
            value={form.soyad} onChange={handleChange}
            className={`p-3 rounded-lg border flex-1 ${isRealName(form.soyad) ? "border-green-500" : form.soyad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition`} minLength={3} required />
        </div>
        <div className="flex gap-2">
          <input
            type="tel"
            name="telefon"
            autoComplete="tel"
            placeholder="05xx xxx xx xx"
            value={form.telefon}
            onChange={handlePhoneChange}
            className={`p-3 rounded-lg border flex-1 ${isRealPhone(form.telefon) ? "border-green-500" : form.telefon ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition`}
            maxLength={11}
            pattern="05\d{9}"
            required
          />
          <input type="email" name="email" autoComplete="email" placeholder="E-posta"
            value={form.email} onChange={handleChange}
            className={`p-3 rounded-lg border flex-1 ${isRealEmail(form.email) ? "border-green-500" : form.email ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition`} required />
        </div>
        <select name="neden" value={form.neden} onChange={handleChange}
          className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition text-base" required>
          {ILETISIM_NEDENLERI.map((neden, i) => (
            <option key={neden} value={neden}>{neden}</option>
          ))}
        </select>
        <textarea name="mesaj" placeholder="Mesajınız" value={form.mesaj} onChange={handleChange}
          className={`p-3 rounded-lg border ${isRealMsg(form.mesaj) ? "border-green-500" : form.mesaj ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition`} minLength={15} required rows={3} />

        {/* --- Dosya seç (ufak ve sola yaslı) --- */}
        <div className="flex flex-col items-start">
          <label className="relative" style={{ width: "130px" }}>
            <input
              type="file"
              name="ek"
              ref={fileInput}
              accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
              onChange={handleEkChange}
              className="opacity-0 absolute left-0 top-0 w-full h-full z-10 cursor-pointer"
              style={{ width: "100%", height: 28, cursor: "pointer" }}
            />
            <div
              className="flex items-center justify-start pl-2 w-full h-7 rounded bg-[#bfa658] text-black font-semibold text-xs shadow cursor-pointer hover:bg-yellow-600 transition"
              style={{ minHeight: 28, maxWidth: 130, fontSize: "12px", paddingRight: 8 }}
            >
              {selectedFileName ? (
                <span className="truncate">{selectedFileName}</span>
              ) : (
                <span>📎 Dosya Seç</span>
              )}
            </div>
          </label>
        </div>
        {/* --- /Dosya seç --- */}

        <span className="text-sm text-gray-300 font-bold ml-1 mt-2">İletişim tercihinizi seçiniz</span>
        <div className="flex flex-row gap-3 w-full mb-2 flex-wrap">
          {ILETISIM_TERCIHLERI.map((item) => (
            <label
              key={item.value}
              className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
              select-none shadow-md transition
              ${form.iletisimTercihi === item.value
                ? "bg-black border-[#FFD700] text-[#FFD700]"
                : "bg-black border-[#bfa658] text-white hover:bg-gray-900 hover:border-gray-400"}`}
              style={{ minWidth: 90, justifyContent: 'center' }}
            >
              <input
                type="radio"
                name="iletisimTercihi"
                value={item.value}
                checked={form.iletisimTercihi === item.value}
                onChange={() => handleIletisimTercihiChange(item.value)}
                className="hidden"
              />
              {item.icon}
              {item.label}
            </label>
          ))}
        </div>
        {errors.iletisimTercihi && <span className="text-xs text-red-400 font-bold pl-2">{errors.iletisimTercihi}</span>}
        <div className="flex items-center gap-2 mt-1">
          <input
            type="checkbox"
            name="kvkkOnay"
            checked={form.kvkkOnay}
            onChange={handleChange}
            required
            className="accent-[#FFD700] w-4 h-4"
          />
          <span className="text-xs text-gray-200">
            <button
              type="button"
              onClick={() => setPopupOpen(true)}
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer outline-none"
              style={{ padding: 0, border: "none", background: "transparent" }}
            >
              YolcuTransferi.com politika ve koşullarını
            </button>{" "}
            okudum, kabul ediyorum.
          </span>
        </div>
        {errors.kvkkOnay && <span className="text-xs text-red-400 font-bold pl-2">{errors.kvkkOnay}</span>}
        <button
          type="submit"
          className={`font-bold py-3 px-8 rounded-xl text-lg mt-2 w-full shadow transition text-black
            ${buttonStatus === "success"
              ? "bg-green-500"
              : buttonStatus === "error"
                ? "bg-red-600"
                : "bg-[#bfa658] hover:bg-yellow-600"}`}
          style={{ minHeight: 50, minWidth: 180 }}
          disabled={blocked || buttonStatus === "loading"}
        >
          {blocked
            ? blockedMsg + (remaining > 0 ? ` (${formatDuration(remaining)})` : "")
            : buttonMsg}
        </button>
        {Object.keys(errors).length > 0 && (
          <div className="mt-2 flex flex-col gap-1">
            {Object.values(errors).map((err, i) => (
              <span key={i} className="text-xs text-red-400 pl-2 font-bold">{err}</span>
            ))}
          </div>
        )}
      </form>
      <div className="w-full border-t border-[#bfa658] mt-10 pt-6">
        <div className="flex flex-wrap gap-4 mb-3 justify-center">
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#23201a] hover:bg-[#bfa658] text-white hover:text-black transition" title="WhatsApp"><FaWhatsapp size={28} /></a>
          <a href="https://instagram.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#23201a] hover:bg-[#bfa658] text-white hover:text-black transition" title="Instagram"><FaInstagram size={28} /></a>
          <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-[#23201a] hover:bg-[#bfa658] text-white hover:text-black transition" title="X"><SiX size={28} /></a>
        </div>
        <div className="flex flex-wrap gap-6 justify-center mb-2 text-[#ffeec2] text-base font-semibold">
          <span className="flex items-center gap-2"><FaPhone className="opacity-80" />+90 539 526 75 69</span>
          <span className="flex items-center gap-2"><FaEnvelope className="opacity-80" />info@yolcutransferi.com</span>
          <span className="flex items-center gap-2"><FaMapMarkerAlt className="opacity-80" />Ümraniye, İnkılap Mah. Plazalar Bölgesi</span>
        </div>
      </div>
      <div className="w-full flex justify-center mt-8">
        <div style={{ width: "100%", maxWidth: "900px", height: "210px" }} className="rounded-xl overflow-hidden border-2 border-[#bfa658] shadow-lg bg-[#23201a]">
          <iframe
            title="YolcuTransferi.com Konum"
            width="100%"
            height="210"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24081.262044014337!2d29.0903967!3d41.0319917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9cd7fd8d1ef%3A0xf6f8ff72b91ed1db!2sENPLAZA!5e0!3m2!1str!2str!4v1717693329992!5m2!1str!2str"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {popupOpen && (
        <PolicyPopup
          onClose={() => setPopupOpen(false)}
          onConfirm={() => setPopupKvkkConfirmed(true)}
        />
      )}
    </section>
  );
}
