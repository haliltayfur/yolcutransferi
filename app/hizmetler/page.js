"use client";
import Image from "next/image";
import Link from "next/link";

const HIZMETLER = [
  {
    title: "VIP Havalimanı Transferi",
    desc: "Türkiye’nin tüm havalimanlarında, Mercedes Maybach, Vito, lüks minivan ve özel araçlarla profesyonel, konforlu transfer.",
    icon: "/icon-havalimani.png",
    href: "/vip-havalimani"
  },
  {
    title: "Şehirler Arası Transfer",
    desc: "İstanbul, Bodrum, Antalya, İzmir ve tüm şehirler arası yolculuklarınızda güvenli ve sigortalı taşımacılık.",
    icon: "/icon-sehir.png",
    href: "/sehirler-arasi"
  },
  {
    title: "Kurumsal & Toplu Transfer",
    desc: "Toplantı, seminer, fuar ve şirket organizasyonlarında filomuzla toplu taşıma çözümleri.",
    icon: "/icon-kurumsal.png",
    href: "/kurumsal"
  },
  {
    title: "Tur & Gezi Transferi",
    desc: "Tatil, şehir turu ve özel gezi planlarınızda profesyonel sürücülerimiz ve lüks araçlarımızla hizmetinizdeyiz.",
    icon: "/icon-tur.png",
    href: "/tur-gezi"
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

      {/* Dron Yolcu Transferi ayrı ve en altta, pek yakında ibaresiyle */}
      <div className="mt-9 flex justify-center">
        <Link
          href="/dron"
          className="flex flex-col items-center bg-black/80 border-2 border-dashed border-gold rounded-2xl shadow-lg p-7 w-full max-w-md hover:border-yellow-400 hover:bg-black transition-all cursor-pointer"
        >
          <Image
            src="/icon-dron.png"
            alt="Dron Yolcu Transferi"
            width={135}
            height={135}
            className="mb-4"
            style={{ objectFit: "contain" }}
          />
          <h3 className="font-bold text-xl text-gold mb-1 text-center">
            Dron Yolcu Transferi
          </h3>
          <p className="text-gray-200 text-center mb-2">
            Dron ile kısa mesafe VIP taşımacılık: geleceğin ulaşımıyla tanışın.
          </p>
          <span className="inline-block text-xs px-4 py-1 rounded-xl bg-yellow-700/30 text-yellow-400 font-semibold mt-1">
            Pek yakında!
          </span>
        </Link>
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        Tüm transferlerimiz sigortalı, lisanslı ve müşteri memnuniyeti odaklıdır.
      </div>
    </main>
  );
}
