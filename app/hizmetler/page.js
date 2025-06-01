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
    title: "Dron Yolcu Transferi",
    desc: "Dron ile kısa mesafe VIP taşımacılık: geleceğin ulaşımıyla tanışın. (Pek yakında!)",
    icon: "/icon-dron.png",
    href: "/dron",
  },
];

export default function Hizmetlerimiz() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-6 text-center">
        Hizmetlerimiz
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
        {HIZMETLER.map((item) => (
          <Link
            href={item.href}
            key={item.title}
            className="flex flex-col items-center bg-black/70 rounded-2xl shadow-xl p-7 border border-gold/25 hover:border-gold hover:bg-black/90 transition-all cursor-pointer"
          >
            <div className="w-[270px] h-[270px] mb-6 relative rounded-full overflow-hidden border-4 border-gold/30 shadow-md">
              <Image
                src={item.icon}
                alt={item.title}
                width={270}
                height={270}
                className="object-cover rounded-full"
              />
            </div>
            <h3 className="font-bold text-xl text-gold mb-2 text-center">{item.title}</h3>
            <p className="text-gray-200 text-center">{item.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
