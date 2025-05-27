export default function Iletisim() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gold mb-6 text-center">İletişim</h1>
      <div className="bg-black/70 rounded-xl shadow-lg p-7 flex flex-col gap-4 mb-8">
        <div>
          <strong className="text-gold">E-posta:</strong>{" "}
          <span className="text-gray-200">info@yolcutransferi.com</span>
        </div>
        <div>
          <strong className="text-gold">Telefon:</strong>{" "}
          <span className="text-gray-200">+90 539 526 75 69</span>
        </div>
        <div>
          <strong className="text-gold">Adres:</strong>{" "}
          <span className="text-gray-200">Ümraniye Plazalar Bölgesi, İstanbul, Türkiye</span>
        </div>
        <div className="flex gap-3 mt-3">
          <a href="https://wa.me/905395267569" target="_blank" rel="noopener" className="text-green-400 hover:underline">WhatsApp</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener" className="text-pink-400 hover:underline">Instagram</a>
          <a href="https://twitter.com/" target="_blank" rel="noopener" className="text-blue-400 hover:underline">X (Twitter)</a>
        </div>
      </div>

      <form className="bg-black/60 rounded-xl shadow p-6 flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <label className="text-gray-200 font-semibold">Ad Soyad</label>
        <input className="p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30" placeholder="Adınız Soyadınız" required />
        <label className="text-gray-200 font-semibold">E-posta</label>
        <input type="email" className="p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30" placeholder="E-posta adresiniz" required />
        <label className="text-gray-200 font-semibold">Mesajınız</label>
        <textarea className="p-3 rounded-lg bg-gray-900/90 text-gold border border-gold/30" rows={3} placeholder="Mesajınız" required />
        <button className="mt-3 bg-gold text-black font-semibold py-3 rounded-xl text-lg shadow hover:bg-yellow-400 transition">
          Gönder
        </button>
      </form>
    </main>
  );
}
