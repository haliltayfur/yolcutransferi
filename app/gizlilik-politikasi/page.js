"use client";
import Link from "next/link";

export default function GizlilikPolitikasi() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve Slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Gizlilik Politikası
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Kişisel verileriniz ve gizliliğiniz bizim için en yüksek önceliktir.
        </div>

        {/* İçerik */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            YolcuTransferi.com olarak, tüm kullanıcılarımızın kişisel verilerinin gizliliğini ve güvenliğini sağlamak en büyük önceliğimizdir. 
            Tüm işlemlerimiz, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuata tam uyumlu şekilde yürütülmektedir.
          </p>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Kişisel Verilerin Toplanması</h2>
            <p>
              Sitemiz üzerinden gerçekleştirdiğiniz rezervasyon, üyelik, iletişim veya teklif talepleri sırasında, yalnızca gerekli olan minimum düzeyde kişisel veri (ad, soyad, iletişim bilgileri, rezervasyon detayı vb.) toplanır.
              Kredi kartı ve ödeme verileriniz, güvenli altyapımızda asla saklanmaz ve doğrudan ödeme altyapı sağlayıcılarına iletilir.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Kullanımı ve Paylaşımı</h2>
            <p>
              Toplanan bilgiler, yalnızca rezervasyonlarınızın güvenli şekilde işlenmesi, hizmetlerin kişiselleştirilmesi ve zorunlu yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılır.
              Verileriniz, sadece iş ortaklarımız (şoför, araç tedarikçi ve müşteri temsilcisi) ile, yasal ve gizlilik taahhüdü kapsamında paylaşılır.
              Pazarlama ve reklam amaçlı üçüncü taraflara kesinlikle aktarılmaz.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Çerezler ve Takip Teknolojileri</h2>
            <p>
              Sitemiz, kullanıcı deneyimini geliştirmek ve güvenliği sağlamak için zorunlu çerezler kullanır. Ziyaretçi analizleri, yalnızca anonim ve toplu istatistiksel raporlama amaçlı tutulur.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Saklama ve Güvenlik</h2>
            <p>
              Tüm veriler, yüksek güvenlikli sunucularda, yasal süreler boyunca saklanır ve düzenli olarak yedeklenir. Kişisel verilerinize, yalnızca yetkili ve gizlilik sözleşmesi imzalamış personel erişebilir.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Haklarınız</h2>
            <p>
              KVKK kapsamındaki tüm haklarınız saklıdır. Kişisel verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini talep etme, silinmesini/yok edilmesini isteme ve mevzuata aykırı işleme nedeniyle zararınızın tazminini isteme haklarına sahipsiniz.
            </p>
          </div>
          <div className="pt-3 border-t border-[#bfa658] text-[#ffeec2]">
            Gizlilik ve veri güvenliği ile ilgili tüm talepleriniz için <Link href="/iletisim" className="underline text-[#bfa658] hover:text-[#ffeec2] font-bold">iletişim</Link> sayfamızdan bize ulaşabilirsiniz.
          </div>
        </div>
      </section>
    </main>
  );
}
