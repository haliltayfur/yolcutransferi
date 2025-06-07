"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// --- Yardımcı fonksiyonlar ve sabitler, sendekiyle aynı (kısaltıldı) ---
function useRateLimit() {
  const key = "yt_contact_rate";
  const [blocked, setBlocked] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      let data = JSON.parse(localStorage.getItem(key) || "{}");
      for (const k in data) if (now - k > 24 * 60 * 60 * 1000) delete data[k];
      localStorage.setItem(key, JSON.stringify(data));
      let times = Object.values(data).map(Number).sort();
      let total = times.length;
      let isBlocked = false;
      let enYakin = 0;
      if (total >= 10) {
        let lastTime = times[total - 1];
        let wait = 60 * 60 * 1000 - (now - lastTime);
        if (wait > 0) { isBlocked = true; enYakin = wait; }
      } else if (total >= 2) {
        let lastTime = times[total - 1];
        let secondLastTime = times[total - 2];
        let wait = 5 * 60 * 1000 - (now - lastTime);
        if (wait > 0 && (now - secondLastTime < 5 * 60 * 1000)) { isBlocked = true; enYakin = wait; }
      }
      setBlocked(isBlocked);
      setRemaining(enYakin > 0 ? enYakin : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function kaydet() {
    const now = Date.now();
    let data = JSON.parse(localStorage.getItem(key) || "{}");
    data[now] = now;
    localStorage.setItem(key, JSON.stringify(data));
  }
  return [blocked, kaydet, remaining];
}

function formatDuration(ms) {
  if (!ms || ms < 1000) return "1 sn";
  const totalSec = Math.ceil(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min > 0 ? min + "dk " : ""}${sec}sn`;
}

const BASE64_BLOCKED_WORDS = "YW1rLHF3cSxhbWssaWJuZSxzaWt0aXIsb3Jvc3B1LHNpazgsdGFxLGJvayxwZXpldmVua3xib2ssc2FsYWssZ2VyaXpla2FsacOnLGFwdGFsLHNoZXJlZnNizeixtYWwsw7x5bGUsYmtsLHNpY2sseyJjdWt1ciI6IH0=";
function getBlockedWords() {
  try {
    if (typeof window !== "undefined" && window.atob)
      return window.atob(BASE64_BLOCKED_WORDS).split(",");
    return Buffer.from(BASE64_BLOCKED_WORDS, "base64").toString().split(",");
  } catch (e) { return []; }
}
function isRealEmail(val) { if (!val) return false; const regex = /^[\w.\-]+@([\w\-]+\.)+[\w\-]{2,}$/i; return regex.test(val); }
function isRealName(val) { if (!val || val.length < 3) return false; if (!/^[a-zA-ZığüşöçİĞÜŞÖÇ ]+$/.test(val)) return false; let v = val.trim().toLowerCase(); if (["asd", "qwe", "poi", "test", "xxx", "zzz", "klm", "asdf", "deneme"].includes(v)) return false; if (/^([a-zA-ZğüşöçİĞÜŞÖÇ])\1+$/.test(v)) return false; return true; }
function isRealPhone(val) { if (!val) return false; return /^05\d{9}$/.test(val); }
function isRealMsg(val) { if (!val || val.length < 15) return false; let wordCount = val.trim().split(/\s+/).length; if (wordCount < 3) return false; if (/([a-z])\1{3,}/.test(val.toLowerCase())) return false; return true; }
function parseMessage(msg, blockedWords) {
  if (!msg) return { parsed: "", hasBlocked: false, blockedWords: [] };
  let parts = msg.split(/(\s+)/);
  let hasBlocked = false;
  let blocked = [];
  const censored = parts.map((p, i) => {
    let w = p.toLowerCase().replace(/[^\wğüşöçıİĞÜŞÖÇ]/g, "");
    if (blockedWords.includes(w)) {
      hasBlocked = true;
      blocked.push(p);
      return (
        <span
          key={i}
          style={{
            textDecoration: "underline wavy red",
            color: "#c0392b",
            fontWeight: "bold",
            background: "#fff2",
            cursor: "pointer"
          }}
          title="Bu kelimeyi kullanamazsınız."
        >{p}</span>
      );
    }
    return p;
  });
  return { parsed: censored, hasBlocked, blockedWords: blocked };
}

// --- Sabitler ---
const SOCIALS = [
  { icon: <FaWhatsapp size={20} />, name: "WhatsApp", url: "https://wa.me/905395267569" },
  { icon: <FaInstagram size={20} />, name: "Instagram", url: "https://instagram.com/yolcutransferi" },
  { icon: <SiX size={20} />, name: "X (Twitter)", url: "https://x.com/yolcutransferi" }
];

const ILETISIM_NEDENLERI = [
  "Bilgi Talebi", "Transfer Rezervasyonu", "Teklif Almak İstiyorum", "İş Birliği / Ortaklık", "Geri Bildirim / Öneri", "Şikayet Bildirimi", "Diğer"
];

const ILETISIM_TERCIHLERI = [
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

const messages = [
  "YolcuTransferi.com olarak, alanında uzman ve profesyonel ekibimizle ihtiyacınıza en uygun çözümleri sunuyoruz.",
  "Talep, rezervasyon ve iş ortaklığı süreçlerinde çözüm odaklı destek sağlıyoruz.",
  "Her mesajınız, deneyimli ekiplerimiz tarafından hızla değerlendirilir ve çözüme ulaştırılır.",
  "YolcuTransferi.com Sadece bir transfer değil, size özel bir ayrıcalık yaşatır..."
];

// --- COMPONENT ---
export default function Iletisim() {
  const blockedWords = getBlockedWords();
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    neden: ILETISIM_NEDENLERI[0],
    mesaj: "",
    iletisimTercihi: ILETISIM_TERCIHLERI[2].value,
    honeypot: "",
    kvkk: false,
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sendInfo, setSendInfo] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [blocked, kaydet, remaining] = useRateLimit();
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (messages.length));
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const f = document.querySelector('input[autoComplete="given-name"]');
    if (f) f.focus();
  }, []);

  // --- VALIDATIONS ---
  const adValid = isRealName(form.ad);
  const soyadValid = isRealName(form.soyad);
  const phoneValid = isRealPhone(form.telefon);
  const emailValid = isRealEmail(form.email);
  const msgValid = isRealMsg(form.mesaj);
  const kvkkValid = form.kvkk === true;
  const censored = parseMessage(form.mesaj, blockedWords);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    let newErrors = {};
    setSendInfo("");
    if (!adValid) newErrors.ad = "Lütfen adınızı en az 3 karakter olacak şekilde doldurun.";
    if (!soyadValid) newErrors.soyad = "Lütfen soyadınızı en az 3 karakter olacak şekilde doldurun.";
    if (!phoneValid) newErrors.telefon = "Telefon numarası hatalı (05xx xxx xx xx).";
    if (!emailValid) newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
    if (!msgValid) newErrors.mesaj = "Mesajınızı daha açık ve anlamlı yazınız.";
    if (censored.hasBlocked) newErrors.mesaj = "Mesajınızda uygunsuz veya argo kelime var. Lütfen değiştirin.";
    if (!kvkkValid) newErrors.kvkk = "KVKK ve Gizlilik Sözleşmesini kabul etmelisiniz.";
    if (blocked) newErrors.global = "Güvenlik nedeniyle arka arkaya gönderimlerde kısa bir bekleme uygulanmaktadır.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSent(false);
      setSubmitError(""); // Hataları alan bazında gösteriyoruz.
      return;
    }

    let infoMsg = "";
    if (form.iletisimTercihi === "E-posta") {
      infoMsg = "Teşekkürler, mesajınız bize ulaştı. Size <b>info@yolcutransferi.com</b> adresinden dönüş yapacağız.";
    } else {
      infoMsg = `Teşekkürler, mesajınız bize ulaştı. Size <b>0539 526 75 69</b> ${form.iletisimTercihi.toLowerCase()} hattımızdan ulaşacağız.`;
    }
    setSendInfo(infoMsg);
    setSent(true);
    kaydet();
    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (error) {
      setSubmitError("Sunucu hatası, lütfen tekrar deneyin.");
    }
    setTimeout(() => setSent(false), 7000);
    setForm({
      ad: "",
      soyad: "",
      telefon: "",
      email: "",
      neden: ILETISIM_NEDENLERI[0],
      mesaj: "",
      iletisimTercihi: ILETISIM_TERCIHLERI[2].value,
      honeypot: "",
      kvkk: false,
    });
  };

  // --- UI ---
  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-7 px-2">
      <div className="w-full max-w-3xl rounded-2xl shadow-2xl px-3 sm:px-7 py-7 flex flex-col gap-6"
        style={{ border: "2.5px solid #bfa658", background: "rgba(25, 23, 20, 0.97)" }}
      >
        {/* --- Başlık ve alt etiket --- */}
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-[#FFD700] mb-1 mt-0 tracking-tight drop-shadow">
          İletişim
        </h1>
        <div className="flex justify-center">
          <span className="text-xs md:text-sm font-semibold bg-[#FFD700] text-black px-4 py-1 rounded-full shadow mb-2">
            7/24 VIP Müşteri Hattı • Kişiye özel ayrıcalık
          </span>
        </div>

        {/* Bilboard: Sola yaslı, sabit yükseklikli, responsive */}
        <div className="w-full flex justify-center">
          <div
            className="relative w-full max-w-2xl bg-black border border-[#bfa658] rounded-xl shadow flex items-start justify-start transition-all duration-500 overflow-hidden"
            style={{ height: 68, minHeight: 68, padding: "0 14px", alignItems: "center" }}
          >
            <span
              className="text-base sm:text-lg text-gray-100 font-medium animate-fade-in leading-normal truncate-message"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                fontSize: "1.08rem",
                lineHeight: "1.5",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              {messages[activeIndex]}
            </span>
          </div>
        </div>

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3" autoComplete="on">
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              name="ad"
              autoComplete="given-name"
              placeholder="Ad"
              value={form.ad}
              onChange={handleChange}
              className={`flex-1 p-3 rounded-lg border ${adValid ? "border-green-500" : form.ad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`}
              minLength={3}
              required
            />
            <input
              type="text"
              name="soyad"
              autoComplete="family-name"
              placeholder="Soyad"
              value={form.soyad}
              onChange={handleChange}
              className={`flex-1 p-3 rounded-lg border ${soyadValid ? "border-green-500" : form.soyad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`}
              minLength={3}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <input
              type="tel"
              name="telefon"
              autoComplete="tel"
              placeholder="05xx xxx xx xx"
              value={form.telefon}
              onChange={handleChange}
              className={`flex-1 p-3 rounded-lg border ${phoneValid ? "border-green-500" : form.telefon ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`}
              maxLength={11}
              pattern="05\d{9}"
              required
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="E-posta"
              value={form.email}
              onChange={handleChange}
              className={`flex-1 p-3 rounded-lg border ${emailValid ? "border-green-500" : form.email ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`}
              required
            />
          </div>
          <select
            name="neden"
            value={form.neden}
            onChange={handleChange}
            className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white focus:border-[#bfa658] transition text-base"
            required
          >
            {ILETISIM_NEDENLERI.map((neden, i) => (
              <option key={neden} value={neden}>{neden}</option>
            ))}
          </select>

          {/* Chip butonlar */}
          <div className="mt-1 flex flex-col items-start gap-1">
            <span className="text-sm text-gray-300 font-bold mb-1 ml-1">Size nasıl ulaşalım?</span>
            <div className="flex flex-row gap-2 w-full">
              {ILETISIM_TERCIHLERI.map((item) => (
                <label
                  key={item.value}
                  className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
                    transition select-none shadow-md
                    ${form.iletisimTercihi === item.value
                    ? "bg-[#e5b646] border-[#e5b646] text-black scale-105"
                    : "bg-[#322f2b] border-[#bfa658] text-[#fff] hover:bg-[#bfa658] hover:text-black"}
                  `}
                  style={{ minWidth: 82, justifyContent: 'center', opacity: form.iletisimTercihi === item.value ? 1 : 0.92 }}
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
          </div>

          {/* Mesaj Alanı */}
          <div className="flex flex-col">
            <textarea
              name="mesaj"
              placeholder="Mesajınız"
              value={form.mesaj}
              onChange={handleChange}
              className={`p-3 rounded-lg border ${msgValid && !censored.hasBlocked ? "border-green-500" : form.mesaj ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-full focus:border-[#bfa658] transition text-base`}
              minLength={15}
              required
              rows={3}
              style={{ background: "transparent", resize: "vertical" }}
            />
            {/* Mesajda uygunsuz kelime varsa input üstüne bindirme ile göster */}
            {form.mesaj && censored.hasBlocked && (
              <div style={{
                position: "absolute", left: 12, top: 8, zIndex: 3, color: "#fff",
                fontSize: "1rem", pointerEvents: "none", width: "calc(100% - 24px)", height: "100%",
                background: "none", whiteSpace: "pre-wrap", opacity: 0.95, fontFamily: "inherit"
              }}>
                {censored.parsed}
              </div>
            )}
            <div className="mt-1 text-sm leading-relaxed" style={{ minHeight: 26 }}>
              {censored.hasBlocked && (
                <span className="text-red-500 font-bold">
                  Uygunsuz veya argo kelime tespit edildi. Bu kelimeyi kullanamazsınız.
                </span>
              )}
            </div>
            {errors.mesaj && <span className="text-red-500 text-xs px-1 pt-1">{errors.mesaj}</span>}
          </div>

          {/* KVKK Onay */}
          <label className="flex items-center gap-2 mt-2 mb-2 text-xs text-gray-300 select-none">
            <input type="checkbox" name="kvkk" checked={form.kvkk} onChange={handleChange} />
            <span>
              <a href="/gizlilik" className="underline text-[#FFD700]" target="_blank" rel="noopener noreferrer">
                KVKK &amp; Gizlilik Sözleşmesi'ni
              </a> okudum, kabul ediyorum.
            </span>
            {errors.kvkk && <span className="text-red-500 ml-2">{errors.kvkk}</span>}
          </label>

          {/* Hatalar */}
          {(errors.ad || errors.soyad || errors.telefon || errors.email || errors.mesaj || errors.global) && (
            <div className="flex items-center justify-center gap-2 p-2 rounded-lg text-base font-bold bg-red-700/90 text-white text-center border-2 border-red-400 shadow">
              <ul className="list-disc list-inside text-left">
                {errors.ad && <li>{errors.ad}</li>}
                {errors.soyad && <li>{errors.soyad}</li>}
                {errors.telefon && <li>{errors.telefon}</li>}
                {errors.email && <li>{errors.email}</li>}
                {errors.mesaj && <li>{errors.mesaj}</li>}
                {errors.global && <li>{errors.global} <span className="text-yellow-200 font-bold">{formatDuration(remaining)} sonra tekrar deneyebilirsiniz.</span></li>}
              </ul>
            </div>
          )}

          {/* Gönder Butonu ve Başarı */}
          <button
            type="submit"
            className="bg-[#bfa658] text-black font-bold py-3 px-8 rounded-xl text-lg hover:bg-yellow-600 transition shadow mt-1 w-full"
          >
            Mesajı Gönder
          </button>
          {sent && (
            <div className="mt-2 p-3 rounded-lg text-base font-semibold bg-green-700/90 text-white text-center border-2 border-green-400 shadow" dangerouslySetInnerHTML={{
              __html: sendInfo
            }} />
          )}
          {submitError && (
            <div className="mt-2 p-3 rounded-lg text-base font-semibold bg-red-700/90 text-white text-center border-2 border-red-400 shadow">
              {submitError}
            </div>
          )}
        </form>

        {/* ALT: Adres ve Sosyal Bilgiler ve Harita */}
        <div className="w-full flex flex-col md:flex-row gap-6 items-stretch justify-between pt-2">
          {/* Adres & Sosyal Medya */}
          <div className="flex-1 flex flex-col justify-start gap-2 min-w-[220px]">
            <div className="space-y-2 text-base text-gray-100">
              <div className="flex items-center gap-2"><FaPhone /> <span>+90 539 526 75 69</span></div>
              <div className="flex items-center gap-2"><FaEnvelope /> <span>info@yolcutransferi.com</span></div>
              <div className="flex items-center gap-2"><FaMapMarkerAlt /> <span>Ümraniye, İnkılap Mah. Plazalar Bölgesi, İstanbul</span></div>
            </div>
            <div className="flex flex-row gap-4 pt-1">
              {SOCIALS.map(({ icon, url, name }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-[#23201a] hover:bg-[#bfa658] text-white hover:text-black transition"
                  title={name}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {/* Harita */}
          <div className="flex-1 flex items-center justify-end">
            <div style={{
              width: "100%",
              maxWidth: 350,
              height: 140,
              minWidth: 220,
              borderRadius: 18,
              overflow: "hidden",
              border: "2px solid #bfa658",
              boxShadow: "0 0 12px #1a1a1a80"
            }}>
              <iframe
                title="YolcuTransferi.com Konum"
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0, width: "100%", height: "100%" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24081.262044014337!2d29.0903967!3d41.0319917!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac9cd7fd8d1ef%3A0xf6f8ff72b91ed1db!2sENPLAZA!5e0!3m2!1str!2str!4v1717693329992!5m2!1str!2str"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn .7s; }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(15px);} 100% { opacity: 1; transform: translateY(0);} }
        .truncate-message { display: block; width: 100%; overflow-wrap: break-word; white-space: normal; line-height: 1.4; font-size: 1rem;}
        @media (max-width: 640px) {
          .truncate-message { font-size: 0.95rem; }
          .max-w-3xl, .max-w-2xl { max-width: 99vw !important; }
        }
      `}</style>
    </div>
  );
}
