"use client";

export default function CerezPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-3xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Çerez Politikası
        </h1>
        <div className="text-gray-200 text-sm flex flex-col gap-5 leading-6">
          <p>
            <b>1. Çerez (Cookie) Nedir?</b><br/>
            Çerezler; web sitesini ziyaret ettiğinizde tarayıcınızda depolanan küçük metin dosyalarıdır. Kullanıcı deneyimini iyileştirmek ve site performansını artırmak amacıyla kullanılabilir.
          </p>
          <p>
            <b>2. Kullanılan Çerezler</b><br/>
            yolcutransferi.com’da; sadece oturum açma, dil tercihi ve ziyaretçi istatistikleri gibi zorunlu ve anonim çerezler kullanılmaktadır. Üçüncü taraf reklam veya hedefleme çerezleri kullanılmaz.
          </p>
          <p>
            <b>3. Çerezlerin Yönetimi</b><br/>
            Tarayıcı ayarlarınızdan çerezleri engelleyebilir veya silebilirsiniz. Ancak bazı çerezleri reddetmeniz, site işlevlerinde kısıtlamalara yol açabilir.
          </p>
          <p>
            <b>4. Veri Güvenliği</b><br/>
            Tüm çerezler SSL ile güvenli ortamda saklanır ve hiçbir kişisel veri üçüncü kişilerle paylaşılmaz.
          </p>
          <p>
            <b>5. Değişiklikler</b><br/>
            Çerez politikamızda değişiklik olursa, bu sayfa üzerinden duyurulur.
          </p>
          <p>
            Detaylı bilgi ve talepleriniz için <b>info@yolcutransferi.com</b> adresine yazabilirsiniz.
          </p>
        </div>
        <p className="text-xs text-center text-gray-400 mt-8">
          © 2025 YolcuTransferi.com — Tüm hakları saklıdır.
        </p>
      </section>
    </main>
  );
}
