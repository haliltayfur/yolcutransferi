"use client";

export default function Cerez() {
  return (
    <main className="flex justify-center items-center min-h-[85vh] bg-black">
      <section className="w-full max-w-3xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-12 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-10 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-2 text-center">
          Çerez (Cookie) Politikası
        </h1>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">

          <p>
            <b>YolcuTransferi.com</b> olarak; kullanıcı deneyiminizi iyileştirmek, site güvenliğini sağlamak ve hizmetlerimizi geliştirmek için çerezler kullanıyoruz. Çerezler, internet sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır.
          </p>

          <p>
            Çerezler; web sitemizi daha etkili, güvenli ve kişiselleştirilmiş şekilde sunmamıza olanak tanır. Ayrıca tercihlerinizi ve oturum bilgilerinizi hatırlayarak tekrar ziyaretinizde işlemleri kolaylaştırır, istatistiksel analiz ve performans ölçümü yapmamıza destek olur.
          </p>

          <p>
            Web sitemizde kullandığımız çerez türleri şunlardır:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><b>Zorunlu Çerezler:</b> Sitenin temel fonksiyonlarının sağlıklı çalışması için gereklidir. Oturum açma, rezervasyon gibi işlemler için zorunludur.</li>
            <li><b>İşlevsel ve Analitik Çerezler:</b> Tercihlerinizi hatırlar, kullanım istatistiklerini toplar ve kullanıcı deneyimini optimize eder.</li>
            <li><b>Reklam ve Takip Çerezleri:</b> İlgi alanlarınıza uygun içerik ve reklamların gösterilmesini sağlar. (Yalnızca onayınız ile aktif olur.)</li>
          </ul>

          <p>
            Çerez tercihlerinizi tarayıcı ayarlarınızdan istediğiniz zaman yönetebilir, bazılarını silebilir veya engelleyebilirsiniz. Çerez kullanımını kapatmanız durumunda, web sitemizin bazı işlevlerinin kısıtlanabileceğini unutmayın.
          </p>

          <p>
            Sitemizi kullanmaya devam ederek <span className="policy-link">Çerez Politikamızı</span> ve <span className="policy-link">Gizlilik Politikamızı</span> kabul etmiş olursunuz. Detaylı bilgi için <a href="mailto:info@yolcutransferi.com" className="policy-link">info@yolcutransferi.com</a> adresinden bize ulaşabilirsiniz.
          </p>
        </div>
        {/* Style - KVKK ile uyumlu */}
        <style jsx>{`
          .policy-link {
            color: #ffeec2;
            border-bottom: 1.5px dashed #ffeec2;
            text-decoration: none;
            transition: border-bottom .14s, color .14s;
            cursor: pointer;
            padding-bottom: 2px;
          }
          .policy-link:hover {
            color: #bfa658;
            border-bottom: 2px solid #bfa658;
          }
        `}</style>
      </section>
    </main>
  );
}
