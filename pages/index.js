
export default function Home() {
  return (
    <main className="text-gray-900">
      <header className="bg-[#000000] text-white py-6 px-4 shadow-md sticky top-0 z-50">
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

      <section id="anasayfa" className="h-[90vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: 'url(/vip-transfer.jpg)' }}>
        <div className="bg-black bg-opacity-60 p-10 rounded-xl text-center">
          <h2 className="text-4xl font-bold mb-4">VIP Transfer Hizmetine Hoş Geldiniz</h2>
          <p className="text-xl">Türkiye genelinde güvenli ve konforlu ulaşım çözümleri sunuyoruz.</p>
        </div>
      </section>

      <section id="hakkimizda" className="max-w-5xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-semibold mb-6">Hakkımızda</h3>
        <p>
          YolcuTransferi.com olarak, İstanbul başta olmak üzere Türkiye genelinde havalimanı transferi, özel şoförlü araç kiralama ve şehir içi/şehirlerarası VIP transfer hizmetleri sunmaktayız. Amacımız, yolcularımıza lüks, konforlu ve dakik bir ulaşım deneyimi yaşatmaktır.
        </p>
      </section>

      <section id="hizmetler" className="bg-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-semibold mb-6">Hizmetlerimiz</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pl-6">
            <li>Havalimanı Transfer Hizmetleri</li>
            <li>Özel Şoförlü Araç Kiralama</li>
            <li>Şehirlerarası VIP Ulaşım</li>
            <li>Kurumsal Transfer ve Toplantı Hizmetleri</li>
            <li>Turistik ve VIP Turlar</li>
          </ul>
        </div>
      </section>

      <section id="iletisim" className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-4">İletişim</h3>
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
