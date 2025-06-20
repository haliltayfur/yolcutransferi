"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto bg-gradient-to-br from-black via-[#19160a] to-[#302811] border border-[#bfa658] rounded-3xl shadow-2xl p-8 md:p-14 mt-16 mb-10">
        {/* VIP güvenlik ve kurumsal güven vurgusu */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#bfa658] tracking-tight drop-shadow-lg text-center mb-2">
            KVKK Politikası
          </h1>
          <div className="text-lg md:text-xl text-[#fffbe7] font-medium text-center mb-4">
            <span className="inline-block border-b-2 border-[#bfa658] pb-1 px-4">
              Kişisel Verileriniz Güvende, Tüm Haklarınız Bizimle Güvende!
            </span>
          </div>
          <p className="text-base md:text-lg text-[#e4c275] text-center mb-1">
            Lüks yolculukta olduğu gibi, gizliliğinizde de VIP standartlar!
          </p>
        </div>

        {/* Kurumsal ve yasal güven mesajı */}
        <div className="mb-4 text-base text-[#e6d199] text-center font-medium">
          YolcuTransferi.com, <b>Türkiye Cumhuriyeti kanunlarına uygun</b> ve <b>KVKK mevzuatına tam uyumlu</b> hizmet sunar.<br />
          Kişisel verileriniz, <b>en üst düzey güvenlik</b> ve gizlilik önlemleriyle korunur.
        </div>

        {/* VIP gizlilik ve teknik güvenlik garantisi */}
        <div className="mb-6 text-sm text-[#c9bb90] border border-[#bfa658] rounded-xl bg-black/60 p-4 text-center font-light">
          VIP yolculuk bilgileriniz ve tüm kişisel talepleriniz %100 gizlilikle, şifreli sunucularda saklanır.<br />
          Yasal zorunluluk dışında <b>asla paylaşılmaz</b> ve asla pazarlama amacıyla kullanılmaz.
        </div>

        {/* KVKK ana metin */}
        <div className="space-y-6 text-base text-[#f2ecd3] leading-relaxed font-light">
          <div>
            <h2 className="text-[#bfa658] font-semibold text-xl mb-1">Veri Sorumlusu</h2>
            <p>
              YolcuTransferi.com, müşterilerimizin kişisel verilerini azami güvenlik ve KVKK mevzuatına uygun şekilde korur.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-semibold text-xl mb-1">Veri İşleme Amaçlarımız</h2>
            <p>
              Kişisel verileriniz; transfer rezervasyonlarınız, müşteri deneyimi ve güvenli hizmet için yasal zorunluluklar çerçevesinde işlenir.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-semibold text-xl mb-1">Veri Aktarımı</h2>
            <p>
              Verileriniz, hizmet süreçlerimiz ve mevzuat gereği, sadece yetkili ve gizlilik taahhütlü üçüncü taraflarla paylaşılır.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-semibold text-xl mb-1">Toplanma Yöntemi & Hukuki Sebep</h2>
            <p>
              Web sitemiz, mobil uygulamalar ve destek hatlarımız üzerinden; sözleşme, açık rıza ve yasal zorunluluklar kapsamında verilerinizi toplarız.
            </p>
          </div>
          <div>
            <h2 className="text-[#bfa658] font-semibold text-xl mb-1">KVKK Haklarınız</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>İşlenip işlenmediğini öğrenme</li>
              <li>Bilgi talep etme</li>
              <li>Amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmişse düzeltme</li>
              <li>Silinmesini/yok edilmesini isteme</li>
              <li>Hukuka aykırı işlenme nedeniyle tazminat talep etme</li>
            </ul>
          </div>
        </div>

        {/* Form ve başvuru süreci açıklaması */}
        <div className="mt-8 text-base text-[#ffeec2] text-center font-medium">
          KVKK kapsamındaki haklarınızı kullanmak veya başvuruda bulunmak için aşağıdaki formu doldurabilirsiniz. <br />
          Tüm başvurularınıza <b>en geç 30 gün içinde</b> yanıt verilir.
        </div>

        {/* Buton */}
        <div className="flex justify-center mt-5 border-t border-[#a38c40] pt-8">
          <Link
            href="/kvkk/form"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-lg transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Başvuru Formu Doldur
          </Link>
        </div>

        {/* İngilizce bilgi alanı (isteğe bağlı, kaldırılabilir) */}
        <div className="mt-8 text-xs text-[#a18b57] text-center">
          For English information about our data protection policy, please contact us via <b>info@yolcutransferi.com</b>
        </div>
      </section>
    </main>
  );
}
