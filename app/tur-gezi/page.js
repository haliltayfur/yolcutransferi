"use client";
import Image from "next/image";
import Link from "next/link";

const borderColor = "#6e5a1e";
const buttonBg = "#6e5a1e";
const buttonHover = "#8c7327";

const tours = [
  {
    title: "İstanbul VIP Şehir Turu (Araçlı)",
    description:
      "Sadece size özel, Mercedes Vito veya lüks sedan araçlarla İstanbul’un kalbinde muazzam bir gün geçirin. Rehberli tur, ikonik duraklar, ihtişamlı saraylar ve İstanbul’un gizli güzellikleri. Eşsiz bir VIP konfor, her detayı size göre.",
    price: 8450,
    discount: 18,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=85", // İstanbul
  },
  {
    title: "Kapadokya Eşsiz VIP Balon & Tur Transferi",
    description:
      "Hayatınızda bir kez yaşayacağınız, nefes kesici Kapadokya turu. VIP araçlarla tam konforlu transfer, balon kalkış alanına ayrıcalıklı ulaşım, muazzam vadilerde fotoğraf molası. Gerçekten unutulmaz bir gün.",
    price: 9600,
    discount: 17,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=85", // Kapadokya
  },
  {
    title: "Antalya Ultra Lüks Sahil & Şehir Transferi",
    description:
      "Antalya’da VIP ayrıcalık! Konyaaltı, Lara, Kaleiçi gibi noktalarda size özel Mercedes veya lüks minibüs ile, Akdeniz’in tadını elit bir deneyimle çıkarın. Tatilde üst düzey huzur ve güvenlik.",
    price: 7800,
    discount: 17,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=85", // Antalya
  },
  {
    title: "Pamukkale & Hierapolis Executive Günübirlik",
    description:
      "Pamukkale’nin beyaz travertenlerinde ve Hierapolis’in antik atmosferinde, sizin için özel tahsis edilmiş lüks araçla, rahat bir yolculuk ve tamamen kişisel bir rota. Türkiye’de bir ilk VIP hizmet standardı.",
    price: 9100,
    discount: 15,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Pamukkale_%2844716188992%29.jpg", // Pamukkale
  },
  {
    title: "Ege Koyları Arası Lüks Araç Transferi",
    description:
      "Bodrum, Alaçatı, Çeşme, Didim veya dilediğiniz Ege destinasyonu arasında, tamamen size özel şoförlü VIP araçlarla güvenli, hızlı ve ayrıcalıklı transfer. Ege’de bir adım önde, yol boyunca lüks ve konfor.",
    price: 15000,
    discount: 18,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=85", // Ege kıyı
  },
  {
    title: "Dron ile Özel Şehir Turu (Türkiye’de İlk!)",
    description:
      "Dronla görüntülü şehir turu ve özel VIP transfer hizmeti bir arada! Türkiye’de bir ilk: Hem seyahat edin, hem de yolculuğunuzun eşsiz anlarını profesyonel dron çekimleriyle ölümsüzleştirin. Sadece size özel prodüksiyon.",
    price: 12500,
    discount: 20,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=500&q=85", // Dron görüntüsü
  },
];

function oldPrice(price, discount) {
  return Math.round(price * (1 + discount / 100) / 50) * 50;
}

export default function TurGezi() {
  return (
    <main className="max-w-5xl mx-auto px-2 sm:px-6 py-7 sm:py-12">
      {/* Başlık ve açıklama */}
      <div
        className="border-4 rounded-[18px] bg-black/75 p-4 sm:p-10 shadow-2xl mb-8 sm:mb-12"
        style={{ borderColor }}
      >
        <Image
          src="/tur-gezi-banner.png"
          alt="Tur & Gezi Transferi"
          width={900}
          height={320}
          className="w-full rounded-[12px] mb-6 object-cover"
          priority
        />
        <h1
          className="text-2xl sm:text-3xl font-extrabold mb-4"
          style={{ color: borderColor, textAlign: "left" }}
        >
          Tur & Gezi Transferi
        </h1>
        <p className="mb-4 text-white font-medium text-base sm:text-lg text-left">
          Kendinize özel bir tur planı oluşturabilir veya aşağıdaki seçkin turlardan birini tercih edebilirsiniz.
        </p>
        <p className="mb-1 text-white font-normal text-base sm:text-lg text-left">
          YolcuTransferi, ekonomik ve ultra lüks transfer seçenekleriyle VIP hizmetin yeni standardını sunar. Tatil, şehir turu ve özel gezi organizasyonlarınızda, profesyonel sürücülerimiz ve geniş araç filomuzla konforlu ve güvenli ulaşım sağlıyoruz.
        </p>
      </div>
      {/* Tur grid */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {tours.map((tour, idx) => {
            const eski = oldPrice(tour.price, tour.discount);
            return (
              <div
                key={idx}
                className="border-4 rounded-2xl bg-black/80 p-5 shadow-xl flex flex-col min-w-[240px] max-w-[370px] mx-auto h-full"
                style={{ borderColor }}
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  width={220}
                  height={150}
                  className="rounded-xl mb-3 object-cover shadow-lg border-2 w-[220px] h-[150px]"
                  style={{ borderColor, objectFit: "cover" }}
                  loading="lazy"
                />
                <h3
                  className="text-xl font-bold mb-2 text-left"
                  style={{ color: borderColor, minHeight: 50 }}
                >
                  {tour.title}
                </h3>
                <p className="text-white mb-3 text-left text-[15px] leading-relaxed min-h-[56px]">
                  {tour.description}
                </p>
                {/* Fiyat Kutusu */}
                <div
                  className="flex flex-row items-end justify-start mt-auto mb-0 px-4 py-2 rounded-xl border-2"
                  style={{
                    borderColor,
                    background: "#18160c",
                    minWidth: 185,
                  }}
                >
                  <div className="flex flex-col items-start flex-1">
                    <span
                      className="text-xs text-gray-400"
                      style={{
                        textDecoration: "line-through",
                        textDecorationThickness: "1px",
                        fontWeight: 500,
                        marginBottom: 2,
                      }}
                    >
                      {eski.toLocaleString("tr-TR")} TL
                    </span>
                    <span
                      className="font-bold text-2xl"
                      style={{
                        color: borderColor,
                        letterSpacing: "0.5px",
                        lineHeight: 1.2,
                      }}
                    >
                      {tour.price.toLocaleString("tr-TR")} TL
                    </span>
                  </div>
                  <span
                    className="text-xs font-semibold ml-4 mb-1"
                    style={{
                      color: "#2de186",
                      letterSpacing: "0.2px",
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                    }}
                  >
                    %{tour.discount} indirim
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Genel rezervasyon butonu */}
      <Link href="https://yolcutransferi.com/rezervasyon">
        <button
          className="font-bold py-3 px-8 rounded-2xl w-full text-lg shadow transition mt-6"
          style={{
            background: buttonBg,
            color: "#fff",
            border: "none",
            outline: "none",
          }}
          onMouseOver={e => (e.currentTarget.style.background = buttonHover)}
          onMouseOut={e => (e.currentTarget.style.background = buttonBg)}
        >
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
