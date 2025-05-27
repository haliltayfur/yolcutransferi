"use client";

export default function IadePage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          İptal ve İade Politikası
        </h1>
        <div className="text-gray-200 text-sm flex flex-col gap-5 leading-6">
          <p>
            <b>1. Genel Esaslar</b><br/>
            yolcutransferi.com üzerinden oluşturulan tüm transfer rezervasyonları, müşteri tarafından belirtilen tarih, saat ve güzergahta yerine getirilmek üzere kayda alınır. Her rezervasyonun yürürlüğe girmesi için ön ödeme veya tam ödeme gereklidir.
          </p>
          <p>
            <b>2. İptal Şartları</b><br/>
            <b>Transfer saatinden en az <span className="text-gold">6 saat</span> önce</b> yapılan iptal başvurularında, ödenen tutarın tamamı kesintisiz şekilde iade edilir.<br/>
            <b>Transfer saatine 6 saatten az kala</b> yapılan iptallerde veya yolcu gelmediğinde, ücretin tamamı <span className="text-gold">hizmet bedeli</span> olarak tahsil edilir ve iade yapılmaz.
          </p>
          <p>
            <b>3. Değişiklik Talepleri</b><br/>
            Transfer saatinden en geç <span className="text-gold">6 saat önce</span> bildirilmek koşuluyla güzergah veya tarih değişikliği mümkündür. 6 saatten az süre kalmışsa değişiklik hakkı <b>sunulmaz</b>.
          </p>
          <p>
            <b>4. Özel Durumlar ve Havaalanı Transferleri</b><br/>
            Uçuş iptali veya resmi engel nedeniyle belge ile bildirilen durumlar hariç, aksi takdirde yukarıdaki kurallar geçerlidir. Uçuş kaynaklı resmi belgelerle yapılan başvurular incelenir ve uygun görülürse iade yapılır.
          </p>
          <p>
            <b>5. İade Süresi</b><br/>
            Onaylanan iade işlemleri, en geç <b>10 iş günü</b> içinde müşterinin ödeme yaptığı karta veya banka hesabına gerçekleştirilir.
          </p>
        </div>
        <p className="text-xs text-center text-gray-400 mt-8">
          © 2025 YolcuTransferi.com — Tüm hakları saklıdır.
        </p>
      </section>
    </main>
  );
}
