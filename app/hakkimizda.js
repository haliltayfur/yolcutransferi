import Image from "next/image";

export default function HakkimizdaPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Hakkımızda
        </h1>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex-1">
            <p className="text-gray-200 text-lg mb-4">
              <b>YolcuTransferi.com</b> olarak amacımız; Türkiye’de VIP taşımacılığı yeni nesil bir dijital altyapıyla birleştirerek, misafirlerimize en güvenli, konforlu ve prestijli yolculuk deneyimini sunmaktır.  
              Lüks araç filomuz, uzman şoförlerimiz ve online rezervasyon sistemimiz ile <span className="text-gold">7/24 ulaşılabilir</span> bir transfer çözümü sağlıyoruz.
            </p>
            <ul className="text-gray-100 mb-4 space-y-2 text-base pl-5 list-disc">
              <li><b>Yüzde 100 dijital</b> ve şeffaf fiyatlandırma</li>
              <li><b>VIP, lüks ve ekonomik</b> araç seçenekleri</li>
              <li>Her yolculukta <b>TURSAB ve sigorta güvencesi</b></li>
              <li><b>İnsan odaklı, hızlı ve çözümcü</b> müşteri desteği</li>
              <li>Dijital çağın gereksinimlerine uygun <b>teknolojik altyapı</b></li>
            </ul>
            <p className="text-gray-400 text-sm mb-2">
              İstanbul, Ankara, İzmir, Antalya ve Türkiye'nin dört bir yanında <b>kurumsal ve bireysel</b> müşterilerimiz için özel çözümler sunuyoruz.  
              YolcuTransferi.com; konfor, güven ve ayrıcalığın yeni adresi!
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <Image
              src="/logo-vip.png"
              alt="YolcuTransferi Logo"
              width={120}
              height={120}
              className="mb-4"
            />
            <Image
              src="/maybach.jpg"
              alt="VIP Maybach"
              width={220}
              height={120}
              className="rounded-xl border border-gold object-cover"
              style={{ background: "#232323" }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
