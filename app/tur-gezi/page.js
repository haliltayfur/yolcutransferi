"use client";
import Image from "next/image";
import Link from "next/link";

// Tur verileri
const tours = [
  {
    title: "İstanbul Boğazı Turu (VIP Minibüs)",
    description:
      "Lüks VIP araçlarımızla otelinizden alınış, rehberli Boğaz turu, önemli noktalarda fotoğraf molası, dilediğiniz restoranda öğle yemeği. 6 saatlik özel hizmet.",
    price: "8.450 TL",
    image: "/images/bosphorus-tour.jpg", // Görsel dosyasını projenize ekleyin
  },
  {
    title: "Kapadokya Balon Turu (Şoförlü Transfer)",
    description:
      "Sabah erken saatlerde şoförlü özel araçla otelinizden alınış, balon kalkış alanına transfer ve turun bitiminde dönüş. Konforlu ve güvenli ulaşım.",
    price: "6.500 TL",
    image: "/images/cappadocia-balloon.jpg",
  },
  {
    title: "Antalya Şehir Turu & D400 Sahil Rotası",
    description:
      "Geniş araç filosuyla Antalya merkez çıkışlı; Kaleiçi, Konyaaltı, Lara, Duden şelaleleri, Manavgat ve plajlarda duraklamalı 8 saatlik tur.",
    price: "7.800 TL",
    image: "/images/antalya-d400.jpg",
  },
  {
    title: "Pamukkale & Hierapolis Günübirlik Transfer",
    description:
      "Şoförlü araç ile otelinizden alınış, Pamukkale travertenleri ve Hierapolis antik kent ziyareti. Giriş ve rehberlik isteğe bağlı eklenir.",
    price: "9.100 TL",
    image: "/images/pamukkale-hierapolis.jpg",
  },
  {
    title: "Ege Koyları VIP Sahil Turu",
    description:
      "Bodrum, Çeşme, Alaçatı, Didim gibi popüler koylarda tam gün VIP tur. Araç ve rehber dahil, rotanız size özel hazırlanır.",
    price: "12.350 TL",
    image: "/images/aegean-coast.jpg",
  },
];

export default function TurGezi() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Ana başlık ve açıklama */}
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-6 md:p-10 shadow-lg mb-10">
        <Image
          src="/tur-gezi-banner.png"
          alt="Tur & Gezi Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#6e5a1e] mb-4">
          Tur & Gezi Transferi
        </h1>
        <p className="mb-6 text-gray-200">
          Tatil, şehir turu ve özel gezi organizasyonlarınızda, profesyonel sürücülerimiz ve geniş araç filomuzla konforlu ve güvenli ulaşım sağlıyoruz.
          Tur programına uygun, saatlik veya tam gün transfer seçenekleriyle her an yanınızdayız.
        </p>
        <p className="text-gray-300">
          Diğer firmalardan farklı olarak; kişiye özel rehberlik, VIP minibüs ve lüks sedan seçenekleri, hızlı rezervasyon ve iptal kolaylığı sunuyoruz.
        </p>
      </div>

      {/* Tur kartları */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#6e5a1e] mb-6">
          En Çok Tercih Edilen Turlar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour, idx) => (
            <div
              key={idx}
              className="border-4 border-[#6e5a1e] bg-black/60 rounded-[10px] p-4 shadow-lg flex flex-col items-center"
            >
              <Image
                src={tour.image}
                alt={tour.title}
                width={300}
                height={300}
                className="rounded-[6px] mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-yellow-400 mb-2 text-center">
                {tour.title}
              </h3>
              <p className="text-gray-200 mb-2 text-center">{tour.description}</p>
              <span className="font-semibold text-lg text-[#e4c785]">
                {tour.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Genel rezervasyon butonu */}
      <Link href="https://yolcutransferi.com/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl w-full text-lg shadow">
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
