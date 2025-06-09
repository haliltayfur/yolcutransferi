"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Başlık */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#e3b77b] mb-8 tracking-tight">
        Hakkımızda
      </h1>

      {/* Slogan */}
      <div className="text-xl md:text-2xl font-semibold text-center mb-9"
        style={{
          color: "#b8996c",
          letterSpacing: ".01em"
        }}>
        Tüm Türkiye’de eşsiz bir transfer ayrıcalığı YolcuTransferi.com’da.
      </div>

      {/* İçerik */}
      <section className="bg-[#181817]/90 border border-[#c8ad8a55] rounded-2xl shadow-xl px-4 md:px-9 py-8 md:py-11 text-[1.08rem] md:text-lg text-gray-200 space-y-6 leading-relaxed font-normal">
        <p className="text-left md:text-justify">
          <b className="font-bold text-gray-100">YolcuTransferi.com</b>, transfer ve taşımacılık sektöründe iş ortaklarımızın sahip olduğu lüks, VIP ve ekonomik araçlarla, Türkiye genelinde güvenli ve kurumsal ulaşım deneyimi sunar.
        </p>
        <p className="text-left md:text-justify">
          Sitemiz aracılığıyla, sektörün önde gelen iş ortaklarının yasal ve sigortalı araçlarına ve profesyonel şoförlerine tek bir noktadan ulaşabilir; ister havalimanı ister şehir içi veya şehirler arası transferlerinizde sorunsuz ve hızlı rezervasyon yapabilirsiniz.
        </p>
        <ul className="pl-5 md:pl-8 mt-1 space-y-2">
          <li className="flex items-start gap-2 text-[1.04rem] md:text-base">
            <span className="mt-1 flex-shrink-0"
              style={{
                width: 17,
                height: 17,
                display: "inline-block",
                borderRadius: "50%",
                background: "radial-gradient(circle, #d2a768 45%, #aa8652 100%)",
                boxShadow: "0 0 3px #b48a4a88"
              }}></span>
            <span className="text-gray-300">Her bütçeye ve ihtiyaca uygun, yasal ve güvenli transfer çözümleri</span>
          </li>
          <li className="flex items-start gap-2 text-[1.04rem] md:text-base">
            <span className="mt-1 flex-shrink-0"
              style={{
                width: 17,
                height: 17,
                display: "inline-block",
                borderRadius: "50%",
                background: "radial-gradient(circle, #d2a768 45%, #aa8652 100%)",
                boxShadow: "0 0 3px #b48a4a88"
              }}></span>
            <span className="text-gray-300">Online rezervasyon, akıllı altyapı, hızlı ve kolay ödeme</span>
          </li>
          <li className="flex items-start gap-2 text-[1.04rem] md:text-base">
            <span className="mt-1 flex-shrink-0"
              style={{
                width: 17,
                height: 17,
                display: "inline-block",
                borderRadius: "50%",
                background: "radial-gradient(circle, #d2a768 45%, #aa8652 100%)",
                boxShadow: "0 0 3px #b48a4a88"
              }}></span>
            <span className="text-gray-300">Kişiselleştirilebilen ekstra hizmet seçenekleriyle VIP transfer ayrıcalığı</span>
          </li>
        </ul>
        <p className="text-left md:text-justify">
          Transferde standartları yükseltmek ve sektöre yeni bir vizyon kazandırmak için sürekli gelişen teknolojimizle, rezervasyon sürecinizde ve yolculuğunuzda maksimum konfor sağlıyoruz.
        </p>
        <p className="text-left md:text-justify">
          Çok yakında, dron ile transfer gibi geleceğin ulaşım teknolojilerini de sistemimize entegre ederek sektörde ilkleri sunmaya hazırlanıyoruz.
        </p>
      </section>

      {/* Rezervasyon Butonu (birebir aynı style, sehirler-arasi sayfasıyla aynı!) */}
      <div className="flex justify-center mt-10">
        <Link
          href="/rezervasyon"
          className="inline-block px-12 py-3 md:px-16 md:py-3 rounded-3xl bg-gradient-to-r from-[#e3b77b] via-[#c7a062] to-[#9e7c45] text-black font-bold text-lg shadow-lg hover:scale-105 transition-all duration-200 tracking-tight"
          style={{
            fontFamily: "inherit",
            letterSpacing: ".01em",
          }}>
          Rezervasyon Yap
        </Link>
      </div>
    </main>
  );
}
