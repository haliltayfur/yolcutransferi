"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Hakkımızda
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Türkiye genelinde VIP ayrıcalık, güvenli ve lüks transfer deneyimi YolcuTransferi.com’da.
        </div>
        
        {/* İçerik tek tip, düzenli ve sola yaslı */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            <span className="font-semibold text-gray-100">YolcuTransferi.com</span>, iş ortaklarımızın sahip olduğu lüks, VIP ve ekonomik araçlarla, Türkiye’nin dört bir yanında güvenli, konforlu ve ayrıcalıklı transfer hizmeti sunar.
          </p>
          <p>
            Tüm transferler yasal, sigortalı ve sektörde kendini kanıtlamış iş ortaklarımızın profesyonel şoförleri ile gerçekleştirilir. Havalimanı, şehir içi veya şehirler arası transferlerinizde, rezervasyondan yolculuğun sonuna kadar her adımda yanınızdayız.
          </p>
          <ul className="pl-5 mt-2 space-y-2">
            {[
              "Mercedes Vito, Maybach gibi lüks ve VIP Araç Seçenekleri",
              "Kurumsal Misafirleri, Aile, Grup ve Ekonomik Transfer Alternatifleri",
              "Her Yolculuğa Özel Ekstra Hizmet ve Kişiselleştirme İmkanı",
              "Gelişmiş Online Rezervasyon ve Güvenli ödeme altyapısı",
              "Güvenli, Sigortalı ve Profesyonel hizmet ağı"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1"
                  style={{
                    width: 13,
                    height: 13,
                    display: "inline-block",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, #e3b77b 65%, #bfa658 100%)",
                    marginTop: 5,
                    flexShrink: 0
                  }}
                ></span>
                <span className="text-[#ffeec2]">{text}</span>
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

        {/* Premium stil buton */}
        <div className="flex justify-start mt-10">
          <Link
            href="/rezervasyon"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Rezervasyon Yap
          </Link>
        </div>
      </section>
    </main>
  );
}
