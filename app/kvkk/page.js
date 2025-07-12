"use client";
import { useRouter } from "next/navigation";

export default function Kvkk() {
  const router = useRouter();

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-3xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-14 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* BAŞLIK */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#FFD700] tracking-tight mb-8 text-center leading-tight uppercase drop-shadow">
          KVKK AYDINLATMA METNİ
        </h1>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">
          <p>
            <b>YolcuTransferi.com</b> olarak kişisel verilerinizin gizliliğine ve güvenliğine en üst düzeyde önem veriyoruz.
            Bu aydınlatma metni, 6698 sayılı <b>Kişisel Verilerin Korunması Kanunu</b> (“KVKK”) kapsamında, kişisel verilerinizin işlenmesine ilişkin amaç, kapsam, saklama süresi ve haklarınız hakkında sizi bilgilendirmek için hazırlanmıştır.
          </p>
          <p>
            <b>Kişisel Verilerinizi Kim İşler?</b><br />
            Kişisel verileriniz, veri sorumlusu sıfatıyla <b>YolcuTransferi.com</b> tarafından ve ilgili mevzuata uygun şekilde, güvenli ortamda işlenmektedir. Hizmet gereklilikleri doğrultusunda, yasal yükümlülükler kapsamında iş ortaklarımız ve yetkilendirilmiş üçüncü kişilerle paylaşılabilir.
          </p>
          <p>
            <b>Hangi Verileriniz, Ne Amaçla İşlenir ve Kimlerle Paylaşılır?</b><br />
            Transfer ve rezervasyon hizmetlerinin sağlanması, müşteri memnuniyeti, pazarlama, yasal yükümlülüklerin yerine getirilmesi amaçlarıyla;
            <ul className="list-disc ml-6">
              <li>Ad, soyad, e-posta, telefon, transfer/rezervasyon bilgisi, IP adresi, işlem geçmişi ve iletişim kayıtlarınız</li>
            </ul>
            sadece yukarıda sayılan amaçlarla, iş ortaklarımız ve ilgili hizmet sağlayıcılarla paylaşılabilir.
          </p>
          <p>
            <b>Verileriniz Hangi Yöntemlerle Toplanır?</b><br />
            Kişisel verileriniz, web sitemiz, mobil uygulamalarımız, çağrı merkezi, WhatsApp, sosyal medya, rezervasyon ve iletişim formları üzerinden; sözlü, yazılı ya da elektronik ortamda toplanabilir.
          </p>
          <p>
            <b>Toplamanın Hukuki Sebebi Nedir?</b><br />
            KVKK'nın 5. ve 6. maddelerine uygun olarak; yasal yükümlülük, sözleşme kurulması/ifası, meşru menfaatlerimizin korunması, açık rızanızın bulunması gibi hukuki sebeplerle verileriniz işlenebilir.
          </p>
          <p>
            <b>Verileriniz Ne Kadar Saklanır?</b><br />
            Verileriniz, mevzuatta öngörülen süreler boyunca ve amaçla sınırlı olarak saklanır. Süre sonunda verileriniz silinir, yok edilir veya anonimleştirilir.
          </p>
          <p>
            <b>Haklarınız Nelerdir?</b><br />
            KVKK’nın 11. maddesi gereğince, veri işlenip işlenmediğini öğrenme, düzeltilmesini, silinmesini/yok edilmesini, üçüncü kişilere bildirilmesini talep etme; otomatik sistemlerle analiz sonucu çıkan sonuca itiraz etme ve zarar oluşmuşsa giderilmesini isteme gibi tüm haklara sahipsiniz.<br />
            Başvurularınız için aşağıdaki formu doldurabilirsiniz.
          </p>
        </div>
        {/* EN ALTTAKİ FORM BUTONU */}
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={() => router.push("/kvkk/form")}
            className="py-3 px-10 rounded-2xl bg-gradient-to-tr from-[#FFD700] to-[#bfa658] text-black font-extrabold text-lg shadow-lg border-2 border-[#bfa658] hover:scale-105 transition"
          >
            KVKK Talep / Başvuru Formu
          </button>
        </div>
      </section>
    </main>
  );
}
