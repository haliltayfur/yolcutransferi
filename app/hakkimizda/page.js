"use client";

export default function Hakkimizda() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-5xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-14 py-16 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Sayfa Başlığı */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-8 text-center">
          Hakkımızda
        </h1>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-10">
          {/* Giriş */}
          <section>
            <p className="mb-4">
              <span className="font-semibold text-[#ffeec2]">YolcuTransferi.com</span>, Türkiye genelinde VIP ulaşım hizmetini
              teknoloji ve kusursuz operasyon anlayışıyla bir araya getiren bir platformdur. Amacımız; her yolculukta aynı
              standartta konfor, güven ve dakikliğe ulaşmanızı sağlamaktır. Bunun için yapay zekâ destekli rezervasyon motoru,
              titizlikle seçilmiş iş ortakları ve şeffaf süreç yönetimi birlikte çalışır.
            </p>
            <p>
              Havalimanı transferleri, şehirler arası yolculuklar, toplantı ve etkinlik taşımaları ile özel rota taleplerinde,
              beklentilerinizi aşan bir deneyim sunmak için buradayız.
            </p>
          </section>

          {/* Hizmet Yaklaşımımız */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">Hizmet Yaklaşımımız</h2>
            <p className="mb-4">
              YolcuTransferi.com’da süreçleriniz, başvuru anından varış noktasına kadar izlenebilir ve kontrol edilebilir bir
              akış içinde ilerler. Yapay zekâ modellerimiz, talebin zamanı, lokasyonu, kişi sayısı ve araç tercihlerine göre en uygun
              eşleştirmeyi saniyeler içinde yapar; teklif bekleme ve arama trafiğine gerek kalmaz.
            </p>
            <p>
              Kullanılan tüm araçlar düzenli bakımlı, sürücüler deneyimli ve lisanslıdır. Her transfer; güvenlik, konfor ve itibar
              kriterlerine uygun biçimde planlanır.
            </p>
          </section>

          {/* Neden YolcuTransferi.com? */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">Neden YolcuTransferi.com?</h2>
            <ul className="pl-6 space-y-5">
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">Yapay zekâ destekli eşleştirme:</b> En uygun araç ve profesyonel şoför, talebinize
                  anında atanır; süreç hızlanır, kalite korunur.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">VIP araç standartları:</b> Mercedes Vito, Maybach ve seçkin minivan segmentleriyle
                  üst düzey konfor ve temsil gücü.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">Şeffaf fiyatlandırma:</b> Online ödeme ve faturalandırma ile net, öngörülebilir ve
                  sonradan sürprizsiz ücret politikası.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">Operasyonel disiplin:</b> Zamanında karşılama, optimize rota ve kesintisiz bilgi
                  akışıyla sorunsuz deneyim.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">7/24 uzman destek:</b> Rezervasyon öncesi ve sonrası, deneyimli ekip her an yanınızdadır.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">Veri güvenliği ve KVKK uyumu:</b> Kişisel veriler yalnızca hizmet sunumunun gerektirdiği ölçüde
                  işlenir ve güvenle saklanır.
                </span>
              </li>
            </ul>
          </section>

          {/* Kalite ve Uyum */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">Kalite ve Uyum</h2>
            <p className="mb-4">
              Tüm transferler yasal çerçeveye uygun, sigorta güvencesi altında ve kayıt altındadır. Çalıştığımız sürücüler ve
              firmalar, gerekli lisans ve belgeleriyle doğrulanır; kalite standartlarımız düzenli olarak gözden geçirilir.
            </p>
            <p>
              Faturalandırma ve vergisel süreçler mevzuata uygun biçimde yürütülür; kurumsal beklentilere uygun raporlama ve dokümantasyon
              sağlanır.
            </p>
          </section>

          {/* İş Ortaklığı Modeli */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">İş Ortaklığı Modeli</h2>
            <p className="mb-4">
              YolcuTransferi.com, araç sahipleri ve profesyonel şoförler için sürdürülebilir bir iş modeli sunar. Uygunluk kriterlerini
              karşılayan iş ortaklarımız, platforma dahil olduklarında; gelen rezervasyonlar yapay zekâ tarafından uygunluk, konum ve
              kalite puanlarına göre otomatik yönlendirilir.
            </p>
            <p>
              Böylece iş hacmi ölçeklenir, boş kilometre azalır ve gelir sürekliliği sağlanır. Başvuru ve değerlendirme süreci, şeffaf
              ve hızlı bir akışla ilerler.
            </p>
          </section>

          {/* Kurumsal Çözümler */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">Kurumsal Çözümler</h2>
            <p>
              Toplantılar, bayi organizasyonları, fuarlar ve üst düzey konuk ağırlama süreçleri için özel planlama yapar; tek seferlik
              ya da dönemsel sözleşmelerle tüm transferlerinizi tek noktadan yönetiriz. Kurumsal talepleriniz için iletişim kanallarımız
              üzerinden bize ulaşabilir, ihtiyaçlarınıza özel tekliflendirme alabilirsiniz.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
