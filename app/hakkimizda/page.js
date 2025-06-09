"use client";

export default function Hakkimizda() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 md:py-16">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-7 text-center" style={{ color: "#e3b77b" }}>
        Hakkımızda
      </h2>
      {/* Slogan */}
      <div
        className="font-semibold text-xl md:text-2xl mb-8 text-center"
        style={{ color: "#c9aa80" }} // bakır-gümüş arası
      >
        Türkiye’nin dört bir yanında, her bütçeye ve beklentiye uygun VIP transfer artık tek tık uzağınızda.
      </div>
      <section className="bg-[#181817]/80 border border-[#b48c5c44] rounded-xl shadow-lg px-4 md:px-10 py-7 md:py-10 text-[1.07rem] md:text-lg text-gray-200 space-y-5 md:space-y-7 leading-relaxed font-normal">
        <p className="md:indent-4 text-left md:text-justify">
          <b className="font-bold text-gray-100">YolcuTransferi.com</b>, Türkiye'nin tüm illerinde, lüks VIP’den ekonomik segmente kadar farklı araç seçenekleriyle her ihtiyaca uygun transfer çözümleri sunar.
        </p>
        <p className="md:indent-4 text-left md:text-justify">
          Tüm hizmetlerimiz yasal, sigortalı ve sektördeki deneyimli iş ortaklarımız tarafından sağlanır. Müşteri odaklı teknolojik altyapımızla transfer sürecinizi kolay, güvenli ve hızlı hale getiriyoruz.
        </p>
        <p className="md:indent-4 text-left md:text-justify">
          İster iş, ister turistik, ister özel günler için; profesyonel sürücüler eşliğinde, isteğe bağlı ekstra hizmet seçenekleriyle yolculuğunuzu kişiselleştiriyoruz.
        </p>
        <p className="md:indent-4 text-left md:text-justify">
          Sitemiz üzerinden yapacağınız rezervasyonlarda, ihtiyacınıza en uygun aracı ve deneyimli iş ortağımızı sizin için rezerve ediyoruz.
        </p>
        {/* Şık bullet'lar */}
        <ul className="pl-2 md:pl-6 mt-1 space-y-2">
          {[
            "Lüks, VIP ve ekonomik transfer alternatifleri",
            "İsteğe bağlı ekstra hizmetler",
            "Türkiye genelinde hızlı ve kolay rezervasyon",
            "Tamamen yasal, sigortalı ve güvenli yolculuk"
          ].map((text, i) => (
            <li key={i} className="flex items-start gap-2 text-[1.04rem] md:text-base">
              <span
                className="mt-1 flex-shrink-0"
                style={{
                  width: 19,
                  height: 19,
                  display: "inline-block",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #e7c99a 50%, #8c7150 100%)",
                  boxShadow: "0 0 4px #cba35b99",
                  marginRight: 8,
                  marginTop: 2
                }}
              ></span>
              <span className="text-gray-300">{text}</span>
            </li>
          ))}
        </ul>
        <p className="md:indent-4 text-left md:text-justify">
          YolcuTransferi.com; yolculara ve sektörün iş ortaklarına değer katan, yenilikçi ve vizyoner bir platformdur.  
          Çok yakında hayata geçireceğimiz yeni nesil teknolojiler ve güçlü iş birliklerimizle, transfer deneyimini geleceğe taşıyoruz.
        </p>
      </section>
    </main>
  );
}
