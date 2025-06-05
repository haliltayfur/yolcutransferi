"use client";
import Image from "next/image";
import Link from "next/link";

// Kurumsal renk
const corporateColor = "#6e5a1e";

const tours = [
  {
    title: "İstanbul Boğazı Turu (VIP Minibüs)",
    description:
      "Rehberli VIP araçla otelinizden alınış, Boğaz boyunca en güzel manzaralarda fotoğraf molaları, lüks konforla 6 saatlik özel tur.",
    price: "8.450 TL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7b/Bosphorus_Bridge_and_Fatih_Sultan_Mehmet_Bridge.jpg",
    tag: "En Popüler",
  },
  {
    title: "Kapadokya Balon Turu (Şoförlü Transfer)",
    description:
      "Kapadokya'nın büyülü vadilerinde, gün doğumunda balon turu ve özel araçla transfer. Eşsiz fotoğraf fırsatları.",
    price: "6.500 TL",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    tag: "En Özel",
  },
  {
    title: "Antalya Şehir Turu & D400 Sahil Rotası",
    description:
      "Kaleiçi, Konyaaltı, Lara, Duden şelalesi, D400 rotasında muhteşem Akdeniz manzaraları ile 8 saatlik şehir ve sahil gezisi.",
    price: "7.800 TL",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
    tag: "En Çok Tercih",
  },
  {
    title: "Pamukkale & Hierapolis Günübirlik Transfer",
    description:
      "Dünya mirası Pamukkale travertenleri ve Hierapolis antik kentini şoförlü araçla konforlu ziyaret. Dolu dolu bir gün.",
    price: "9.100 TL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Pamukkale_%2844716188992%29.jpg",
    tag: "En Önemli",
  },
  {
    title: "Ege Koyları VIP Sahil Turu",
    description:
      "Bodrum, Çeşme, Alaçatı, Didim ve en güzel Ege koylarında tam gün VIP sahil turu. Deniz, güneş, doğa.",
    price: "12.350 TL",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    tag: "En Lüks",
  },
  {
    title: "Efes & Şirince Kültür Turu",
    description:
      "Antik Efes şehri ve Şirince köyüne kültür gezisi, rehberli ve şoförlü transfer. Tarih ve doğa bir arada.",
    price: "7.200 TL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/Celsus_Library%2C_Ephesus%2C_Turkey.jpg",
    tag: "En Popüler",
  },
];

export default function TurGezi() {
  return (
    <main className="max-w-4xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
      {/* Başlık ve açıklama */}
      <div className="border-4 border-[#6e5a1e] rounded-[10px] bg-black/60 p-4 sm:p-10 shadow-lg mb-8 sm:mb-10">
        <Image
          src="/tur-gezi-banner.png"
          alt="Tur & Gezi Transferi"
          width={900}
          height={320}
          className="w-full rounded-[6px] mb-6 object-cover"
          priority
        />
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: corporateColor }}>
          Tur & Gezi Transferi
        </h1>
        <p className="mb-4 text-gray-200 font-medium">
          Kendinize özel bir tur planı oluşturabilir veya aşağıdaki seçkin turlardan birini tercih edebilirsiniz.
        </p>
        <p className="mb-1 text-gray-300 font-normal">
          YolcuTransferi, <span className="font-semibold" style={{ color: corporateColor }}>ekonomik</span> ve <span className="font-semibold" style={{ color: corporateColor }}>ultra lüks</span> transfer seçenekleriyle <span className="font-semibold" style={{ color: corporateColor }}>VIP hizmetin yeni standardını</span> sunar. 
          Tatil, şehir turu ve özel gezi organizasyonlarınızda, profesyonel sürücülerimiz ve geniş araç filomuzla konforlu ve güvenli ulaşım sağlıyoruz.
        </p>
      </div>

      {/* Tur kutuları */}
      <div className="mb-8 sm:mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tours.map((tour, idx) => (
            <div
              key={idx}
              className="relative border-4 border-[#6e5a1e] bg-black/70 rounded-[10px] p-4 shadow-lg flex flex-col items-center"
            >
              {/* Çapraz Bant Etiket */}
              <div className="absolute left-[-35px] top-4 rotate-[-35deg] z-10">
                <span
                  className="px-10 py-[6px] text-xs font-bold"
                  style={{
                    background: "#e4c785",
                    color: "#24221b",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px #0002",
                    letterSpacing: "1px",
                  }}
                >
                  {tour.tag}
                </span>
              </div>
              <img
                src={tour.image}
                alt={tour.title}
                width={200}
                height={200}
                className="rounded-[8px] mb-4 object-cover w-[200px] h-[200px] border border-[#e4c785] shadow-md"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
              <h3
                className="text-lg font-bold mb-1 text-center"
                style={{ color: corporateColor }}
              >
                {tour.title}
              </h3>
              <p className="text-gray-200 mb-3 text-center text-[15px] min-h-[48px]">
                {tour.description}
              </p>
              <span
                className="font-bold text-lg px-4 py-2 rounded-xl"
                style={{
                  color: corporateColor,
                  background: "#fff2",
                  letterSpacing: "0.5px",
                }}
              >
                {tour.price}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Genel rezervasyon butonu */}
      <Link href="https://yolcutransferi.com/rezervasyon">
        <button
          className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-8 rounded-xl w-full text-lg shadow transition"
        >
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
