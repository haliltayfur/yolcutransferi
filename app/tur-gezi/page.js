"use client";
import Image from "next/image";
import Link from "next/link";

const tours = [
  {
    title: "İstanbul Boğazı Tekne & VIP Araç Turu",
    description:
      "Boğazın iki yakasında, lüks araç ve özel tekneyle, köprü altlarından geçiş ve boğaz villalarında duraklama. Rehberli fotoğraf molaları, 6 saatlik prestijli tur.",
    price: "8.450 TL",
    image:
      "https://images.unsplash.com/photo-1508704019882-f9cf40e475b4?auto=format&fit=crop&w=600&q=90",
    tag: "En Popüler",
  },
  {
    title: "Kapadokya VIP Balon Deneyimi",
    description:
      "Gün doğumunda, premium balon turu ve özel araç transferiyle peribacaları üzerinde büyülü uçuş. Kişiye özel fotoğraf & şampanya seremonisi.",
    price: "9.600 TL",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=600&q=90",
    tag: "En Özel",
  },
  {
    title: "Antalya Lüks Sahil ve Şehir Turu",
    description:
      "VIP araçla Kaleiçi, Konyaaltı, Lara plajı ve Düden şelalesi. Akdeniz'in en seçkin restoranlarında mola, 8 saat üst düzey şehir keyfi.",
    price: "7.800 TL",
    image:
      "https://images.unsplash.com/photo-1454023492550-5696f8ff10e1?auto=format&fit=crop&w=600&q=90",
    tag: "En Çok Tercih",
  },
  {
    title: "Pamukkale & Hierapolis Executive Günübirlik",
    description:
      "Beyaz travertenlerde yavaş yürüyüş, antik Hierapolis gezisi, şoförlü Mercedes Vito ile, dilediğiniz noktadan alınıp bırakılma.",
    price: "9.100 TL",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=90",
    tag: "En Prestijli",
  },
  {
    title: "Ege Koyları Ultra Lüks Sahil Turu",
    description:
      "Bodrum, Göcek, Çeşme, Alaçatı ve en seçkin koylarda mega yat veya VIP araç ile tam gün ayrıcalık. Platin müşteri hizmeti.",
    price: "15.000 TL",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=90",
    tag: "En Lüks",
  },
  {
    title: "Efes & Şirince Premium Kültür Turu",
    description:
      "Dünya mirası Efes harabeleri, Celsus kütüphanesi, Şirince köyünde gurme şarap tadımı. VIP transfer ve özel rehber eşliğinde.",
    price: "7.200 TL",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e7/Celsus_Library%2C_Ephesus%2C_Turkey.jpg",
    tag: "En Seçkin",
  },
];

export default function TurGezi() {
  return (
    <main className="max-w-5xl mx-auto px-2 sm:px-6 py-7 sm:py-12">
      {/* Başlık ve açıklama */}
      <div className="border-4 border-[#bfa760] rounded-[18px] bg-black/75 p-4 sm:p-10 shadow-2xl mb-8 sm:mb-12">
        <Image
          src="/tur-gezi-banner.png"
          alt="Tur & Gezi Transferi"
          width={900}
          height={320}
          className="w-full rounded-[12px] mb-6 object-cover"
          priority
        />
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: "#bfa760" }}>
          Tur & Gezi Transferi
        </h1>
        <p className="mb-4 text-gray-100 font-medium text-base sm:text-lg">
          Kendinize özel bir tur planı oluşturabilir veya aşağıdaki seçkin turlardan birini tercih edebilirsiniz.
        </p>
        <p className="mb-1 text-gray-300 font-normal text-base sm:text-lg">
          YolcuTransferi, <span className="font-semibold" style={{ color: "#bfa760" }}>ekonomik</span> ve <span className="font-semibold" style={{ color: "#bfa760" }}>ultra lüks</span> transfer seçenekleriyle <span className="font-semibold" style={{ color: "#bfa760" }}>VIP hizmetin yeni standardını</span> sunar. Tatil, şehir turu ve özel gezi organizasyonlarınızda, profesyonel sürücülerimiz ve geniş araç filomuzla konforlu ve güvenli ulaşım sağlıyoruz.
        </p>
      </div>
      {/* Tur grid */}
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {tours.map((tour, idx) => (
            <div
              key={idx}
              className="relative border-4 border-[#bfa760] bg-black/80 rounded-2xl p-5 shadow-xl flex flex-col items-center min-w-[240px] max-w-[370px] mx-auto"
            >
              {/* Çapraz Bant Etiket */}
              <div className="absolute top-6 left-[-40px] rotate-[-24deg] z-20">
                <span
                  className="px-8 py-1 text-xs font-extrabold"
                  style={{
                    background: "#bfa760",
                    color: "#2b210d",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px #0004",
                    letterSpacing: "1.5px",
                    border: "2px solid #fff",
                  }}
                >
                  {tour.tag}
                </span>
              </div>
              {/* Görsel */}
              <img
                src={tour.image}
                alt={tour.title}
                width={220}
                height={150}
                className="rounded-xl mb-3 object-cover shadow-lg border-2 border-[#bfa760] w-[220px] h-[150px]"
                style={{ objectFit: "cover" }}
                loading="lazy"
              />
              {/* Başlık */}
              <h3
                className="text-xl font-bold mb-2 text-center"
                style={{ color: "#bfa760" }}
              >
                {tour.title}
              </h3>
              {/* Açıklama */}
              <p className="text-gray-200 mb-3 text-center text-[15px] leading-relaxed min-h-[56px]">
                {tour.description}
              </p>
              {/* Fiyat */}
              <span
                className="font-bold text-xl px-5 py-2 rounded-xl bg-black/50 border border-[#bfa760] mt-1"
                style={{
                  color: "#bfa760",
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
          className="bg-[#bfa760] hover:bg-[#cfa930] text-black font-bold py-3 px-8 rounded-2xl w-full text-lg shadow transition mt-6"
        >
          Rezervasyon Yap
        </button>
      </Link>
    </main>
  );
}
