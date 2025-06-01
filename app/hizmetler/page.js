"use client";
import Image from "next/image";
import Link from "next/link";

const HIZMETLER = [
  {
    title: "VIP Havalimanı Transferi",
    desc: "Türkiye’nin tüm havalimanlarında, Mercedes Maybach, Vito, lüks minivan ve özel araçlarla profesyonel, konforlu transfer.",
    icon: "/icon-havalimani.png",
    href: "/vip-havalimani",
  },
  {
    title: "Şehirler Arası Transfer",
    desc: "İstanbul, Bodrum, Antalya, İzmir ve tüm şehirler arası yolculuklarınızda güvenli ve sigortalı taşımacılık.",
    icon: "/icon-sehir.png",
    href: "/sehirler-arasi",
  },
  {
    title: "Kurumsal & Toplu Transfer",
    desc: "Toplantı, seminer, fuar ve şirket organizasyonlarında filomuzla toplu taşıma çözümleri.",
    icon: "/icon-kurumsal.png",
    href: "/kurumsal",
  },
];

export default function Hizmetlerimiz() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-6 text-center">
        Hizmetlerimiz
      </h2>

      {/* Üstteki 3 hizmet kutusu */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 justify-center">
        {HIZMETLER.map((hizmet) => (
          <Link
            href={hizmet.href}
            key={hizmet.title}
            className="flex flex-col items-center bg-black/70 rounded-2xl shadow-lg p-7 border border-gold/25 hover:border-gold hover:bg-black/90 transition-all cursor-pointer"
          >
            <Image
              src={hizmet.icon}
              alt={hizmet.title}
              width={135}
              height={135}
              className="mb-4"
              style={{ objectFit: "contain" }}
            />
            <h3 className="font-bold text-xl text-gold mb-2 text-center">{hizmet.title}</h3>
            <p className="text-gray-200 text-center">{hizmet.desc}</p>
          </Link>
        ))}
      </div>

      {/* Alttaki 2 hizmet (yan yana ve ortalı) */}
      <div className="flex justify-center gap-7 mt-10 flex-wrap">
        {[
          {
            title: "Tur & Gezi Transferi",
            desc: "Tatil, şehir turu ve özel gezi planlarınızda profesyonel sürücülerimiz ve lüks araçlarımızla hizmetinizdeyiz.",
            icon: "/icon-tur.png",
            href: "/tur-gezi",
            isSoon: false,
          },
          {
            title: "Dron Yolcu Transferi",
            desc: "Dron ile kısa mesafe VIP taşımacılık: geleceğin ulaşımıyla tanışın.",
            icon: "/icon-dron.png",
            href: "/dron",
            isSoon: true,
          },
        ].map((item) => (
          <Link
            href={item.href}
            key={item.title}
            className={`flex flex-col items-center bg-black/70 ${
              item.isSoon ? "border-dashed" : ""
            } rounded-2xl shadow-lg p-7 border border-gold/25 hover:border-gold hover:bg-black/90 transition-all cursor-pointer w-[300px]`}
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={135}
              height={135}
              className="mb-4"
              style={{ objectFit: "contain" }}
            />
            <h3 className="font-bold text-xl text-gold mb-1 text-center">{item.title}</h3>
            <p className="text-gray-200 text-center">{item.desc}</p>
            {item.isSoon && (
              <span className="inline-block text-xs px-4 py-1 rounded-xl bg-yellow-700/30 text-yellow-400 font-semibold mt-2">
                Pek yakında!
              </span>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
