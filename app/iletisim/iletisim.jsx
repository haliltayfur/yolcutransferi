"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

// KÜFÜR/ARGO/ÇOCUKÇA SÖZLERİN LİSTESİ — istersen genişletirsin
const BLOCKED_WORDS = [
  "amk","aq","yarrak","siktir","orospu","salak","salaq","ananı","annenizi","ananı","sikik","piç","gerizekalı","aptal",
  "mal","şerefsiz","göt","kahpe","pezevenk","bok","çocukça","çocuk", "hıyar", "b.k", "mk", "çüş","vay","oç","sg","lavuk","daşak",
  "aptal","embesil","angut","dangalak","dangalaq","puşt","yavşak","ibne","ibine","çük","çükü","taşak","tasak","taşağını","tasşağını",
  "aq", "amcık", "yarak", "got", "sik", "sikerim", "sikeyim", "sikey", "götveren","götlek","anan"
];

// E-posta validasyonu (tüm yaygın sağlayıcıları kapsar)
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
  // Argo/küfür/çocukça söz kontrolü burada da olacak, ayrıca visual olarak da gösterilecek
  return true;
}

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
  { label: "WhatsApp", value: "WhatsApp", icon: <FaWhatsapp className="text-[#25d366] mr-1" size={16} /> },
  { label: "Telefon", value: "Telefon", icon: <FaPhone className="text-[#51A5FB] mr-1" size={16} /> },
  { label: "E-posta", value: "E-posta", icon: <FaEnvelope className="text-[#FFA500] mr-1" size={16} /> }
];

// Güncellenmiş, kurumsal, elit ve güçlü cümlelerle metinler
const messages = [
  "YolcuTransferi.com olarak, alanında uzman ve profesyonel ekiplerimizle her transferinizde kusursuz hizmet sunuyoruz.",
  "Talep, rezervasyon ve iş ortaklığı süreçlerinde, ayrıcalıklı müşteri deneyimiyle çözüm odaklı destek veriyoruz.",
  "İhtiyacınıza en uygun çözümleri, en hızlı şekilde sunmak için profesyonel ekiplerimiz hizmetinizde.",
  "VIP standartlarında güven, lüks ve prestij sunuyoruz. Seçkin müşterilerimize, sadece transfer değil; kişiye özel bir ayrıcalık sağlıyoruz.",
  "Her mesajınız, deneyimli müşteri ilişkileri ekiplerimiz tarafından hızla değerlendirilir ve çözüme ulaştırılır.",
  "YolcuTransferi.com Sadece bir transfer değil, size özel bir ayrıcalık yaşatır..."
];

