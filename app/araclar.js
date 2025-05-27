export default function Araclar() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gold mb-4 text-center">Araç Filomuz</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-black/50 rounded-xl p-6 flex flex-col items-center">
          <img src="/maybach.png" alt="Maybach" className="w-32 h-20 object-contain mb-3" />
          <span className="font-semibold text-lg text-gold">Maybach Sedan</span>
          <span className="text-gray-200 text-sm text-center mt-2">
            Ultra lüks, prestijli ve son teknolojiyle donatılmış, özel şoförlü transferler için en üst düzey konfor.
          </span>
        </div>
        <div className="bg-black/50 rounded-xl p-6 flex flex-col items-center">
          <img src="/vito.png" alt="Mercedes Vito" className="w-32 h-20 object-contain mb-3" />
          <span className="font-semibold text-lg text-gold">Mercedes Vito</span>
          <span className="text-gray-200 text-sm text-center mt-2">
            Geniş iç hacmi, VIP dizaynı ve yüksek güvenlik standartları ile aile ve grup transferleri için mükemmel seçim.
          </span>
        </div>
        <div className="bg-black/50 rounded-xl p-6 flex flex-col items-center">
          <img src="/premium.png" alt="Premium Van" className="w-32 h-20 object-contain mb-3" />
          <span className="font-semibold text-lg text-gold">Premium Elite Van</span>
          <span className="text-gray-200 text-sm text-center mt-2">
            Toplantı, özel etkinlik veya uzun yolculuklar için; şık, konforlu ve teknolojik.
          </span>
        </div>
        <div className="bg-black/50 rounded-xl p-6 flex flex-col items-center">
          <img src="/dron.png" alt="Dron Transfer" className="w-32 h-20 object-contain mb-3" />
          <span className="font-semibold text-lg text-gold">Dron ile Transfer</span>
          <span className="text-gray-200 text-sm text-center mt-2">
            Geleceğin transferi burada! VIP yolcu taşıma dronlarımızla, hızlı ve prestijli ulaşım.
          </span>
        </div>
        <div className="bg-black/50 rounded-xl p-6 flex flex-col items-center">
          <img src="/ekonomik.png" alt="Ekonomik Araç" className="w-32 h-20 object-contain mb-3" />
          <span className="font-semibold text-lg text-gold">Ekonomik Araç</span>
          <span className="text-gray-200 text-sm text-center mt-2">
            Konforlu, güvenli ve uygun fiyatlı transferler için ekonomik seçenekler.
          </span>
        </div>
      </div>
      <div className="text-center mt-10 text-gray-300 text-base">
        Tüm araçlarımız <span className="text-gold font-semibold">bakımlı, sigortalı ve yasal</span> olarak hizmet vermektedir.
      </div>
    </main>
  );
}
