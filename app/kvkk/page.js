"use client";
import { useState } from "react";

export default function Kvkk() {
  const [onay, setOnay] = useState(false);

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-3 text-center">
          KİŞİSEL VERİLERİN KORUNMASI KANUNU <br /> AYDINLATMA METNİ
        </h1>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">

          <p>
            <b>YolcuTransferi.com</b> olarak kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu aydınlatma metni, 6698 Sayılı <b>Kişisel Verilerin Korunması Kanunu</b> (“KVKK”) kapsamında, kişisel verilerinizin işlenmesine ilişkin amaç, kapsam, saklama süresi ve haklarınız hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
          </p>

          <p>
            <b>Kişisel Verilerinizi Kim İşleyecek?</b><br />
            Kişisel verileriniz, veri sorumlusu sıfatıyla <b>YolcuTransferi.com</b> tarafından ve ilgili mevzuata uygun şekilde, gerekli güvenlik önlemleri alınarak işlenmektedir. Hizmet süreçlerinde gerekli olduğu ölçüde, iş ortaklarımız ve yetkilendirilmiş veri işleyenler ile de paylaşılabilir.
          </p>

          <p>
            <b>Hangi Kişisel Veriler Ne Amaçla İşlenir ve Kimlerle Paylaşılır?</b><br />
            Transfer ve rezervasyon hizmetlerimizin sunulabilmesi, müşteri ilişkilerinin yönetimi, yasal yükümlülüklerin yerine getirilmesi, pazarlama ve memnuniyet çalışmaları kapsamında;<br />
            <ul className="list-disc ml-6">
              <li>Ad, soyad, e-posta adresi, telefon numarası, rezervasyon ve transfer bilgileri,</li>
              <li>IP adresi, işlem geçmişi ve iletişim kayıtlarınız</li>
            </ul>
            Şirketimiz ve yurt içi/yurt dışındaki iş ortaklarımız ile yalnızca yukarıda belirtilen amaçlarla paylaşılır.
          </p>

          <p>
            <b>Kişisel Verileriniz Hangi Yöntemlerle Toplanır?</b><br />
            Kişisel verileriniz; www.yolcutransferi.com web sitesi, mobil uygulamalarımız, çağrı merkezi, WhatsApp, sosyal medya kanalları, rezervasyon ve iletişim formları gibi dijital veya fiziksel ortamlarda; sözlü, yazılı ya da elektronik olarak toplanabilmektedir.
          </p>

          <p>
            <b>Kişisel Verilerinizin Toplanmasının Hukuki Sebebi Nedir?</b><br />
            KVKK'nın 5. ve 6. maddeleri uyarınca;
            <ul className="list-disc ml-6">
              <li>Kanunlarda açıkça öngörülmesi,</li>
              <li>Sözleşmenin kurulması/ifası,</li>
              <li>Hukuki yükümlülüklerimizin yerine getirilmesi,</li>
              <li>Bir hakkın tesisi, kullanılması veya korunması,</li>
              <li>Meşru menfaatlerimizin gerektirmesi,</li>
              <li>ve açık rızanızın bulunması</li>
            </ul>
            gibi yasal sebeplerle işlenmektedir.
          </p>

          <p>
            <b>Kişisel Verileriniz Ne Kadar Süreyle Saklanır?</b><br />
            Kişisel verileriniz, mevzuatta belirtilen süreler ve/veya işleme amaçlarımız doğrultusunda gerektirdiği kadar saklanır. Yasal saklama süresi sona erdiğinde, verileriniz KVKK'nın 7. maddesi kapsamında silinir, yok edilir veya anonimleştirilir.
          </p>

          <p>
            <b>Haklarınız Nelerdir?</b><br />
            KVKK’nın 11. maddesi gereğince, şirketimize başvurarak:
            <ul className="list-disc ml-6">
              <li>Kişisel verinizin işlenip işlenmediğini öğrenme,</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
              <li>Amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
              <li>Yurtiçinde/yurtdışında aktarıldığı 3. kişileri bilme,</li>
              <li>Eksik/yanlış işlenmişse düzeltilmesini isteme,</li>
              <li>Yasal şartlar kapsamında silinmesini/yok edilmesini isteme,</li>
              <li>Bu işlemlerin aktarıldığı 3. kişilere bildirilmesini isteme,</li>
              <li>Otomatik sistemlerle analiz sonucu aleyhinize bir sonucun çıkmasına itiraz etme,</li>
              <li>Zarar oluşursa giderilmesini talep etme</li>
            </ul>
            haklarına sahipsiniz. Taleplerinizi <a href="https://www.yolcutransferi.com/iletisim" target="_blank" rel="noopener noreferrer" className="underline text-[#FFD700]">buradan</a> veya info@yolcutransferi.com adresine iletebilirsiniz. Talepleriniz en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
          </p>

          <p>
            <b>Kişisel Verilerimin İşlenmesine Açıkça Rıza Gösteriyorum</b><br />
            Yukarıdaki açıklamaları okudum, anladım ve kişisel verilerimin işlenmesine rıza gösterdiğimi kabul ediyorum.
          </p>
        </div>

        {/* Onay Kutusu - opsiyonel */}
        <div className="flex items-center gap-2 mt-8">
          <input
            type="checkbox"
            checked={onay}
            onChange={e => setOnay(e.target.checked)}
            className="accent-[#FFD700] w-4 h-4"
            id="kvkkonay"
          />
          <label htmlFor="kvkkonay" className="text-xs text-gray-200 select-none">
            KVKK Aydınlatma Metni’ni okudum, kabul ediyorum.
          </label>
        </div>
      </section>
    </main>
  );
}
