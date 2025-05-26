
export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-900">
      <header className="bg-black text-white py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">YolcuTransferi.com</h1>
          <nav className="space-x-4">
            <a href="#home" className="hover:underline">Ana Sayfa</a>
            <a href="#book" className="hover:underline">Rezervasyon</a>
            <a href="#login" className="hover:underline">Giriş</a>
            <a href="#contact" className="hover:underline">İletişim</a>
          </nav>
        </div>
      </header>

      <section id="home" className="bg-cover bg-center h-[60vh] flex items-center justify-center text-center text-white" style={{backgroundImage: 'url(/vip-transfer.jpg)'}}>
        <div className="bg-black bg-opacity-50 p-6 rounded-xl">
          <h2 className="text-4xl font-bold mb-4">Türkiye Geneli VIP Transfer</h2>
          <p className="text-xl">Lüks ve güvenli ulaşım için hemen rezervasyon yapın</p>
        </div>
      </section>

      <section id="book" className="max-w-4xl mx-auto py-12 px-4">
        <h3 className="text-2xl font-semibold mb-6">Rezervasyon Formu</h3>
        <form className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <input type="text" placeholder="Başlangıç Noktası" className="p-3 rounded border" />
          <input type="text" placeholder="Varış Noktası" className="p-3 rounded border" />
          <input type="date" className="p-3 rounded border" />
          <select className="p-3 rounded border">
            <option>Mercedes Vito</option>
            <option>Maybach Sedan</option>
            <option>VIP Minibüs</option>
          </select>
          <input type="number" placeholder="Kişi Sayısı" className="p-3 rounded border" />
          <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Fiyat Al</button>
        </form>
      </section>

      <section id="login" className="bg-white py-12 px-4">
        <div className="max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Üye Girişi</h3>
          <form className="grid gap-4">
            <input type="email" placeholder="E-posta" className="p-3 rounded border" />
            <input type="password" placeholder="Şifre" className="p-3 rounded border" />
            <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Giriş Yap</button>
          </form>
        </div>
      </section>

      <section id="contact" className="bg-gray-200 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-xl font-semibold mb-2">İletişim</h3>
          <p>Telefon: 539 526 75 69</p>
          <p>E-posta: byhaliltayfur@hotmail.com</p>
          <p className="mt-4">Instagram: @yolcutransferi (yakında)</p>
        </div>
      </section>

      <footer className="bg-black text-white text-center py-4 mt-8">
        &copy; 2025 YolcuTransferi.com - Tüm hakları saklıdır.
      </footer>
    </main>
  );
}
