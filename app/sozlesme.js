"use client";

export default function SozlesmePage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Mesafeli Satış Sözleşmesi
        </h1>
        <div className="text-gray-200 text-sm flex flex-col gap-5 leading-6">
          <p><b>1. TARAFLAR</b><br/>
            Bu sözleşme, yolcutransferi.com web sitesi üzerinden hizmet alan <b>KULLANICI</b> ile, hizmeti sunan <b>YOLCUTRANSFERİ.COM</b> arasında elektronik ortamda kurulmuştur.
          </p>
          <p>
            <b>2. KONU</b><br/>
            İşbu sözleşmenin konusu, yolcutransferi.com üzerinden online olarak satın alınan yolcu transfer hizmetinin esaslarını ve tarafların haklarını/yükümlülüklerini belirlemektir.
          </p>
          <p>
            <b>3. HİZMET DETAYLARI</b><br/>
            Müşteri, seçtiği güzergah, tarih, saat ve araç tipine göre rezervasyon yapar. Fiyatlandırma online olarak gösterilir ve tüm yasal vergiler, hizmet ve komisyonlar dahildir.
          </p>
          <p>
            <b>4. İPTAL VE İADE KOŞULLARI</b><br/>
            Müşteri, rezervasyon saatinden en geç 12 saat önce iptal talebini bildirdiği takdirde, ödediği ücretin tamamını kesintisiz olarak iade alma hakkına sahiptir. Aksi durumda, bir hizmet bedeli/ceza uygulanabilir.
          </p>
          <p>
            <b>5. ÖDEME</b><br/>
            Ödemeler kredi kartı, sanal pos, havale/EFT veya kapıda nakit olarak alınabilir. Online ödeme sonrası, işlem sonucu ve e-fatura müşteriye iletilir.
          </p>
          <p>
            <b>6. KİŞİSEL VERİLER</b><br/>
            Kullanıcının rezervasyon sırasında verdiği tüm bilgiler gizli tutulur, üçüncü şahıslarla paylaşılmaz ve yalnızca hizmet için işlenir. Gizlilik detayları için Gizlilik Politikası'na bakınız.
          </p>
          <p>
            <b>7. YETKİLİ MAHKEME</b><br/>
            Sözleşmeden doğan her türlü anlaşmazlıkta İstanbul Anadolu Mahkemeleri ve İcra Daireleri yetkilidir.
          </p>
          <p>
            <b>8. YÜRÜRLÜK</b><br/>
            Kullanıcı, rezervasyon formunu doldurup göndermekle işbu sözleşmenin tüm hükümlerini kabul etmiş sayılır.
          </p>
        </div>
        <p className="text-xs text-center text-gray-400 mt-8">
          © 2025 YolcuTransferi.com — Tüm hakları saklıdır.
        </p>
      </section>
    </main>
  );
}
