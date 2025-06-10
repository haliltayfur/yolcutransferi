"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

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

const vehicleInfos = [
  { type: "Mercedes Vito", capacity: 6 },
  { type: "Mercedes S-Class", capacity: 3 },
  { type: "Mercedes Maybach", capacity: 3 },
  { type: "VIP Minivan", capacity: 7 },
  { type: "Ekonomik Araç", capacity: 3 },
  { type: "VIP Otobüs", capacity: 27 },
  { type: "Elektrikli VIP", capacity: 3 },
  { type: "Engelli Transfer", capacity: 4 }
];

const testimonials = [
  {
    text: "Almanya’dan gelen iş ortaklarımızı 1 hafta boyunca YolcuTransferi’ne emanet ettik. Tüm süreç mükemmeldi, güvenle tavsiye ederim.",
    name: "Burcu A.",
    company: "Kurumsal Firma"
  },
  {
    text: "Ekonomik VIP transfer seçtim, hızlıca havaalanına ulaştım, hem uygun fiyat hem özel araç şaşırttı. Sürekli kullanacağım.",
    name: "Serkan G.",
    company: "Bireysel Müşteri"
  },
  {
    text: "Istanbul’s highlights in 4 days, everything top quality! Our driver was so helpful. Thank you YolcuTransferi!",
    name: "Maria T.",
    company: "Tourist from UK"
  },
  {
    text: "Şirket toplantılarımız için toplu transfer talep ettik. Zamanında, tertemiz ve güler yüzlü hizmet. Teşekkürler!",
    name: "Deniz Y.",
    company: "İnsan Kaynakları"
  },
  {
    text: "Çocuk koltuğundan internete kadar her detay düşünülmüş. Ailecek çok memnun kaldık.",
    name: "Yusuf K.",
    company: "Aile"
  },
  {
    text: "İstanbul’da özel misafirlerimizin transferleri için tek tercihim. Lüks, güvenli, sorunsuz.",
    name: "Gülşah S.",
    company: "Acente"
  },
  {
    text: "Trafikte bile güvende hissettim. Deneyimli şoförler, konforlu araçlar, hızlı rezervasyon.",
    name: "Cem T.",
    company: "Sigorta Uzmanı"
  },
  {
    text: "Her yolculuğumda aynı kaliteyi buluyorum, teşekkürler.",
    name: "Fatih B.",
    company: ""
  },
  {
    text: "Drone ile yapılan şehir turu hayatımda yaşadığım en farklı deneyimdi!",
    name: "Jenna S.",
    company: "Digital Nomad"
  }
];

