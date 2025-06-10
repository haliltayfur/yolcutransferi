"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaPlaneArrival, FaCarSide, FaUserShield, FaCrown } from "react-icons/fa";

// Bu listeyi /araclar sayfanızdan API veya sabit JSON ile çekebilirsiniz
const vehicleTypes = [
  "Mercedes Vito",
  "Mercedes S-Class",
  "Mercedes Maybach",
  "VIP Minivan",
  "Ekonomik Araç",
  "VIP Otobüs",
  "Elektrikli VIP",
  "Engelli Transfer"
];

// 15 farklı müşteri yorumu (özgün yazıldı, örnek amaçlı)
const testimonials = [
  {
    text: "Almanya'dan gelen özel misafirlerimizi bir hafta boyunca yolcutransferi.com ekibine teslim ettik. Her detayla ilgilendiler, müthiş profesyonellik!",
    name: "Burcu A.",
    company: "Kurumsal Firma Yöneticisi"
  },
  {
    text: "Taksiyle uğraşmak yerine ekonomik transfer seçtim, tertemiz VIP araç ve zamanında hizmet! Uygun fiyata lüks deneyim, şaşırdım.",
    name: "Serkan G.",
    company: "Bireysel Müşteri"
  },
  {
    text: "5 gün boyunca İstanbul’un tarihi yerlerini keşfettik, hem sürücümüz hem araçlar mükemmeldi. Unutulmaz bir VIP tur yaşadık.",
    name: "Maria T.",
    company: "Tourist from UK",
    lang: "en",
    enText: "We explored Istanbul's historical sites for 5 days, our driver and the vehicles were just perfect. Unforgettable VIP tour!"
  },
  {
    text: "VIP havalimanı transferiyle iş toplantıma yetiştim, bagajım ve konforumla hiç ilgilenmek zorunda kalmadım. Sürekli tercih edeceğim!",
    name: "Arda M.",
    company: "CEO"
  },
  {
    text: "Şirket toplantılarımız için toplu transfer talep ettik. Zamanında, tertemiz ve güler yüzlü hizmet. Teşekkürler!",
    name: "Deniz Y.",
    company: "HR Manager"
  },
  {
    text: "İlk defa kullandım, bu kadar hızlı ve güvenli hizmet beklemiyordum. Şoförümüz çok nazikti.",
    name: "Buse E.",
    company: "Öğrenci"
  },
  {
    text: "Her detayı düşünülmüş; çocuk koltuğundan internetine kadar. Tekrar tercih edeceğim, ailecek çok memnun kaldık.",
    name: "Yusuf K.",
    company: "Aile Babası"
  },
  {
    text: "Lüks araçlar, dakik şoförler, üst düzey güvenlik… Gerçekten işin hakkı veriliyor!",
    name: "İsmail D.",
    company: "Yönetici"
  },
  {
    text: "4 gün boyunca transfer, tur, şehirlerarası yolculuk… Hepsinde aynı kalite. Fiyatlar da gayet makul.",
    name: "Gülşah S.",
    company: "Travel Consultant"
  },
  {
    text: "İstanbul'da önemli bir toplantım için kullandım, gizlilik ve konforu çok önemsedim. Beklentimi fazlasıyla karşıladı.",
    name: "Michael P.",
    company: "Businessman (UK)"
  },
  {
    text: "Sürücüler çok deneyimli, trafikte bile tam güvenle yolculuk yaptım. Hızlı rezervasyon da çok pratik.",
    name: "Cem T.",
    company: "Sigorta Uzmanı"
  },
  {
    text: "Kızımın mezuniyet gecesi için VIP minivan hizmeti aldık, güvenli ve konforlu oldu. Teşekkürler.",
    name: "Filiz Ç.",
    company: "Anne"
  },
  {
    text: "Sigortalı taşıma hizmeti sundukları için tercih ettim. Sorunsuz ve gönül rahatlığıyla tavsiye ederim.",
    name: "Adnan S.",
    company: "Finans Uzmanı"
  },
  {
    text: "İlk transferimde bile kendimi ayrıcalıklı hissettim. Uygun fiyat, üst düzey hizmet. Tek kelimeyle harika!",
    name: "Fatih B.",
    company: "Müşteri"
  },
  {
    text: "Drone ile şehir turu gerçekten çok etkileyiciydi! Modern, teknolojik ve çok eğlenceli bir deneyimdi.",
    name: "Jenna S.",
    company: "Digital Nomad",
    lang: "en",
    enText: "The drone passenger transfer was an incredible and unique experience! So modern and fun!"
  }
];

