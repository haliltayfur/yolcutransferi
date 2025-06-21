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
          Her yolculuk sizin için özenle hazırlanır.
        </div>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            YolcuTransferi.com olarak her rezervasyonu, size özel şoför ve araç planlamasıyla hazırlarız.
            Tüm hazırlıklarımızı, yolculuğunuzun sorunsuz ve konforlu geçmesi için büyük bir titizlikle gerçekleştiriyoruz.
          </p>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">İptal ve İade Süreci</h2>
            <ul className="list-disc pl-6 text-[#ffeec2] space-y-1">
              <li>
                <b>Yolculuğunuzdan 8 saat öncesine kadar</b> yapılan iptallerde, ücretinizin tamamı iade edilir. Herhangi bir kesinti uygulanmaz.
              </li>
              <li>
                <b>Yolculuk saatine 8 saatten az kala</b> yapılan iptallerde ise, hazırlık süreci tamamlandığı için iade yapılamamaktadır.
              </li>
              <li>
                Son 8 saat içerisinde gelmeme veya rezervasyonun iptal edilmemesi durumunda da, hizmete özel hazırlıklar sebebiyle ücret iadesi gerçekleştirilemez.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Neden Bu Uygulama?</h2>
            <p>
              Her rezervasyon sonrası, şoför ve araç sadece size ayrılır; titiz bir temizlik ve detaylı hazırlık süreci başlatılır. 
              Siz değerli misafirlerimize en iyi deneyimi sunmak ve güvenliğinizi sağlamak için bu sürecin iptal edilebilmesi belirli bir zaman dilimi ile sınırlıdır.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">İade Süresi</h2>
            <p>
              İade hakkı oluşan durumlarda, ödeme işleminiz 7 iş günü içinde, kullandığınız yöntem üzerinden tarafınıza otomatik olarak iade edilir.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Daha Fazla Bilgi</h2>
            <p>
              Soru ve talepleriniz için <Link href="/iletisim" className="underline text-[#ffeec2] hover:text-[#bfa658]">İletişim</Link> sayfamızdan bize ulaşabilirsiniz.  
              Her adımda yanınızdayız.
            </p>
          </div>
        </div>
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
