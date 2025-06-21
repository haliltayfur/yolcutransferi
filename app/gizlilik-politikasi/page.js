"use client";
import Link from "next/link";

export default function GizlilikPolitikasi() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Gizlilik Politikası
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Kişisel verileriniz güvenli, tüm haklarınız bizde güvende!
        </div>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            YolcuTransferi.com olarak ziyaretçilerimizin ve kullanıcılarımızın gizliliğini önemsiyoruz. Web sitemizi kullanırken verdiğiniz tüm bilgiler, 6698 sayılı KVKK ve ilgili mevzuata uygun olarak korunur ve asla üçüncü kişilerle izinsiz paylaşılmaz.
          </p>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">1. Toplanan Veriler</h2>
            <p>
              Rezervasyon, iletişim ve hizmet süreçlerinde ad, soyad, e-posta, telefon, mesaj, IP adresi gibi temel kişisel veriler toplanabilir.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">2. Veri İşleme Amaçlarımız</h2>
            <ul className="list-disc pl-6 text-[#ffeec2] space-y-1">
              <li>Rezervasyon ve transfer işlemlerinin yürütülmesi</li>
              <li>Müşteri desteği, teklif sunumu ve iletişim</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Hizmet kalitesinin artırılması ve sistem güvenliği</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">3. Çerezler ve Takip Teknolojileri</h2>
            <p>
              Sitemiz, kullanım deneyimini iyileştirmek ve istatistik toplamak için çerezler (cookies) kullanır. Çerez ayarlarını tarayıcıdan yönetebilirsiniz.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">4. Veri Güvenliği</h2>
            <p>
              Tüm veriler güvenli altyapılarda, şifreli ve erişim kontrollü ortamlarda saklanır. Kişisel verilerinizin korunması için teknik ve idari tedbirler alınır.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">5. Üçüncü Taraflarla Paylaşım</h2>
            <p>
              Verileriniz sadece hizmet alınan iş ortakları, yasal zorunluluk veya açık rızanız ile paylaşılır. Kişisel veriler, pazarlama amaçlı üçüncü kişilerle asla paylaşılmaz.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">6. Haklarınız</h2>
            <p>
              KVKK kapsamında; verilerinize erişim, düzeltme, silme veya işlenmesine itiraz etme haklarına sahipsiniz. Detay için <Link href="/kvkk" className="underline text-[#ffeec2] hover:text-[#bfa658]">KVKK Aydınlatma Metni</Link>’ni inceleyebilirsiniz.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">7. Politika Güncellemeleri</h2>
            <p>
              Bu politika, teknolojik ve yasal gelişmelere göre güncellenebilir. Son güncelleme tarihi: <b>{new Date().toLocaleDateString("tr-TR")}</b>
            </p>
          </div>
        </div>
        <div className="pt-3 border-t border-[#bfa658] text-[#ffeec2]">
          Gizlilik ile ilgili sorularınız için <Link href="/iletisim" className="underline text-[#ffeec2] hover:text-[#bfa658]">İletişim</Link> sayfamızı kullanabilirsiniz.
        </div>
        <div className="flex justify-start mt-8">
          <Link
            href="/kvkk/form"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            KVKK Başvuru Formu
          </Link>
        </div>
      </section>
    </main>
  );
}
