"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto bg-gradient-to-br from-black via-[#19160a] to-[#302811] border border-[#bfa658] rounded-3xl shadow-2xl p-8 md:p-14 mt-16 mb-10">
        {/* VIP başlık ve slogan */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] mb-2 tracking-tight">
            KVKK Politikası
          </h1>
          <div className="text-lg md:text-xl font-semibold text-[#ffeec2] mb-1">
            Kişisel Verileriniz Güvende, Tüm Haklarınız Bizimle Güvende!
          </div>
          <div className="text-base text-[#e4c275] font-medium mb-3">
            Lüks yolculukta olduğu gibi, gizliliğinizde de VIP standartlar!
          </div>
        </div>

        {/* Kurumsal güven ve teknik güvenlik */}
        <div className="mb-4 text-base text-[#e6d199] text-center font-medium">
          YolcuTransferi.com, <b>Türkiye Cumhuriyeti kanunlarına uygun</b> ve <b>KVKK mevzuatına tam uyumlu</b> hizmet sunar.
          Kişisel verileriniz, <b>en üst düzey güvenlik</b> ve gizlilik önlemleriyle korunur.
        </div>
        <div className="mb-6 text-[15px] text-[#c9bb90] border border-[#bfa658] rounded-xl bg-black/60 p-3 text-center font-normal">
          VIP yolculuk bilgileriniz ve tüm kişisel talepleriniz %100 gizlilikle, şifreli sunucularda saklanır.<br />
          Yasal zorunluluk dışında <b>asla paylaşılmaz</b> ve hiçbir zaman pazarlama amacıyla kullanılmaz.
        </div>

        {/* KVKK ana içerik */}
        <div className="space-y-4 text-base text-[#f2ecd3] leading-relaxed">
          <div>
            <h2 className="text-lg font-bold text-[#bfa658] mb-1">Veri Sorumlusu</h2>
            <p className="font-normal">
              YolcuTransferi.com, müşterilerimizin kişisel verilerini azami güvenlik ve KVKK mevzuatına uygun şekilde korur.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#bfa658] mb-1">Veri İşleme Amaçlarımız</h2>
            <p className="font-normal">
              Kişisel verileriniz; transfer rezervasyonlarınız, müşteri deneyimi ve güvenli hizmet için yasal zorunluluklar çerçevesinde işlenir.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#bfa658] mb-1">Veri Aktarımı</h2>
            <p className="font-normal">
              Verileriniz, hizmet süreçlerimiz ve mevzuat gereği, sadece yetkili ve gizlilik taahhütlü üçüncü taraflarla paylaşılır.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#bfa658] mb-1">Toplanma Yöntemi & Hukuki Sebep</h2>
            <p className="font-normal">
              Web sitemiz, mobil uygulamalar ve destek hatlarımız üzerinden; sözleşme, açık rıza ve yasal zorunluluklar kapsamında verilerinizi toplarız.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#bfa658] mb-1">KVKK Haklarınız</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li>İşlenip işlenmediğini öğrenme</li>
              <li>Bilgi talep etme</li>
              <li>Amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmişse düzeltme</li>
              <li>Silinmesini/yok edilmesini isteme</li>
              <li>Hukuka aykırı işlenme nedeniyle tazminat talep etme</li>
            </ul>
          </div>
        </div>

        {/* Başvuru cümlesi ve buton */}
        <div className="mt-8 text-base text-[#ffeec2] text-center font-medium">
          KVKK kapsamındaki haklarınızı kullanmak veya başvuruda bulunmak için aşağıdaki butonu kullanarak başvuru formuna ulaşabilirsiniz.<br />
          Tüm başvurularınıza <b>en geç 30 gün içinde</b> yanıt verilir.
        </div>

        <div className="flex justify-center mt-5 border-t border-[#a38c40] pt-7">
          <Link
            href="/kvkk/form"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-lg transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Başvuru Formu Doldur
          </Link>
        </div>

        {/* İngilizce bilgi alanı (isteğe bağlı) */}
        <div className="mt-8 text-xs text-[#a18b57] text-center">
          For English information about our data protection policy, please contact us via <b>info@yolcutransferi.com</b>
        </div>
      </section>
    </main>
  );
}
