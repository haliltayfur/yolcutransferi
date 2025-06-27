// app/araclar/page.js

"use client";
import Image from "next/image";
import { CarFront, Wifi, GlassWater, User2, Briefcase } from "lucide-react";

const ARACLAR = [
  {
    title: "Mercedes Maybach Sedan",
    desc: "En üst düzey lüks, prestij ve mahremiyet. Deri koltuklar, Wi-Fi, minibar, arka masaj, sessiz sürüş.",
    image: "/arac-maybach.png",
    features: [
      { icon: <User2 size={18} />, text: "3 yolcu" },
      { icon: <Briefcase size={18} />, text: "3 valiz" },
      { icon: <Wifi size={18} />, text: "Wi-Fi" },
      { icon: <GlassWater size={18} />, text: "Minibar" }
    ]
  },
  {
    title: "Mercedes Vito VIP",
    desc: "Aileler, gruplar ve iş dünyası için ultra konfor. Lüks koltuklar, multimedia, ferah iç hacim.",
    image: "/arac-vito.png",
    features: [
      { icon: <User2 size={18} />, text: "6 yolcu" },
      { icon: <Briefcase size={18} />, text: "8 valiz" },
      { icon: <Wifi size={18} />, text: "Wi-Fi" }
    ]
  },
  {
    title: "Premium Minivan",
    desc: "Kalabalık gruplar ve uzun mesafeler için geniş ve konforlu transfer deneyimi.",
    image: "/arac-minivan.png",
    features: [
      { icon: <User2 size={18} />, text: "8 yolcu" },
      { icon: <Briefcase size={18} />, text: "10 valiz" }
    ]
  },
  {
    title: "Dron Transferi",
    desc: "İleri teknolojiyle, şehir içi kısa mesafelerde havadan ultra hızlı ulaşım.",
    image: "/arac-dron.png",
    features: [
      { icon: <User2 size={18} />, text: "1 yolcu" },
      { icon: <Wifi size={18} />, text: "Wi-Fi" }
    ]
  },
  {
    title: "Standart Sedan",
    desc: "Ekonomik ve konforlu transferler için ideal çözüm. Havalimanı ve şehir içi transferlerde hızlı seçim.",
    image: "/arac-standart.png",
    features: [
      { icon: <User2 size={18} />, text: "3 yolcu" },
      { icon: <Briefcase size={18} />, text: "2 valiz" }
    ]
  }
];

export default function Araclar() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gold mb-5 text-center tracking-tight drop-shadow-xl">
        VIP Araç Filomuz
      </h1>
      <div className="text-[#ffeec2] text-center text-lg mb-10">
        Türkiye'nin en seçkin araçları, üst düzey sürücülerle, <b>her transferiniz VIP ayrıcalıkta</b>.
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARACLAR.map((arac, i) => (
          <div
            key={arac.title}
            className="group flex flex-col md:flex-row items-center bg-gradient-to-br from-[#221f15] via-[#19160a] to-[#302811] rounded-2xl shadow-lg border border-gold/30 overflow-hidden hover:scale-[1.025] transition-all hover:shadow-2xl"
          >
            <div className="md:w-44 w-full flex-shrink-0 flex items-center justify-center bg-[#19160a] p-6">
              <Image
                src={arac.image}
                alt={arac.title}
                width={170}
                height={110}
                className="rounded-xl shadow-lg border border-gold/20"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="flex-1 px-6 py-6 md:py-5">
              <h2 className="text-2xl font-bold text-gold mb-2 font-quicksand">{arac.title}</h2>
              <div className="flex gap-3 mb-3 flex-wrap">
                {arac.features.map((f, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 bg-gold/10 border border-gold/50 rounded-lg px-3 py-1 text-xs font-semibold text-gold shadow-sm"
                  >
                    {f.icon}
                    {f.text}
                  </span>
                ))}
              </div>
              <p className="text-[#ffeec2] mb-2">{arac.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a
          href="/rezervasyon"
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-700 text-black font-bold py-4 px-10 rounded-2xl text-xl shadow hover:scale-105 transition mt-5"
        >
          Hemen VIP Transfer Teklifi Al
        </a>
        <div className="mt-6 text-gray-400 text-sm">
          Tüm araçlarımız full bakımlı ve yolculuk öncesi dezenfekte edilmektedir.<br />
          <b>YolcuTransferi.com</b> ile %100 güvenli, konforlu, kurumsal transfer.
        </div>
      </div>
    </main>
  );
}

// app/araclar/page.js
