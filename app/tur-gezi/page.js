"use client";
import Image from "next/image";
import Link from "next/link";

const tours = [
  {
    title: "İstanbul Boğazı Turu (VIP Minibüs)",
    description:
      "Lüks VIP araçlarımızla rehberli Boğaz turu, fotoğraf molası, dilediğiniz restoranda yemek. 6 saatlik özel hizmet.",
    price: "8.450 TL",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // Boğaz görseli
    tag: "En Popüler",
  },
  {
    title: "Kapadokya Balon Turu (Şoförlü Transfer)",
    description:
      "Şoförlü özel araçla balon kalkış alanına transfer ve turun bitiminde dönüş. Konforlu, güvenli ulaşım.",
    price: "6.500 TL",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80", // Kapadokya balon
    tag: "En Özel",
  },
  {
    title: "Antalya Şehir Turu & D400 Sahil Rotası",
    description:
      "Antalya merkez çıkışlı, Kaleiçi, Konyaaltı, Lara, şelaleler, Manavgat, plajlarda 8 saatlik tur.",
    price: "7.800 TL",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80", // Antalya sahil
    tag: "En Çok Tercih",
  },
  {
    title: "Pamukkale & Hierapolis Günübirlik Transfer",
    description:
      "Pamukkale travertenleri ve Hierapolis antik kent ziyareti. Giriş ve rehberlik isteğe bağlı.",
    price: "9.100 TL",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80", // Pamukkale
    tag: "En Önemli",
  },
  {
    title: "Ege Koyları VIP Sahil Turu",
    description:
      "Bodrum, Çeşme, Alaçatı, Didim gibi koylarda tam gün VIP tur. Araç ve rehber dahil.",
    price: "12.350 TL",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80", // Ege koyları
    tag: "En Lüks",
  },
];

export default function TurGezi() {
  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      {/* Üstte başlık ve açıklama */}
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

      {/* Tur kutucukları */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour, idx) => (
            <div
              key={idx}
              className="relative border-4 border-[#6e5a1e] bg-black/60 rounded-[10px] p-4 shadow-lg flex flex-col items-center"
            >
              {/* Etiket */}
              <span className="absolute left-2 top-2 bg-[#e4c785] text-black px-3 py-1 rounded-full text-xs font-bold shadow z-10">
                {tour.tag}
              </span>
              <img
                src={tour.image}
                alt={tour.title}
                width={200}
                height={200}
                className="rounded-[6px] mb-4 object-cover w-[200px] h-[200px] border border-[#e4c785]"
                style={{ objectFit: "cover" }}
              />
              <h3 className="text-base font-bold text-yellow-400 mb-2 text-center">
                {tour.title}
              </h3>
              <p className="text-gray-200 mb-2 text-center">{tour.description}</p>
              <span className="font-semibold text-lg text-[#e4c785] mt-2">
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
