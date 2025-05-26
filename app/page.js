export default function Home() {
  return (
    <main className="bg-[#171717] min-h-screen text-white font-serif">
      {/* Hero alanı */}
      <section className="relative flex flex-col items-center justify-center min-h-[600px]">
        {/* Arka plan görseli */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt="VIP Araçlar"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        {/* İçerik */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gold tracking-wide drop-shadow-lg">
            VIP Yolcu Taşımacılığı
          </h1>
          {/* Rezervasyon Formu */}
          <form className="bg-black/80 rounded-2xl p-8 shadow-xl flex flex-col gap-4 min-w-[340px]">
            <input className="bg-zinc-900 p-3 rounded-xl mb-2" placeholder="Nereden?" />
            <input className="bg-zinc-900 p-3 rounded-xl mb-2" placeholder="Nereye?" />
            <div className="flex gap-2">
              <input className="bg-zinc-900 p-3 rounded-xl w-1/2" placeholder="Tarih" />
              <input className="bg-zinc-900 p-3 rounded-xl w-1/2" placeholder="Kişi" />
            </div>
            <select className="bg-zinc-900 p-3 rounded-xl mb-2">
              <option>Araç Seçin</option>
              <option>Vito</option>
              <option>Maybach</option>
              <option>VIP Sedan</option>
            </select>
            <button
              className="bg-gold text-black font-bold py-3 rounded-xl transition hover:opacity-90"
              type="submit"
            >
              REZERVASYON YAP
            </button>
          </form>
        </div>
      </section>

      {/* Hizmetler */}
      <section className="flex justify-center gap-12 py-12 bg-[#191919]">
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-2">🚗</span>
          <span>VIP Transfer</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-2">🛫</span>
          <span>Havalimanı Transferi</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-3xl mb-2">🏢</span>
          <span>Kurumsal Taşımacılık</span>
        </div>
      </section>

      {/* Araçlarımız */}
      <section className="py-10">
        <h2 className="text-3xl text-center font-bold mb-8">ARAÇLARIMIZ</h2>
        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <img src="/vito.png" alt="Vito" className="w-40 h-24 object-contain mb-2" />
            <span className="font-semibold">VITO</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/maybach.png" alt="Maybach" className="w-40 h-24 object-contain mb-2" />
            <span className="font-semibold">MAYBACH</span>
          </div>
          <div className="flex flex-col items-center">
            <img src="/sedan.png" alt="VIP Sedan" className="w-40 h-24 object-contain mb-2" />
            <span className="font-semibold">VIP SEDAN</span>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-8">
          <button className="bg-gold text-black font-bold px-8 py-3 rounded-xl shadow hover:opacity-90">
            ŞOFÖR OLUN
          </button>
          <button className="bg-gold text-black font-bold px-8 py-3 rounded-xl shadow hover:opacity-90">
            ARAÇ EKLEYİN
          </button>
        </div>
      </section>

      {/* Neden YolcuTransferi */}
      <section className="py-10 bg-[#181818]">
        <h2 className="text-2xl text-center font-bold mb-6">NEDEN YOLCUTRANSFERİ?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-12 text-lg text-zinc-300 max-w-4xl mx-auto">
          <div>
            <ul className="space-y-2">
              <li>✔️ Güvenilir ve konforlu transferler</li>
              <li>✔️ 7/24 müşteri desteği</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li>✔️ Deneyimli, profesyonel şoförler</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
