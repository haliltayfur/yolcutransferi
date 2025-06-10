"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLock, FaUserTie, FaShieldAlt, FaGlobe, FaIdCard, FaCreditCard, FaCarSide, FaUsers, FaPlane, FaBus, FaCrown, FaUserShield, FaStar } from "react-icons/fa";

// --- HERO SLIDE GÖRSELLERİ ---
const heroImages = [
  "/Hero1.png", "/Hero2.png", "/Hero3.png", "/Hero4.png", "/Hero5.png",
  "/Hero6.png", "/Hero7.png", "/Hero8.png", "/Hero9.png",
];

// --- ARAÇLAR VE MAKS KİŞİ SAYISI ---
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

// --- AVANTAJ KUTULARI ---
const advantages = [
  { icon: <FaLock size={24} />, text: "Kişiye özel, tam gizlilikte VIP transfer." },
  { icon: <FaGlobe size={24} />, text: "Çok dilli, uluslararası eğitimli sürücüler." },
  { icon: <FaIdCard size={24} />, text: "TÜRSAB belgeli, sigortalı ve güvenli yolculuk." },
  { icon: <FaCreditCard size={24} />, text: "TROY güvencesiyle %100 yerli ödeme altyapısı." },
  { icon: <FaUserTie size={24} />, text: "5+ yıllık tecrübeli şoförler ve ayrıcalıklı hizmet." },
  { icon: <FaStar size={24} />, text: "%99.97 müşteri memnuniyeti ve lüks konfor." },
  { icon: <FaPlane size={24} />, text: "Havalimanı ve şehirlerarası VIP transfer." },
  { icon: <FaBus size={24} />, text: "Büyük gruplar için Minibüs ve Dron ile transfer." },
];

// --- YORUM SLIDER DATASI ---
const testimonials = [
  { name: "Deniz Y.", role: "CEO / İstanbul", comment: "Her anlamda profesyonel ve güvenli hizmet. Yurt dışı misafirlerim için tek adresim.", avatar: "D" },
  { name: "Anna L.", role: "Expedia Europe / Berlin", comment: "Incredibly luxury and on-time. Drivers speak fluent English and German. 5 stars!", avatar: "A" },
  { name: "Mehmet K.", role: "Finans Direktörü / İzmir", comment: "Ailem ve iş arkadaşlarım için kusursuz, gizlilik odaklı VIP transfer.", avatar: "M" },
  { name: "Yusuf K.", role: "Konsolos / Bakü", comment: "Seyahatimde özel taleplerimi eksiksiz karşıladılar. İstanbul’da güvenli ellerdesiniz.", avatar: "Y" },
  { name: "Lena S.", role: "Creative Director / Dubai", comment: "Exceptional service, clean vehicles, reliable drivers. Highly recommended.", avatar: "L" },
  { name: "Gülşah S.", role: "Acenta Müdürü / Antalya", comment: "Misafirlerimizin memnuniyeti için tek tercihim YolcuTransferi.", avatar: "G" },
  { name: "Daniel P.", role: "Global Lawyer / Londra", comment: "Safe, private, and totally stress-free. A truly high-end experience.", avatar: "D" },
  { name: "Arda V.", role: "Sanatçı / Bodrum", comment: "Gece-gündüz, transferde hep dakik ve konforlular.", avatar: "A" },
  { name: "Svetlana K.", role: "Event Manager / Moskova", comment: "We trusted them for our luxury event logistics. Perfect in every detail.", avatar: "S" },
  { name: "Mustafa E.", role: "IT Director / Ankara", comment: "Her zaman sigortalı, temiz ve prestijli araçlar. VIP hissi gerçek!", avatar: "M" },
  { name: "Jessica R.", role: "Executive PA / Paris", comment: "Our board and guests loved the professionalism. Thank you!", avatar: "J" },
  { name: "Ali U.", role: "Tourism Investor / Kuveyt", comment: "Yatırımcı transferlerinde güven ve gizlilik her zaman üst düzeyde.", avatar: "A" },
  { name: "Linda B.", role: "Real Estate CEO / New York", comment: "Outstanding service, very impressive vehicles and drivers.", avatar: "L" },
  { name: "Serkan B.", role: "Genel Müdür / Bursa", comment: "Büyük ekibimiz için transferde tüm taleplerimiz karşılandı.", avatar: "S" },
  { name: "Maria T.", role: "Hotel GM / Atina", comment: "VIP konuklarımız için en güvenilir ve prestijli transfer!", avatar: "M" },
];

