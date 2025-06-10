"use client";

import Header from "../components/Header";import Image from "next/image";
import { FaPlaneArrival, FaCarSide, FaHandshake, FaPhoneAlt } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Header /> {/* HEADER TEK SATIRDA EN ÜSTTE */}
      <main className="min-h-screen bg-black text-white flex flex-col items-center">
        {/* HERO BÖLÜMÜ */}
        <div className="relative w-full max-w-[1100px] h-[420px] rounded-b-3xl overflow-hidden shadow-xl">
          <Image
            src="/Orta.jpg"
            alt="YolcuTransferi VIP Transfer"
            fill
            className="object-cover object-center brightness-80"
            priority
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm">
            <h1 className="text-3xl md:text-5xl font-extrabold drop-shadow-lg text-center mb-2 w-full">
              Türkiye'nin Lider <span className="text-gold">VIP Transfer Ağı</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 font-medium text-center max-w-xl mb-5">
              Havalimanı, şehirlerarası ve özel günler için güvenilir, şık ve dakik transferin adresi.
            </p>
            <a
              href="tel:5395267569"
              className="bg-gold hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded-2xl shadow-md text-lg transition"
            >
              7/24 Hızlı İletişim: 0539 526 75 69
            </a>
          </div>
        </div>

        {/* HİZMETLER — IKONLU BAND */}
        <section className="w-full max-w-[1100px] flex flex-col md:flex-row items-center justify-between gap-8 py-10">
          <ServiceCard
            icon={<FaPlaneArrival size={36} className="text-gold" />}
            title="Havalimanı Transferi"
            desc="İstanbul, Sabiha Gökçen ve tüm Türkiye havalimanlarına VIP ulaşım."
          />
          <ServiceCard
            icon={<FaCarSide size={36} className="text-gold" />}
            title="Şehirlerarası VIP"
            desc="Türkiye genelinde güvenli, konforlu ve zamanında transfer."
          />
          <ServiceCard
            icon={<FaHandshake size={36} className="text-gold" />}
            title="Kurumsal & Bireysel"
            desc="Şirketler, oteller, etkinlikler ve özel günler için transfer."
          />
        </section>

        {/* KISA REKLAM/PRESTİJ BANDI */}
        <section className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <MiniBanner text="%100 Faturalı & Yasal" />
          <MiniBanner text="En Yeni Lüks Araçlar" />
          <MiniBanner text="Anında Fiyat & Rezervasyon" />
        </section>

        {/* REZERVASYON FORMU BLOKU */}
        <div className="flex justify-center z-10 relative w-full max-w-[700px] mb-20">
          <div className="bg-white rounded-2xl shadow-2xl px-7 py-6 w-full flex flex-col gap-6 border border-gray-200">
            {/* Rezervasyon inputları/placeholder */}
            <h3 className="text-2xl font-bold text-black mb-2">VIP Transferinizi Şimdi Planlayın</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" className="input" placeholder="Nereden?" />
              <input type="text" className="input" placeholder="Nereye?" />
              <input type="datetime-local" className="input" placeholder="Tarih & Saat" />
              <input type="number" min="1" max="10" className="input" placeholder="Kişi Sayısı" />
              <button className="bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-6 py-2">
                Fiyatı Gör
              </button>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="w-full max-w-[1100px] text-center text-gray-400 pb-5 text-sm">
          © {new Date().getFullYear()} YolcuTransferi.com • Tüm hakları saklıdır.
        </footer>

        {/* TAILWIND EKSTRA CLASSLARI */}
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
    </>
  );
}

// HİZMETLER İKONLU KART BİLEŞENİ
function ServiceCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center gap-2 px-2">
      {icon}
      <div className="text-lg font-bold">{title}</div>
      <div className="text-gray-300 text-sm max-w-[180px]">{desc}</div>
    </div>
  );
}

// KISA PRESTİJ BANDI BİLEŞENİ
function MiniBanner({ text }) {
  return (
    <div className="bg-black border border-gold text-gold py-2 px-4 rounded-xl font-semibold text-center shadow">
      {text}
    </div>
  );
}
