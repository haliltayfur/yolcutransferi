"use client";
import Image from "next/image";
import Footer from "../components/Footer";
import { FaPlaneArrival, FaCarSide, FaUserShield, FaCrown, FaHandshake } from "react-icons/fa";

export default function Home() {
  return (
    <main className="bg-black text-white w-full overflow-x-hidden">
      {/* HERO: Arka plan görsel + overlay yazı */}
      <section className="relative w-full h-[520px] flex items-center justify-center">
        <Image
          src="/Orta.jpg"
          alt="VIP Transfer Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-xl mb-4 text-center">
            Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 font-medium mb-6 text-center max-w-2xl drop-shadow">
            “Her yolculuk size özel bir ayrıcalıktır.”
            <br />Kişiselleştirilmiş transfer ve %100 güvenle, Türkiye'nin en prestijli ulaşım deneyimi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/rezervasyon"
              className="bg-gold hover:bg-yellow-400 text-black font-bold px-8 py-3 rounded-2xl shadow-lg text-lg transition"
            >
              Hemen Rezervasyon Yap
            </a>
            <a
              href="https://wa.me/905395267569"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gold text-gold font-semibold px-7 py-3 rounded-2xl shadow-lg text-lg flex items-center gap-2 hover:bg-gold hover:text-black transition"
            >
              VIP Hattı: 0539 526 75 69
            </a>
          </div>
        </div>
      </section>

      {/* AVANTAJ/FAYDA BANDI */}
      <section className="max-w-5xl mx-auto w-full mt-[-40px] mb-12 flex flex-col md:flex-row gap-6 z-10 relative px-2">
        <MiniBanner text="Kişiye özel, tam gizlilikte VIP transfer." />
        <MiniBanner text="Çok dilli, uluslararası eğitimli sürücüler." />
        <MiniBanner text="TÜRSAB belgeli, sigortalı ve güvenli yolculuk." />
        <MiniBanner text="TROY güvencesiyle %100 yerli ödeme altyapısı." />
      </section>

      {/* REZERVASYON FORMU */}
      <section className="flex justify-center w-full z-10 relative mb-12 px-2">
        <div className="bg-[#171717] rounded-2xl shadow-2xl px-8 py-8 w-full max-w-2xl flex flex-col gap-7 border border-gold/20">
          <h3 className="text-2xl font-bold text-gold mb-2 text-center">VIP Transferinizi Planlayın</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" className="input" placeholder="Nereden?" />
            <input type="text" className="input" placeholder="Nereye?" />
            <input type="datetime-local" className="input" placeholder="Tarih & Saat" />
            <input type="number" min="1" max="10" className="input" placeholder="Kişi Sayısı" />
            <button className="bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-6 py-2 whitespace-nowrap">
              Fiyatı Gör
            </button>
          </div>
        </div>
      </section>

      {/* MÜŞTERİ YORUMLARI */}
      <section className="w-full max-w-6xl mx-auto py-6 mb-2 px-2">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Müşterilerimizin Yorumları</h2>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          <TestimonialCard
            text="Şirket toplantılarımız için toplu transfer talep ettik. Zamanında, tertemiz ve güler yüzlü hizmet. Teşekkürler!"
            author="Deniz Y."
            role="İnsan Kaynakları"
          />
          <TestimonialCard
            text="Çocuk koltuğundan internete kadar her detay düşünülmüş. Ailecek çok memnun kaldık."
            author="Yusuf K."
            role="Aile"
          />
          <TestimonialCard
            text="İstanbul'da özel misafirlerimizin transferleri için tek tercihim. Lüks, güvenli, sorunsuz."
            author="Gülşah S."
            role="Acenta"
          />
        </div>
      </section>

      {/* NEDEN YOLCUTRANSFERİ? */}
      <section className="w-full max-w-6xl mx-auto py-12 px-3">
        <h2 className="text-2xl font-bold text-gold mb-7 text-center">Neden YolcuTransferi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          <WhyUsCard
            icon={<FaHandshake size={28} className="text-gold mb-2" />}
            title="5+ Yıllık VIP Transfer Tecrübesi"
            desc="Binlerce transfer, yüksek memnuniyet ve güven."
          />
          <WhyUsCard
            icon={<FaUserShield size={28} className="text-gold mb-2" />}
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

      {/* SARI BANNER: GÜVEN BANDI ve TROY/TÜRSAB */}
      <section className="w-full py-6 bg-gold text-black font-bold text-lg flex items-center justify-between px-6 mb-0 mt-8">
        <span>
          Yolculuğunuz bir tık uzağınızda! VIP konfor ve güvenle hemen şimdi transferinizi planlayın, farkı yaşayın!
        </span>
        <div className="flex gap-7 items-center">
          <Image src="/troy.png" alt="Troy" width={54} height={23} className="h-7 w-auto" />
          <Image src="/tursab.png" alt="TÜRSAB" width={72} height={29} className="h-7 w-auto" />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* GLOBAL STYLE */}
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

// PRESTİJ BANNER KOMPONENTİ
function MiniBanner({ text }) {
  return (
    <div className="bg-[#181818] border border-gold text-gold py-3 px-6 rounded-xl font-semibold text-center shadow text-base flex-1">
      {text}
    </div>
  );
}

// TESTIMONIAL KARTI
function TestimonialCard({ text, author, role }) {
  return (
    <div className="bg-[#181818] border border-gold/20 rounded-2xl px-6 py-5 shadow flex flex-col justify-between min-h-[170px] flex-1">
      <p className="text-base font-medium mb-3">{text}</p>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-9 h-9 rounded-full bg-gold text-black flex items-center justify-center text-lg font-bold">
          {author[0]}
        </div>
        <div>
          <div className="text-gold font-bold">{author}</div>
          <div className="text-xs text-gray-400">{role}</div>
        </div>
      </div>
    </div>
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
