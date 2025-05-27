"use client";
import Image from "next/image";

const ARACLAR = [
  {
    title: "Mercedes Maybach Sedan",
    desc: "En üst düzey lüks ve prestij. Deri koltuklar, Wi-Fi, minibar, tam VIP donanım.",
    image: "/arac-maybach.png"
  },
  {
    title: "Mercedes Vito VIP",
    desc: "Geniş aileler, gruplar ve iş insanları için ultra konforlu, ayrıcalıklı sürüş deneyimi.",
    image: "/arac-vito.png"
  },
  {
    title: "Premium Minivan",
    desc: "Kalabalık yolculuklar ve uzun mesafeler için ferah iç hacim ve konfor.",
    image: "/arac-minivan.png"
  },
  {
    title: "Dron Transferi",
    desc: "Geleceğin ulaşımı. Şehir içi kısa mesafelerde dron ile hızlı transfer.",
    image: "/arac-dron.png"
  },
  {
    title: "Standart Sedan",
    desc: "Şehir içi ve havalimanı transferlerinde ekonomik ve konforlu seçenek.",
    image: "/arac-standart.png"
  }
];

export default function Araclar() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-6 text-center">
        VIP Araç Filomuz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {ARACLAR.map(arac => (
          <div key={arac.title} className="flex bg-black/75 rounded-2xl shadow-lg p-5 border border-gold/20 items-center">
            <Image src={arac.image} alt={arac.title} width={82} height={60} className="mr-6 rounded-xl shadow" />
            <div>
              <h3 className="font-bold text-lg text-gold mb-2">{arac.title}</h3>
              <p className="text-gray-200">{arac.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-400 text-sm">
        Tüm araçlarımız düzenli bakımlı ve profesyonel sürücülerle hizmetinizde.
      </div>
    </main>
  );
}
