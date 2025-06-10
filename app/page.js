"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaLock, FaUserTie, FaShieldAlt, FaGlobe, FaIdCard, FaCreditCard, FaCarSide,
  FaUsers, FaPlane, FaBus, FaCrown, FaUserShield, FaStar, FaWifi, FaChild, FaDog, FaNewspaper, FaHandshake, FaGift, FaGlassCheers
} from "react-icons/fa";

// HERO SLIDER IMAGES
const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png"
];

// ARAÇLAR VE MAKS KİŞİ
const vehicles = [
  { value: "mercedes_vito", label: "Mercedes Vito", max: 7 },
  { value: "s_class", label: "Mercedes S-Class", max: 4 },
  { value: "vip_minivan", label: "VIP Minivan", max: 8 },
  { value: "suv", label: "SUV", max: 5 },
  { value: "premium_sedan", label: "Premium Sedan", max: 4 },
  { value: "cadillac", label: "Cadillac", max: 6 },
  { value: "dron", label: "Dron", max: 2 },
  { value: "minibus", label: "Minibüs", max: 17 },
];

// AVANTAJLAR (İKONLU, 2 SATIR, 4 KUTU)
const advantages = [
  { icon: <FaLock size={22} />, text: "Kişiye özel, tam gizlilikte VIP transfer." },
  { icon: <FaGlobe size={22} />, text: "Çok dilli, uluslararası eğitimli sürücüler." },
  { icon: <FaIdCard size={22} />, text: "TÜRSAB belgeli, sigortalı ve güvenli yolculuk." },
  { icon: <FaCreditCard size={22} />, text: "TROY güvencesiyle %100 yerli ödeme altyapısı." },
  { icon: <FaUserTie size={22} />, text: "5+ yıllık tecrübeli şoförler ve ayrıcalıklı hizmet." },
  { icon: <FaStar size={22} />, text: "%99.97 müşteri memnuniyeti ve lüks konfor." },
  { icon: <FaPlane size={22} />, text: "Havalimanı ve şehirlerarası VIP transfer." },
  { icon: <FaBus size={22} />, text: "Büyük gruplar için Minibüs ve Dron ile transfer." },
];

// YORUMLAR (15 ADET, PROFESYONELLİK, YABANCI, PLAZA, KISA 3 SATIR)
const testimonials = [
  { name: "Deniz Y.", role: "CEO / İstanbul", comment: "Her anlamda profesyonel, gizlilik üst düzey. Misafirlerim için tek adresim.", avatar: "D" },
  { name: "Anna L.", role: "Expedia Europe / Berlin", comment: "Incredible luxury, always on-time. Drivers speak English/German. 5 stars!", avatar: "A" },
  { name: "Mehmet K.", role: "Finans Direktörü / İzmir", comment: "Kusursuz hizmet, ekibimiz ve ailemiz için daima güvenilir.", avatar: "M" },
  { name: "Yusuf K.", role: "Konsolos / Bakü", comment: "Özel talepler, hızlı transfer, sorunsuz deneyim. İstanbul'da güvenli.", avatar: "Y" },
  { name: "Lena S.", role: "Creative Director / Dubai", comment: "Perfect service, clean vehicles, reliable drivers. Highly recommended.", avatar: "L" },
  { name: "Gülşah S.", role: "Acenta Müdürü / Antalya", comment: "Misafirlerimiz memnun, transferde ilk tercihim.", avatar: "G" },
  { name: "Daniel P.", role: "Global Lawyer / Londra", comment: "Safe, private, and totally stress-free. High-end experience.", avatar: "D" },
  { name: "Arda V.", role: "Sanatçı / Bodrum", comment: "VIP hissi ve dakiklik. Her yolculuk özel.", avatar: "A" },
  { name: "Svetlana K.", role: "Event Manager / Moskova", comment: "Luxury event logistics: mükemmel hizmet, her detay planlı.", avatar: "S" },
  { name: "Mustafa E.", role: "IT Director / Ankara", comment: "Sigortalı, temiz, prestijli araçlar. Sektör lideri.", avatar: "M" },
  { name: "Jessica R.", role: "Executive PA / Paris", comment: "Yönetim kurulumuz çok memnun kaldı, teşekkürler!", avatar: "J" },
  { name: "Ali U.", role: "Tourism Investor / Kuveyt", comment: "Her transferde gizlilik ve güven üst düzeyde.", avatar: "A" },
  { name: "Linda B.", role: "Real Estate CEO / NY", comment: "Impressive vehicles, professional team, flawless service.", avatar: "L" },
  { name: "Serkan B.", role: "Genel Müdür / Bursa", comment: "Büyük ekibe uygun VIP transfer çözümleri.", avatar: "S" },
  { name: "Maria T.", role: "Hotel GM / Atina", comment: "VIP misafirlerimiz için prestijli ve güvenli transfer!", avatar: "M" },
];

