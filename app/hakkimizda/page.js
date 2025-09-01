"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-5xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-14 py-16 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-4 text-center">
          Hakkımızda
        </h1>
        <div className="text-lg md:text-xl text-[#ffeec2] font-semibold text-center mb-10">
          VIP transferde ayrıcalık, teknoloji ve güvenin adı: YolcuTransferi.com
        </div>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">
          <p>
            <span className="font-semibold text-[#ffeec2]">YolcuTransferi.com</span>, 
            Türkiye’nin dört bir yanında VIP ulaşım deneyimini yeniden tanımlayan, 
            yenilikçi ve müşteri odaklı bir transfer platformudur. 
            En son teknolojilerle güçlendirilmiş yapay zeka destekli sistemimiz sayesinde, 
            her rezervasyon en doğru araç ve en uygun şoförle saniyeler içinde eşleştirilir. 
            Böylece müşterilerimiz teklif beklemeden, zaman kaybetmeden kusursuz hizmete ulaşır.
          </p>

          <p>
            Bizim için yolculuk yalnızca bir noktadan diğerine gitmek değildir; 
            konforu, güveni ve prestiji bir arada sunmaktır. 
            Mercedes Vito’dan Maybach’a, lüks minivanlardan özel araçlara kadar geniş 
            araç seçeneklerimizle her transferde üst düzey standart sağlarız. 
            Tüm transferler yasal zeminde, sigortalı ve %100 şeffaf fiyatlandırma ile gerçekleştirilir. 
            Yolculuğunuzun her aşamasında, siz değerli misafirlerimizin yanında oluruz.
          </p>

          <p>
            <b>Neden YolcuTransferi.com?</b>  
            Çünkü biz; teknolojiyi sadece kullanmıyor, işimizin merkezine koyuyoruz.  
            Rezervasyon sistemimizde yapay zeka algoritmaları çalışırken, 
            müşteri memnuniyetini en üst seviyeye çıkaracak her detayı özenle planlıyoruz.  
            Sizi değerli kılan ayrıntıları önemsiyor, zamandan tasarruf ettiriyor ve 
            beklentilerinizi aşan bir hizmet sunuyoruz.  
          </p>

          <p>
            Deneyimli transfer firmaları ve profesyonel şoförlerle oluşturduğumuz sürdürülebilir 
            iş ortaklıkları sayesinde kalite standartlarımız her geçen gün daha da yükseliyor.  
            İster bireysel ister kurumsal olun, ister tek bir transfer ister büyük bir organizasyon talebiniz olsun; 
            YolcuTransferi.com’da her zaman aynı ayrıcalığı ve güveni bulursunuz.
          </p>

          <p className="text-[#ffeec2] font-semibold">
            YolcuTransferi.com — Çünkü siz en iyisini hak ediyorsunuz.
          </p>
        </div>
      </section>
    </main>
  );
}
