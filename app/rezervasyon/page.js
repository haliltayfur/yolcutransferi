// Örnek: pages/rezervasyon.js

export default function Rezervasyon() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-lg p-8 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-md">
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-800">Rezervasyon Formu</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1">Nereden</label>
            <input type="text" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Örn: İstanbul Havalimanı" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Nereye</label>
            <input type="text" className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Örn: Taksim" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Tarih</label>
              <input type="date" className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white" />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1">Saat</label>
              <input type="time" className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Ad Soyad</label>
            <input type="text" className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white" placeholder="Adınız Soyadınız" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Telefon</label>
            <input type="tel" className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white" placeholder="05xx xxx xx xx" />
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition">Rezervasyon Yap</button>
        </form>
      </div>
    </div>
  );
}
