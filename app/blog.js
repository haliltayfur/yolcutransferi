export default function Blog() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">Blog & Duyurular</h1>
      <div className="space-y-8">
        <article className="bg-black/60 rounded-xl p-6 shadow">
          <h2 className="text-2xl text-gold font-semibold mb-2">VIP Transferde Yeni Dönem: Dron ile Ulaşım</h2>
          <p className="text-gray-200 mb-2">
            YolcuTransferi.com olarak, Türkiye’de bir ilki gerçekleştiriyor ve VIP yolcu dronlarımızla şehir içi ve havalimanı transferlerinde yepyeni bir çağ başlatıyoruz! Yakında hizmette.
          </p>
          <span className="text-xs text-gray-400">Yayın tarihi: 2025-05-27</span>
        </article>
        <article className="bg-black/60 rounded-xl p-6 shadow">
          <h2 className="text-2xl text-gold font-semibold mb-2">Tüm Türkiye’de Online Rezervasyon Açıldı</h2>
          <p className="text-gray-200 mb-2">
            Platformumuz ile artık Türkiye’nin her yerinden, istediğiniz noktaya VIP transfer hizmeti kolayca ve dakikalar içinde rezerve edilebiliyor.
          </p>
          <span className="text-xs text-gray-400">Yayın tarihi: 2025-05-01</span>
        </article>
      </div>
      <div className="text-center text-gray-400 mt-10">
        Yeni hizmetler, kampanyalar ve transfer trendleri için bizi takip edin!
      </div>
    </main>
  );
}
