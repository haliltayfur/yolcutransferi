"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// --- Rate Limit Fonksiyonu ve yardımcı fonksiyonlar ---
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
        if (wait > 0) {
          isBlocked = true;
          enYakin = wait;
        }
      } else if (total >= 2) {
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

const SOCIALS = [
  { icon: <FaWhatsapp size={24} />, name: "WhatsApp", url: "https://wa.me/905395267569" },
  { icon: <FaInstagram size={24} />, name: "Instagram", url: "https://instagram.com/yolcutransferi" },
  { icon: <SiX size={24} />, name: "X (Twitter)", url: "https://x.com/yolcutransferi" }
];
const ILETISIM_NEDENLERI = [
  "Bilgi Talebi", "Transfer Rezervasyonu", "Teklif Almak İstiyorum",
  "İş Birliği / Ortaklık", "Geri Bildirim / Öneri", "Şikayet Bildirimi", "Diğer"
];
const ILETISIM_TERCIHLERI = [
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

export default function Iletisim() {
  const blockedWords = getBlockedWords();
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", honeypot: ""
  });
  const [errors, setErrors] = useState({});
  const [buttonStatus, setButtonStatus] = useState("normal");
  const [buttonMsg, setButtonMsg] = useState("Mesajı Gönder");
  const [blocked, kaydet, remaining] = useRateLimit();

  useEffect(() => { setButtonMsg("Mesajı Gönder"); setButtonStatus("normal"); }, []);
  useEffect(() => { const f = document.querySelector('input[autoComplete="given-name"]'); if (f) f.focus(); }, []);

  function resetButton() {
    setTimeout(() => { setButtonMsg("Mesajı Gönder"); setButtonStatus("normal"); }, 10000);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
  };
  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
    setErrors({ ...errors, iletisimTercihi: undefined });
  };

  const adValid = isRealName(form.ad);
  const soyadValid = isRealName(form.soyad);
  const phoneValid = isRealPhone(form.telefon);
  const emailValid = isRealEmail(form.email);
  const msgValid = isRealMsg(form.mesaj);

  const censored = parseMessage(form.mesaj, blockedWords);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    if (blocked) newErrors.global = "Güvenlik nedeniyle üst üste gönderimlerde kısa bir bekleme uygulanmaktadır.";
    if (form.honeypot && form.honeypot.length > 0) return;
    if (!adValid) newErrors.ad = "Lütfen adınızı en az 3 karakter olacak şekilde doldurun.";
    if (!soyadValid) newErrors.soyad = "Lütfen soyadınızı en az 3 karakter olacak şekilde doldurun.";
    if (!phoneValid) newErrors.telefon = "Telefon numarası hatalı (05xx xxx xx xx).";
    if (!emailValid) newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
    if (!msgValid) newErrors.mesaj = "Mesajınızı daha açık ve anlamlı yazınız.";
    if (censored.hasBlocked) newErrors.mesaj = "Mesajınızda uygunsuz veya argo kelime var. Lütfen değiştirin.";
    if (!form.iletisimTercihi) newErrors.iletisimTercihi = "Lütfen iletişim tercihinizi seçiniz.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setButtonStatus("error"); setButtonMsg("Lütfen eksik alanları doldurun"); resetButton(); return;
    }
    let infoMsg = form.iletisimTercihi === "E-posta"
      ? "Teşekkürler, mesajınız bize ulaştı. Size info@yolcutransferi.com adresinden dönüş yapacağız."
      : `Teşekkürler, mesajınız bize ulaştı. Size 0539 526 75 69 ${form.iletisimTercihi.toLowerCase()} hattımızdan ulaşacağız.`;
    setButtonStatus("success"); setButtonMsg(infoMsg); resetButton(); kaydet();
    try { await fetch("/api/iletisim", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form), }); }
    catch { setButtonStatus("error"); setButtonMsg("Sunucu hatası, lütfen tekrar deneyin."); resetButton(); }
    setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", honeypot: "" });
  };

  // AD/SOYAD INPUT FONT RENGİ VE BOYUTU
  const boxFont = "font-poppins text-base text-[#e7e7e7]";

  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2 font-poppins">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl px-1 sm:px-4 py-6 flex flex-col gap-4" style={{ border: "2.5px solid #bfa658", background: "rgba(25, 23, 20, 0.98)" }}>
        {/* BAŞLIK */}
        <h1 className="text-center text-4xl font-extrabold text-[#FFD700] mb-2 mt-1 tracking-tight drop-shadow">İletişim</h1>
        {/* Hareketli Band */}
        <div className="flex justify-center w-full mb-1">
          <div className="animate-gradient-move bg-gradient-to-r from-yellow-400 via-yellow-100 to-yellow-400 bg-[length:300%_100%] px-4 py-2 rounded-xl text-[15px] text-black font-bold shadow text-center"
            style={{ minWidth: 180, maxWidth: 420, whiteSpace: 'nowrap' }}>
            7/24 VIP Müşteri Hattı • Kişiye özel ayrıcalık
          </div>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/60 rounded-2xl p-4 border border-[#bfa658]/60 shadow" autoComplete="on">
          <div className="flex gap-2">
            <input type="text" name="ad" autoComplete="given-name" placeholder="Ad"
              value={form.ad} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${adValid ? "border-green-500" : form.ad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] ${boxFont} focus:border-[#bfa658] transition`} minLength={3} required />
            <input type="text" name="soyad" autoComplete="family-name" placeholder="Soyad"
              value={form.soyad} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${soyadValid ? "border-green-500" : form.soyad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] ${boxFont} focus:border-[#bfa658] transition`} minLength={3} required />
          </div>
          <div className="flex gap-2">
            <input type="tel" name="telefon" autoComplete="tel" placeholder="05xx xxx xx xx"
              value={form.telefon} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${phoneValid ? "border-green-500" : form.telefon ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] ${boxFont} focus:border-[#bfa658] transition`} maxLength={11} pattern="05\d{9}" required />
            <input type="email" name="email" autoComplete="email" placeholder="E-posta"
              value={form.email} onChange={handleChange}
              className={`p-3 rounded-lg border flex-1 ${emailValid ? "border-green-500" : form.email ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] ${boxFont} focus:border-[#bfa658] transition`} required />
          </div>
          <select name="neden" value={form.neden} onChange={handleChange}
            className="p-3 rounded-lg border border-[#423c1c] bg-[#181611] text-white focus:border-[#bfa658] transition text-base" required>
            {ILETISIM_NEDENLERI.map((neden, i) => (
              <option key={neden} value={neden}>{neden}</option>
            ))}
          </select>
          <textarea name="mesaj" placeholder="Mesajınız" value={form.mesaj} onChange={handleChange}
            className={`p-3 rounded-lg border ${msgValid && !censored.hasBlocked ? "border-green-500" : form.mesaj ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] ${boxFont} focus:border-[#bfa658] transition`} minLength={15} required rows={3} />
          {/* --- Ulaşım Tercihiniz --- */}
          <span className="text-sm text-gray-300 font-bold ml-1 mt-2">İletişim tercihinizi seçiniz</span>
          <div className="flex flex-row gap-3 w-full mb-2 flex-wrap">
            {ILETISIM_TERCIHLERI.map((item) => (
              <label
                key={item.value}
                className={`flex items-center gap-1 px-4 py-1 rounded-full border font-bold text-xs cursor-pointer
                select-none shadow-md transition
                ${form.iletisimTercihi === item.value
                  ? "bg-black border-[#FFD700] text-[#FFD700]"
                  : "bg-black border-[#bfa658] text-white hover:bg-gray-900 hover:border-gray-400"}
                `}
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
          {/* KVKK */}
          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" required className="accent-[#FFD700] w-4 h-4" />
            <span className="text-xs text-gray-200">
              <a href="/gizlilik" className="underline text-[#FFD700]" target="_blank" rel="noopener noreferrer">KVKK & Gizlilik Sözleşmesi'ni</a> okudum, kabul ediyorum.
            </span>
          </div>
          {/* GÖNDER BUTONU */}
          <button
            type="submit"
            className={`font-bold py-3 px-8 rounded-xl text-lg mt-2 w-full shadow transition text-black
              ${buttonStatus === "success"
                ? "bg-green-600 text-white"
                : buttonStatus === "error"
                  ? "bg-red-600 text-white"
                  : "bg-[#bfa658] hover:bg-yellow-600"}`}
            style={{ minHeight: 50, minWidth: 180 }}
          >
            {buttonMsg}
          </button>
        </form>
        {/* --- Sosyal Medya, Telefon, Mail, Adres --- */}
        <div className="w-full flex flex-col gap-1 mt-2 mb-2">
          <div className="flex flex-row gap-3 items-center mb-1 pl-2">
            {SOCIALS.map(({ icon, url, name }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-[#23201a] hover:bg-[#bfa658] text-white hover:text-black transition"
                title={name}>
                {icon}
              </a>
            ))}
          </div>
          {/* Telefon, Mail ve Adres */}
          <div className="flex flex-row gap-3 items-center text-[1rem] font-semibold text-[#e7e7e7] flex-wrap pl-2">
            <span className={`flex items-center gap-1 ${boxFont}`}><FaPhone className="opacity-80" />+90 539 526 75 69</span>
            <span className={`flex items-center gap-1 ${boxFont}`}><FaEnvelope className="opacity-80" />info@yolcutransferi.com</span>
            <span className={`flex items-center gap-1 ${boxFont}`}><FaMapMarkerAlt className="opacity-80 mr-1" />Ümraniye, İnkılap Mah. Plazalar Bölgesi</span>
          </div>
        </div>
        {/* HARİTA */}
        <div className="w-full flex justify-center mt-2">
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
      </div>
      <style>{`
        .animate-gradient-move {
          background-size: 300% 100%;
          animation: gradientMove 2.5s linear infinite alternate;
        }
        @keyframes gradientMove {
          0% { background-position-x: 0%; }
          100% { background-position-x: 100%; }
        }
        .animate-fade-in { animation: fadeIn .7s; }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(15px);} 100% { opacity: 1; transform: translateY(0);} }
        @media (max-width: 640px) {
          .w-full .flex-row { flex-direction: column !important; gap: 0.5rem !important;}
          .w-full .flex-row > span, .w-full .flex-row > a { margin-left: 0 !important; margin-bottom: 4px !important;}
        }
      `}</style>
    </div>
  );
}
