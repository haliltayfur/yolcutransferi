// app/iade/page.js
"use client";
import Link from "next/link";

export default function Iade() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-2 text-center">
          İptal ve İade Koşulları
        </h1>

        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Rezervasyonunuz, yalnızca sizin için planlanır ve önceliklendirilir.
        </div>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">
          {/* Giriş */}
          <p>
            YolcuTransferi.com’da her rezervasyon; araç tahsisi, profesyonel şoför planlaması, temizlik ve rota hazırlığı
            gibi adımlarla titizlikle oluşturulur. Aşağıdaki ilkeler, iptal ve iade süreçlerini açık ve anlaşılır biçimde
            düzenlemek amacıyla hazırlanmıştır.
          </p>

          {/* İptal Koşulları */}
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">İptal Koşulları</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <b>Yolculuk saatinden en az 8 saat önce</b> yapılan iptallerde, ödemenin tamamı kesintisiz olarak iade edilir.
              </li>
              <li>
                <b>Yolculuk saatine 8 saatten daha az süre kala</b> yapılan iptallerde, hazırlık ve tahsis süreçleri tamamlandığı için
                iade yapılamaz.
              </li>
              <li>
                <b>Gelmedi (no-show)</b> durumlarında ya da iptal bildirimi yapılmadığında, ücret iadesi gerçekleştirilemez.
              </li>
            </ul>
          </div>

          {/* Tarih / Saat Değişikliği */}
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Tarih / Saat Değişikliği</h2>
            <p>
              Rezervasyon <b>en az 8 saat önce</b> olmak kaydıyla, <b>müsaitlik durumuna bağlı</b> olarak ücretsiz şekilde
              güncellenebilir. 8 saatten kısa süre kala yapılmak istenen değişiklikler garanti edilemez; ücret iadesi
              uygulanmaz.
            </p>
          </div>

          {/* Neden Bu Uygulama */}
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Uygulamanın Gerekçesi</h2>
            <p>
              Her rezervasyon sonrası araç ve şoför yalnızca size ayrılır; temizlik, yakıt, konumlandırma ve rota çalışması
              başlatılır. Son saatlerde yapılan iptaller, bu hazırlıkların geri döndürülemez niteliği nedeniyle iade kapsamına
              alınamaz.
            </p>
          </div>

          {/* İade Süreci */}
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">İade Süreci</h2>
            <p>
              İade hakkı doğan işlemler, ödemenin gerçekleştirildiği yöntem üzerinden <b>en geç 7 iş günü içinde</b> bankanıza
              iletilir. Banka ve ödeme kuruluşlarının süreçleri nedeniyle hesaplara yansıma süresi farklılık gösterebilir.
            </p>
          </div>

          {/* İletişim */}
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Destek ve İletişim</h2>
            <p>
              Her türlü soru ve talebiniz için{" "}
              <Link href="/iletisim" className="underline text-[#ffeec2] hover:text-[#bfa658]">
                İletişim
              </Link>{" "}
              sayfamızdan bize ulaşabilirsiniz. Ekibimiz, sürecin her aşamasında yanınızdadır.
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
