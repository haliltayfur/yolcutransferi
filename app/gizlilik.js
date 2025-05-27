"use client";

export default function GizlilikPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Gizlilik ve Güvenlik Politikası
        </h1>
        <div className="text-gray-200 text-sm flex flex-col gap-5 leading-6">
          <p>
            <b>1. Genel İlkeler</b><br/>
            yolcutransferi.com, tüm kullanıcılarının gizliliğini ve kişisel verilerinin korunmasını en üst düzeyde tutar. Web sitemiz üzerinden verdiğiniz tüm bilgiler güvenli SSL altyapısı ile korunur.
          </p>
          <p>
            <b>2. Toplanan Bilgiler</b><br/>
            Rezervasyon ve iletişim formlarında ad, soyad, e-posta, telefon ve yolculuk bilgileriniz alınır. Ekstra hiçbir kişisel veri veya ödeme bilgisi üçüncü kişilerle paylaşılmaz.
          </p>
          <p>
            <b>3. Bilgi Güvenliği</b><br/>
            Kredi kartı ödemeleri, bağımsız ödeme altyapısı (İyzico, Craftgate, PayTR vb.) ile alınır. Hiçbir kart bilgisi yolcutransferi.com sunucularında tutulmaz.
          </p>
          <p>
            <b>4. Bilgi Paylaşımı</b><br/>
            Bilgileriniz yalnızca yasal zorunluluk veya hizmet sunumu için iş ortaklarımız (şoför, çağrı merkezi) ile sınırlı paylaşılır. Hiçbir ticari amaçla satılmaz veya üçüncü kişilere aktarılmaz.
          </p>
          <p>
            <b>5. Çerezler ve Takip</b><br/>
            Siteyi ziyaret ettiğinizde, kullanıcı deneyimini geliştirmek için minimum düzeyde çerez kullanılabilir. Detaylar için Çerez Politikası'nı inceleyiniz.
          </p>
          <p>
            <b>6. İletişim ve Değişiklik</b><br/>
            Gizlilik politikamızda değişiklik olduğunda, bu sayfa güncellenir. Her türlü soru ve talepleriniz için info@yolcutransferi.com adresinden bize ulaşabilirsiniz.
          </p>
        </div>
        <p className="text-xs text-center text-gray-400 mt-8">
          © 2025 YolcuTransferi.com — Gizlilik ve güvenliğiniz önceliğimizdir.
        </p>
      </section>
    </main>
  );
}