export default function Home() {
  // SLIDER STATE
  const [currentSlide, setCurrentSlide] = useState(0);
  // FORM STATE
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].value);
  const [personCount, setPersonCount] = useState(1);

  // TESTIMONIAL SLIDER STATE
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // SLIDER: Hero
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // TESTIMONIAL SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 3) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // MOBIL YORUM SLIDER
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Kişi sayısı limiti
  const selectedVehicleObj = vehicles.find(v => v.value === selectedVehicle) || vehicles[0];
  const maxPerson = selectedVehicleObj.max;

  // Yorum dilimleri
  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[testimonialIndex % testimonials.length]];
    } else {
      return [
        testimonials[testimonialIndex % testimonials.length],
        testimonials[(testimonialIndex + 1) % testimonials.length],
        testimonials[(testimonialIndex + 2) % testimonials.length]
      ];
    }
  };

  return (
    <main className="bg-black text-white w-full overflow-x-hidden">
      {/* Slogan (ÜSTTE, resim ÜSTÜNDE) */}
      <div className="w-full flex flex-col items-center py-6 bg-black">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center mb-2 w-full tracking-tight drop-shadow">
          Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
        </h1>
      </div>

      {/* HERO SLIDER */}
      <section className="relative w-full min-h-[400px] md:min-h-[520px] flex items-center justify-center overflow-hidden">
        {/* Slider Images */}
        {heroImages.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt="VIP Transfer"
            fill
            className={`object-cover object-center transition-opacity duration-1000 ${currentSlide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
            priority={idx === 0}
            sizes="100vw"
          />
        ))}
        {/* Slider Dot Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${currentSlide === i ? "bg-gold" : "bg-white/30"} transition`}
              style={{ border: "1px solid #FFD700" }}
            />
          ))}
        </div>
      </section>

      {/* VIP TRANSFER FORMU */}
      <section className="w-full flex flex-col items-center py-10 px-3 bg-black">
        <div className="bg-[#161616] rounded-2xl shadow-2xl px-7 py-8 max-w-2xl w-full border border-gold/15">
          <h3 className="text-2xl font-bold text-gold mb-6 text-center">VIP Transferinizi Planlayın</h3>
          <form className="flex flex-col md:flex-row gap-4 w-full justify-center items-center">
            <input type="text" className="input w-full md:w-40" placeholder="Nereden?" />
            <input type="text" className="input w-full md:w-40" placeholder="Nereye?" />
            <input type="datetime-local" className="input w-full md:w-48" placeholder="Tarih & Saat" />
            {/* Araç seçimi */}
            <select
              className="input w-full md:w-40"
              value={selectedVehicle}
              onChange={e => { setSelectedVehicle(e.target.value); setPersonCount(1); }}
            >
              {vehicles.map(v => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
            {/* Kişi sayısı */}
            <select
              className="input w-full md:w-24"
              value={personCount}
              onChange={e => setPersonCount(Number(e.target.value))}
            >
              {Array.from({ length: maxPerson }, (_, i) => (
                <option key={i+1} value={i+1}>{i+1} Kişi</option>
              ))}
            </select>
            <button type="button" className="bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-6 py-2 whitespace-nowrap transition">
              Fiyatı Gör
            </button>
          </form>
        </div>
      </section>

      {/* AVANTAJ KUTULARI */}
      <section className="w-full flex flex-col items-center mb-12 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl w-full">
          {advantages.map((adv, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#191919] border border-gold/30 rounded-xl py-4 px-4 shadow font-semibold text-base">
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
            <div key={idx} className="bg-[#181818] border border-gold/18 rounded-2xl px-6 py-5 shadow flex flex-col justify-between min-h-[170px] w-full max-w-sm">
              <p className="text-base font-medium mb-4">"{item.comment}"</p>
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

      {/* NEDEN YOLCUTRANSFERİ? */}
      <section className="w-full max-w-6xl mx-auto py-12 px-3">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Neden YolcuTransferi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          <WhyUsCard
            icon={<FaUserShield size={28} className="text-gold mb-2" />}
            title="5+ Yıllık VIP Transfer Tecrübesi"
            desc="Binlerce transfer, yüksek memnuniyet ve güven."
          />
          <WhyUsCard
            icon={<FaShieldAlt size={28} className="text-gold mb-2" />}
            title="Her Yolculukta Tam Sigorta"
            desc="Her transferinizde üst düzey güvence ve sigorta."
          />
          <WhyUsCard
            icon={<FaCrown size={28} className="text-gold mb-2" />}
            title="Esnek Fiyat Seçenekleri"
            desc="Her bütçeye uygun, lüks veya ekonomik transfer çözümleri."
          />
          <WhyUsCard
            icon={<FaCarSide size={28} className="text-gold mb-2" />}
            title="VIP Sürücü ve Araç Filosu"
            desc="Tüm sürücülerimiz eğitimli ve araçlarımız lüks segment."
          />
        </div>
      </section>

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

// NEDEN BİZ KARTI
function WhyUsCard({ icon, title, desc }) {
  return (
    <div className="bg-black/40 border border-gold/15 rounded-2xl p-6 text-center flex flex-col items-center shadow">
      {icon}
      <div className="text-gold font-bold text-lg mb-2">{title}</div>
      <div className="text-gray-300 text-base">{desc}</div>
    </div>
  );
}
