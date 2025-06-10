"use client";
import Image from "next/image";
import { FaPlaneArrival, FaCarSide, FaUserShield, FaCrown } from "react-icons/fa";

export default function Home() {
  return (
    <main className="bg-black text-white w-full overflow-x-hidden">

      {/* HERO ALANI */}
      <section className="relative w-full min-h-[520px] flex items-center justify-center">
        <Image
          src="/Orta.jpg"
          alt="VIP Transfer Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute top-14 left-0 w-full flex flex-col items-center z-10">
          <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-xl mb-4 max-w-4xl text-center">
            Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 font-medium mb-7 max-w-2xl text-center drop-shadow-lg">
            Her yolculuk, size özel bir deneyim.<br />
            Kişiselleştirilmiş hizmetin ve gerçek ayrıcalığın adresi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="bg-white/20 border border-gold text-gold font-semibold px-7 py-3 rounded-2xl shadow-lg text-lg flex items-center gap-2 hover:bg-gold hover:text-black transition"
            >
              VIP Hattı: 0539 526 75 69
            </a>
          </div>
        </div>
      </section>

      {/* PRESTİJ SLOGAN BANTLARI */}
      <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 py-10 px-3">
        <MiniBanner text="Sadece Size Özel Kişiselleştirilmiş Hizmet" />
        <MiniBanner text="Çok Dilli, Uluslararası Eğitimli Sürücüler" />
        <MiniBanner text="Transferin Her Anında VIP Destek" />
      </section>

      {/* REZERVASYON FORMU */}
      <section className="flex justify-center w-full z-10 relative mb-10 px-2">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-8 w-full max-w-2xl flex flex-col gap-7 border border-gray-200">
          <h3 className="text-2xl font-bold text-black mb-2 text-center">VIP Transferinizi Şimdi Planlayın</h3>
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

      {/* REFERANSLAR ve YORUMLAR */}
      <section className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-between py-6 mb-4 px-2">
        {/* Referans logoları */}
        <div className="flex-1 flex flex-col items-center md:items-start mb-5 md:mb-0">
          <h4 className="text-gold font-bold text-lg mb-3">Bizi Tercih Edenler</h4>
          <div className="flex gap-5 flex-wrap">
            <Image src="/ref1.png" width={90} height={38} alt="Referans 1" className="opacity-80" />
            <Image src="/ref2.png" width={90} height={38} alt="Referans 2" className="opacity-80" />
            <Image src="/ref3.png" width={90} height={38} alt="Referans 3" className="opacity-80" />
            <Image src="/ref4.png" width={90} height={38} alt="Referans 4" className="opacity-80" />
          </div>
        </div>
        {/* Testimonial */}
        <div className="flex-1 flex flex-col items-center">
          <blockquote className="text-white bg-black/60 rounded-xl px-6 py-6 italic font-medium max-w-xl border-l-4 border-gold">
            “Dünyanın her yerinde transfer kullandım, bu kadar üst düzey ilgi, konfor ve güveni başka yerde bulmadım.”
            <div className="text-gold font-semibold mt-3 text-right w-full">Ece Y., Global Yatırımcı</div>
          </blockquote>
        </div>
      </section>

      {/* HİZMETLER BÖLÜMÜ */}
      <section className="w-full max-w-6xl mx-auto py-10 px-3">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">VIP Hizmetlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          <ServiceCard
            icon={<FaPlaneArrival size={38} className="text-gold" />}
            title="Havalimanı VIP Karşılama"
            desc="Uçuşunuzdan önce ve sonra özel asistan hizmetiyle karşılanırsınız."
          />
          <ServiceCard
            icon={<FaCarSide size={38} className="text-gold" />}
            title="Şehirlerarası VIP Transfer"
            desc="Türkiye genelinde, dilediğiniz noktadan noktaya üst segment araçlarla ulaşım."
          />
          <ServiceCard
            icon={<FaCrown size={38} className="text-gold" />}
            title="Kişiye Özel Transfer"
            desc="Özel istekleriniz için, size ve misafirlerinize özel planlanan rota ve araç tahsisi."
          />
          <ServiceCard
            icon={<FaUserShield size={38} className="text-gold" />}
            title="Kurumsal VIP & Concierge"
            desc="Şirketlere, otellere ve üst düzey yöneticilere ayrıcalıklı ve gizlilik odaklı transfer."
          />
        </div>
      </section>

      {/* ARAÇLAR BÖLÜMÜ */}
      <section className="w-full max-w-6xl mx-auto py-10 px-3">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">Filo & VIP Araçlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
          <CarCard
            src="/car-vito.jpg"
            title="Mercedes Vito"
            desc="Yolcu odaklı, tam VIP donanım, 6+1 konforlu yolculuk."
          />
          <CarCard
            src="/car-sclass.jpg"
            title="Mercedes S-Class"
            desc="Sadece üst düzey yöneticiler ve özel misafirler için."
          />
          <CarCard
            src="/car-maybach.jpg"
            title="Mercedes Maybach"
            desc="Lüksün zirvesi; konfor, prestij ve üst düzey gizlilik."
          />
          <CarCard
            src="/car-vipminivan.jpg"
            title="VIP Minivan"
            desc="Kalabalık aile ve gruplar için ferah, şık ve güvenli ulaşım."
          />
        </div>
      </section>

      {/* NEDEN BİZ? */}
      <section className="w-full max-w-6xl mx-auto py-10 px-3">
        <h2 className="text-2xl font-bold text-gold mb-6 text-center">Neden YolcuTransferi?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <WhyUsCard
            title="Her Müşteriye Özel Rota & Araç"
            desc="Her transfer öncesi detaylarınız analiz edilir, size özel güzergah ve araç tahsisi yapılır."
          />
          <WhyUsCard
            title="Uluslararası Eğitimli Şoförler"
            desc="Tüm sürücülerimiz çok dilli, üst düzey protokol ve misafirperverlik eğitimlidir."
          />
          <WhyUsCard
            title="VIP Hizmette 15+ Yıl Deneyim"
            desc="Onlarca kurum, yüzlerce üst düzey misafir bize yıllardır güveniyor."
          />
        </div>
      </section>

      {/* SSS & KAMPANYA */}
      <section className="w-full max-w-5xl mx-auto py-10 px-3">
        <div className="bg-gold/15 border border-gold rounded-2xl px-7 py-7 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gold mb-3 text-center">Sıkça Sorulan Sorular</h2>
          <p className="text-lg text-gray-200 text-center mb-2">Aklınızdaki tüm sorular için <a href="/sss" className="text-gold underline hover:text-yellow-400">SSS</a> sayfamızı ziyaret edin ya da <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="text-gold underline hover:text-yellow-400">WhatsApp ile anında bize ulaşın</a>.</p>
          <p className="text-base text-gray-300 mt-2 text-center">İlk yolculuğunuzda özel avantajlar sizi bekliyor!</p>
        </div>
      </section>

      {/* GLOBAL STYLE EKLERİ */}
      <style jsx global>{`
        .text-gold { color: #FFD700; }
        .bg-gold { background: #FFD700; }
        .input {
          background: #f7f7f7;
          color: #222;
          border-radius: 0.75rem;
          padding: 0.8rem 1rem;
          border: 1px solid #ddd;
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
    <div className="bg-black border border-gold text-gold py-3 px-6 rounded-xl font-semibold text-center shadow text-base">
      {text}
    </div>
  );
}

// HİZMETLER KARTI
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 bg-[#1a1a1a] rounded-2xl p-5 border border-gold/10 shadow">
      <div>{icon}</div>
      <div className="text-lg font-bold text-gold">{title}</div>
      <div className="text-gray-300 text-sm">{desc}</div>
    </div>
  );
}

// ARAÇLAR KARTI
function CarCard({ src, title, desc }) {
  return (
    <div className="flex flex-col items-center bg-[#181818] border border-gold/10 rounded-2xl p-4 shadow">
      <Image src={src} alt={title} width={130} height={80} className="rounded-xl object-contain mb-3 bg-black" />
      <div className="text-gold font-bold text-base mb-1">{title}</div>
      <div className="text-gray-300 text-sm text-center">{desc}</div>
    </div>
  );
}

// NEDEN BİZ KARTI
function WhyUsCard({ title, desc }) {
  return (
    <div className="bg-black/50 border border-gold/15 rounded-2xl p-6 text-center flex flex-col items-center shadow">
      <div className="text-gold font-bold text-lg mb-2">{title}</div>
      <div className="text-gray-300 text-base">{desc}</div>
    </div>
  );
}
