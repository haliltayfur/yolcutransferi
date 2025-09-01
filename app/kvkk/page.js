// app/kvkk/page.js
"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-2 text-center">
          KVKK Aydınlatma Metni
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Kişisel verilerinizin gizliliği ve güvenliği, önceliğimizdir.
        </div>

        {/* İçerik */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">
          {/* Giriş */}
          <section>
            <p>
              Bu Aydınlatma Metni, 6698 sayılı <b>Kişisel Verilerin Korunması Kanunu</b> (“KVKK”) uyarınca, veri sorumlusu
              sıfatıyla <b>YolcuTransferi.com</b> tarafından kişisel verilerinizin işlenmesine ilişkin usul ve esaslar hakkında
              bilgi vermek amacıyla hazırlanmıştır.
            </p>
          </section>

          {/* Veri Sorumlusu ve İletişim */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Veri Sorumlusu</h2>
            <p>
              Kişisel verileriniz, veri sorumlusu <b>YolcuTransferi.com</b> tarafından KVKK ve ilgili mevzuata uygun olarak
              işlenmektedir. Her türlü talep ve başvurularınız için{" "}
              <Link href="/iletisim" className="underline text-[#ffeec2] hover:text-[#bfa658]">İletişim</Link>{" "}
              sayfamızdan bize ulaşabilirsiniz.
            </p>
          </section>

          {/* İşlenen Veriler ve Amaçlar */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">İşlenen Kişisel Veriler ve İşleme Amaçları</h2>
            <p className="mb-2">
              Aşağıdaki kişisel veri kategorileri, hizmetlerimizin sunulması ve iyileştirilmesi amacıyla işlenebilir:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Kimlik ve iletişim bilgileri (ad-soyad, telefon, e-posta),</li>
              <li>Rezervasyon ve transfer bilgileri (tarih, saat, rota, araç tercihi),</li>
              <li>İşlem güvenliği ve log kayıtları (IP, cihaz bilgisi, işlem zamanı),</li>
              <li>Ödeme ve faturalandırmaya ilişkin sınırlı veriler (işlem tutarı, ödeme zamanı),</li>
              <li>Müşteri destek kayıtları ve talep içerikleri.</li>
            </ul>
            <p className="mt-2">
              Verileriniz; rezervasyon süreçlerinin yürütülmesi, müşteri ilişkileri ve destek hizmetleri, sözleşmesel yükümlülüklerin
              ifası, finans ve muhasebe işlemleri, bilgi güvenliği, yasal yükümlülüklerin yerine getirilmesi ve hizmet kalitesinin
              artırılması amaçlarıyla işlenir.
            </p>
          </section>

          {/* Toplama Yöntemi ve Hukuki Sebepler */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Toplama Yöntemi ve Hukuki Sebepler</h2>
            <p className="mb-2">
              Kişisel verileriniz; web sitemiz ve formlar, çağrı merkezi ve dijital iletişim kanalları (ör. WhatsApp, e-posta),
              mobil uygulamalar ve müşteri destek süreçleri aracılığıyla, elektronik veya fiziki ortamlarda elde edilir.
            </p>
            <p>
              İşleme faaliyetleri; KVKK’nın 5/2 (a, c, ç, e, f) bentleri kapsamında <i>kanunlarda açıkça öngörülmesi</i>,
              <i> sözleşmenin kurulması veya ifası</i>, <i>veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi</i>,
              <i> bir hakkın tesisi, kullanılması veya korunması</i> ve <i>meşru menfaat</i> hukuki sebeplerine dayanır.
              Gerekli hallerde 5/1 uyarınca <i>açık rızanız</i> alınır.
            </p>
          </section>

          {/* Aktarım */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Kişisel Verilerin Aktarımı</h2>
            <p className="mb-2">
              Verileriniz; hizmetin ifası için zorunlu olduğu ölçüde ve KVKK’ya uygun olarak aşağıdaki taraflarla
              paylaşılabilir:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Yetkili çözüm ortakları ve tedarikçiler (barındırma, altyapı, çağrı merkezi, SMS/e-posta hizmetleri),</li>
              <li>Ödeme kuruluşları ve finansal kuruluşlar (ödeme işlemlerinin yürütülmesi için),</li>
              <li>Hukuken yetkili kamu kurum ve kuruluşları ile denetim mercileri.</li>
            </ul>
            <p className="mt-2">
              Yurt dışına aktarım ihtiyacı doğarsa, ilgili mevzuat hükümlerine uygun hukuki zemin sağlanmadan aktarım yapılmaz.
            </p>
          </section>

          {/* Saklama Süreleri */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Saklama Süreleri</h2>
            <p>
              Kişisel verileriniz; ilgili mevzuatta öngörülen süreler ve zorunlu saklama yükümlülükleri dikkate alınarak,
              işleme amaçları için gerekli olan azami süre boyunca muhafaza edilir. Sürelerin sona ermesiyle verileriniz
              silinir, yok edilir veya anonim hâle getirilir.
            </p>
          </section>

          {/* Haklarınız (KVKK m.11) */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-2">Haklarınız (KVKK m. 11)</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Verilerinizin işlenip işlenmediğini öğrenme ve bilgi talep etme,</li>
              <li>İşleme amaçlarını ve bu amaçlara uygun kullanımı öğrenme,</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
              <li>Eksik veya yanlış işlenen verilerin düzeltilmesini isteme,</li>
              <li>KVKK’da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
              <li>Yapılan işlemlerin aktarım yapılan üçüncü kişilere bildirilmesini talep etme,</li>
              <li>Otomatik işlemlerle analiz sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde tazminat talep etme.</li>
            </ul>
            <p className="mt-2">
              Haklarınıza ilişkin taleplerinizi aşağıdaki başvuru formu aracılığıyla iletebilirsiniz.
            </p>
          </section>
        </div>

        {/* Başvuru Butonu */}
        <div className="flex justify-center mt-10">
          <Link
            href="/kvkk/form"
            className="py-3 px-8 rounded-2xl bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg shadow-md border border-[#fff6ce] hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] transition"
          >
            KVKK Talep / Başvuru Formu
          </Link>
        </div>
      </section>
    </main>
  );
}