export default function Home() {
  // Yorum slider için
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentTestimonial]);

  return (
    <main className="bg-black text-white w-full overflow-x-hidden">

      {/* EN ÜST - HERO DIŞI BAŞLIK */}
      <div className="w-full flex justify-center items-center pt-8 pb-2 bg-black z-50">
        <h1 className="text-xl md:text-2xl font-extrabold text-gold tracking-tight text-center drop-shadow" style={{letterSpacing: ".01em"}}>
          Türkiye'nin Lider VIP Transfer Ağı
        </h1>
      </div>

      {/* HERO ALANI */}
      <section className="relative w-full min-h-[520px] flex items-end justify-center">
        <Image
          src="/Orta.jpg"
          alt="VIP Transfer Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-end justify-between px-4 md:px-8 pb-6 gap-6 z-10 relative">

          {/* Sol: Butonlar */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-6 mb-4 md:mb-0">
            <a
              href="/rezervasyon"
              className="bg-gold hover:bg-yellow-400 text-black font-bold px-7 py-3 rounded-2xl shadow-lg text-base md:text-lg transition whitespace-nowrap"
            >
              Hemen Rezervasyon Yap
            </a>
            <a
              href="https://wa.me/905395267569"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/20 border border-gold text-gold font-semibold px-7 py-3 rounded-2xl shadow-lg text-base md:text-lg flex items-center gap-2 hover:bg-gold hover:text-black transition whitespace-nowrap"
            >
              VIP Hattı: 0539 526 75 69
            </a>
          </div>

          {/* SLOGAN KUTUSU */}
          <div className="flex-1 max-w-3xl flex items-center">
            <div className="bg-black/60 border border-gold rounded-2xl shadow-lg px-7 py-5 w-full flex flex-col gap-2 md:gap-2">
              {sloganlar.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-gold text-base md:text-lg font-semibold">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REZERVASYON FORMU */}
      <section className="flex justify-center w-full z-10 relative mb-10 px-2">
        <div className="bg-[#242424] rounded-2xl shadow-2xl px-8 py-8 w-full max-w-3xl flex flex-col md:flex-row gap-5 border border-gold/20 items-center">
          <div className="w-full flex flex-col md:flex-row gap-4 flex-1">
            <input type="text" className="input" placeholder="Nereden?" />
            <input type="text" className="input" placeholder="Nereye?" />
            <input type="datetime-local" className="input" placeholder="Tarih & Saat" />
            <select className="input" defaultValue="">
              <option value="" disabled>Araç Türü</option>
              {vehicleTypes.map((v, i) => (
                <option key={i} value={v}>{v}</option>
              ))}
            </select>
            <input type="number" min="1" max="10" className="input" placeholder="Kişi Sayısı" />
          </div>
          <button className="bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-8 py-3 whitespace-nowrap min-w-[150px] mt-2 md:mt-0">
            Fiyatı Gör
          </button>
        </div>
      </section>

      {/* REFERANSLAR ve YORUMLAR (Slider) */}
      <section className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-6 py-8 mb-2 px-2">
        <h4 className="text-gold font-bold text-xl mb-2">Müşterilerimizin Yorumları</h4>
        <div className="relative w-full">
          <TestimonialCard {...testimonials[currentTestimonial]} />
          {/* Slider okları */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-gold hover:bg-gold hover:text-black transition"
            onClick={() => setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
            aria-label="Önceki"
            style={{zIndex:2}}
          >‹</button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 text-gold hover:bg-gold hover:text-black transition"
            onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
            aria-label="Sonraki"
            style={{zIndex:2}}
          >›</button>
        </div>
        <div className="flex gap-1 mt-3">
          {testimonials.map((_, i) => (
            <span key={i} className={`w-2 h-2 rounded-full ${i === currentTestimonial ? 'bg-gold' : 'bg-gold/30'}`} />
          ))}
        </div>
      </section>

      {/* NEDEN BİZ KUTULARI */}
      <section className="w-full max-w-6xl mx-auto py-10 px-3">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">Neden YolcuTransferi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          <WhyUsCard
            title="5+ Yıllık VIP Transfer Tecrübesi"
            desc="Binlerce transfer, yüksek memnuniyet ve güven."
          />
          <WhyUsCard
            title="Her Yolculukta Tam Sigorta"
            desc="Her transferinizde üst düzey güvence ve sigorta."
          />
          <WhyUsCard
            title="Esnek Fiyat Seçenekleri"
            desc="Her bütçeye uygun, lüks veya ekonomik transfer çözümleri."
          />
          <WhyUsCard
            title="VIP Sürücü ve Araç Filosu"
            desc="Tüm sürücülerimiz eğitimli ve araçlarımız lüks segment."
          />
        </div>
      </section>

      {/* EN ALTA - CTA */}
      <section className="w-full bg-gold text-black py-10 flex justify-center items-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-center max-w-3xl drop-shadow">
          Yolculuğunuz bir tık uzağınızda! VIP konfor ve güvenle hemen şimdi transferinizi planlayın, farkı yaşayın!
        </h2>
      </section>

      {/* GLOBAL STYLE EKLERİ */}
      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .bg-gold { background: #FFD700; }
        .input {
          background: #1b1b1b;
          color: #fff;
          border-radius: 0.75rem;
          padding: 0.8rem 1rem;
          border: 1px solid #FFD70044;
          min-width: 0;
          flex: 1 1 0px;
        }
        .input:focus { outline: 2px solid #FFD700; }
        ::placeholder { color: #bcbcbc; }
        select.input { padding-right: 2rem; }
      `}</style>
    </main>
  );
}

// Sloganlar topluca
const sloganlar = [
  "Her yolculuk, size özel bir deneyim.",
  "Kişiselleştirilmiş hizmetin ve gerçek ayrıcalığın adresi.",
  "Sadece size özel transfer çözümleri",
  "Çok dilli, uluslararası eğitimli sürücüler",
  "Her an VIP destek",
  "Her bütçeye uygun transferler",
  "5+ yıllık deneyimli şoförler",
  "Sigortalı taşıma hizmetleri",
  "Lüks hizmet deneyimi",
  "%99.97 müşteri memnuniyeti",
  "VIP havalimanı transferi",
  "Şehirler arası transfer",
  "Kurumsal & toplu transfer",
  "Tur & gezi transferi",
  "Drone yolcu transferi"
];

// Yorum kartı
function TestimonialCard({ text, name, company, lang, enText }) {
  return (
    <blockquote className="text-white bg-black/70 rounded-xl px-7 py-8 italic font-medium max-w-2xl mx-auto border-l-4 border-gold relative text-lg min-h-[128px] flex flex-col justify-center">
      <span>{lang === "en" ? enText : text}</span>
      <div className="text-gold font-semibold mt-4 text-right w-full">{name} <span className="text-white/60 font-normal">{company && `– ${company}`}</span></div>
    </blockquote>
  );
}

// NEDEN BİZ KARTI
function WhyUsCard({ title, desc }) {
  return (
    <div className="bg-black/60 border border-gold/15 rounded-2xl p-6 text-center flex flex-col items-center shadow">
      <div className="text-gold font-bold text-lg mb-2">{title}</div>
      <div className="text-gray-300 text-base">{desc}</div>
    </div>
  );
}
