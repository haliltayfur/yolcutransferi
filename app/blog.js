"use client";

const BLOG = [
  {
    baslik: "YolcuTransferi.com Artık 7/24 Hizmetinizde!",
    tarih: "2025-05-28",
    icerik: `Türkiye'nin her yerinden anında online rezervasyon, WhatsApp destek ve anlık fiyatlandırma ile artık gece-gündüz yanınızdayız.`
  },
  {
    baslik: "Dron Transferi İçin Erken Rezervasyon Fırsatı",
    tarih: "2025-05-20",
    icerik: `Şehir içi ve şehirler arası hava transferi çok yakında başlıyor! Demo talebi oluşturmak için rezervasyon formundan "Dron Transferi" seçeneğini seçin.`
  },
  {
    baslik: "Kurumsal Transferlerde Yüzde 15 İndirim!",
    tarih: "2025-05-15",
    icerik: `Aylık veya yıllık sözleşmeli VIP taşımacılık hizmeti alan tüm şirketlere avantajlı fiyatlar. Detaylar için iletişime geçin.`
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Blog & Duyurular
        </h1>
        <div className="flex flex-col gap-7">
          {BLOG.map((yazi, idx) => (
            <div
              key={idx}
              className="bg-black/60 border border-gold/30 rounded-lg p-6 shadow hover:scale-[1.01] transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-bold text-gold">{yazi.baslik}</div>
                <div className="text-xs text-gray-400">{yazi.tarih}</div>
              </div>
              <div className="text-gray-200 text-base">{yazi.icerik}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
