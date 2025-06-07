"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// Simple word blacklist, uzantı blacklist ve sahte ad-soyad tespit listesi
const FAKE_EMAILS = [
  "asd@ss.com", "aaa@bbb.com", "test@test.com", "asdasd@asdasd.com", "qwe@qwe.com",
  "mail@mail.com", "mail@domain.com", "deneme@deneme.com", "abc@abc.com", "abc@xyz.com"
];
const FAKE_DOMAINS = [
  "ss.com", "bbb.com", "asdasd.com", "qwe.com", "mail.com", "domain.com", "deneme.com", "abc.com"
];
const FAKE_NAMES = [
  "asd", "qwe", "poi", "test", "xxx", "zzz", "klm", "asdf", "qaz", "poiuy", "asdşl", "qwpoq", "sll"
];

const SOCIALS = [
  { icon: <FaWhatsapp size={20} />, name: "WhatsApp", url: "https://wa.me/905395267569" },
  { icon: <FaInstagram size={20} />, name: "Instagram", url: "https://instagram.com/yolcutransferi" },
  { icon: <SiX size={20} />, name: "X (Twitter)", url: "https://x.com/yolcutransferi" }
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
  {
    label: "WhatsApp",
    value: "WhatsApp",
    icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} />
  },
  {
    label: "Telefon",
    value: "Telefon",
    icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} />
  },
  {
    label: "E-posta",
    value: "E-posta",
    icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} />
  }
];

const messages = [
  "YolcuTransferi.com olarak, deneyimli ekibimizle sizlere lüks ve güvenli bir yolculuk deneyimi yaşatmak için buradayız.",
  "Her türlü talebiniz, rezervasyonunuz veya iş birliği teklifiniz için bizimle çekinmeden iletişime geçebilirsiniz.",
  "İhtiyacınıza en uygun çözümü, en hızlı şekilde sunabilmek için profesyonel destek ekibimiz sizinle.",
  "VIP standartlarında hizmet için, bize ulaşmanız yeterli. Sizi dinlemek ve en iyi deneyimi yaşatmak önceliğimiz.",
  "Bize ilettiğiniz her mesaj titizlikle incelenir; ilgili ekibimiz en kısa sürede size dönüş sağlar.",
  "YolcuTransferi.com — Sadece bir transfer değil, bir ayrıcalık..."
];

// Simple spam/rate limiter (client-side)
function useRateLimit() {
  const key = "yt_contact_rate";
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const now = Date.now();
    let data = JSON.parse(localStorage.getItem(key) || "{}");
    // Temizle eski kayıtları
    for (const k in data) if (now - k > 60 * 60 * 1000) delete data[k];
    localStorage.setItem(key, JSON.stringify(data));
    // Kontrol et: dakikada 2, saatte 5
    let sonDakika = Object.values(data).filter((t) => now - t < 60 * 1000).length;
    let sonSaat = Object.values(data).filter((t) => now - t < 60 * 60 * 1000).length;
    if (sonDakika >= 2 || sonSaat >= 5) setBlocked(true);
    else setBlocked(false);
  }, []);

  function kaydet() {
    const now = Date.now();
    let data = JSON.parse(localStorage.getItem(key) || "{}");
    data[now] = now;
    localStorage.setItem(key, JSON.stringify(data));
  }
  return [blocked, kaydet];
}

