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
        Diğer sorularınız için bize <b>İletişim</b> menüsünden ulaşabilirsiniz.
      </div>
    </main>
  );
}
