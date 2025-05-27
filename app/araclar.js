import Image from "next/image";

const ARACLAR = [
  {
    ad: "Mercedes Maybach Sedan",
    tip: "Premium VIP",
    ozellikler: [
      "Deri koltuk, full konfor",
      "Özel şoför, soğutmalı içecek",
      "WiFi, masa, priz, ekran"
    ],
    resim: "/maybach.jpg"
  },
  {
    ad: "Mercedes Vito VIP",
    tip: "Lüks Minivan",
    ozellikler: [
      "7 yolcu, lüks iç dizayn",
      "Elektrikli kapı, LCD TV",
      "Şoförlü, ekstra bagaj"
    ],
    resim: "/vito.jpg"
  },
  {
    ad: "Cadillac Escalade",
    tip: "Premium SUV",
    ozellikler: [
      "Yüksek güvenlik ve konfor",
      "VIP transfer, şık görünüm",
      "Büyük aile ve iş grubu"
    ],
    resim: "/escalade.jpg"
  },
  {
    ad: "Dron Transfer (eVTOL)",
    tip: "Yenilikçi Dron",
    ozellikler: [
      "2-4 yolcu, şehir içi hava transfer",
      "Otonom, elektrikli, hızlı",
      "Çok yakında!"
    ],
    resim: "/dron.jpg"
  },
  {
    ad: "Ekonomik Sedan",
    tip: "Standart",
    ozellikler: [
      "Ekonomik fiyat, konfor",
      "Şoförlü, hızlı transfer",
      "Küçük gruplar için ideal"
    ],
    resim: "/sedan.jpg"
  }
];

export default function AraclarPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-6xl bg-black/70 rounded-2xl shadow-lg px-6 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Araç Filomuz
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {ARACLAR.map(arac => (
            <div key={arac.ad} className="bg-black/60 border border-gold/40 rounded-xl shadow flex flex-col items-center p-4">
              <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
                <Image
                  src={arac.resim}
                  alt={arac.ad}
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-lg text-gold font-bold mb-1">{arac.ad}</h2>
              <div className="text-xs text-gray-400 mb-1">{arac.tip}</div>
              <ul className="text-gray-200 text-sm list-disc pl-5 mb-2">
                {arac.ozellikler.map((ozellik, idx) => <li key={idx}>{ozellik}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
