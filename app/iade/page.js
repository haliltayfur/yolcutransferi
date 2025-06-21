"use client";
import Link from "next/link";

export default function IptalIade() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          İptal & İade Koşulları
        </h1>
        {/* Slogan */}
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Size özel hazırlık, tam VIP hizmet — keyfiniz için her şey özenle tasarlandı.
        </div>
        {/* İçerik */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            Yolculuğunuz başlamadan <b>en az 8 saat önce</b> yapılan iptaller için ödediğiniz ücret tamamen iade edilir. Çünkü bu sürede şoförünüz, aracınız, dezenfeksiyon ve özel ekipmanlarınız hazırlandı.
          </p>
          <p>
            Eğer 8 saatten daha az süre kala iptal ederseniz, maalesef bu hazırlık sürecini iptal edemiyoruz.  
            <b>Bu yüzden VIP hizmetinize özel ayrılan kaynaklar iade edilemez.</b> Geçmiş olsun, ama özenli konforunuz için plan sürüyor.
          </p>
          <p>
            <b>7 saat kala</b> iptal yapmanız hâlâ VIP prensibimize dahil değildir; araç ve şoförünüz özel olarak hazırlanmış, bu nedenle dönüş olmaksızın işlem tamamlanmıştır.
          </p>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Neden Bu Koşul?</h2>
            <ul className="list-disc pl-6 space-y-2 text-[#ffeec2]">
              <li>Şoförünüz ve aracınız sadece **sizin için rezerve edilir**, başka yolcu alınmaz.</li>
              <li>Araçlar **detaylı temizlik ve dezenfeksiyondan** geçirilir.</li>
              <li>Her yolculukta VIP deneyim ve ekstra özen sağlanır — iptal süresi bu planlara dahil değildir.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Sektörde Ne Var?</h2>
            <p>
              Rakipler genelde 4–6 saat önceden iade sağlarken biz; siz değer verdiğimiz için ekstra adım attık.  
              **8 saat öncesi ücretsiz, sonrası ise VIP hazırlık bedeli kabul edilmiştir.**
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Nasıl İade Alırım?</h2>
            <p>
              İptal işlemi sonrasında ödemeniz, sistem tarafından otomatik işlenir ve <b>7 iş günü içinde</b> aynı ödeme yöntemine iade edilir.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Destek</h2>
            <p>
              Sorularınız varsa <Link href="/iletisim" className="underline text-[#ffeec2] hover:text-[#bfa658]">İletişim</Link> sayfamızdan bize ulaşabilirsiniz. Ekibimiz her zaman destek için hazır.
            </p>
          </div>
        </div>

        {/* Buton */}
        <div className="flex justify-start mt-8">
          <Link
            href="/rezervasyon"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Rezervasyon Yap
          </Link>
        </div>
      </section>
    </main>
  );
}
