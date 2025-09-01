"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-5xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-14 py-16 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-6 text-center">
          Hakkımızda
       

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-10">
          
          {/* Kurumsal Tanıtım */}
          <section>
        
              <span className="font-semibold text-[#ffeec2]">YolcuTransferi.com</span>, 
              Türkiye genelinde VIP ulaşım deneyimini en üst seviyeye taşıyan, 
              teknoloji odaklı ve müşteri memnuniyetini merkeze alan bir transfer platformudur. 
              Yapay zeka destekli rezervasyon sistemimiz, saniyeler içinde en uygun aracı ve 
              profesyonel şoförü atayarak, müşterilerimizin zaman kaybetmeden en kaliteli hizmeti almasını sağlar.
            </p>
          </section>

          {/* Neden Biz */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">Neden YolcuTransferi.com?</h2>
            <ul className="pl-6 space-y-5">
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">Yapay Zeka Destekli Teknoloji:</b>  
                  Rezervasyonlarınızda en uygun araç ve şoför, gelişmiş algoritmalarımızla otomatik olarak atanır. 
                  Teklif beklemez, doğrudan hizmet alırsınız.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">VIP Standartlarda Konfor:</b>  
                  Mercedes Vito, Maybach ve lüks minivanlar gibi premium araç seçenekleriyle, her yolculukta ayrıcalığı yaşarsınız.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">Şeffaf & Güvenilir Fiyatlandırma:</b>  
                  Online ödeme altyapımız ve vergiye tabi faturalandırma sayesinde, sonradan sürpriz ücretlerle karşılaşmazsınız.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">7/24 Profesyonel Destek:</b>  
                  Rezervasyon öncesinde ve sonrasında, deneyimli ekibimiz daima yanınızdadır.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
                <span>
                  <b className="text-[#ffeec2]">Sigortalı & Yasal Güvence:</b>  
                  Tüm transferler yasal çerçevede, sigortalı ve güvenlik öncelikli olarak gerçekleşir.
                </span>
              </li>
            </ul>
          </section>

          {/* İş Ortaklığı */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">İş Ortaklarımız</h2>
            <p>
              Deneyimli transfer firmaları ve lisanslı şoförlerle kurduğumuz güçlü iş birlikleri, 
              platformumuzun kalite standartlarını sürekli yükseltmektedir.  
              Aracınızla iş ortağı olarak platformumuza katıldığınızda, gelen rezervasyonlar 
              otomatik olarak tarafınıza yönlendirilir. Böylece iş hacminizi büyütme fırsatı elde edersiniz.
            </p>
          </section>

          {/* Kurumsal Hizmetler */}
          <section>
            <h2 className="text-2xl font-bold text-[#ffeec2] mb-4">Kurumsal Çözümler</h2>
            <p>
              Bireysel yolcular kadar kurumsal firmalara da özel hizmetler sunuyoruz. 
              Organizasyonlar, toplantılar veya yoğun seyahat planları için bize ulaşarak 
              ihtiyacınıza özel teklif alabilir, tüm VIP transferlerinizi tek noktadan yönetebilirsiniz.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}
