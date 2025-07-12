"use client";
import Link from "next/link";

export default function Hakkimizda() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-2 text-center">
          Hakkımızda
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          VIP transferde yeni nesil, güvenli ve kusursuz deneyim: YolcuTransferi.com
        </div>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">
          <p>
            <span className="font-semibold text-[#ffeec2]">YolcuTransferi.com</span>, sektördeki onlarca yıllık tecrübenin ve yenilikçi yaklaşımın birleşimiyle kuruldu. Kendi aracımız olmadan, Türkiye genelinde <b>VIP havalimanı transferi</b>, <b>şehirler arası transfer</b>, <b>kurumsal & toplu taşımacılık</b>, <b>özel etkinlik ve tekne transferleri</b> gibi birçok hizmeti, seçkin çözüm ortaklarımız ve profesyonel sürücülerimizle buluşturuyoruz.
          </p>
          <p>
            <b>Yapay zeka destekli rezervasyon ve atama sistemimiz</b> sayesinde, müşterilerimiz birkaç adımda tüm süreçlerini dijital ortamda, güvenle ve zahmetsizce yönetebilir. Yolculuk planınız için ayrı ayrı teklif toplamadan, en uygun fiyatı, güvenilir şoförü ve yasal hizmeti sizin adınıza biz seçiyoruz.
          </p>
          <ul className="pl-6 mt-2 space-y-2">
            <li className="flex items-start gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span className="text-[#ffeec2]">Her yolculukta özel ihtiyaç ve beklentilere göre <b>kişiye özel program ve VIP hizmet</b> sağlanır.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span className="text-[#ffeec2]">Yalnızca <b>sektörde deneyimli firmalar ve profesyonel sürücüler</b> ile çalışılır; başvurular özenle incelenir, iş birliği ağı kalite ve güven odaklı yönetilir.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span className="text-[#ffeec2]"><b>Sigortalı ve tamamen yasal</b> transfer süreçleri, isteğe bağlı ek güvenceyle, müşteri haklarını ve konforunu en üst düzeyde korur.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span className="text-[#ffeec2]"><b>Online ödeme</b>, şeffaf fiyatlandırma, ek ücret sürprizi olmadan, %100 güvenli işlem ve <b>kesintisiz destek</b> sunulur.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block w-3 h-3 rounded-full bg-gradient-to-br from-[#e3b77b] to-[#bfa658] mt-2"></span>
              <span className="text-[#ffeec2]"><b>7/24 ulaşılabilir uzman destek ekibi</b> ve yolculuk öncesi/sonrası danışmanlık hizmetiyle her an yanınızdayız.</span>
            </li>
          </ul>
          <p>
            <b>“Neden bizi tercih etmelisiniz?”</b> Çünkü YolcuTransferi.com’da; onlarca firma ve şoförle birebir görüşmek, fiyat pazarlığı yapmak ya da hizmetin yasal olup olmadığını sorgulamak zorunda değilsiniz. <span className="font-semibold text-[#ffeec2]">Tüm süreç tek noktadan, güvenle ve otomasyonla yönetilir.</span> Size en uygun araç ve sürücü, sistemimiz tarafından atanır; isterseniz ekstra hizmetler (ikram, çocuk koltuğu, özel karşılama vb.) ile yolculuğunuz tamamen kişiselleştirilir.
          </p>
          <p>
            Hem bireysel hem kurumsal kullanıcılar için, <b>en lüks araçlardan ekonomik transfer seçeneklerine</b> kadar her ihtiyaca çözüm sunuyoruz. 
            Sitemizde gördüğünüz tüm hizmetler ve avantajlar, uzun yılların birikimiyle oluşturulan kalite standartlarımızın sonucudur.
          </p>
          <p>
            <b>YolcuTransferi.com</b> ile tanışan firmalar ve profesyonel şoförler de, platformumuza üye olarak kendi müşteri ağını büyütebilir, iş hacmini güvenli ve kurumsal bir çatı altında artırabilir.
          </p>
          <p>
            Her transferde, güvenli, konforlu ve özel bir deneyim yaşamanız için çalışıyoruz. Sektörde edindiğimiz bilgi, güçlü iş birliği ağı ve ileri teknoloji ile yolculuğunuzu daha keyifli ve ayrıcalıklı hale getiriyoruz.
          </p>
        </div>

        <div className="flex justify-start mt-10">
          <Link
            href="/rezervasyon"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md border border-[#fff6ce] hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] transition"
          >
            Rezervasyon Yap
          </Link>
        </div>
      </section>
    </main>
  );
}
