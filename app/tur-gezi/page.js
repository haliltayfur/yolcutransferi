"use client";
import Image from "next/image";
import Link from "next/link";

// En çok tercih edilen turlar (güncel fiyatlar ve açıklamalar)
const tours = [
  {
    title: "İstanbul Boğazı Turu (VIP Minibüs)",
    description:
      "Lüks VIP araçlarımızla otelinizden alınış, rehberli Boğaz turu, önemli noktalarda fotoğraf molası, dilediğiniz restoranda öğle yemeği. 6 saatlik özel hizmet.",
    price: "8.450 TL",
  },
  {
    title: "Kapadokya Balon Turu (Şoförlü Transfer)",
    description:
      "Sabah erken saatlerde şoförlü özel araçla otelinizden alınış, balon kalkış alanına transfer ve turun bitiminde dönüş. Konforlu ve güvenli ulaşım.",
    price: "6.500 TL",
  },
  {
    title: "Antalya Şehir Turu & D400 Sahil Rotası",
    description:
      "Geniş araç filosuyla Antalya merkez çıkışlı; Kaleiçi, Konyaaltı, Lara, Duden şelaleleri, Manavgat ve plajlarda duraklamalı 8 saatlik tur.",
    price: "7.800 TL",
  },
  {
    title: "Pamukkale & Hierapolis Günübirlik Transfer",
    description:
      "Şoförlü araç ile otelinizden alınış, Pamukkale travertenleri ve Hierapolis antik kent ziyareti. Giriş ve rehberlik isteğe bağlı eklenir.",
    price: "9.100 TL",
  },
  {
    title: "Ege Koyları VIP Sahil Turu",
    description:
      "Bodrum, Çeşme, Alaçatı, Didim gibi popüler koylarda tam gün VIP tur. Araç ve rehber dahil, rotanız size özel hazırlanır.",
    price: "12.350 TL",
  },
];

export default function TurGezi() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Sarı kahve çerçeve içinde ana başlık ve görsel */}
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

      {/* En çok tercih edilen turlar */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#6e5a1e] mb-6">
          En Çok Tercih Edilen Turlar
        </h2>
        <div className="flex flex-col gap-7">
          {tours.map((tour, idx) => (
            <div
              key={idx}
              className="border border-[#8c7327] bg-black/50 rounded-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between shadow"
            >
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-1">
                  {tour.title}
                </h3>
                <p className="text-gray-200 mb-2">{tour.description}</p>
                <span className="block font-semibold text-lg text-[#e4c785] mb-1">
                  {tour.price}
                </span>
              </div>
              <Link
                href="https://yolcutransferi.com/rezervasyon"
                className="mt-3 md:mt-0 md:ml-8"
              >
                <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl text-lg shadow min-w-[160px]">
                  Rezervasyon Yap
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Genel rezervasyon butonu */}
      <Link href="https://yolcutransferi.com/rezervasyon">
        <button className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl w-full text-lg shadow">
          Tüm Turlar İçin Rezervasyon
        </button>
      </Link>
    </main>
  );
}
