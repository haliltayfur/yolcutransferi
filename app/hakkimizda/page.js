"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <div className="border-2 border-[#bfa658] rounded-2xl bg-black/80 px-2 md:px-6 py-6 md:py-8 mb-8">
        {/* Slogan ve Başlık, şehirler-arası gibi */}
        <h1 className="text-2xl md:text-3xl font-bold text-[#bfa658] mb-5 tracking-tight text-center md:text-left">
          YolcuTransferi.com’da Eşsiz VIP Transfer Deneyimi
        </h1>

        {/* Orta göbekteki yazılar ve bulletlar */}
        <div className="space-y-4 md:space-y-6 text-[1.09rem] md:text-[1.11rem] text-gray-200 font-normal leading-relaxed pl-1 pr-1 md:pr-4">
          <p>
            YolcuTransferi.com, Türkiye genelinde iş ortaklarımızın lüks, VIP ve ekonomik segmentteki araçları ile güvenli ve üst düzey bir ulaşım ayrıcalığı sunar.
          </p>
          <p>
            Tüm transferler; yasal, sigortalı ve sektörde kendini kanıtlamış çözüm ortaklarımızın araç ve şoförleriyle gerçekleştirilir.  
            Havalimanı, şehir içi ve şehirler arası transferlerinizde, rezervasyon anından yolculuk sonuna kadar her adımda yanınızdayız.
          </p>
          <ul className="list-none pl-0 space-y-2">
            {[
              "Mercedes Vito, Maybach gibi lüks ve VIP seçenekler",
              "Ekonomik, aile ve grup transferleri için farklı alternatifler",
              "Her yolculuk için ekstra hizmet ve kişiselleştirilmiş seçenekler",
              "Gelişmiş online rezervasyon, hızlı ve güvenli ödeme altyapısı",
              "Tamamen yasal, sigortalı ve profesyonel hizmet ağı"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1"
                  style={{
                    width: 15,
                    height: 15,
                    display: "inline-block",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #e3b77b 60%, #bfa658 100%)",
                    marginTop: 4,
                    marginRight: 4
                  }}
                ></span>
                <span className="text-gray-300">{text}</span>
              </li>
            ))}
          </ul>
          <p>
            Tüm Türkiye’de şehirler arası veya özel VIP yolculuklarınızda, profesyonel sürücülerle, ihtiyacınıza uygun aracı anında rezerve edebilirsiniz. 
            Platformumuzda transferinizi, talep ettiğiniz hizmetlerle kişiselleştirme fırsatına da sahipsiniz.
          </p>
          <p>
            YolcuTransferi.com, her zaman yenilikçi yaklaşımıyla sektörde ilkleri sunar. Çok yakında, dron ile transfer gibi geleceğin ulaşım teknolojilerini de platformumuza eklemeyi hedefliyoruz.
          </p>
        </div>
      </div>
      {/* Büyük ve sabit Rezervasyon Butonu */}
      <div className="flex justify-center mt-6">
        <Link
          href="/rezervasyon"
          className="inline-block w-full md:w-auto px-0 md:px-20 py-4 rounded-xl text-center bg-[#bfa658] hover:bg-[#a68d53] text-black font-bold text-lg tracking-tight shadow-md transition-all duration-200"
          style={{
            fontFamily: "inherit",
            fontSize: "1.15rem"
          }}
        >
          Rezervasyon Yap
        </Link>
      </div>
    </main>
  );
}