// EKSTRALAR LİSTESİ
const extrasList = [
  { key: "wifi", label: "Wi-Fi", price: 500, icon: <FaWifi /> },
  { key: "child_seat", label: "Çocuk koltuğu", price: 500, icon: <FaChild /> },
  { key: "pet_carry", label: "Hayvan taşıma", price: 500, icon: <FaDog /> },
  { key: "gazete", label: "Gazete servisi", price: 200, icon: <FaNewspaper /> },
  { key: "welcoming", label: "Karşılama hizmeti", price: 400, icon: <FaHandshake /> },
  { key: "cookies", label: "Çerez & Kuruyemiş", price: 300, icon: <FaGift /> },
  { key: "bira", label: "3 Bira (Kuruyemiş dahil)", price: 1500, icon: <FaGlassCheers /> },
  { key: "sarap", label: "Şampanya (Kuruyemiş dahil)", price: 3000, icon: <FaGlassCheers /> },
  { key: "viski", label: "Viski (Kuruyemiş dahil)", price: 4000, icon: <FaGlassCheers /> },
];

// ROTAR GARANTİSİ
const rotarList = [
  { hours: 1, label: "1 Saat Ücretsiz", price: 0 },
  { hours: 2, label: "2 Saat (Ekstra 200₺)", price: 200 },
  { hours: 3, label: "3 Saat (Ekstra 300₺)", price: 300 },
  { hours: 4, label: "4 Saat (Ekstra 400₺)", price: 400 },
  { hours: 5, label: "5 Saat (Ekstra 500₺)", price: 500 },
  { hours: 6, label: "Sınırsız/İptal Olmaz (1000₺)", price: 1000 },
];

// FAKE FİRMALAR (FİYAT API)
const fakeFirms = [
  { name: "VIPGo", fiyat: (base, km, saat) => base + 2 * km + 120 * saat },
  { name: "JetLüks", fiyat: (base, km, saat) => base + 1.9 * km + 110 * saat },
  { name: "EliteRide", fiyat: (base, km, saat) => base + 2.1 * km + 105 * saat },
  { name: "GoldTransfer", fiyat: (base, km, saat) => base + 2 * km + 130 * saat },
  { name: "TurVIP", fiyat: (base, km, saat) => base + 2.2 * km + 95 * saat },
  { name: "PlazaLimo", fiyat: (base, km, saat) => base + 2.3 * km + 120 * saat },
  { name: "AirportMaster", fiyat: (base, km, saat) => base + 1.8 * km + 150 * saat },
  { name: "TrendyTransfer", fiyat: (base, km, saat) => base + 2.05 * km + 110 * saat },
  { name: "LuxAuto", fiyat: (base, km, saat) => base + 1.95 * km + 125 * saat },
  { name: "DeluxeChauffeur", fiyat: (base, km, saat) => base + 2.15 * km + 100 * saat },
  { name: "SuperVIP", fiyat: (base, km, saat) => base + 2.2 * km + 125 * saat },
  { name: "ProTransfer", fiyat: (base, km, saat) => base + 1.98 * km + 115 * saat },
  { name: "Transfer24", fiyat: (base, km, saat) => base + 2.18 * km + 105 * saat },
  { name: "PrestigeRide", fiyat: (base, km, saat) => base + 2.08 * km + 120 * saat },
  { name: "ExpressChauffeur", fiyat: (base, km, saat) => base + 2.11 * km + 140 * saat },
];

