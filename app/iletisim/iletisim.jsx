"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// --- RATE LIMIT / VALIDATION FONKSİYONLARI (Değiştirmeden kullan!) ---
function useRateLimit() {
  const key = "yt_contact_rate";
  const [blocked, setBlocked] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      let data = JSON.parse(localStorage.getItem(key) || "{}");
      // Temizle: 24 saat öncesini sil (hafıza temizliği)
      for (const k in data) if (now - k > 24 * 60 * 60 * 1000) delete data[k];
      localStorage.setItem(key, JSON.stringify(data));

      let times = Object.values(data).map(Number).sort();
      let total = times.length;

      let isBlocked = false;
      let enYakin = 0;

      if (total >= 10) {
        // 10 veya daha fazla: 1 saat bekle
        let lastTime = times[total - 1];
        let wait = 60 * 60 * 1000 - (now - lastTime);
        if (wait > 0) {
          isBlocked = true;
          enYakin = wait;
        }
      } else if (total >= 2) {
        // 3. ve sonraki: 5 dk bekle
        let lastTime = times[total - 1];
        let secondLastTime = times[total - 2];
        let wait = 5 * 60 * 1000 - (now - lastTime);
        if (wait > 0 && (now - secondLastTime < 5 * 60 * 1000)) {
          isBlocked = true;
          enYakin = wait;
        }
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
  } catch (e) {
    return [];
  }
}
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

// --- VERİLER ---
const SOCIALS = [
  { icon: <FaWhatsapp size={22} />, name: "WhatsApp", url: "https://wa.me/905395267569", color: "#25d366" },
  { icon: <FaInstagram size={22} />, name: "Instagram", url: "https://instagram.com/yolcutransferi", color: "#e4405f" },
  { icon: <SiX size={22} />, name: "X (Twitter)", url: "https://x.com/yolcutransferi", color: "#fff" }
];

