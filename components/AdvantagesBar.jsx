// components/AdvantagesBar.jsx

const advantages = [
  "Neden iye özel, tam gizlilikte VIP transfer.",
  "Çok dilli, uluslararası eğitimli sürücüler.",
  "TÜRSAB belgeli, sigortalı ve güvenli yolculuk.",
  "TROY güvencesiyle %100 yerli ödeme altyapısı.",
  "5+ yıllık tecrübeli şoförler ve ayrıcalıklı hizmet.",
  "%99.97 müşteri memnuniyeti ve lüks konfor.",
  "Havalimanı ve şehirlerarası VIP transfer.",
  "Büyük gruplar için Minibüs ve Dron ile transfer."
];

export default function AdvantagesBar() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 mb-10">
      {advantages.map((adv, i) => (
        <div key={i} className="bg-black/80 border border-gold rounded-xl p-4 text-white shadow">
          {adv}
        </div>
      ))}
    </div>
  );
}
