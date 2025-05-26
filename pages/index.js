
export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-900">
      <header className="bg-black text-white py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">YolcuTransferi.com</h1>
          <nav className="space-x-4">
            <a href="#anasayfa" className="hover:underline">Ana Sayfa</a>
            <a href="#hakkimizda" className="hover:underline">Hakkımızda</a>
            <a href="#hizmetler" className="hover:underline">Hizmetler</a>
            <a href="#iletisim" className="hover:underline">İletişim</a>
          </nav>
        </div>
      </header>

      <section id="anasayfa" className="bg-cover bg-center h-[70vh] flex items-center justify-center text-center text-white" style={{backgroundImage: 'url(/vip-transfer.jpg)'}}>
        <div className="bg-black bg-opacity-50 p-6 rounded-xl">
          <h2 className="text-4xl font-bold mb-4">VIP Transfer Hizmetine Hoş Geldiniz</h2>
          <p className="text-xl">Türkiye Geneli Konforlu ve Güvenli Ulaşım</p>
        </div>
      </section>

      <section id="hakkimizda" className="max-w-5xl mx-auto py-12 px-4">
        <h3 className="text-2xl font-semibold mb-4">Hakkımızda</h3>
        <p>
          YolcuTransferi.com olarak Türkiye genelinde, özellikle havalimanı, otel, iş merkezi ve turistik bölgeler arası VIP ulaşım çözümleri sunuyoruz. Filomuzda lüks araçlar yer almakta olup, profesyonel şoförlerimizle yüksek standartlarda hizmet vermekteyiz.
        </p>
      </section>

      <section id="hizmetler" className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Hizmetlerimiz</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Havalimanı Karşılama ve Transfer</li>
            <li>Şehir İçi ve Şehirlerarası Özel Transfer</li>
            <li>Günlük Şoförlü Araç Kiralama</li>
            <li>Kurumsal Toplantı & Etkinlik Transferleri</li>
            <li>Turistik Gezi ve VIP Turlar</li>
          </ul>
        </div>
      </section>

      <section id="iletisim" className="bg-gray-200 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">İletişim</h3>
          <p>Telefon: 0539 526 75 69</p>
          <p>E-posta: byhaliltayfur@hotmail.com</p>
          <p>Instagram: @yolcutransferi (yakında)</p>
        </div>
      </section>

      <footer className="bg-black text-white text-center py-4 mt-8">
        &copy; 2025 YolcuTransferi.com - Tüm Hakları Saklıdır.
      </footer>
    </main>
  );
}