const ILETISIM_NEDENLERI = [
  "Bilgi Talebi",
  "Transfer Rezervasyonu",
  "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık",
  "Geri Bildirim / Öneri",
  "Şikayet Bildirimi",
  "Diğer"
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
    honeypot: ""
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sendInfo, setSendInfo] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [blocked, kaydet, remaining] = useRateLimit();
  const [submitError, setSubmitError] = useState("");
  const [kvkkChecked, setKvkkChecked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (messages.length + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const f = document.querySelector('input[autoComplete="given-name"]');
    if (f) f.focus();
  }, []);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };

  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
  };

  const adValid = isRealName(form.ad);
  const soyadValid = isRealName(form.soyad);
  const phoneValid = isRealPhone(form.telefon);
  const emailValid = isRealEmail(form.email);
  const msgValid = isRealMsg(form.mesaj);
  const censored = parseMessage(form.mesaj, blockedWords);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    let newErrors = {};
    setSendInfo("");
    if (!kvkkChecked) newErrors.kvkk = "KVKK ve Gizlilik Sözleşmesi’ni kabul etmelisiniz.";
    if (blocked) newErrors.global = "Çok sık mesaj gönderdiniz, lütfen bekleyin.";
    if (form.honeypot && form.honeypot.length > 0) return;
    if (!adValid) newErrors.ad = "Lütfen adınızı en az 3 karakter olacak şekilde doldurun.";
    if (!soyadValid) newErrors.soyad = "Lütfen soyadınızı en az 3 karakter olacak şekilde doldurun.";
    if (!phoneValid) newErrors.telefon = "Telefon numarası hatalı (05xx xxx xx xx).";
    if (!emailValid) newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
    if (!msgValid) newErrors.mesaj = "Mesajınızı daha açık ve anlamlı yazınız.";
    if (censored.hasBlocked) newErrors.mesaj = "Mesajınızda uygunsuz veya argo kelime var. Lütfen değiştirin.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSubmitError("");
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
      honeypot: ""
    });
    setKvkkChecked(false);
  };

  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2">
      <div className="w-full max-w-3xl rounded-3xl shadow-2xl px-2 sm:px-8 py-7 flex flex-col gap-7"
        style={{
          border: "2.5px solid #bfa658",
          background: "linear-gradient(135deg, #221d12 85%, #37302b 100%)",
          boxShadow: "0 8px 32px 0 rgba(37,33,23,.26)"
        }}>
        
        {/* --- BAŞLIK VE VIP BADGE --- */}
        <div className="flex flex-col items-center gap-1 mb-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#FFD700] tracking-tight drop-shadow text-center mb-0">İletişim</h1>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-500/70 to-yellow-300/60 text-black shadow border border-yellow-300/80 mt-2 animate-pulse">
            7/24 VIP Müşteri Hattı • Kişiye özel ayrıcalık
          </span>
        </div>
        
        {/* --- KISA BİLGİ ve BİLBOARD --- */}
        <div className="w-full flex flex-col items-center gap-2 mb-2">
          <div
            className="w-full max-w-2xl bg-[#161309] border border-[#bfa658] rounded-2xl shadow flex items-center justify-center transition-all duration-500 p-4"
            style={{ minHeight: 52 }}>
            <span className="text-base sm:text-lg text-gray-100 text-center font-medium leading-normal" style={{ lineHeight: "1.5" }}>
              {messages[activeIndex < messages.length ? activeIndex : 0]}
            </span>
          </div>
        </div>
        
        {/* --- İLETİŞİM FORMU ve ADRES --- */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-[#181611]/80 rounded-2xl p-4 md:p-8 border border-[#bfa658] shadow-md backdrop-blur-sm">
          <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} style={{display:"none"}} autoComplete="off" tabIndex="-1"/>
          
          <div className="flex flex-col md:flex-row gap-7">
            {/* Form */}
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="ad"
                  autoComplete="given-name"
                  placeholder="Ad"
                  value={form.ad}
                  onChange={handleChange}
                  className={`p-3 rounded-xl border transition-all duration-200 outline-none bg-black/60 text-white placeholder-gray-400 text-base shadow-sm focus:shadow-lg 
                    ${adValid ? "border-[#d9b24c]" : form.ad ? "border-red-500" : "border-[#423c1c]"}`}
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
                  className={`p-3 rounded-xl border transition-all duration-200 outline-none bg-black/60 text-white placeholder-gray-400 text-base shadow-sm focus:shadow-lg 
                    ${soyadValid ? "border-[#d9b24c]" : form.soyad ? "border-red-500" : "border-[#423c1c]"}`}
                  minLength={3}
                  required
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="tel"
                  name="telefon"
                  autoComplete="tel"
                  placeholder="05xx xxx xx xx"
                  value={form.telefon}
                  onChange={handleChange}
                  className={`p-3 rounded-xl border transition-all duration-200 outline-none bg-black/60 text-white placeholder-gray-400 text-base shadow-sm focus:shadow-lg 
                    ${phoneValid ? "border-[#d9b24c]" : form.telefon ? "border-red-500" : "border-[#423c1c]"}`}
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
                  className={`p-3 rounded-xl border transition-all duration-200 outline-none bg-black/60 text-white placeholder-gray-400 text-base shadow-sm focus:shadow-lg 
                    ${emailValid ? "border-[#d9b24c]" : form.email ? "border-red-500" : "border-[#423c1c]"}`}
                  required
                />
              </div>
              <select
                name="neden"
                value={form.neden}
                onChange={handleChange}
                className="p-3 rounded-xl border border-[#423c1c] bg-black/60 text-white focus:border-[#bfa658] transition text-base shadow-sm"
                required
              >
                {ILETISIM_NEDENLERI.map((neden, i) => (
                  <option key={neden} value={neden}>{neden}</option>
                ))}
              </select>
              {/* Chip butonlar */}
              <div className="mt-2 flex flex-col items-start gap-1">
                <span className="text-sm text-gray-300 font-bold mb-1 ml-1">Size nasıl ulaşalım?</span>
                <div className="flex flex-row gap-2 w-full flex-wrap">
                  {ILETISIM_TERCIHLERI.map((item) => (
                    <label
                      key={item.value}
                      className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
                      transition select-none shadow 
                      ${form.iletisimTercihi === item.value
                        ? "bg-[#e5b646] border-[#e5b646] text-black scale-105 shadow-lg"
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
              <textarea
                name="mesaj"
                placeholder="Mesajınız"
                value={form.mesaj}
                onChange={handleChange}
                className={`p-3 mt-2 rounded-xl border transition-all duration-200 outline-none bg-black/60 text-white placeholder-gray-400 text-base shadow-sm focus:shadow-lg 
                  ${msgValid && !censored.hasBlocked ? "border-[#d9b24c]" : form.mesaj ? "border-red-500" : "border-[#423c1c]"}`}
                minLength={15}
                required
                rows={3}
                style={{ zIndex: 2, position: "relative", background: "transparent" }}
              />
              {form.mesaj && censored.hasBlocked && (
                <div
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 8,
                    zIndex: 3,
                    color: "#fff",
                    fontSize: "1rem",
                    pointerEvents: "none",
                    width: "calc(100% - 24px)",
                    height: "100%",
                    background: "none",
                    whiteSpace: "pre-wrap",
                    opacity: 0.95,
                    fontFamily: "inherit"
                  }}
                >
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
              {/* KVKK & Gizlilik */}
              <label className="flex items-center gap-2 mt-2 text-xs text-gray-300 select-none cursor-pointer">
                <input
                  type="checkbox"
                  className="form-checkbox accent-yellow-500 rounded-sm"
                  checked={kvkkChecked}
                  onChange={e => setKvkkChecked(e.target.checked)}
                />
                <span>
                  <span className="font-bold text-yellow-300 underline hover:text-yellow-400">
                    <a href="/gizlilik" target="_blank" rel="noopener noreferrer">KVKK & Gizlilik Sözleşmesi’ni</a>
                  </span> okudum, kabul ediyorum.
                </span>
                {errors.kvkk && <span className="text-red-500 ml-2">{errors.kvkk}</span>}
              </label>
            </div>
            {/* Adres & Sosyal Medya */}
            <div className="flex flex-col gap-3 items-center min-w-[220px]">
              <div className="space-y-1 text-[1rem] text-gray-100">
                <div className="flex items-center gap-2"><FaPhone /> <span>+90 539 526 75 69</span></div>
                <div className="flex items-center gap-2"><FaEnvelope /> <span>info@yolcutransferi.com</span></div>
                <div className="flex items-center gap-2"><FaMapMarkerAlt /> <span>Ümraniye, İnkılap Mah. Plazalar Bölgesi, İstanbul</span></div>
              </div>
              <div className="flex flex-row gap-3 pt-1">
                {SOCIALS.map(({ icon, url, name, color }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/80 border border-[#bfa658] hover:bg-[#bfa658] hover:scale-110 transition-all duration-200 shadow-xl"
                    title={name}
                    style={{ color: color }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {/* Hata ve Başarı Mesajları */}
          {blocked && (
            <div className="mt-2 flex items-center justify-center gap-2 p-2 rounded-lg text-base font-bold bg-red-700/90 text-white text-center border-2 border-red-400 shadow">
              Güvenlik nedeniyle arka arkaya gönderimlerde kısa bir bekleme uygulanmaktadır.
              <span className="ml-2 text-yellow-200 font-bold">
                ⏳ {formatDuration(remaining)} sonra tekrar deneyebilirsiniz.
              </span>
            </div>
          )}
          {!blocked && (
            <>
              {(errors.ad || errors.soyad || errors.telefon || errors.email || errors.mesaj || errors.global) && (
                <div className="mt-2 flex items-center justify-center gap-2 p-2 rounded-lg text-base font-bold bg-red-700/90 text-white text-center border-2 border-red-400 shadow">
                  <ul className="list-disc list-inside text-left">
                    {errors.ad && <li>{errors.ad}</li>}
                    {errors.soyad && <li>{errors.soyad}</li>}
                    {errors.telefon && <li>{errors.telefon}</li>}
                    {errors.email && <li>{errors.email}</li>}
                    {errors.mesaj && <li>{errors.mesaj}</li>}
                    {errors.global && <li>{errors.global}</li>}
                  </ul>
                </div>
              )}
            </>
          )}
          <button
            type="submit"
            className={`bg-[#bfa658] text-black font-bold py-3 px-8 rounded-xl text-lg hover:bg-yellow-600 transition-all duration-200 shadow mt-2 w-full flex items-center justify-center gap-2 ${
              blocked || censored.hasBlocked || Object.keys(errors).length > 0 ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={blocked || censored.hasBlocked || Object.keys(errors).length > 0}
          >
            <FaRegPaperPlane className="text-xl" /> Mesajı Gönder
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

        {/* Harita Kutusu (en altta sade) */}
        <div className="w-full flex justify-center">
          <div style={{ width: "100%", maxWidth: "700px", height: "210px" }} className="rounded-xl overflow-hidden border-2 border-[#bfa658] shadow-lg bg-[#23201a]">
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
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn .7s; }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(15px);} 100% { opacity: 1; transform: translateY(0);} }
        .truncate-message { display: block; width: 100%; overflow-wrap: break-word; white-space: normal; line-height: 1.4; font-size: 1rem;}
        @media (max-width: 640px) { .truncate-message { font-size: 0.97rem; } .max-w-3xl { max-width: 99vw !important; } }
      `}</style>
    </div>
  );
}
