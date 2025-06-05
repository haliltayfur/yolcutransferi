"use client";
import Image from "next/image";
import Link from "next/link";

// Orijinal çerçeve ve buton renk kodları
const borderColor = "#6e5a1e"; // Sarı kahve (tüm kutularda)
const buttonBg = "#6e5a1e";
const buttonHover = "#8c7327";

const tours = [
  {
    title: "İstanbul Boğazı Tekne & VIP Araç Turu",
    description:
      "Boğazın iki yakasında, lüks araç ve özel tekneyle, köprü altlarından geçiş ve boğaz villalarında duraklama. 6 saatlik rehberli VIP tur.",
    price: 8450,
    image:
      "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?auto=format&fit=crop&w=600&q=90",
  },
  {
    title: "Kapadokya VIP Balon Deneyimi",
    description:
      "Gün doğumunda premium balon turu ve özel araç transferiyle peribacaları üzerinde büyülü uçuş. Kişiye özel fotoğraf fırsatları.",
    price: 9600,
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=90",
  },
  {
    title: "Antalya Lüks Sahil ve Şehir Turu",
    description:
      "VIP araçla Kaleiçi, Konyaaltı, Lara plajı ve Düden şelalesi. Akdeniz'in en seçkin restoranlarında mola, 8 saat üst düzey şehir keyfi.",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=90",
  },
  {
    title: "Pamukkale & Hierapolis Executive Günübirlik",
    description:
      "Pamukkale travertenleri ve antik Hierapolis gezisi, şoförlü Mercedes Vito ile, dilediğiniz noktadan alınıp bırakılma.",
    price: 9100,
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=90",
  },
  {
    title: "Ege Koyları Ultra Lüks Sahil Turu",
    description:
      "Bodrum, Göcek, Çeşme, Alaçatı ve seçkin koylarda mega yat veya VIP araç ile tam gün ayrıcalık. Platin müşteri hizmeti.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=90",
  },
  {
    title: "Efes & Şirince Premium Kültür Turu",
    description:
      "Efes harabeleri, Celsus kütüphanesi ve Şirince köyünde gurme tadımlar. VIP transfer ve özel rehber eşliğinde.",
    price: 7200,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/Celsus_Library%2C_Ephesus%2C_Turkey.jpg",
  },
];

function calcOldPrice(price) {
  return Math.round(price * 1.20 / 50) * 50; // 20% fazla, yukarıya 50'lik yuvarla
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
        <p className="mb-4 text-gray-100 font-medium text-base sm:text-lg">
          Kendinize özel bir tur planı oluşturabilir veya aşağıdaki seçkin turlardan birini tercih edebilirsiniz.
        </p>
        <p className="mb-1 text-gray-300 font-normal text-base sm:text-lg">
          YolcuTransferi, <span className="font-semibold" style={{ color: borderColor }}>ekonomik</span> ve <span className="font-semibold" style={{ color: borderColor }}>ultra lüks</span> transfer seçenekleriyle <span className="font-semibold" style={{ color: borderColor }}>VIP hizmetin yeni standardını</span> sunar. Tatil, şehir turu ve özel gezi organizasyonlarınızda, profesyonel sürücülerimiz ve geniş araç filomuzla konforlu ve güvenli ulaşım sağlıyoruz.
        </p>
      </div>
      {/* Tur grid */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {tours.map((tour, idx) => (
            <div
              key={idx}
              className="border-4 rounded-2xl bg-black/80 p-5 shadow-xl flex flex-col items-center min-w-[240px] max-w-[370px] mx-auto"
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
                style={{ color: borderColor }}
              >
                {tour.title}
              </h3>
              <p className="text-gray-200 mb-3 text-center text-[15px] leading-relaxed min-h-[56px]">
                {tour.description}
              </p>
              <div className="flex flex-col items-center gap-1">
                <span
                  className="line-through text-gray-400 text-[16px]"
                  style={{
                    letterSpacing: "0.2px",
                  }}
                >
                  {calcOldPrice(tour.price).toLocaleString("tr-TR")} TL
                </span>
                <span
                  className="font-bold text-xl px-5 py-2 rounded-xl"
                  style={{
                    color: borderColor,
                    background: "#fff2",
                    letterSpacing: "0.5px",
                  }}
                >
                  {tour.price.toLocaleString("tr-TR")} TL
                </span>
              </div>
            </div>
          ))}
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
