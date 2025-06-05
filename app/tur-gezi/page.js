"use client";
import Image from "next/image";
import Link from "next/link";

// Çerçeve ve buton renkleri
const borderColor = "#6e5a1e";
const buttonBg = "#6e5a1e";
const buttonHover = "#8c7327";

const tours = [
  {
    title: "İstanbul Boğazı Lüks Tekne & VIP Araç Turu",
    description:
      "Boğaz'da özel tekne ve lüks araç ile Asya ve Avrupa yakasında 6 saat rehberli tur. Prestijli fotoğraf molaları ve boğaz yalılarında duraklama.",
    price: 8450,
    discount: 18, // %
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Kapadokya VIP Balon Deneyimi",
    description:
      "Gün doğumunda premium balon turu ve özel araç transferiyle peribacaları üzerinde büyülü uçuş. Kişiye özel fotoğraf ve kutlama.",
    price: 9600,
    discount: 17,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Antalya Lüks Sahil ve Kaleiçi Turu",
    description:
      "VIP araçla Kaleiçi, Konyaaltı ve Düden Şelalesi. Akdeniz'in en seçkin restoranlarında mola, 8 saat üst düzey şehir ve sahil keyfi.",
    price: 7800,
    discount: 17,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Pamukkale & Hierapolis Executive Günübirlik",
    description:
      "Pamukkale travertenleri ve antik Hierapolis gezisi, şoförlü Mercedes Vito ile, dilediğiniz noktadan alınıp bırakılma.",
    price: 9100,
    discount: 15,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Pamukkale_%2844716188992%29.jpg",
  },
  {
    title: "Ege Koyları Ultra Lüks Sahil Turu",
    description:
      "Bodrum, Göcek, Çeşme ve Alaçatı'da mega yat veya VIP araç ile tam gün ayrıcalık. Platin müşteri hizmeti.",
    price: 15000,
    discount: 18,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=85",
  },
  {
    title: "Efes & Şirince Premium Kültür Turu",
    description:
      "Efes antik kenti ve Şirince köyünde gurme tadımlar. VIP transfer ve özel rehber eşliğinde kültür dolu bir gün.",
    price: 7200,
    discount: 16,
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Celsus_Library%2C_Ephesus%2C_Turkey.jpg",
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
          style={{ color: borderColor }}
        >
          Tur & Gezi Transferi
        </h1>
        <p className="mb-4 text-white font-medium text-base sm:text-lg">
          Kendinize özel bir tur planı oluşturabilir veya aşağıdaki seçkin turlardan birini tercih edebilirsiniz.
        </p>
        <p className="mb-1 text-white font-normal text-base sm:text-lg">
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
                className="border-4 rounded-2xl bg-black/80 p-5 shadow-xl flex flex-col items-center min-w-[240px] max-w-[370px] mx-auto h-full"
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
                  className="text-xl font-bold mb-2 text-center"
                  style={{ color: borderColor, minHeight: 50 }}
                >
                  {tour.title}
                </h3>
                <p className="text-white mb-3 text-center text-[15px] leading-relaxed min-h-[56px]">
                  {tour.description}
                </p>
                {/* Fiyat Kutusu */}
                <div
                  className="flex flex-col items-center justify-center mt-auto mb-0 px-4 py-2 rounded-xl border-2"
                  style={{
                    borderColor,
                    background: "#18160c",
                    minWidth: 160,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-xs text-gray-400"
                      style={{
                        textDecoration: "line-through",
                        textDecorationThickness: "1px",
                        fontWeight: 500,
                        marginRight: 2,
                      }}
                    >
                      {eski.toLocaleString("tr-TR")} TL
                    </span>
                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: "#2de186",
                        letterSpacing: "0.2px",
                        fontWeight: 600,
                      }}
                    >
                      %{tour.discount} indirim
                    </span>
                  </div>
                  <span
                    className="font-bold text-2xl"
                    style={{
                      color: borderColor,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {tour.price.toLocaleString("tr-TR")} TL
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
