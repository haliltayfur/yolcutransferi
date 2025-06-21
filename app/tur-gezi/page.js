"use client";
import Image from "next/image";
import Link from "next/link";

const tours = [
  {
    title: "İstanbul VIP Şehir Turu (Araçlı)",
    description:
      "Sadece size özel, Mercedes Vito veya lüks sedan araçlarla İstanbul’un kalbinde muazzam bir gün geçirin. Rehberli tur, ikonik duraklar, ihtişamlı saraylar ve İstanbul’un gizli güzellikleri. Eşsiz bir VIP konfor, her detayı size göre.",
    price: 8450,
    discount: 18,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Kapadokya Eşsiz VIP Balon & Tur Transferi",
    description:
      "Hayatınızda bir kez yaşayacağınız, nefes kesici Kapadokya turu. VIP araçlarla tam konforlu transfer, balon kalkış alanına ayrıcalıklı ulaşım, muazzam vadilerde fotoğraf molası. Gerçekten unutulmaz bir gün.",
    price: 9600,
    discount: 17,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Antalya Ultra Lüks Sahil & Şehir Transferi",
    description:
      "Antalya’da VIP ayrıcalık! Konyaaltı, Lara, Kaleiçi gibi noktalarda size özel Mercedes veya lüks minibüs ile, Akdeniz’in tadını elit bir deneyimle çıkarın. Tatilde üst düzey huzur ve güvenlik.",
    price: 7800,
    discount: 17,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Pamukkale & Hierapolis Executive Günübirlik",
    description:
      "Pamukkale’nin beyaz travertenlerinde ve Hierapolis’in antik atmosferinde, sizin için özel tahsis edilmiş lüks araçla, rahat bir yolculuk ve tamamen kişisel bir rota. Türkiye’de bir ilk VIP hizmet standardı.",
    price: 9100,
    discount: 15,
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Pamukkale_%2844716188992%29.jpg",
  },
  {
    title: "Ege Koyları Arası Lüks Araç Transferi",
    description:
      "Bodrum, Alaçatı, Çeşme, Didim veya dilediğiniz Ege destinasyonu arasında, tamamen size özel şoförlü VIP araçlarla güvenli, hızlı ve ayrıcalıklı transfer. Ege’de bir adım önde, yol boyunca lüks ve konfor.",
    price: 15000,
    discount: 18,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=85",
  },
  {
    title: "Dron ile Özel Şehir Turu (Türkiye’de İlk!)",
    description:
      "Dronla görüntülü şehir turu ve özel VIP transfer hizmeti bir arada! Türkiye’de bir ilk: Hem seyahat edin, hem de yolculuğunuzun eşsiz anlarını profesyonel dron çekimleriyle ölümsüzleştirin. Sadece size özel prodüksiyon.",
    price: 12500,
    discount: 20,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=700&q=85",
  },
];

function oldPrice(price, discount) {
  return Math.round(price * (1 + discount / 100) / 50) * 50;
}

export default function TurGezi() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <Image
          src="/tur-gezi-banner.png"
          alt="Tur & Gezi Transferi"
          width={900}
          height={320}
          className="w-full rounded-[12px] mb-6 object-cover"
          priority
        />
        <h1 className="text-3xl font-extrabold text-[#bfa658] mb-4">Tur & Gezi Transferi</h1>
        <p className="mb-5 text-[#ecd9aa] text-base sm:text-lg">
          YolcuTransferi ile dilediğiniz tur rotasını oluşturabilir veya aşağıdaki seçkin turlardan birini tercih edebilirsiniz. Ekonomik ve ultra lüks transfer seçenekleriyle, tatil, şehir turu ve özel gezi organizasyonlarınızda VIP hizmetin yeni standardını sunuyoruz.
        </p>
        <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour, idx) => {
            const eski = oldPrice(tour.price, tour.discount);
            return (
              <div
                key={idx}
                className="border-4 rounded-2xl bg-black/80 p-4 shadow-xl flex flex-col h-full"
                style={{ borderColor: "#bfa658" }}
              >
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="h-[150px] w-full max-w-[400px] rounded-xl object-cover mx-auto mb-4 border-2"
                  style={{ borderColor: "#bfa658" }}
                />
                <h3 className="text-xl font-bold mb-2" style={{ color: "#bfa658" }}>
                  {tour.title}
                </h3>
                <p className="text-[#ecd9aa] mb-3 text-[15px] leading-relaxed">{tour.description}</p>
                <div className="flex flex-row items-end mt-auto mb-0 px-4 py-2 rounded-xl border-2" style={{
                  borderColor: "#bfa658",
                  background: "#18160c",
                  minWidth: 185,
                }}>
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
                        color: "#bfa658",
                        letterSpacing: "0.5px",
                        lineHeight: 1.2,
                      }}
                    >
                      {tour.price.toLocaleString("tr-TR")} TL
                    </span>
                  </div>
                  <span className="text-xs font-semibold ml-4 mb-1" style={{
                    color: "#2de186",
                    letterSpacing: "0.2px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}>
                    %{tour.discount} indirim
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <Link href="/rezervasyon">
          <button className="bg-[#bfa658] hover:bg-[#e6d199] text-black font-bold py-3 px-8 rounded-xl mt-5 w-full text-lg shadow transition">
            Rezervasyon Yap
          </button>
        </Link>
      </section>
    </main>
  );
}
