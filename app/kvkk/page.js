"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık ve slogan */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          KVKK Politikası
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Kişisel Verileriniz Güvende, Tüm Haklarınız Bizimle Güvende!
        </div>

        {/* Tüm içerik tek tip sola yaslı */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            YolcuTransferi.com, Türkiye Cumhuriyeti kanunlarına uygun ve KVKK mevzuatına tam uyumlu hizmet sunar. 
            Kişisel verileriniz, en üst düzey güvenlik ve gizlilik önlemleriyle korunur. 
            VIP yolculuk bilgileriniz, şifreli sunucularda saklanır ve yasal zorunluluk dışında asla paylaşılmaz, hiçbir pazarlama amacıyla kullanılmaz.
          </p>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Sorumlusu</h2>
            <p>
              YolcuTransferi.com, müşterilerimizin kişisel verilerini azami güvenlik ve KVKK mevzuatına uygun şekilde korur.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri İşleme Amaçlarımız</h2>
            <p>
              Kişisel verileriniz; transfer rezervasyonlarınız, müşteri deneyimi ve güvenli hizmet için yasal zorunluluklar çerçevesinde işlenir.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Veri Aktarımı</h2>
            <p>
              Verileriniz, hizmet süreçlerimiz ve mevzuat gereği, sadece yetkili ve gizlilik taahhütlü üçüncü taraflarla paylaşılır.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">Toplanma Yöntemi & Hukuki Sebep</h2>
            <p>
              Web sitemiz, mobil uygulamalar ve destek hatlarımız üzerinden; sözleşme, açık rıza ve yasal zorunluluklar kapsamında verilerinizi toplarız.
            </p>
          </div>

          <div>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">KVKK Haklarınız</h2>
            <ul className="list-disc pl-6 text-[#ffeec2]">
              <li>İşlenip işlenmediğini öğrenme</li>
              <li>Bilgi talep etme</li>
              <li>Amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmişse düzeltme</li>
              <li>Silinmesini/yok edilmesini isteme</li>
              <li>Hukuka aykırı işlenme nedeniyle tazminat talep etme</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-[#bfa658] text-[#ffeec2]">
            KVKK kapsamındaki haklarınızı kullanmak veya başvuruda bulunmak için aşağıdaki butonu kullanarak başvuru formuna ulaşabilirsiniz.<br />
            Tüm başvurularınıza <b>en geç 30 gün içinde</b> yanıt verilir.
          </div>
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
