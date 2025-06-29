// app/hizmetlerimiz/page.jsx

"use client";
import Image from "next/image";
import Link from "next/link";

const HIZMETLER = [
  {
    title: "VIP Havalimanı Transferi",
    desc: "Türkiye’nin tüm havalimanlarında, Mercedes Maybach, Vito, lüks minivan ve özel araçlarla profesyonel, konforlu transfer.",
    icon: "/vip-havalimani-banner.png",
    href: "/vip-havalimani",
  },
  {
    title: "Şehirler Arası Transfer",
    desc: "İstanbul, Bodrum, Antalya, İzmir ve tüm şehirler arası yolculuklarınızda güvenli ve sigortalı taşımacılık.",
    icon: "/sehirler-arasi-banner.png",
    href: "/sehirler-arasi",
  },
  {
    title: "Kurumsal & Toplu Transfer",
    desc: "Toplantı, seminer, fuar ve şirket organizasyonlarında filomuzla toplu taşıma çözümleri.",
    icon: "/kurumsal-banner.png",
    href: "/kurumsal",
  },
  {
    title: "Tur & Gezi Transferi",
    desc: "Tatil, şehir turu ve özel gezi planlarınızda profesyonel sürücülerimiz ve lüks araçlarımızla hizmetinizdeyiz.",
    icon: "/tur-gezi-banner.png",
    href: "/tur-gezi",
  },
  {
    title: "Tekne/Yat Kiralama & Özel Etkinlik",
    desc: "İstanbul Boğazı’nda lüks yat/tekne ile evlilik teklifi, doğum günü veya VIP etkinlikler. Romantik akşam yemeği, müzik, özel dekorasyon ve rehberli turlar dahil, farklı kapasite ve rota seçenekleriyle ayrıcalıklı hizmet.",
    icon: "/teknede-evlilik-banner.png",  // public klasöründe dosya adı birebir böyle olmalı!
    href: "/tekne-yat",
  },
  {
    title: "Dron Yolcu Transferi",
    desc: "Dron ile kısa mesafe VIP taşımacılık: geleceğin ulaşımıyla tanışın. (Pek yakında!)",
    icon: "/icon-dron.png",
    href: "/dron",
  },
];

export default function Hizmetlerimiz() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-8 text-center tracking-tight">
        Hizmetlerimiz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 justify-center">
        {HIZMETLER.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            className="flex flex-col items-center bg-black/80 rounded-2xl shadow-xl px-6 py-8 md:px-8 md:py-10 border border-gold/25 hover:border-gold hover:bg-black/90 transition-all duration-200 cursor-pointer group"
            tabIndex={0}
            aria-label={item.title}
          >
            <div className="w-full max-w-[360px] h-[200px] md:h-[220px] mb-6 relative overflow-hidden rounded-[14px] border-4 border-gold/40 group-hover:border-gold/70 shadow-md bg-[#222]">
              <Image
                src={item.icon}
                alt={item.title}
                fill
                className="object-cover transition-all duration-200 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 360px"
                priority={item.title === "VIP Havalimanı Transferi"}
              />
            </div>
            <h3 className="font-bold text-xl md:text-2xl text-gold mb-2 text-center drop-shadow">
              {item.title}
            </h3>
            <p className="text-gray-200 text-center text-base leading-relaxed">
              {item.desc}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

// app/hizmetlerimiz/page.jsx
