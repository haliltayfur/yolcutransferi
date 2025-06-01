"use client";
import { useState } from "react";

const SORULAR = [
  {
    q: "VIP transfer nedir, hangi şehirlerde hizmet veriyorsunuz?",
    a: "VIP transfer; lüks, konforlu ve özel araçlarla, profesyonel şoförlerimiz eşliğinde gerçekleştirilen taşımacılıktır. İstanbul, Antalya, İzmir, Bodrum, Ankara ve Türkiye’nin tüm şehirlerinde hizmet sunuyoruz."
  },
  {
    q: "Fiyatlarınız nasıl belirleniyor?",
    a: "Transfer ücretleri; tercih edilen araç tipi, mesafe, varış noktası ve ek hizmetlere göre sistem tarafından otomatik olarak hesaplanır. Size en uygun ve şeffaf fiyat, rezervasyon sırasında sunulur."
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
    a: "Transfer saatinden en az 8 saat önce iptal edilen rezervasyonlarda ücretin tamamı iade edilir. Daha geç iptallerde veya yolculuk başlamışsa ücret iadesi yapılmaz. Detaylar için İade Politikası sayfamıza bakınız."
  },
  {
    q: "Havalimanında sizi nasıl bulabilirim?",
    a: "Transferiniz onaylandıktan kısa bir süre sonra, size atanan şoförün adı, iletişim bilgileri ve araç detayları hem cep telefonunuza hem de e-posta adresinize gönderilecektir. Talep etmeniz halinde, şoförümüz isminizin yazılı olduğu bir tabela ile terminal çıkış kapısında sizi karşılayabilir. Bu karşılama hizmeti ek ücrete tabidir."
  },
  {
    q: "Uçağım rötar yaparsa ne olur?",
    a: "Rezervasyon sırasında belirttiğiniz uçuş numarası üzerinden uçuşunuz anlık olarak takip edilir. Rötar durumunda endişelenmenize gerek yok; şoförümüz iniş saatinize göre sizi karşılayacaktır. Ancak bekleme süresi maksimum 1 saattir. 1 saati aşan beklemelerde, her ek saat için toplam transfer ücretine %5 oranında ek ücret yansıtılır."
  },
  {
    q: "Araçlarda bebek veya çocuk koltuğu mevcut mu?",
    a: "VIP araçlarımızda bebek ve çocuk koltuğu hizmeti, güvenlik ve konfor açısından sunulmaktadır. Bu hizmet opsiyoneldir ve rezervasyon esnasında ayrıca seçilmelidir. Talep edilen koltuk, çocuğunuzun yaşına uygun olarak temin edilir ve ek ücrete tabidir."
  },
  {
    q: "Transfer ücretini nasıl ödeyebilirim?",
    a: "Transfer ödemeleri yalnızca banka havalesi, EFT veya güvenli online ödeme sistemi üzerinden yapılmaktadır. Araç içerisinde nakit ya da kredi kartı ile ödeme alınmamaktadır. Rezervasyon onayı, ödeme tamamlandıktan sonra gerçekleşir."
  },
  {
    q: "Rezervasyonumu ne kadar önceden yapmalıyım?",
    a: "Transferinizi en az 2 saat öncesine kadar online olarak Rezervasyon yapabilirsiniz. Acil talepleriniz için iletişim hattımızdan destek alabilirsiniz. Ancak bu transferlerde iptal ve iade hakkı bulunmamaktadır; vazgeçilen transferlerde ücret iadesi yapılmaz."
  },
  {
    q: "Evcil hayvanımla seyahat edebilir miyim?",
    a: "Evcil hayvanla seyahat mümkündür. Bu hizmet opsiyoneldir ve rezervasyon sırasında ayrıca belirtilmelidir. Evcil hayvanınızın taşıma kutusu/kafesi olması zorunludur. Taşıma kutusu talep edilirse, bu ek hizmete ayrıca ücret yansıtılır ve araç buna uygun şekilde planlanır."
  }
];

export default function SSS() {
  const [acik, setAcik] = useState([0, 1]); // İlk 2 açık başlar

  const toggle = (i) => {
    setAcik(acik.includes(i) ? [] : [i]); // Tıklanan dışında hepsini kapat
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-14">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gold mb-7 text-center">
        Sıkça Sorulan Sorular
      </h2>
      <div className="space-y-5">
        {SORULAR.map((item, i) => (
          <div key={i} className="bg-black/70 border border-gold/20 rounded-xl shadow px-5 py-4">
            <button
              className="w-full text-left text-lg text-gold font-semibold focus:outline-none flex justify-between items-center"
              onClick={() => toggle(i)}
            >
              {item.q}
              <span
                className={`transform transition-transform duration-200 ${
                  acik.includes(i) ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {acik.includes(i) && (
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
