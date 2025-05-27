"use client";

const SORULAR = [
  {
    soru: "VIP transfer nedir? Hangi araçlarla hizmet veriyorsunuz?",
    cevap:
      "VIP transfer; özel şoförlü, lüks araçlarla kapıdan kapıya, kişiye veya kuruma özel ulaşım hizmetidir. Filomuzda Mercedes Maybach, Vito VIP, lüks SUV ve dron (eVTOL) gibi üst segment araçlar mevcuttur."
  },
  {
    soru: "Dron ile transfer nasıl oluyor?",
    cevap:
      "Dron (eVTOL) ile şehir içi veya şehirler arası havadan transfer; geleceğin teknolojisiyle buluştu. Lansman dönemindeyiz, erken rezervasyon yapabilirsiniz. Rezervasyon sırasında 'Dron Transferi'ni seçerek talep bırakabilirsiniz."
  },
  {
    soru: "Rezervasyonumu nasıl yaparım? Ödeme yöntemleri neler?",
    cevap:
      "Web sitemizde hızlı rezervasyon formunu doldurarak işleminizi başlatabilirsiniz. Ödemeleri kredi kartı (İyzico, Craftgate, PayTR altyapısıyla), havale veya transfer sonunda nakit olarak gerçekleştirebilirsiniz."
  },
  {
    soru: "Transfer fiyatları nasıl belirleniyor? Fiyatlar sabit mi?",
    cevap:
      "Fiyatlarımız; seçtiğiniz güzergah, araç tipi ve güncel piyasa koşullarına göre otomatik ve şeffaf şekilde hesaplanır. Tüm vergiler ve hizmet bedeli dahildir. Rezervasyon onayı sonrasında fiyat değişmez."
  },
  {
    soru: "İptal veya değişiklik hakkım var mı?",
    cevap:
      "Evet! Tüm transferlerde rezervasyon saatinden en geç 12 saat öncesine kadar ücretsiz iptal ve değişiklik hakkınız vardır. Herhangi bir kesinti uygulanmaz."
  },
  {
    soru: "Kurumsal ve toplu transferlerde avantajlarınız neler?",
    cevap:
      "Kurumsal müşterilerimiz için özel fiyatlandırma, dönemsel kampanyalar, filo ve raporlama desteği sunuyoruz. İstediğiniz anda teklif alabilir, size özel kurumsal hesap açtırabilirsiniz."
  },
  {
    soru: "Transfer sırasında şoför ve araç bilgisi nasıl paylaşılır?",
    cevap:
      "Rezervasyonunuz onaylandığında, şoförünüzün ve aracınızın bilgileri (fotoğraf, plaka ve iletişim) SMS ve e-posta ile tarafınıza iletilir. Tüm şoförlerimiz yüksek deneyimlidir ve TURSAB güvencesindedir."
  },
  {
    soru: "Desteğe nasıl ulaşabilirim?",
    cevap:
      "7/24 WhatsApp hattımız, telefon numaramız ve iletişim formumuzdan dilediğiniz an bize ulaşabilirsiniz. Hızlı müşteri memnuniyeti önceliğimizdir."
  }
];

export default function SSSPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Sıkça Sorulan Sorular
        </h1>
        <div className="flex flex-col gap-5">
          {SORULAR.map((item, idx) => (
            <div
              key={idx}
              className="bg-black/60 border border-gold/30 rounded-lg p-5 shadow hover:scale-[1.01] transition"
            >
              <div className="font-bold text-gold mb-2 text-lg">{item.soru}</div>
              <div className="text-gray-200 text-base">{item.cevap}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
