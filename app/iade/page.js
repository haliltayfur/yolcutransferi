// app/iade/page.js
"use client";
import Link from "next/link";

export default function Iade() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          İptal &amp; İade Koşulları
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          VIP dünyasında; zamanınız, güvenliğiniz ve konforunuz en yüksek önceliğimizdir.
        </div>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            Her transfer, <b>size özel olarak atanmış profesyonel şoförünüz</b> ve özenle hazırlanmış aracınızla gerçekleştirilir. Yolculuğunuzun her dakikasına hak ettiğiniz değeri veriyoruz: 
            <b> Sizin için zaman ayırıyor, bir başkasının rezervasyonunu asla kabul etmiyoruz.</b>
          </p>
          <div className="bg-[#231d10]/70 p-5 rounded-2xl border border-[#bfa658] mb-4">
            <b className="text-[#bfa658]">İptal ve İade Kuralları (VIP Standart):</b>
            <ul className="list-disc pl-6 space-y-1 mt-3 text-[#ffeec2]">
              <li>
                <b>Yolculuk öncesi 8 saat ve daha fazla süre kala</b> yapılan iptallerde, ödemeniz <b>tamamen iade edilir</b>. Hiçbir kesinti uygulanmaz.
              </li>
              <li>
                <b>Yolculuk öncesi son 8 saat</b> içinde iptal durumunda, 
                şoför ve aracınız yalnızca sizin için hazırlandığı ve başka hiçbir misafirimize tahsis edilmediği için <b>ücret iadesi yapılamaz</b>.
              </li>
              <li>
                Yolculuğa gelinmemesi veya 8 saatten kısa sürede iptal talepleri, 
                VIP hazırlık ve rezervasyon bedeli olarak tamamen saklı tutulur.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">VIP Standartları Neden Katı?</h2>
            <p>
              Sıradan bir taksi veya transferde, araç ve şoför “boşa” gittiğinde kayıp azdır. Bizim sistemimizde ise; sizin konforunuz için özel araç ve şoför, <b>öncesinde başka hiçbir misafire tahsis edilmez</b>. 
              <br /><br />
              <b>Sizin için ayrılan lüks, başkasına sunulmaz.</b> Bu, seçkin yolcularımıza verdiğimiz bir güvence ve ayrıcalıktır.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Sektörle Farkımız</h2>
            <p>
              Çoğu transfer firması 4–6 saat önce yapılan iptalleri iade kapsamına alır. <b>YolcuTransferi.com ise,</b> konforunuzdan ve etik değerlerimizden ödün vermemek için, iptal süresini daha uzun tutar: 
              <span className="block font-bold mt-1">VIP ayrıcalığınız, size özel ayrılmış kapasitemizi korur.</span>
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">İade Süreci</h2>
            <p>
              İade hakkınız doğarsa, <b>ödemeniz 7 iş günü içinde</b> aynı kanaldan otomatik olarak geri ödenir. Detaylı bilgi için müşteri destek ekibimiz her an yanınızdadır.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Destek ve Şeffaflık</h2>
            <p>
              Sorularınız için <Link href="/iletisim" className="underline text-[#ffeec2] hover:text-[#bfa658]">İletişim</Link> hattımız 7/24 açıktır.  
              YolcuTransferi.com, sektörde ilk defa bu kadar yüksek hizmet standardı ile 
              <b>VIP müşterilerinin konforunu, güvenini ve haklarını korumayı</b> taahhüt eder.
            </p>
          </div>
        </div>
        <div className="flex justify-start mt-8">
          <Link
            href="/rezervasyon"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            VIP Rezervasyon Yap
          </Link>
        </div>
      </section>
    </main>
  );
}
