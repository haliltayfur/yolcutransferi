// 1. Lucide paketini kurman gerek (npm install lucide-react)
// 2. Kodu kullanabilirsin

import { Lock, Globe, ShieldCheck, CreditCard, Car, Star, Plane, Bus } from "lucide-react";

const advantages = [
  {
    icon: <Lock className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "Tam Gizlilikte VIP Transfer",
    desc: "Tüm yolculuklarınızda %100 gizlilik ve ayrıcalık."
  },
  {
    icon: <Globe className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "Çok Dilli, Eğitimli Sürücüler",
    desc: "Uluslararası deneyimli, yabancı dil bilen şoförler."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "TÜRSAB Belgeli, Sigortalı Güven",
    desc: "Yasal, sigortalı ve belgeli transfer."
  },
  {
    icon: <CreditCard className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "TROY Güvencesiyle Ödeme",
    desc: "%100 yerli ödeme altyapısı, güvenli işlem."
  },
  {
    icon: <Car className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "5+ Yıllık Tecrübeli Şoförler",
    desc: "Deneyimli ve profesyonel hizmet ekibi."
  },
  {
    icon: <Star className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "%99.97 Müşteri Memnuniyeti",
    desc: "Lüks, konforlu, yüksek müşteri memnuniyeti."
  },
  {
    icon: <Plane className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "VIP Havalimanı & Şehirlerarası Transfer",
    desc: "Her ihtiyaca özel ulaşım çözümleri."
  },
  {
    icon: <Bus className="w-10 h-10 text-[#8c7327] mb-3" />,
    title: "Büyük Gruplara Minibüs & Dron Transfer",
    desc: "Kalabalıklar ve yeni nesil taşımacılık."
  }
];

export default function AdvantagesBar() {
  return (
    <section className="w-full flex flex-col items-center my-12 px-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl w-full">
        {advantages.map((adv, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white/90 border border-[#8c7327] rounded-2xl py-7 px-5 shadow-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {adv.icon}
            <div className="font-semibold text-lg mb-1">{adv.title}</div>
            <div className="text-gray-500 text-sm">{adv.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
