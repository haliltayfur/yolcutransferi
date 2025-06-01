"use client";
import { useState } from "react";

const SORULAR = [
  {
    q: "VIP transfer nedir, hangi şehirlerde hizmet veriyorsunuz?",
    a: "VIP transfer; lüks, konforlu ve özel araçlarla, profesyonel şoförlerimiz eşliğinde gerçekleştirilen taşımacılıktır. İstanbul, Antalya, İzmir, Bodrum, Dalaman ve Türkiye’nin tüm şehirlerinde hizmet sunuyoruz."
  },
  {
    q: "Fiyatlarınız nasıl belirleniyor?",
    a: "Tüm fiyatlar anlık olarak rakip firmalardan alınan fiyatların ortalaması, KDV/masraf ve minimum %20 net kâr eklenerek otomatik hesaplanır. Döviz ödemelerinde ise canlı kur ile TL’ye çevrilir."
  },
  {
    q: "Araçlarda hangi donanımlar bulunuyor?",
    a: "Maybach, Vito ve diğer VIP araçlarımızda deri koltuk, Wi-Fi, minibar, ekstra bagaj alanı ve çocuk koltuğu gibi donanımlar mevcuttur. Dron transferlerde özel güvenlik önlemleri alınır."
  },
  {
    q: "Transfer rezervasyonu nasıl yapılır?",
    a: "Ana sayfa veya Rezervasyon menüsünden transfer formunu doldurarak, online ödeme ile rezervasyonunuzu kolayca tamamlayabilirsiniz. 7/24 destek ekibimiz size yardımcı olacaktır."
  },
  {
    q: "İptal ve iade politikası nasıl?",
    a: "Transfer saatinden en az 6 saat önce iptal edilen rezervasyonlarda ücretin tamamı iade edilir. Daha geç iptallerde veya yolculuk başlamışsa ücret iadesi yapılmaz. Detaylar için İade Politikası sayfamıza bakınız."
  },
  {
    q: "Havalimanında sizi nasıl bulabilirim?",
    a: "Transfer tarihinden bir gün önce, havalimanı karşılama bilgileri size iletilecektir. Görevlimiz, isminizin yazılı olduğu bir tabela ile terminal çıkış kapısında sizi bekliyor olacaktır."
  },
  {
    q: "Uçağım rötar yaparsa ne olur?",
    a: "Rezervasyonunuza ekli uçuş numaranızdan uçuşunuzu takip ediyoruz. Bu nedenle bir gecikme durumunda endişelenmenize gerek yok; şoförümüz sizi yeni iniş saatinize göre karşılayacaktır."
  },
  {
    q: "Araçlarda bebek veya çocuk koltuğu mevcut mu?",
    a: "VIP araçlarımızda, isteğe bağlı olarak çocuk koltuğu sağlanmaktadır. Rezervasyon yaparken çocuk koltuğu ihtiyacınızı belirtirseniz, çocuğunuzun yaşına uygun bir koltuk temin edilecektir."
  },
  {
    q: "Transfer ücretini nasıl ödeyebilirim?",
    a: "Transfer ücretinizi araçta nakit veya kredi kartıyla ödeyebilirsiniz. Ön ödeme olarak banka havalesi/EFT de kabul ediyoruz."
  },
  {
    q: "Rezervasyonumu ne kadar önceden yapmalıyım?",
    a: "Transferinizden 24 saat öncesine kadar online rezervasyon yapabilirsiniz. Acil durumlar için telefonla iletişime geçmeniz yeterlidir."
  },
  {
    q: "Evcil hayvanımla seyahat edebilir miyim?",
    a: "Evcil hayvanla seyahat etmek isterseniz rezervasyon sırasında belirtmeniz yeterlidir. Taşıma kutusu/kafesi ile kabul edilir ve araç buna uygun seçilir."
  }
];

export default function SSS() {
  const [acik, setAcik] = useState(null);

  return (
    <main className="max-w-2xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-7 text-center">
        Sıkça Sorulan Sorular
      </h2>
      <div className="space-y-5">
        {SORULAR.map((item, i) => (
          <div key={i} className="bg-black/70 border border-gold/20 rounded-xl shadow px-5 py-4">
            <button
              className="w-full text-left text-lg text-gold font-semibold focus:outline-none"
              onClick={() => setAcik(acik === i ? null : i)}
            >
              {item.q}
            </button>
            {acik === i && (
              <div className="mt-2 text-gray-200 text-base">{item.a}</div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-400 text-xs">
        
      </div>
    </main>
  );
}
