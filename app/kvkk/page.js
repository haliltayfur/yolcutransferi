"use client";
import Link from "next/link";

export default function Kvkk() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Başlık */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#bfa658] mb-8 tracking-tight">
        KVKK Politikası ve Aydınlatma Metni
      </h1>

      {/* Metin Kutusu */}
      <div className="border-2 border-[#bfa658] rounded-2xl bg-black/80 px-4 md:px-8 py-8 text-white text-lg leading-relaxed shadow">
        <p>
          <b>YolcuTransferi.com</b> olarak kişisel verilerinizin korunmasına büyük önem veriyoruz. 
          Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) ve ilgili mevzuat kapsamında, aşağıda belirtilen esaslara uygun olarak işlenmektedir.
        </p>

        <h2 className="text-2xl font-semibold text-[#bfa658] mt-6 mb-2">1. Veri Sorumlusu</h2>
        <p>
          YolcuTransferi.com olarak, tarafımıza iletilen veya sistemlerimiz aracılığıyla toplanan kişisel verilerin korunmasından sorumluyuz.
        </p>

        <h2 className="text-2xl font-semibold text-[#bfa658] mt-6 mb-2">2. Kişisel Verilerin İşlenme Amaçları</h2>
        <p>
          Kişisel verileriniz; rezervasyon işlemleri, hizmet taleplerinizin yerine getirilmesi, müşteri ilişkileri yönetimi, yasal yükümlülüklerimizin yerine getirilmesi, pazarlama ve analiz faaliyetleri kapsamında işlenmektedir.
        </p>

        <h2 className="text-2xl font-semibold text-[#bfa658] mt-6 mb-2">3. Kişisel Verilerin Aktarılması</h2>
        <p>
          Kişisel verileriniz, yasal yükümlülüklerimizin gerektirdiği veya hizmet gereği anlaşmalı olduğumuz üçüncü kişilerle, yetkili kamu kurum ve kuruluşlarıyla paylaşılabilir.
        </p>

        <h2 className="text-2xl font-semibold text-[#bfa658] mt-6 mb-2">4. Kişisel Verilerinizin Toplanma Yöntemi ve Hukuki Sebepler</h2>
        <p>
          Kişisel verileriniz; web sitemiz, mobil uygulamalar, çağrı merkezi, e-posta ve benzeri kanallar aracılığıyla otomatik veya otomatik olmayan yollarla toplanabilir.
          Hukuki sebepler, sözleşmenin kurulması ve ifası, açık rıza, yasal yükümlülüklerin yerine getirilmesi ve meşru menfaatlerimizdir.
        </p>

        <h2 className="text-2xl font-semibold text-[#bfa658] mt-6 mb-2">5. KVKK Kapsamındaki Haklarınız</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Kişisel verinizin işlenip işlenmediğini öğrenme,</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
          <li>Verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
          <li>Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri bilme,</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
          <li>Mevzuatta öngörülen şartlar çerçevesinde silinmesini/yok edilmesini isteme,</li>
          <li>Aktarılan üçüncü kişilere yapılan işlemlerin bildirilmesini isteme,</li>
          <li>İşlemenin hukuka aykırı olması nedeniyle zarara uğrarsanız tazminat talep etme.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-[#bfa658] mt-6 mb-2">6. Başvuru ve İletişim</h2>
        <p>
          KVKK kapsamındaki haklarınızı kullanmak veya detaylı bilgi almak için <Link href="/iletisim" className="underline text-[#FFD700]">İletişim</Link> sayfamız üzerinden bizimle irtibata geçebilirsiniz.
        </p>
        <p className="mt-6 text-sm text-[#bfa658]">
          Güncel tarih: {new Date().toLocaleDateString("tr-TR")}
        </p>
      </div>
    </main>
  );
}
