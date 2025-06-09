"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Başlık */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        Hakkımızda
      </h1>

      {/* Slogan */}
      <div className="text-xl md:text-2xl font-semibold text-center mb-8 text-[#bfa658] tracking-tight">
        Türkiye genelinde VIP ayrıcalık, güvenli ve lüks transfer deneyimi YolcuTransferi.com’da.
      </div>

      {/* Kutu ve içeriği */}
      <div className="border-2 border-[#bfa658] rounded-2xl bg-black/80 px-4 md:px-8 py-7 md:py-10 mb-9">
        <div className="space-y-5 text-[1.13rem] md:text-[1.15rem] text-gray-200 font-normal leading-relaxed">
          <p>
            <span className="font-semibold text-gray-100">YolcuTransferi.com</span>, iş ortaklarımızın sahip olduğu lüks, VIP ve ekonomik araçlarla, Türkiye’nin dört bir yanında güvenli, konforlu ve ayrıcalıklı transfer hizmeti sunar.
          </p>
          <p>
            Tüm transferler yasal, sigortalı ve sektörde kendini kanıtlamış iş ortaklarımızın profesyonel şoförleri ile gerçekleştirilir. Havalimanı, şehir içi veya şehirler arası transferlerinizde, rezervasyondan yolculuğun sonuna kadar her adımda yanınızdayız.
          </p>
          <ul className="pl-2 md:pl-8 mt-2 space-y-3">
            {[
              "Mercedes Vito, Maybach gibi lüks ve VIP araç seçenekleri",
              "Aile, grup ve ekonomik transfer alternatifleri",
              "Her yolculuğa özel ekstra hizmet ve kişiselleştirme imkanı",
              "Gelişmiş online rezervasyon ve güvenli ödeme altyapısı",
              "Tamamen yasal, sigortalı ve profesyonel hizmet ağı"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1"
                  style={{
                    width: 16,
                    height: 16,
                    display: "inline-block",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #e3b77b 65%, #bfa658 100%)",
                    marginTop: 3,
                    marginRight: 5,
                    flexShrink: 0
                  }}
                ></span>
                <span className="text-gray-300">{text}</span>
              </li>
            ))}
          </ul>
          <p>
            Sitemiz üzerinden ihtiyacınıza en uygun aracı ve profesyonel şoförü kolayca rezerve edebilir, transfer sürecinizi dilediğiniz gibi kişiselleştirebilirsiniz.
          </p>
          <p>
            YolcuTransferi.com, sürekli gelişen teknolojik altyapısı ve yenilikçi vizyonuyla sektörde ilkleri sunar. Yakında, dron ile transfer gibi geleceğin ulaşım çözümlerini de platformumuza entegre etmeyi hedefliyoruz.
          </p>
        </div>
      </div>
      {/* Büyük rezervasyon butonu */}
      <div className="flex justify-center mt-3">
        <Link
          href="/rezervasyon"
          className="inline-block w-full md:w-auto px-0 md:px-20 py-4 rounded-xl text-center bg-[#bfa658] hover:bg-[#a68d53] text-black font-bold text-lg tracking-tight shadow-md transition-all duration-200"
          style={{
            fontFamily: "inherit",
            fontSize: "1.18rem",
            letterSpacing: ".01em"
          }}
        >
          Rezervasyon Yap
        </Link>
      </div>
    </main>
  );
}
