"use client";
import { useState } from "react";

// Sorular
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
  const [open, setOpen] = useState([0]);

  const handleToggle = (i) => {
    setOpen(open.includes(i) ? [] : [i]);
  };

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-2 text-center">
          Sıkça Sorulan Sorular
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-10">
          VIP transfer süreçlerimiz hakkında en sık sorulanlar.
        </div>

        {/* SSS Listesi */}
        <div className="space-y-4">
          {SORULAR.map((item, i) => (
            <div
              key={i}
              className="bg-black/80 border border-[#bfa658] rounded-2xl shadow flex flex-col transition"
            >
              <button
                onClick={() => handleToggle(i)}
                className="flex justify-between items-center w-full text-left px-5 py-4 md:py-5 focus:outline-none group"
              >
                <span className="text-base md:text-lg text-[#bfa658] font-semibold tracking-tight">
                  {item.q}
                </span>
                <span
                  className={`ml-4 flex-shrink-0 transition-transform duration-200 rounded-full border border-[#bfa658] w-8 h-8 flex items-center justify-center bg-[#19160a] 
                  ${open.includes(i) ? "bg-[#bfa658] text-black rotate-45" : "text-[#bfa658]"}`}
                  style={{ fontSize: 26 }}
                  aria-label={open.includes(i) ? "Kapat" : "Aç"}
                >
                  {open.includes(i) ? "–" : "+"}
                </span>
              </button>
              {open.includes(i) && (
                <div className="px-6 pb-5 text-[#ecd9aa] font-normal text-base md:text-lg leading-relaxed animate-fade-in">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <style>{`
        .animate-fade-in { animation: fadeIn .6s; }
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px);} 100% { opacity: 1; transform: translateY(0);} }
      `}</style>
    </main>
  );
}
