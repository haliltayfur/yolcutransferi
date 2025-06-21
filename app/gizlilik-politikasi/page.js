"use client";
import Link from "next/link";

export default function GizlilikPolitikasi() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Gizlilik Politikası
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Kişisel Verileriniz Güvenli, Haklarınız Bizimle Güvende!
        </div>

        {/* İçerik */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            Bu Gizlilik Politikası, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) ve ilgili diğer mevzuata uygun olarak hazırlanmıştır. Kişisel verilerinizin toplanması, işlenmesi, aktarılması, saklanması ve korunması süreçlerine dair şeffaf bilgi sunulmaktadır.
          </p>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Sorumlusu</h2>
            <p>
              YolcuTransferi.com (“Şirket”), kişisel verilerinizin korunmasından sorumlu veri sorumlusudur.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Toplanan Kişisel Veriler</h2>
            <p>
              İletişim, rezervasyon ve destek işlemleri kapsamında ad, soyad, telefon, e‑posta, mesaj gibi kişisel bilgiler toplanmaktadır.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri İşleme Amaçları</h2>
            <p>
              Verileriniz; sözleşme yükümlülüklerini yerine getirme, müşteri desteği, hizmet kalitesini artırma, güvenlik, pazarlama ve yasal zorunlulukların yerine getirilmesi amacıyla işlenir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Hukuki Dayanak</h2>
            <p>
              Verileriniz; açık rıza, sözleşme gerekliliği veya yasal zorunluluk gibi KVKK’nın 4, 5 ve 6’ncı maddelerine göre işlenmektedir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Aktarımı</h2>
            <p>
              Verileriniz hizmet süreçlerimizde; iş ortaklarına, tedarikçilere veya kanunen yetkili kurumlara aktarılabilir. Uluslararası aktarımda yasal şartlara uygun hareket edilir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Güvenliği</h2>
            <p>
              Kişisel verileriniz; şifreleme, güvenlik duvarları, erişim kontrolü, fiziksel güvenlik ve diğer idari teknik tedbirlerle korunmaktadır.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Saklama Süresi</h2>
            <p>
              Verileriniz; işleme amacı ile sınırlı süre için saklanır, süreç tamamlandığında silinir, anonimleştirilir veya yok edilir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">KVKK Kapsamındaki Haklarınız</h2>
            <ul className="list-disc pl-6 text-[#ffeec2]">
              <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse bilgi talep etme</li>
              <li>İşlenme amacı ve kullanım durumunu öğrenme</li>
              <li>Eksik/yanlış verilerin düzeltilmesini isteme</li>
              <li>Silinmesini/yok edilmesini isteme</li>
              <li>Aktarıldığı kurumlara bildirilmesini isteme</li>
              <li>Otomatik sistemlerle analiz edilmesine itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zararın giderilmesini talep etme</li>
            </ul>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Başvuru Yöntemi</h2>
            <p>
              Haklarınızı kullanmak veya bu politika hakkında bilgi almak için iletişim bölümündeki form veya <b>info@yolcutransferi.com</b> e‑posta adresiyle başvurabilirsiniz. Talebiniz, en geç 30 gün içinde sonuçlandırılır :contentReference[oaicite:1]{index=1}.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Politika Güncelleme</h2>
            <p>
              Bu politika gerektiğinde güncellenebilir. Yürürlük tarihi: <b>{new Date().toLocaleDateString("tr-TR")}</b>.
            </p>
          </div>
        </div>

        {/* Dikkat çekici çağrı */}
        <div className="pt-3 border-t border-[#bfa658] text-[#ffeec2]">
          Gizlilik Politikamızı okuyarak haklarınız hakkında bilgi sahibi oldunuz. Haklarınızı kullanmak veya başvuru yapmak için aşağıdaki butonu kullanabilirsiniz.
        </div>

        {/* Başvuru butonu */}
        <div className="flex justify-start mt-8">
          <Link
            href="/kvkk/form"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Başvuru Formu Doldur
          </Link>
        </div>
      </section>
    </main>
  );
}
