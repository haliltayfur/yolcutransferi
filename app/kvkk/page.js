"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-2xl mx-auto bg-gradient-to-br from-black via-[#19160a] to-[#302811] border border-[#bfa658] rounded-3xl shadow-2xl p-8 md:p-14 mt-16 mb-10">
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

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 border-t border-[#a38c40] pt-8">
          <Link
            href="/kvkk/form"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-lg transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Başvuru Formu Doldur
          </Link>
          <span className="text-sm text-[#c7b585]">
            Detaylı bilgi için: <b>info@yolcutransferi.com</b>
          </span>
        </div>
      </section>
    </main>
  );
}
