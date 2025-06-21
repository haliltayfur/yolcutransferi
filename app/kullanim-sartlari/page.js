"use client";
import Link from "next/link";

export default function KullanimSartlari() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Kullanım Şartları
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          YolcuTransferi.com’u kullanarak bu şartları kabul etmiş olursunuz.
        </div>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            Bu Kullanım Şartları, yolcutransferi.com web sitesini ziyaret eden, rezervasyon yapan ve hizmetlerimizden yararlanan tüm kullanıcılar için geçerlidir. Siteye erişim sağlayan herkes, aşağıdaki koşulları okumuş ve kabul etmiş sayılır.
          </p>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">1. Hizmet Tanımı</h2>
            <p>
              YolcuTransferi.com; Türkiye genelinde VIP transfer, şehirler arası ve havalimanı transferi başta olmak üzere çeşitli yolcu taşıma hizmetleri sunar. Web sitesindeki bilgiler genel bilgilendirme amaçlıdır ve şirket önceden haber vermeden hizmette değişiklik yapabilir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">2. Kullanıcı Yükümlülükleri</h2>
            <ul className="list-disc pl-6 text-[#ffeec2] space-y-1">
              <li>Hizmetleri yalnızca yasal amaçlarla kullanmak.</li>
              <li>Verdiğiniz tüm bilgilerin doğru ve güncel olmasını sağlamak.</li>
              <li>Sistemimizi kötüye kullanmamak, spam veya dolandırıcılık teşebbüsünde bulunmamak.</li>
              <li>Başkasının haklarını veya gizliliğini ihlal etmemek.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">3. Rezervasyon ve Ödeme</h2>
            <ul className="list-disc pl-6 text-[#ffeec2] space-y-1">
              <li>Rezervasyonlar, kullanıcının verdiği bilgiler doğrultusunda ve sistemde belirtilen koşullara göre işleme alınır.</li>
              <li>Fiyatlar, anlık piyasa ve hizmet koşullarına göre değişiklik gösterebilir. Son fiyat, ödeme anında belirlenir.</li>
              <li>Ödeme işlemleri güvenli altyapı üzerinden gerçekleşir.</li>
              <li>Rezervasyon iptal ve değişiklik koşulları, ilgili rezervasyon sayfasında açıkça belirtilmiştir.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">4. Fikri Mülkiyet ve İçerik</h2>
            <p>
              Site içeriği (logo, marka, metin, görseller, yazılım kodları ve veri tabanları dâhil) YolcuTransferi.com’a aittir. İzinsiz kopyalama, çoğaltma, paylaşma veya ticari kullanım yasaktır.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">5. Gizlilik ve Kişisel Veriler</h2>
            <p>
              Kullanıcı verileri, KVKK ve Gizlilik Politikası’na uygun olarak işlenir ve korunur. Detaylı bilgi için&nbsp;
              <Link href="/gizlilik-politikasi" className="underline text-[#ffeec2] hover:text-[#bfa658]">Gizlilik Politikası</Link>
              &nbsp;ve&nbsp;
              <Link href="/kvkk" className="underline text-[#ffeec2] hover:text-[#bfa658]">KVKK Aydınlatma Metni</Link>
              &nbsp;sayfalarını inceleyebilirsiniz.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">6. Sorumluluk Reddi</h2>
            <p>
              YolcuTransferi.com, sunulan hizmetlerde oluşabilecek aksaklıklardan (trafik, hava koşulları, teknik arıza vs.) kaynaklanan doğrudan ya da dolaylı zararlardan sorumlu değildir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">7. Değişiklik Hakkı</h2>
            <p>
              Kullanım şartları gerektiğinde güncellenebilir. Kullanıcılar, en güncel şartları bu sayfadan takip etmekle yükümlüdür.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">8. Yetkili Mahkeme ve Uyuşmazlık Çözümü</h2>
            <p>
              Site ve hizmetlerden doğabilecek uyuşmazlıklarda İstanbul (Anadolu) Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">9. İş Ortakları, Şoför ve Tedarikçiler İçin Not</h2>
            <p>
              YolcuTransferi.com platformunda, iş ortakları, şoförler ve tedarikçiler için ayrı panel ve kullanıcı hesabı ile işlem yapılıyorsa; bu gruplar için özel hükümler ve ayrı sözleşme koşulları ayrıca duyurulacak ve panelde paylaşılacaktır.
            </p>
          </div>
        </div>

        {/* Alt uyarı ve başvuru (buton kaldırıldı) */}
        <div className="pt-3 border-t border-[#bfa658] text-[#ffeec2] mt-6">
          YolcuTransferi.com’u kullanan herkes bu şartları ve güncel politikaları kabul etmiş sayılır. Sorunuz veya yasal başvurunuz için&nbsp;
          <Link href="/iletisim" className="underline text-[#ffeec2] hover:text-[#bfa658]">İletişim</Link>
          &nbsp;sayfamızı kullanabilirsiniz.
        </div>
      </section>
    </main>
  );
}