export default function Home() {
  // Testimonial grid kaydırma için
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartIndex((prev) => (prev + visibleCount) % testimonials.length);
    }, 5500);
    return () => clearTimeout(timer);
  }, [startIndex]);

  // Rezervasyon formu için
  const [selectedVehicle, setSelectedVehicle] = useState(vehicleInfos[0]);
  const [personCount, setPersonCount] = useState(1);

  return (
    <main className="bg-black text-white w-full overflow-x-hidden">

      {/* HERO BÖLÜMÜ */}
      <section className="relative w-full min-h-[520px] flex items-center justify-center">
        <Image
          src="/Orta.jpg"
          alt="VIP Transfer Hero"
          fill
          className="object-cover object-center"
          priority
        />
      </section>

      {/* SLOGAN VE BUTONLAR – Hero'nun altında, grid */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 md:px-8 py-6 gap-6">
        {/* Slogan Kutusu */}
        <div className="flex-1 w-full">
          <div className="bg-black/70 border border-gold rounded-2xl shadow-lg px-6 py-5 flex flex-col gap-1">
            {sloganlar.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-gold text-sm md:text-base font-semibold">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Butonlar */}
        <div className="flex flex-col gap-3 min-w-[220px] w-full md:w-auto">
          <a
            href="/rezervasyon"
            className="bg-gold hover:bg-yellow-400 text-black font-bold px-7 py-3 rounded-2xl shadow-lg text-base md:text-lg transition whitespace-nowrap w-full text-center"
          >
            Hemen Rezervasyon Yap
          </a>
          <a
            href="https://wa.me/905395267569"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 border border-gold text-gold font-semibold px-7 py-3 rounded-2xl shadow-lg text-base md:text-lg flex items-center gap-2 hover:bg-gold hover:text-black transition whitespace-nowrap w-full justify-center"
          >
            VIP Hattı: 0539 526 75 69
          </a>
        </div>
      </section>

      {/* REZERVASYON FORMU */}
      <section className="flex justify-center w-full z-10 relative mb-10 px-2">
        <div className="bg-[#242424] rounded-2xl shadow-2xl px-8 py-8 w-full max-w-3xl flex flex-col gap-6 border border-gold/20 items-center">
          <form className="w-full flex flex-col md:flex-row gap-4">
            <input type="text" className="input flex-[2]" placeholder="Nereden?" />
            <input type="text" className="input flex-[2]" placeholder="Nereye?" />
            <input type="datetime-local" className="input flex-[1]" placeholder="Tarih & Saat" />
            <select
              className="input flex-[1]"
              value={selectedVehicle.type}
              onChange={e => {
                const v = vehicleInfos.find(v => v.type === e.target.value);
                setSelectedVehicle(v);
                setPersonCount(1);
              }}>
              {vehicleInfos.map((v, i) => (
                <option key={i} value={v.type}>{v.type}</option>
              ))}
            </select>
            <select
              className="input flex-[1]"
              value={personCount}
              onChange={e => setPersonCount(Number(e.target.value))}>
              {Array.from({ length: selectedVehicle.capacity }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1} Kişi</option>
              ))}
            </select>
          </form>
          <button className="bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-8 py-3 whitespace-nowrap min-w-[150px] w-full md:w-auto">
            Fiyatı Gör
          </button>
        </div>
      </section>

      {/* REFERANSLAR / YORUMLAR */}
      <section className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center gap-6 py-8 mb-2 px-2">
        <h4 className="text-gold font-bold text-xl mb-2">Müşterilerimizin Yorumları</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 w-full">
          {Array.from({ length: visibleCount }).map((_, idx) => {
            const t = testimonials[(startIndex + idx) % testimonials.length];
            return (
              <TestimonialCard key={t.name + idx} {...t} />
            );
          })}
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="rounded-full w-7 h-7 flex items-center justify-center bg-black/40 text-gold hover:bg-gold hover:text-black transition"
            onClick={() => setStartIndex((startIndex - visibleCount + testimonials.length) % testimonials.length)}
            aria-label="Önceki"
          >‹</button>
          <button
            className="rounded-full w-7 h-7 flex items-center justify-center bg-black/40 text-gold hover:bg-gold hover:text-black transition"
            onClick={() => setStartIndex((startIndex + visibleCount) % testimonials.length)}
            aria-label="Sonraki"
          >›</button>
        </div>
      </section>

      {/* NEDEN BİZ? */}
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

      {/* TROY VE CTA BANDI */}
      <section className="w-full bg-gold text-black py-4 flex justify-between items-center" style={{ paddingLeft: 30, paddingRight: 30, minHeight: 52 }}>
        <h2 className="text-xl md:text-2xl font-extrabold text-left max-w-3xl" style={{ lineHeight: 1.35 }}>
          Yolculuğunuz bir tık uzağınızda! VIP konfor ve güvenle hemen şimdi transferinizi planlayın, farkı yaşayın!
        </h2>
        {/* Troy logosu */}
        <Image src="/Troy.png" alt="Troy Logo" width={60} height={30} style={{ marginLeft: 20, minWidth: 60 }} />
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

// Yorum kartı
function TestimonialCard({ text, name, company }) {
  return (
    <div className="bg-[#191919] border border-gold/10 rounded-2xl p-5 flex flex-col shadow items-start h-full">
      <div className="text-gray-100 text-base italic mb-3" style={{ minHeight: 68 }}>{text}</div>
      <div className="flex items-center gap-2 mt-auto">
        <div className="w-10 h-10 bg-gold/70 rounded-full flex items-center justify-center text-black font-bold text-lg shadow">{name[0]}</div>
        <div className="flex flex-col text-sm">
          <span className="text-gold font-semibold">{name}</span>
          {company && <span className="text-gray-400">{company}</span>}
        </div>
      </div>
    </div>
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