// --- SAYFA ---
export default function Home() {
  // SLIDER
  const [currentSlide, setCurrentSlide] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [pauseTimeout, setPauseTimeout] = useState(null);

  // FORM
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].value);
  const [personCount, setPersonCount] = useState(1);
  const [extras, setExtras] = useState([]);
  const [rotar, setRotar] = useState(rotarList[0].hours);

  // REZERVASYON
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const [date, setDate] = useState(""); const [time, setTime] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [summaryData, setSummaryData] = useState(null);

  // KULLANICI BİLGİLERİ
  const [userData, setUserData] = useState({
    name: "", surname: "", tckn: "", phone: "", mail: "",
    rezervasyonYapan: "userfrendy", secondPhone: "",
  });

  // TESTIMONIAL SLIDER
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // SLIDER USEEFFECT
  useEffect(() => {
    if (manualPause) return;
    const interval = setInterval(() => {
      setCurrentSlide(s => (s + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [manualPause, currentSlide]);

  // SLIDER MANUEL
  const handleSliderNav = (dir) => {
    let next = dir === "right"
      ? (currentSlide + 1) % heroImages.length
      : (currentSlide - 1 + heroImages.length) % heroImages.length;
    setCurrentSlide(next);
    setManualPause(true);
    clearTimeout(pauseTimeout);
    const timeout = setTimeout(() => setManualPause(false), 15000);
    setPauseTimeout(timeout);
  };

  // TESTIMONIAL
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMobile) setTestimonialIndex((idx) => (idx + 3) % testimonials.length);
      else setTestimonialIndex((idx) => (idx + 1) % testimonials.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isMobile, testimonialIndex]);

  // --- DİNAMİK PERSON COUNT ---
  const selectedVehicleObj = vehicles.find(v => v.value === selectedVehicle) || vehicles[0];
  const maxPerson = selectedVehicleObj.max;

  // --- YORUM SLICE ---
  const getVisibleTestimonials = () => {
    if (isMobile) return [testimonials[testimonialIndex % testimonials.length]];
    return [
      testimonials[testimonialIndex % testimonials.length],
      testimonials[(testimonialIndex + 1) % testimonials.length],
      testimonials[(testimonialIndex + 2) % testimonials.length],
    ];
  };

  // --- EKSTRALAR --- 
  const handleExtra = (key) => {
    setExtras(extras.includes(key) ? extras.filter(e => e !== key) : [...extras, key]);
  };

  // --- REZERVASYON ÖZETİ ---
  const showRezSummary = (e) => {
    e.preventDefault();
    // fake distance ve saat
    const distance = 35; // KM (örnek)
    const hour = 1; // süre (örnek)
    // temel fiyat tablosu (örnek)
    const base = 1200 + (selectedVehicleObj.max * 100);
    // 15 firmadan fiyat alalım (simülasyon)
    const firmPrices = fakeFirms.map(firm => firm.fiyat(base, distance, hour));
    // en az 5 firma varsa ortalama al
    let avg = null, message = "";
    if (firmPrices.filter(Boolean).length >= 5) {
      avg = Math.round(firmPrices.reduce((a, b) => a + b, 0) / firmPrices.length);
      message = "Fiyatlarımız piyasanın güncel ortalaması baz alınarak %30 kar ve masraflar eklenerek hesaplanmıştır.";
    } else {
      avg = 0;
      message = "Seçtiğiniz özellikler için en az 5 firmadan fiyat alınamadı. Size özel fiyat çalışıp iletişim numaranızdan ulaşacağız.";
    }
    // masraflar örnek (vergi, KDV, yol, operasyon)
    const masraflar = Math.round(avg * 0.18) + 150; // %18 KDV ve 150TL diğer masraf
    const kar = Math.round(avg * 0.30);
    // ekstralar toplamı
    const ekstraFiyat = extrasList.filter(e => extras.includes(e.key)).reduce((t, e) => t + e.price, 0)
      + (rotar > 1 ? rotarList.find(r => r.hours === rotar)?.price || 0 : 0);
    // toplam
    const toplam = avg + masraflar + kar + ekstraFiyat;
    // summary
    setSummaryData({
      ...userData,
      from, to, date, time,
      vehicle: selectedVehicleObj.label,
      personCount, extras, rotar,
      fiyatlar: { avg, masraflar, kar, ekstraFiyat, toplam },
      message,
    });
    setShowSummary(true);
  };

  // --- FORM INPUT HANDLE ---
  const handleUserInput = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  // --- EKSTRALAR POPUP'DA ÇIKAR/SİL ---
  const removeExtra = (key) => setExtras(extras.filter(e => e !== key));

  // --- YORUM KISALTMASI (3 satır) ---
  const limitComment = (text) => {
    const words = text.split(" ");
    if (words.length <= 20) return text;
    return words.slice(0, 20).join(" ") + "...";
  };

  // --- POPUP CLOSE ---
  const closeSummary = () => setShowSummary(false);

  // --- RENDER ---
  return (
    <main className="bg-black text-white w-full overflow-x-hidden">
      {/* SLOGAN */}
      <div className="w-full flex flex-col items-center pt-7 pb-2 bg-black">
        <h1 className="text-xl md:text-3xl font-extrabold text-white text-center mb-2 w-full tracking-tight drop-shadow" style={{ fontSize: "2rem" }}>
          Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
        </h1>
      </div>

      {/* HERO SLIDER */}
      <section className="relative w-full min-h-[370px] md:min-h-[480px] flex items-center justify-center overflow-hidden select-none">
        {heroImages.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="VIP Transfer"
            fill
            className={`object-cover object-center transition-opacity duration-1000 ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            priority={idx === 0}
            sizes="100vw"
            draggable={false}
          />
        ))}
        {/* SLIDER BUTTONS */}
        <button onClick={() => handleSliderNav("left")} aria-label="Önceki"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/25 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl">
          &#8592;
        </button>
        <button onClick={() => handleSliderNav("right")} aria-label="Sonraki"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/25 hover:bg-gold/40 transition rounded-full w-11 h-11 flex items-center justify-center text-white opacity-60 hover:opacity-90 text-2xl">
          &#8594;
        </button>
      </section>

      {/* VIP TRANSFER FORMU */}
      <section className="w-full flex flex-col items-center py-10 px-3 bg-black">
        <div className="bg-[#161616] rounded-2xl shadow-2xl px-8 py-8 max-w-3xl w-full border border-gold/15">
          <h3 className="text-2xl font-bold text-gold mb-5 text-center">VIP Transferinizi Planlayın</h3>
          <form className="flex flex-wrap gap-4 w-full justify-center items-center" onSubmit={showRezSummary}>
            <input type="text" className="input flex-1 min-w-[110px]" placeholder="Nereden?" value={from} onChange={e => setFrom(e.target.value)} required />
            <input type="text" className="input flex-1 min-w-[110px]" placeholder="Nereye?" value={to} onChange={e => setTo(e.target.value)} required />
            <input type="date" className="input flex-1 min-w-[110px]" placeholder="Tarih" value={date} onChange={e => setDate(e.target.value)} required />
            <input type="time" className="input flex-1 min-w-[110px]" placeholder="Saat" value={time} onChange={e => setTime(e.target.value)} required />
            {/* Araç seçimi */}
            <select className="input flex-1 min-w-[130px]" value={selectedVehicle}
              onChange={e => { setSelectedVehicle(e.target.value); setPersonCount(1); }}>
              {vehicles.map(v => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
            {/* Kişi sayısı */}
            <select className="input flex-1 min-w-[90px]" value={personCount} onChange={e => setPersonCount(Number(e.target.value))}>
              {Array.from({ length: maxPerson }, (_, i) => (
                <option key={i+1} value={i+1}>{i+1} Kişi</option>
              ))}
            </select>
            {/* Fiyatı Gör */}
            <button type="submit" className="bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-8 py-2 whitespace-nowrap transition text-lg mt-2">
              Fiyatı Gör
            </button>
          </form>
          {/* Ekstralar */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {extrasList.map(ex => (
              <button key={ex.key} type="button"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition text-sm font-semibold shadow-sm ${extras.includes(ex.key) ? "bg-gold text-black border-yellow-400" : "bg-[#202020] text-gold border-gold/30 hover:bg-gold/30"}`}
                onClick={() => handleExtra(ex.key)}
              >
                {ex.icon} {ex.label} <span className="ml-1 text-xs text-gray-400">({ex.price}₺)</span>
              </button>
            ))}
            {/* Rotar garantisi */}
            <select className="input flex-1 min-w-[160px] mt-1" value={rotar} onChange={e => setRotar(Number(e.target.value))}>
              {rotarList.map(r => (
                <option key={r.hours} value={r.hours}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* AVANTAJ KUTULARI */}
      <section className="w-full flex flex-col items-center mb-12 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl w-full">
          {advantages.map((adv, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#191919] border border-gold/30 rounded-xl py-4 px-4 shadow font-semibold text-base min-h-[65px]">
              <span className="text-gold">{adv.icon}</span>
              <span className="leading-tight">{adv.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* YORUM SLIDER */}
      <section className="w-full max-w-6xl mx-auto py-7 mb-3 px-2">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Müşterilerimizin Yorumları</h2>
        <div className={`flex ${isMobile ? "flex-col items-center" : "flex-row"} gap-5 justify-center transition-all`}>
          {getVisibleTestimonials().map((item, idx) => (
            <div key={idx} className="bg-[#181818] border border-gold/18 rounded-2xl px-7 py-6 shadow flex flex-col justify-between min-h-[158px] max-w-sm w-full" style={{ minHeight: 158, maxHeight: 158, height: 158 }}>
              <p className="text-base font-medium mb-4" style={{ lineHeight: "1.35em", height: "3.7em", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                {limitComment(item.comment)}
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center text-lg font-bold">
                  {item.avatar}
                </div>
                <div>
                  <div className="text-gold font-bold">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEDEN YOLCUTRANSFERİ */}
      <section className="w-full max-w-6xl mx-auto py-12 px-3">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Neden YolcuTransferi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          <WhyUsCard
            icon={<FaUserShield size={26} className="text-gold mb-2" />}
            title="Uzman Ekip, 7/24 Destek"
            desc="Sorularınıza her zaman hızlı yanıt, sektörel deneyim ve güvence."
          />
          <WhyUsCard
            icon={<FaShieldAlt size={26} className="text-gold mb-2" />}
            title="Her Yolculukta Tam Sigorta"
            desc="Her transferde üst düzey güvence ve yasal koruma."
          />
          <WhyUsCard
            icon={<FaCrown size={26} className="text-gold mb-2" />}
            title="Şeffaf ve Esnek Fiyatlandırma"
            desc="Piyasa ortalaması, açık ek hizmetler, şeffaf maliyet."
          />
          <WhyUsCard
            icon={<FaStar size={26} className="text-gold mb-2" />}
            title="Memnuniyet ve Tavsiye Oranı"
            desc="Her 100 yolcudan 99’u bizi tekrar tercih ediyor."
          />
        </div>
      </section>

      {/* REZERVASYON ÖZETİ POPUP */}
      {showSummary && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
            <button onClick={closeSummary} className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500 font-bold">×</button>
            <h3 className="text-xl font-bold mb-2 text-center text-gold">Rezervasyon Özeti</h3>
            <div className="text-sm font-semibold mb-3">
              <b>Yolcu Bilgileri</b><br />
              Adı: <input className="border px-2 mx-1" value={userData.name} onChange={e => handleUserInput("name", e.target.value)} /> 
              Soyadı: <input className="border px-2 mx-1" value={userData.surname} onChange={e => handleUserInput("surname", e.target.value)} /><br />
              TC Kimlik No: <input className="border px-2 mx-1" value={userData.tckn} onChange={e => handleUserInput("tckn", e.target.value)} />
              Telefon No: <input className="border px-2 mx-1" value={userData.phone} onChange={e => handleUserInput("phone", e.target.value)} />
              Mail: <input className="border px-2 mx-1" value={userData.mail} onChange={e => handleUserInput("mail", e.target.value)} /><br />
              Rezervasyon Yapan: <input className="border px-2 mx-1" value={userData.rezervasyonYapan} onChange={e => handleUserInput("rezervasyonYapan", e.target.value)} />
              2. İrtibat: <input className="border px-2 mx-1" value={userData.secondPhone} onChange={e => handleUserInput("secondPhone", e.target.value)} />
            </div>
            <div className="mb-2">
              <b>Araç tipi:</b> {summaryData?.vehicle} &nbsp;|&nbsp;
              <b>Yolcu sayısı:</b> {summaryData?.personCount}<br />
              <b>Nereden:</b> {summaryData?.from} &nbsp;|&nbsp;
              <b>Nereye:</b> {summaryData?.to}<br />
              <b>Tarih:</b> {summaryData?.date} &nbsp;|&nbsp;
              <b>Saat:</b> {summaryData?.time}<br />
            </div>
            <div className="mb-2">
              <b>Ekstralar:</b><br />
              {extrasList.filter(e => summaryData?.extras?.includes(e.key)).length === 0 && <i>Ekstra seçilmedi.</i>}
              {extrasList.filter(e => summaryData?.extras?.includes(e.key)).map(e => (
                <div key={e.key} className="flex justify-between items-center text-sm">
                  <span>{e.label}</span>
                  <span className="text-gray-600 ml-2">({e.price}₺)</span>
                  <button className="text-red-400 hover:text-red-600 font-bold ml-2" onClick={() => removeExtra(e.key)}>×</button>
                </div>
              ))}
              {/* Rotar */}
              {rotar > 1 &&
                <div className="flex justify-between items-center text-sm">
                  <span>Rotar Garantisi ({rotar} Saat)</span>
                  <span className="text-gray-600 ml-2">
                    ({rotarList.find(r => r.hours === rotar)?.price || 0}₺)
                  </span>
                </div>
              }
            </div>
            <div className="mb-1">
              <b>Fiyatlar:</b><br />
              {summaryData?.fiyatlar?.avg > 0
                ? <>
                  <div>Piyasa ortalaması: <b>{summaryData?.fiyatlar.avg}₺</b></div>
                  <div>KDV ve masraflar: <b>{summaryData?.fiyatlar.masraflar}₺</b></div>
                  <div>Kâr: <b>{summaryData?.fiyatlar.kar}₺</b></div>
                  <div>Ekstralar: <b>{summaryData?.fiyatlar.ekstraFiyat}₺</b></div>
                  <div className="mt-2 text-lg text-gold font-bold">TOPLAM: {summaryData?.fiyatlar.toplam}₺</div>
                </>
                : <div className="text-red-600 text-sm">{summaryData?.message}</div>
              }
            </div>
            <div className="mt-3 flex flex-col items-center gap-3">
              {summaryData?.fiyatlar?.avg > 0 &&
                <button className="bg-gold hover:bg-yellow-400 text-black font-bold rounded-xl px-6 py-2 transition text-lg">Hemen Rezervasyon Yap</button>
              }
              <button className="underline text-gray-500 hover:text-gray-900 mt-2" onClick={closeSummary}>İptal / Kapat</button>
            </div>
          </div>
          <style jsx>{`
            .animate-fade-in { animation: fadeIn .3s; }
            @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
          `}</style>
        </div>
      )}

      {/* STYLES */}
      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .bg-gold { background: #FFD700; }
        .input {
          background: #f7f7f7;
          color: #222;
          border-radius: 0.75rem;
          padding: 0.8rem 1rem;
          border: 1px solid #FFD70040;
          min-width: 0;
          flex: 1 1 0px;
        }
        .input:focus { outline: 2px solid #FFD700; }
      `}</style>
    </main>
  );
}

// NEDEN BİZ KARTI (tektip hizalı)
function WhyUsCard({ icon, title, desc }) {
  return (
    <div className="bg-black/40 border border-gold/15 rounded-2xl p-6 text-center flex flex-col items-center shadow min-h-[170px]">
      {icon}
      <div className="text-gold font-bold text-lg mb-2 mt-2">{title}</div>
      <div className="text-gray-300 text-base mt-auto">{desc}</div>
    </div>
  );
}
