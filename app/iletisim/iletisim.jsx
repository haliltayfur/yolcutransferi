"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// --- GEREKLİ TÜM YARDIMCI FONKSİYONLAR --- 
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
  { icon: <FaWhatsapp size={28} />, name: "WhatsApp", url: "https://wa.me/905395267569" },
  { icon: <FaInstagram size={28} />, name: "Instagram", url: "https://instagram.com/yolcutransferi" },
  { icon: <SiX size={28} />, name: "X (Twitter)", url: "https://x.com/yolcutransferi" }
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

// --- ANA COMPONENT ---
export default function Iletisim() {
  const blockedWords = getBlockedWords();
  const [form, setForm] = useState({
    ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "",
    iletisimTercihi: "", honeypot: "", kvkkOnay: false
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
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: undefined });
  };
  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
    setErrors({ ...errors, [name]: undefined });
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
    if (!form.kvkkOnay) newErrors.kvkkOnay = "KVKK & Gizlilik Sözleşmesi'ni kabul etmelisiniz.";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setButtonStatus("error"); setButtonMsg("Lütfen eksik alanları doldurun"); resetButton(); return;
    }
    let infoMsg = form.iletisimTercihi === "E-posta"
      ? "Teşekkürler, mesajınız bize ulaştı. Size info@yolcutransferi.com adresinden dönüş yapacağız."
      : `Teşekkürler, mesajınız bize ulaştı. Size 0539 526 75 69 ${form.iletisimTercihi.toLowerCase()} hattımızdan ulaşacağız.`;
    setButtonStatus("success"); setButtonMsg(infoMsg); resetButton(); kaydet();
    try {
      await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    catch {
      setButtonStatus("error"); setButtonMsg("Sunucu hatası, lütfen tekrar deneyin."); resetButton();
    }
    setForm({ ad: "", soyad: "", telefon: "", email: "", neden: ILETISIM_NEDENLERI[0], mesaj: "", iletisimTercihi: "", honeypot: "", kvkkOnay: false });
  };

  const boxFont = "font-poppins text-base text-[#e7e7e7]";

  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2 font-poppins">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl px-1 sm:px-4 py-6 flex flex-col gap-4" style={{ border: "2.5px solid #bfa658", background: "rgba(25, 23, 20, 0.98)" }}>
        {/* ...diğer kodlar... */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 bg-black/60 rounded-2xl p-4 border border-[#bfa658]/60 shadow" autoComplete="on">
          {/* ...diğer inputlar... */}
          {/* KVKK Onayı */}
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
              <a href="/gizlilik" className="underline text-[#FFD700]" target="_blank" rel="noopener noreferrer">KVKK & Gizlilik Sözleşmesi'ni</a> okudum, kabul ediyorum.
            </span>
          </div>
          {errors.kvkkOnay && <span className="text-xs text-red-400 font-bold pl-2">{errors.kvkkOnay}</span>}
          {/* ...gönder butonu ve diğer kodlar... */}
        </form>
        {/* ...sosyal medya, iletişim, harita vs... */}
      </div>
      {/* ...stil kodları... */}
    </div>
  );
}
