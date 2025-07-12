"use client";
import { useState } from "react";

function KvkkBasvuruForm({ open, onClose }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [onay, setOnay] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onay) return;
    // Sunucuya gönderme kodu buraya...
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setAd(""); setSoyad(""); setEmail(""); setTelefon(""); setOnay(false);
      onClose();
    }, 2000);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
      <div className="relative w-full max-w-lg mx-auto bg-[#171204] rounded-2xl border-2 border-[#bfa658] shadow-2xl px-8 py-7 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-[#FFD700] text-2xl font-bold bg-black/40 rounded-full px-2 py-0.5 border border-[#bfa658] hover:bg-[#ffd70022] transition"
          aria-label="Kapat"
        >×</button>
        <h3 className="text-2xl font-extrabold text-[#bfa658] text-center mb-2">KVKK Başvuru Formu</h3>
        {!sent ? (
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adınız"
            value={ad} onChange={e => setAd(e.target.value)}
            required minLength={2}
            className="rounded-lg border border-[#bfa65888] bg-black/30 text-[#ffeec2] px-4 py-2 focus:border-[#bfa658] outline-none"
          />
          <input
            type="text"
            placeholder="Soyadınız"
            value={soyad} onChange={e => setSoyad(e.target.value)}
            required minLength={2}
            className="rounded-lg border border-[#bfa65888] bg-black/30 text-[#ffeec2] px-4 py-2 focus:border-[#bfa658] outline-none"
          />
          <input
            type="email"
            placeholder="E-posta"
            value={email} onChange={e => setEmail(e.target.value)}
            required
            className="rounded-lg border border-[#bfa65888] bg-black/30 text-[#ffeec2] px-4 py-2 focus:border-[#bfa658] outline-none"
          />
          <input
            type="tel"
            placeholder="Telefon"
            value={telefon} onChange={e => setTelefon(e.target.value.replace(/\D/g,"").slice(0,11))}
            pattern="05\d{9}" required
            className="rounded-lg border border-[#bfa65888] bg-black/30 text-[#ffeec2] px-4 py-2 focus:border-[#bfa658] outline-none"
          />
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={onay}
              onChange={e => setOnay(e.target.checked)}
              required
              className="accent-[#FFD700] w-4 h-4"
              id="kvkkonay-popup"
            />
            <label htmlFor="kvkkonay-popup" className="text-xs text-gray-200 select-none">
              <span className="underline text-[#FFD700]">KVKK Aydınlatma Metni’ni okudum, onayladım.</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={!onay}
            className={`mt-2 py-2 rounded-lg font-bold text-lg transition w-full 
              ${onay ? "bg-gradient-to-tr from-[#FFD700] to-[#bfa658] text-black hover:scale-105" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`}
          >
            Başvurumu Gönder
          </button>
        </form>
        ) : (
          <div className="text-center py-10 text-lg text-[#ffeec2]">
            Başvurunuz başarıyla alınmıştır!<br />En kısa sürede sizinle iletişime geçilecektir.
          </div>
        )}
      </div>
    </div>
  );
}

export default function Kvkk() {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-3xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-14 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* YENİ BAŞLIK */}
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
        {/* En alt: Talep Formu Butonu */}
        <div className="w-full flex justify-center mt-10">
          <button
            onClick={() => setShowForm(true)}
            className="py-3 px-10 rounded-2xl bg-gradient-to-tr from-[#FFD700] to-[#bfa658] text-black font-extrabold text-lg shadow-lg border-2 border-[#bfa658] hover:scale-105 transition"
          >
            KVKK Talep / Başvuru Formu
          </button>
        </div>
      </section>
      {/* Popup Form */}
      <KvkkBasvuruForm open={showForm} onClose={() => setShowForm(false)} />
    </main>
  );
}
