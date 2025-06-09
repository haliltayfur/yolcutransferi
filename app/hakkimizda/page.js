"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Başlık - Diğer sayfalarla aynı */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#e3b77b] mb-8 tracking-tight">
        Hakkımızda
      </h1>

      {/* Slogan */}
      <div className="text-xl md:text-2xl font-semibold text-center mb-9"
        style={{
          color: "#ccb17a",
          letterSpacing: ".01em",
          textShadow: "0 1px 8px #2c1c0c44"
        }}>
        Tüm Türkiye’de ayrıcalıklı, lüks ve güvenli transfer deneyimi YolcuTransferi.com’da.
      </div>

      {/* İçerik */}
      <section className="bg-[#181817]/90 border border-[#c8ad8a55] rounded-2xl shadow-xl px-4 md:px-9 py-8 md:py-11 text-[1.08rem] md:text-lg text-gray-200 space-y-6 leading-relaxed font-normal">

        <p className="text-left md:text-justify">
          <b className="font-bold text-gray-100">YolcuTransferi.com</b>, Türkiye çapında lüks ulaşım anlayışını yeniden tanımlayan öncü bir transfer platformudur.  
          İstanbul’dan Antalya’ya, Ege sahillerinden Anadolu’nun kalbine kadar, seçkin VIP ve prestijli segmentten ekonomik alternatiflere kadar, ihtiyaçlarınıza göre şekillenen bir yolculuk sunuyoruz.
        </p>

        <p className="text-left md:text-justify">
          Her rezervasyonda, beklentileri yüksek misafirlerimizin konforunu ve güvenliğini önceleyen, yasal ve sigortalı iş ortaklarımızdan özenle seçilmiş araç ve şoförler ile çalışıyoruz.
        </p>

        <p className="text-left md:text-justify">
          Lüks segmentte rakipsiz portföyümüzle, Mercedes Vito, Sprinter, Maybach gibi yüksek standart araçlar; talep edenler için sedan, ekonomik ve aile seçenekleriyle de hizmet veriyoruz. 
        </p>

        <ul className="pl-5 md:pl-8 mt-1 space-y-2">
          {[
            "Her yolculuğa özel ekstra talepler (karşılama, rehberlik, ikram ve daha fazlası)",
            "7/24 online rezervasyon ve akıllı dijital takip sistemi",
            "Tüm Türkiye’de hızlı, şeffaf ve güvenli transfer",
            "Gelişmiş online ödeme ve rezervasyon kolaylığı"
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2 text-[1.04rem] md:text-base">
              <span className="mt-1 flex-shrink-0"
                style={{
                  width: 17,
                  height: 17,
                  display: "inline-block",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #d2a768 45%, #aa8652 100%)",
                  boxShadow: "0 0 3px #b48a4a88"
                }}></span>
              <span className="text-gray-300">{text}</span>
            </li>
          ))}
        </ul>

        <p className="text-left md:text-justify">
          Sitemiz, her transferi tek noktada yönetmenizi sağlayan <b>akıllı bir altyapı</b> ile donatıldı. Transfer rezervasyonlarınızı hızlıca tamamlayabilir, ödemenizi güvenle yapabilirsiniz.  
          Aracınız ve hizmetiniz, sektörde kendini kanıtlamış iş ortaklarımız tarafından titizlikle sağlanır.
        </p>

        <p className="text-left md:text-justify">
          YolcuTransferi.com; turizm ve taşımacılık sektöründeki onlarca firmayı, aracıları ve yeni nesil teknolojiyi buluşturan vizyoner bir platformdur.  
          Yakında, transfer ve taşımacılıkta “geleceğin teknolojileriyle” deneyiminizi daha da ileriye taşıyacağız.
        </p>
      </section>

      {/* Rezervasyon Butonu */}
      <div className="flex justify-center mt-10">
        <Link
          href="/rezervasyon"
          className="inline-block px-8 py-3 rounded-2xl bg-gradient-to-r from-[#e3b77b] via-[#c7a062] to-[#9e7c45] text-black font-bold text-lg shadow-lg hover:scale-[1.04] transition">
          Rezervasyon Yap
        </Link>
      </div>
    </main>
  );
}