// Rate limit sadece örnek amaçlı, backendde şart!
function useRateLimit() {
  const key = "yt_contact_rate";
  const [blocked, setBlocked] = useState(false);
  useEffect(() => {
    const now = Date.now();
    let data = JSON.parse(localStorage.getItem(key) || "{}");
    for (const k in data) if (now - k > 60 * 60 * 1000) delete data[k];
    localStorage.setItem(key, JSON.stringify(data));
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

// Mesaj içindeki yasak kelimeleri tespit ve işaretleme (altı kırmızı çizgi ve tooltip!)
function getCensoredMessage(msg) {
  if (!msg) return { parsed: "", hasBlocked: false, blockedWords: [] };
  let parts = msg.split(/(\s+)/);
  let hasBlocked = false;
  let blockedWords = [];
  const censored = parts.map((p, i) => {
    let w = p.toLowerCase().replace(/[^\wğüşöçıİĞÜŞÖÇ]/g, "");
    if (BLOCKED_WORDS.includes(w)) {
      hasBlocked = true;
      blockedWords.push(p);
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
  return { parsed: censored, hasBlocked, blockedWords };
}

export default function Iletisim() {
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
  const [sendInfo, setSendInfo] = useState(""); // Gönderdikten sonra iletişim bilgisi
  const [activeIndex, setActiveIndex] = useState(0);
  const [blocked, kaydet] = useRateLimit();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (messages.length + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Autofill için ilk inputa focus
  useEffect(() => {
    const f = document.querySelector('input[autoComplete="given-name"]');
    if (f) f.focus();
  }, []);

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

  const censored = getCensoredMessage(form.mesaj);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    setSendInfo("");
    if (blocked) newErrors.global = "Çok sık mesaj gönderildi, lütfen biraz bekleyiniz.";
    if (form.honeypot && form.honeypot.length > 0) return; // Bot ise iptal et
    if (!adValid) newErrors.ad = "Lütfen gerçek adınızı giriniz.";
    if (!soyadValid) newErrors.soyad = "Lütfen gerçek soyadınızı giriniz.";
    if (!phoneValid) newErrors.telefon = "Telefon numarası hatalı (05xx xxx xx xx formatında).";
    if (!emailValid) newErrors.email = "Lütfen geçerli bir e-posta adresi giriniz.";
    if (!msgValid) newErrors.mesaj = "Lütfen açık, anlaşılır ve anlamlı bir mesaj yazınız.";
    if (censored.hasBlocked) newErrors.mesaj = "Mesajınızda uygunsuz/argo kelimeler tespit edildi. Lütfen çıkarınız.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Dinamik iletişim bilgisi
    let infoMsg = "";
    if (form.iletisimTercihi === "E-posta")
      infoMsg = `Mesajınızı aldık, seçtiğiniz iletişim yöntemiyle size <b>info@yolcutransferi.com</b> mail adresimizden ulaşacağız.`;
    else if (form.iletisimTercihi === "Telefon")
      infoMsg = `Mesajınızı aldık, size <b>0539 526 75 69</b> kurumsal telefon numaramızdan ulaşacağız.`;
    else if (form.iletisimTercihi === "WhatsApp")
      infoMsg = `Mesajınızı aldık, size <b>0539 526 75 69</b> kurumsal WhatsApp hattımızdan ulaşacağız.`;
    setSendInfo(infoMsg);

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
      iletisimTercihi: ILETISIM_TERCIHLERI[2].value,
      honeypot: ""
    });
  };

  return (
    <div className="w-full flex justify-center bg-black min-h-[calc(100vh-150px)] py-6 px-2">
      <div className="w-full max-w-4xl rounded-2xl shadow-2xl px-2 sm:px-6 py-6 flex flex-col gap-6"
        style={{ border: "2.5px solid #bfa658", background: "rgba(25, 23, 20, 0.98)" }}
      >
        {/* Bilboard */}
        <div className="w-full flex justify-center mb-2">
          <div
            className="relative w-full max-w-3xl bg-black border border-[#bfa658] rounded-xl shadow flex items-center justify-center transition-all duration-500 overflow-hidden"
            style={{ height: 78, minHeight: 78, padding: "0 12px" }}
          >
            {activeIndex < messages.length ? (
              <span
                className="text-base sm:text-lg text-gray-100 text-center font-medium animate-fade-in leading-normal truncate-message"
                style={{ whiteSpace: "normal", width: "100%", wordBreak: "break-word", fontSize: "1.08rem", lineHeight: "1.4" }}
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
            {/* Honeypot */}
            <input type="text" name="honeypot" value={form.honeypot} onChange={handleChange} style={{display:"none"}} autoComplete="off" tabIndex="-1"/>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col">
                <input
                  type="text"
                  name="ad"
                  autoComplete="given-name"
                  placeholder="Ad"
                  value={form.ad}
                  onChange={handleChange}
                  className={`p-3 rounded-lg border ${adValid ? "border-green-500" : form.ad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-full focus:border-[#bfa658] transition text-base`}
                  minLength={3}
                  required
                />
                {errors.ad && <span className="text-red-500 text-xs px-1 pt-1">{errors.ad}</span>}
              </div>
              <div className="flex-1 flex flex-col">
                <input
                  type="text"
                  name="soyad"
                  autoComplete="family-name"
                  placeholder="Soyad"
                  value={form.soyad}
                  onChange={handleChange}
                  className={`p-3 rounded-lg border ${soyadValid ? "border-green-500" : form.soyad ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-full focus:border-[#bfa658] transition text-base`}
                  minLength={3}
                  required
                />
                {errors.soyad && <span className="text-red-500 text-xs px-1 pt-1">{errors.soyad}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 flex flex-col">
                <input
                  type="tel"
                  name="telefon"
                  autoComplete="tel"
                  placeholder="05xx xxx xx xx"
                  value={form.telefon}
                  onChange={handleChange}
                  className={`p-3 rounded-lg border ${phoneValid ? "border-green-500" : form.telefon ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-full focus:border-[#bfa658] transition text-base`}
                  maxLength={11}
                  pattern="05\d{9}"
                  required
                />
                {errors.telefon && <span className="text-red-500 text-xs px-1 pt-1">{errors.telefon}</span>}
              </div>
              <div className="flex-1 flex flex-col">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="E-posta"
                  value={form.email}
                  onChange={handleChange}
                  className={`p-3 rounded-lg border ${emailValid ? "border-green-500" : form.email ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white w-full focus:border-[#bfa658] transition text-base`}
                  required
                />
                {errors.email && <span className="text-red-500 text-xs px-1 pt-1">{errors.email}</span>}
              </div>
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
            <div className="mt-2 flex flex-col items-start gap-1">
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
            <div className="flex flex-col">
              <textarea
                name="mesaj"
                placeholder="Mesajınız"
                value={form.mesaj}
                onChange={handleChange}
                className={`p-3 rounded-lg border ${msgValid && !censored.hasBlocked ? "border-green-500" : form.mesaj ? "border-red-600" : "border-[#423c1c]"} bg-[#181611] text-white focus:border-[#bfa658] transition text-base`}
                minLength={15}
                required
                rows={3}
              />
              {/* Mesajda uygunsuz kelime varsa vurgulu şekilde göster */}
              <div className="mt-1 text-sm leading-relaxed" style={{ minHeight: 26 }}>
                {censored.hasBlocked && (
                  <span className="text-red-500 font-bold">
                    Uygunsuz veya argo kelime tespit edildi: {censored.blockedWords.map((w, i) => <span key={i} style={{textDecoration:'underline wavy red',margin:'0 4px'}}>{w}</span>)} <br/>
                    Bu kelimeyi kullanamazsınız.
                  </span>
                )}
              </div>
              {/* Preview: mesaj kutusunun altında, uygun şekilde göster */}
              {form.mesaj && (
                <div className="text-gray-400 text-xs mt-1 flex flex-wrap items-center" style={{wordBreak:'break-word'}}>
                  <b>Yazdığınız:</b>&nbsp;{censored.parsed}
                </div>
              )}
              {errors.mesaj && <span className="text-red-500 text-xs px-1 pt-1">{errors.mesaj}</span>}
            </div>
            {errors.global && <div className="text-red-500 text-sm font-bold px-2 py-1">{errors.global}</div>}
            <button
              type="submit"
              className={`bg-[#bfa658] text-black font-bold py-3 px-8 rounded-xl text-lg hover:bg-yellow-600 transition shadow mt-2 w-full ${blocked ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={blocked}
            >
              Mesajı Gönder
            </button>
            {sent && (
              <div className="mt-2 p-3 rounded-lg text-base font-semibold bg-green-700/90 text-white text-center border-2 border-green-400 shadow" dangerouslySetInnerHTML={{
                __html: `
                  Mesajınız alınmıştır. İlgili <b>ekiplerimiz</b> en kısa sürede sizinle iletişime geçecektir.<br>
                  ${sendInfo}
                `
              }} />
            )}
          </form>
          {/* Adres & Sosyal Medya */}
          <div className="flex-1 flex flex-col justify-start gap-4 mt-2">
            <div className="space-y-2 text-base text-gray-100">
              <div className="flex items-center gap-2"><FaPhone /> <span>+90 539 526 75 69</span></div>
              <div className="flex items-center gap-2"><FaEnvelope /> <span>info@yolcutransferi.com</span></div>
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
      <style>{`
        .animate-fade-in { animation: fadeIn .7s; }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(15px);} 100% { opacity: 1; transform: translateY(0);} }
        .truncate-message { display: block; width: 100%; overflow-wrap: break-word; white-space: normal; line-height: 1.4; font-size: 1rem;}
        @media (max-width: 640px) { .truncate-message { font-size: 0.97rem; } .max-w-3xl { max-width: 99vw !important; } }
      `}</style>
    </div>
  );
}
