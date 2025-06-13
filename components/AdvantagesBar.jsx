// components/AdvantagesBar.js
const advantages = [
  {
    icon: "🔒",
    title: "Tam Gizlilikte VIP Transfer",
    desc: "Tüm yolculuklarınızda %100 gizlilik ve ayrıcalık."
  },
  {
    icon: "🌐",
    title: "Çok Dilli, Eğitimli Sürücüler",
    desc: "Uluslararası deneyimli, yabancı dil bilen şoförler."
  },
  {
    icon: "🛡️",
    title: "TÜRSAB Belgeli, Sigortalı Güven",
    desc: "Yasal, sigortalı ve belgeli transfer."
  },
  {
    icon: "💳",
    title: "TROY Güvencesiyle Ödeme",
    desc: "%100 yerli ödeme altyapısı, güvenli işlem."
  },
  {
    icon: "🚘",
    title: "5+ Yıllık Tecrübeli Şoförler",
    desc: "Deneyimli ve profesyonel hizmet ekibi."
  },
  {
    icon: "⭐",
    title: "%99.97 Müşteri Memnuniyeti",
    desc: "Lüks, konforlu, yüksek müşteri memnuniyeti."
  },
  {
    icon: "✈️",
    title: "VIP Havalimanı & Şehirlerarası Transfer",
    desc: "Her ihtiyaca özel ulaşım çözümleri."
  },
  {
    icon: "🚌",
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
            className="flex flex-col items-center justify-center bg-white border border-gold/30 rounded-2xl py-7 px-5 shadow-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="text-3xl mb-3 text-gold">{adv.icon}</div>
            <div className="font-semibold text-lg mb-1">{adv.title}</div>
            <div className="text-gray-500 text-sm">{adv.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
