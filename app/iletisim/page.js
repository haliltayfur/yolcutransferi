// /app/iletisim/page.js
"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// --- Yardımcı fonksiyonlar ---
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
        setBlocked(false); setMsg(""); setRemaining(0);
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

// --- Politika Popup ---
function PolicyPopup({ open, onClose, onConfirm }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkPopup, setLinkPopup] = useState(null);
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch("/mesafeli-satis")
      .then(r => r.text())
      .then(html => {
        let match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        let mainHtml = match ? match[1] : "İçerik yüklenemedi.";
        mainHtml = mainHtml.replace(/<a\s+href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/gi,
          (m, href, rest, text) => {
            if (/^https?:\/\//.test(href)) return m;
            return `<a href="#" data-popup="${href}"${rest}>${text}</a>`;
          }
        );
        setContent(mainHtml);
      })
      .catch(() => setContent("İçerik alınamadı."))
      .finally(() => setLoading(false));
  }, [open]);
  // Link click
  useEffect(() => {
    if (!open) return;
    const root = document.getElementById("policy-popup-content");
    if (!root) return;
    function clickHandler(e) {
      if (e.target.tagName === "A" && e.target.dataset.popup) {
        e.preventDefault();
        setLinkPopup(e.target.dataset.popup);
      }
    }
    root.addEventListener("click", clickHandler);
    return () => root.removeEventListener("click", clickHandler);
  }, [open, content]);
  // Sub popup
  const [subPopupContent, setSubPopupContent] = useState("");
  useEffect(() => {
    if (!linkPopup) return;
    fetch(linkPopup)
      .then(r => r.text())
      .then(html => {
        let match = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        let mainHtml = match ? match[1] : "İçerik yüklenemedi.";
        setSubPopupContent(mainHtml);
      })
      .catch(() => setSubPopupContent("İçerik alınamadı."));
  }, [linkPopup]);

  if (!open) return null;

  // Dış ve iç çerçeve (sadece 2 çerçeve!)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2.5px]"
      style={{ overflow: "hidden" }}
      onWheel={e => e.stopPropagation()}
      onScroll={e => e.stopPropagation()}
    >
      <div
        className="relative w-[98vw] max-w-[1400px] md:w-[70vw] rounded-3xl shadow-2xl border-2 border-[#FFD700] p-0 bg-gradient-to-br from-black via-[#19160a] to-[#302811] flex flex-col items-center"
        style={{ minHeight: "370px", minWidth: "320px" }}
      >
        {/* Başlık ve Kapat Butonu */}
        <div className="flex w-full items-center justify-between pt-8 pb-2 px-10">
          <div className="text-2xl md:text-3xl font-extrabold text-[#FFD700] text-center w-full" style={{ letterSpacing: "0.02em" }}>
            YolcuTransferi.com Politika ve Koşulları
          </div>
          <button
            onClick={onClose}
            className="ml-auto px-5 py-2 bg-[#FFD700] hover:bg-[#E5C100] text-black font-bold rounded-xl text-base shadow border-2 border-[#FFD700] transition"
            style={{ marginLeft: 24, marginRight: 0 }}
          >
            Kapat
          </button>
        </div>
        {/* İçerik - sadece bir çerçeve! */}
        <div
          id="policy-popup-content"
          className="w-[96%] rounded-2xl border-2 border-[#FFD70080] bg-black/85 px-7 py-7 mb-6 text-[#ecd9aa] text-base shadow-inner"
          style={{
            boxShadow: "0 0 0 2px #FFD70022, 0 3px 14px #19160a66",
            minHeight: "120px",
            maxHeight: "60vh",
            overflowY: "auto",
            margin: "0 auto"
          }}
          dangerouslySetInnerHTML={{ __html: loading ? "<div style='text-align:center;padding:35px'>Yükleniyor...</div>" : content }}
        />
        <div className="w-full flex justify-center px-6 pb-6">
          <button
            onClick={() => { onConfirm && onConfirm(); onClose(); }}
            className="px-7 py-3 bg-gradient-to-tr from-[#FFD700] to-[#BFA658] rounded-xl text-black font-bold text-lg shadow hover:scale-105 transition"
            style={{ minWidth: 180 }}
          >
            Tümünü okudum, onaylıyorum
          </button>
        </div>
      </div>
      {/* Sub-popup */}
      {linkPopup && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
          <div className="relative w-[94vw] max-w-xl rounded-2xl border-2 border-[#FFD700] bg-gradient-to-br from-black via-[#19160a] to-[#302811] shadow-2xl p-0 flex flex-col">
            <button
              onClick={() => setLinkPopup(null)}
              className="absolute top-3 right-3 text-[#FFD700] text-2xl font-black w-10 h-10 flex items-center justify-center rounded-full bg-[#19160a] border-2 border-[#FFD700] hover:bg-[#ffd70022] transition"
              aria-label="Kapat"
            >
              <SiX />
            </button>
            <div
              className="w-full max-h-[54vh] min-h-[90px] overflow-y-auto rounded-2xl border-2 border-[#FFD70080] bg-black/80 px-4 md:px-8 py-5 mb-2 text-[#ecd9aa] text-base shadow-inner"
              style={{ boxShadow: "0 0 0 2px #FFD70022, 0 2px 10px #19160a66" }}
              dangerouslySetInnerHTML={{ __html: subPopupContent || "Yükleniyor..." }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", kvkkOnay: false
  });
  const [ek, setEk] = useState(null);
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupKvkkConfirmed, setPopupKvkkConfirmed] = useState(false);

  const [blocked, blockedMsg, remaining, kaydetRate] = useAkilliRateLimit();

  useEffect(() => {
    if (popupKvkkConfirmed) {
      setForm(f => ({ ...f, kvkkOnay: true }));
      setPopupKvkkConfirmed(false);
    }
  }, [popupKvkkConfirmed]);

  // Dosya ekleme
  const fileInput = useRef(null);
  function handleEkChange(e) {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    if (file.size > 10 * 1024 * 1024) {
      setErrors(er => ({ ...er, ek: "Dosya boyutu 10MB'ı aşamaz." }));
      setEk(null);
    } else {
      setEk(file);
      setErrors(er => ({ ...er, ek: undefined }));
    }
  }

  // Telefon inputunda başa sıfır ekle
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

  // Form submit
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
    if (ek && ek.size > 10 * 1024 * 1024) newErrors.ek = "Ek dosya 10MB'ı aşamaz.";
    if (blocked) newErrors.global = blockedMsg;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setButtonStatus("error"); setButtonMsg("Eksik alanlar var"); resetButton(); return;
    }
    setButtonStatus("success"); setButtonMsg("Teşekkürler, mesajınız alındı."); resetButton();
    kaydetRate();

    // Dosya ve veriyi form-data ile gönder
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (ek) fd.append("ek", ek);
      await fetch("/api/iletisim", {
        method: "POST",
        body: fd
      });
    }
    catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası, tekrar deneyin."); resetButton();
    }
    setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", kvkkOnay: false });
    setEk(null);
  };

  // GÖRÜNÜM
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          İletişim
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          7/24 VIP Müşteri Hattı • Kişiye özel ayrıcalık
        </div>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/70 rounded-2xl p-6 border border-[#bfa658]/60 shadow">
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
            className="p-3 rounded-lg border border-[#FFD700] bg-[#19160a] text-[#FFD700] focus:border-[#FFD700] transition text-base"
            style={{ fontWeight: 500, minHeight: 48 }}
            required>
            {ILETISIM_NEDENLERI.map((neden, i) => (
              <option key={neden} value={neden}>{neden}</option>
            ))}
          </select>
          <textarea name="mesaj" placeholder="Mesajınız" value={form.mesaj} onChange={handleChange}
            className={`p-3 rounded-lg border ${isRealMsg(form.mesaj) ? "border-green-500" : form.mesaj ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-[#e7e7e7] focus:border-[#bfa658] transition`} minLength={15} required rows={3} />
          {/* Dosya ekleme alanı */}
          <div className="mt-1 flex flex-col gap-2">
            <label className="text-xs text-[#FFD700] font-bold">
              Ek Dosya <span className="text-gray-400">(opsiyonel, max 10MB):</span>
            </label>
            <div className="flex items-center gap-3">
              <button type="button"
                onClick={() => fileInput.current && fileInput.current.click()}
                className="px-5 py-1 bg-[#FFD700] text-black font-bold rounded-lg hover:bg-[#E5C100] shadow border border-[#FFD700] transition"
                style={{ minWidth: 95, fontSize: 16 }}
              >
                Dosya Seç
              </button>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx,.zip"
                ref={fileInput}
                className="hidden"
                onChange={handleEkChange}
              />
              {ek && (
                <span className="text-sm text-[#bfa658] font-semibold truncate" style={{ maxWidth: 220 }}>
                  {ek.name}
                </span>
              )}
            </div>
            {errors.ek && <span className="text-xs text-red-400 font-bold pl-2">{errors.ek}</span>}
          </div>
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
            disabled={blocked}
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
        {/* Sosyal medya ve iletişim bilgileri */}
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
        {/* Konum haritası */}
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
      </section>
      {/* Politika popup */}
      <PolicyPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        onConfirm={() => setPopupKvkkConfirmed(true)}
      />
    </main>
  );
}

// /app/iletisim/page.js
