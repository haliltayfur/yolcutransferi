"use client";
import Image from "next/image";

const HIZMETLER = [
  {
    title: "VIP Havalimanı Transferi",
    desc: "Türkiye’nin tüm havalimanlarında, Mercedes Maybach, Vito, lüks minivan ve özel araçlarla profesyonel, konforlu transfer.",
    icon: "/icon-havalimani.png"
  },
  {
    title: "Şehirler Arası Transfer",
    desc: "İstanbul, Bodrum, Antalya, İzmir ve tüm şehirler arası yolculuklarınızda güvenli ve sigortalı taşımacılık.",
    icon: "/icon-sehir.png"
  },
  {
    title: "Dron Yolcu Transferi",
    desc: "Dron ile kısa mesafe VIP taşımacılık: geleceğin ulaşımıyla tanışın.",
    icon: "/icon-dron.png"
  },
  {
    title: "Kurumsal & Toplu Transfer",
    desc: "Toplantı, seminer, fuar ve şirket organizasyonlarında filomuzla toplu taşıma çözümleri.",
    icon: "/icon-kurumsal.png"
  },
  {
    title: "Tur & Gezi Transferi",
    desc: "Tatil, şehir turu ve özel gezi planlarınızda profesyonel sürücülerimiz ve lüks araçlarımızla hizmetinizdeyiz.",
    icon: "/icon-tur.png"
  },
];

export default function Hizmetlerimiz() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-6 text-center">
        Hizmetlerimiz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {HIZMETLER.map(hizmet => (
          <div key={hizmet.title} className="flex items-center bg-black/70 rounded-2xl shadow-lg p-6 border border-gold/25">
            <Image src={hizmet.icon} alt={hizmet.title} width={54} height={54} className="mr-5" />
            <div>
              <h3 className="font-bold text-xl text-gold mb-2">{hizmet.title}</h3>
              <p className="text-gray-200">{hizmet.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center text-gray-400 text-sm">
        Tüm transferlerimiz sigortalı, lisanslı ve müşteri memnuniyeti odaklıdır.
      </div>
    </main>
  );
}
