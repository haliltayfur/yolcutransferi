"use client";
import {
  Lock,
  Globe,
  ShieldCheck,
  CreditCard,
  Car,
  Star,
  Plane,
  Bus
} from "lucide-react";

const advantages = [
  {
    icon: <Lock className="w-9 h-9 text-gold mb-3" />,
    title: "Tam Gizlilikte VIP Transfer",
    desc: "Tüm yolculuklarınızda %100 gizlilik ve ayrıcalık."
  },
  {
    icon: <Globe className="w-9 h-9 text-gold mb-3" />,
    title: "Çok Dilli, Eğitimli Sürücüler",
    desc: "Uluslararası deneyimli, yabancı dil bilen şoförler."
  },
  {
    icon: <ShieldCheck className="w-9 h-9 text-gold mb-3" />,
    title: "TÜRSAB Belgeli, Sigortalı Güven",
    desc: "Yasal, sigortalı ve belgeli transfer."
  },
  {
    icon: <CreditCard className="w-9 h-9 text-gold mb-3" />,
    title: "TROY Güvencesiyle Ödeme",
    desc: "%100 yerli ödeme altyapısı, güvenli işlem."
  },
  {
    icon: <Car className="w-9 h-9 text-gold mb-3" />,
    title: "5+ Yıllık Tecrübeli Şoförler",
    desc: "Deneyimli ve profesyonel hizmet ekibi."
  },
  {
    icon: <Star className="w-9 h-9 text-gold mb-3" />,
    title: "%99.97 Müşteri Memnuniyeti",
    desc: "Lüks, konforlu, yüksek müşteri memnuniyeti."
  },
  {
    icon: <Plane className="w-9 h-9 text-gold mb-3" />,
    title: "VIP Havalimanı & Şehirlerarası Transfer",
    desc: "Her ihtiyaca özel ulaşım çözümleri."
  },
  {
    icon: <Bus className="w-9 h-9 text-gold mb-3" />,
    title: "Büyük Gruplara Minibüs & Dron Transfer",
    desc: "Kalabalıklar ve yeni nesil taşımacılık."
  }
];

export default function AdvantagesBar() {
  return (
    <section className="w-full flex flex-col items-center py-12 px-2 bg-transparent">
      <h2 className="text-4xl font-bold mb-2.5 text-gold text-center">
        Neden YolcuTransferi?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl w-full">
        {advantages.map((adv, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center 
              bg-gradient-to-br from-[#191919e8] to-[#232323ef] 
              border-2 border-gold rounded-2xl py-8 px-6 
              shadow-gold-lg text-center 
              transition-all duration-300 
              hover:scale-105 hover:shadow-gold-xl
              backdrop-blur-sm"
          >
            {adv.icon}
            <div className="font-semibold text-xl mb-1 text-white drop-shadow">{adv.title}</div>
            <div className="text-gray-300 text-sm">{adv.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