// Akıllı doğrulama fonksiyonları
function isRealName(val) {
  if (!val || val.length < 3) return false;
  let v = val.toLowerCase().replace(/[^a-zA-ZığüşöçİĞÜŞÖÇ]/g, "");
  if (FAKE_NAMES.includes(v)) return false;
  // Sadece ünlü veya sessiz harf tekrarı (aaa, qqqq) engelle
  if (/^([a-zA-ZğüşöçİĞÜŞÖÇ])\1+$/.test(v)) return false;
  return true;
}
function isRealEmail(val) {
  if (!val) return false;
  if (FAKE_EMAILS.includes(val.trim().toLowerCase())) return false;
  let parts = val.split("@");
  if (parts.length !== 2) return false;
  let [user, domain] = parts;
  if (!user || !domain || domain.length < 5) return false;
  if (FAKE_DOMAINS.some((d) => domain.endsWith(d))) return false;
  // Email format ve uzantı kontrolü (yaygın tld: com, com.tr, net, org, edu, gov)
  if (!/^[\w\.\-]+@([\w\-]+\.)+(com|net|org|com\.tr|gov|edu|io|co|info)$/i.test(val)) return false;
  return true;
}
function isRealPhone(val) {
  if (!val) return false;
  // Türk GSM formatı: 05xx xxx xx xx
  return /^05\d{9}$/.test(val);
}
function isRealMsg(val) {
  if (!val || val.length < 10) return false;
  let v = val.toLowerCase();
  if (v.length < 10 || v === "asd" || v === "qwe" || /^(a|q|w|z|x|s|d){3,}$/.test(v)) return false;
  if (/^\d+$/.test(v)) return false;
  // Çok fazla tekrar/benzer karakter içeriyorsa
  if (/([a-z])\1{3,}/.test(v)) return false;
  return true;
}

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    neden: ILETISIM_NEDENLERI[0],
    mesaj: "",
    iletisimTercihi: ILETISIM_TERCIHLERI[2].value // "E-posta" default seçili
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [blocked, kaydet] = useRateLimit();

  // Autofill için inputlarda autoComplete eklendi
  const adRef = useRef();
  const soyadRef = useRef();
  const emailRef = useRef();
  const telRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (messages.length + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Tarayıcı AutoFill tetikleme (focus on mount)
  useEffect(() => {
    adRef.current && adRef.current.focus();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleIletisimTercihiChange = (value) => {
    setForm({ ...form, iletisimTercihi: value });
  };

  // Her input için validasyon flagi
  const adValid = isRealName(form.ad);
  const soyadValid = isRealName(form.soyad);
  const phoneValid = isRealPhone(form.telefon);
  const emailValid = isRealEmail(form.email);
  const msgValid = isRealMsg(form.mesaj);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (blocked) {
      setError("Çok sık mesaj gönderildi, lütfen biraz bekleyiniz.");
      return;
    }
    if (!adValid) { setError("Lütfen gerçek adınızı giriniz."); return; }
    if (!soyadValid) { setError("Lütfen gerçek soyadınızı giriniz."); return; }
    if (!phoneValid) { setError("Telefon numarası hatalı (05xx xxx xx xx formatında)."); return; }
    if (!emailValid) { setError("Lütfen geçerli bir e-posta adresi giriniz."); return; }
    if (!msgValid) { setError("Sizi anlayamadık. Lütfen gerçekten iletmek istediğiniz mesajı yazınız."); return; }

    kaydet();
    setSent(true);
    setTimeout(() => setSent(false), 7000);
    setForm({
      ad: "",
      soyad: "",
      telefon: "",
      email: "",
      neden: ILETISIM_NEDENLERI[0],
      mesaj: "",
      iletisimTercihi: ILETISIM_TERCIHLERI[2].value
    });
  };

  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2">
      <div className="w-full max-w-4xl bg-[#191714]/90 border-[3px] border-[#bfa658] rounded-2xl shadow-2xl px-2 sm:px-6 py-6 flex flex-col gap-6">
        {/* Bilboard */}
        <div className="w-full flex justify-center mb-2">
          <div
            className="relative w-full max-w-3xl bg-black border border-[#bfa658] rounded-xl shadow flex items-center justify-center transition-all duration-500 overflow-hidden"
            style={{
              height: 78,
              minHeight: 78,
              padding: "0 12px"
            }}
          >
            {activeIndex < messages.length ? (
              <span
                className="text-base sm:text-lg text-gray-100 text-center font-medium animate-fade-in leading-normal truncate-message"
                style={{
                  whiteSpace: "normal",
                  width: "100%",
                  wordBreak: "break-word",
                  fontSize: "1.08rem",
                  lineHeight: "1.4"
                }}
              >
                {messages[activeIndex]}
              </span>
            ) : (
              <span className="flex items-center justify-center w-full h-full py-1 animate-fade-in">
                <Image
                  src="/LOGO.png"
                  alt="YolcuTransferi.com"
                  width={320}
                  height={100}
                  priority
                  className="mx-auto max-h-24 object-contain"
                  style={{ width: "auto", maxWidth: "90%", height: "60px" }}
                />
              </span>
            )}
          </div>
        </div>
        {/* Form */}
        <div className="flex flex-col md:flex-row gap-6">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3" autoComplete="on">
            <div className="flex gap-2">
              <input
                type="text"
                name="ad"
                ref={adRef}
                autoComplete="given-name"
                placeholder="Ad"
                value={form.ad}
                onChange={handleChange}
                className={`p-3 rounded-lg border ${adValid ? "border-green-500" : form.ad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base`}
                minLength={3}
                required
              />
              <input
                type="text"
                name="soyad"
                ref={soyadRef}
                autoComplete="family-name"
                placeholder="Soyad"
                value={form.soyad}
                onChange={handleChange}
                className={`p-3 rounded-lg border ${soyadValid ? "border-green-500" : form.soyad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base`}
                minLength={3}
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="tel"
                name="telefon"
                ref={telRef}
                autoComplete="tel"
                placeholder="05xx xxx xx xx"
                value={form.telefon}
                onChange={handleChange}
                className={`p-3 rounded-lg border ${phoneValid ? "border-green-500" : form.telefon ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base`}
                maxLength={11}
                pattern="05\d{9}"
                required
              />
              <input
                type="email"
                name="email"
                ref={emailRef}
                autoComplete="email"
                placeholder="E-posta"
                value={form.email}
                onChange={handleChange}
                className={`p-3 rounded-lg border ${emailValid ? "border-green-500" : form.email ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-1/2 focus:border-[#bfa658] transition text-base`}
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

            {/* Size nasıl ulaşalım kutucukları */}
            <div className="mt-2 flex flex-col items-start gap-1">
              <span className="text-sm text-gray-400 font-semibold mb-1 ml-1">Size nasıl ulaşalım?</span>
              <div className="flex flex-row gap-2 w-full">
                {ILETISIM_TERCIHLERI.map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full border text-xs cursor-pointer
                    transition select-none shadow-sm font-semibold
                    ${form.iletisimTercihi === item.value
                      ? "bg-[#bfa658] border-[#bfa658] text-black"
                      : "bg-[#25221d] border-[#423c1c] text-gray-100 hover:border-[#bfa658]"}
                    `}
                    style={{ minWidth: 70, justifyContent: 'center', opacity: form.iletisimTercihi === item.value ? 1 : 0.92 }}
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
              className={`p-3 rounded-lg border ${msgValid ? "border-green-500" : form.mesaj ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`}
              minLength={10}
              required
              rows={3}
            />

            {error && <div className="text-red-500 text-sm font-bold px-2 py-1">{error}</div>}

            <button
              type="submit"
              className={`bg-[#bfa658] text-black font-bold py-3 px-8 rounded-xl text-lg hover:bg-yellow-600 transition shadow mt-2 w-full ${blocked ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={blocked}
            >
              Mesajı Gönder
            </button>
            {sent && (
              <div className="mt-2 p-3 rounded-lg text-base font-semibold bg-green-700/90 text-white text-center border-2 border-green-400 shadow">
                Mesajınız alınmıştır. İlgili ekiplerimiz en kısa sürede sizinle iletişime geçecektir.
              </div>
            )}
          </form>
          {/* Adres & Sosyal Medya */}
          <div className="flex-1 flex flex-col justify-start gap-4 mt-2">
            <div className="space-y-2 text-base text-gray-100">
              <div className="flex items-center gap-2"><FaPhone /> <span>+90 539 526 75 69</span></div>
              <div className="flex items-center gap-2"><FaEnvelope /> <span>info@yolcutransferi.com</span></div>
            </div>
            {/* Sosyal medya butonları burada! */}
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
            <div className="flex items-center gap-2 text-base text-gray-100 pt-2">
              <FaMapMarkerAlt /> <span>Ümraniye, İnkılap Mah. Plazalar Bölgesi, İstanbul</span>
            </div>
          </div>
        </div>
        {/* Harita */}
        <div className="w-full flex justify-center">
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
      {/* Animasyon için gerekli CSS */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn .7s;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(15px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .truncate-message {
          display: block;
          width: 100%;
          overflow-wrap: break-word;
          white-space: normal;
          line-height: 1.4;
          font-size: 1rem;
        }
        @media (max-width: 640px) {
          .truncate-message {
            font-size: 0.97rem;
          }
          .max-w-3xl {
            max-width: 99vw !important;
          }
        }
      `}</style>
    </div>
  );
}
