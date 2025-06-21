"use client";
import { useState } from "react";

// Popup açmak için link listesi ve başlıklar
const POLICY_LINKS = {
  kvkk: { label: "KVKK Politikası", url: "/kvkk" },
  gizlilik: { label: "Gizlilik Politikası", url: "/gizlilik-politikasi" },
  cerez: { label: "Çerez Politikası", url: "/cerez" },
  iade: { label: "İptal & İade", url: "/iade" },
  kullanim: { label: "Kullanım Şartları", url: "/kullanim-sartlari" },
};

export default function MesafeliSatisSozlesmesi() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  async function handlePopup(link) {
    setPopupTitle(link.label);
    setShowPopup(true);
    setPopupContent(
      <div className="text-[#ecd9aa] text-center py-6">Yükleniyor...</div>
    );
    try {
      const res = await fetch(link.url);
      const html = await res.text();
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      setPopupContent(
        <div
          className="policy-html"
          dangerouslySetInnerHTML={{
            __html: mainMatch ? mainMatch[1] : html,
          }}
        />
      );
    } catch {
      setPopupContent(
        <div className="text-red-400 text-center">İçerik yüklenemedi.</div>
      );
    }
  }

  // Policy Link buton komponenti
  const PolicyBtn = ({ name }) => (
    <button
      type="button"
      className="policy-link inline"
      onClick={() => handlePopup(POLICY_LINKS[name])}
    >
      {POLICY_LINKS[name].label}
    </button>
  );

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        {/* Başlık */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Mesafeli Satış Sözleşmesi
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          YolcuTransferi.com'dan yapılan her rezervasyon aşağıdaki sözleşme koşullarına tabidir.
        </div>

        {/* Sözleşme İçeriği */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-8">
          {/* Taraflar */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">1. Taraflar ve Tanımlar</h2>
            <p>
              Bu sözleşme, <span className="font-bold">YolcuTransferi.com</span> ("Platform") üzerinden hizmet alan gerçek/tüzel kişi ("Müşteri") ile taşımacılık, transfer, tekne turu ve organizasyon hizmeti sağlayan üçüncü taraf hizmet verenler ("Hizmet Sağlayıcı"), ayrıca aracı ve iş birlikçiler arasında, Platform’un aracı olduğu rezervasyonlarda geçerlidir. Platform, bizzat taşıma/organizasyon hizmeti vermez; sadece müşteri ile hizmet sağlayıcıyı bir araya getirir.
            </p>
          </section>

          {/* Hizmet Konusu */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">2. Hizmet Konusu</h2>
            <p>
              Müşteri, YolcuTransferi.com üzerinden; VIP transfer, havalimanı transferi, şehirlerarası taşıma, tekne turu, kurumsal organizasyon, dron, standart ve minibüs araçlar ile benzeri hizmetler için rezervasyon yapar. Tüm operasyonel sorumluluk ilgili hizmeti fiilen sunan Hizmet Sağlayıcı'ya aittir. Platform; araç, şoför, tekne, kaptan veya organizasyon ekibi istihdam etmez, doğrudan hizmet sunmaz. Ancak; Platform, müşterinin özel beklentilerine uygun, güvenilir, deneyimli ve seçkin hizmet sağlayıcılar ile çalışır. Sıradan ya da tecrübesiz kişi/kurumlarla işbirliği yapılmaz.
            </p>
          </section>

          {/* Rezervasyon & Ödeme */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">3. Rezervasyon, Ödeme ve Onay</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li>
                Müşteri rezervasyonunu platform üzerinden online olarak tamamlar, ödeme anında alınır.
              </li>
              <li>
                Hizmet bedeli, ilgili Hizmet Sağlayıcı ile yapılan anlaşmaya göre Platform tarafından tahsil edilir, gerekli komisyon ve vergiler düşüldükten sonra hizmet sağlayıcıya aktarılır. (Müşterinin ödediği toplam bedel ile hizmet sağlayıcıya aktarılan bedel farklı olabilir; bu konuda Platform'un ticari sır ve fiyatlandırma serbestisi saklıdır.)
              </li>
            </ul>
          </section>

          {/* İptal, İade ve Değişiklik */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">4. İptal, İade ve Değişiklik Şartları</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li>
                <b>Bireysel Transferlerde:</b> Müşteri, transfer saatinden en az <b>8 saat</b> önce iptal talebini <a href="mailto:info@yolcutransferi.com" className="policy-link">info@yolcutransferi.com</a> adresine bildirirse, ödemesi işlem/komisyon masrafları kesilerek iade edilir. 8 saatten kısa sürede yapılan iptallerde iade yapılmaz. Ayrıntılı bilgi için <PolicyBtn name="iade" /> bölümünü inceleyiniz.
              </li>
              <li>
                <b>Kurumsal transfer, minibüs, otobüs, dron ve tekne/organizasyonlarda:</b> İptal hakkı transfer saatinden <b>en az 5 gün</b> önce bildirilirse geçerlidir. Aksi halde iade yapılmaz. Tekne ve dron rezervasyonlarında iptal süresi <b>7 iş günü</b>dür.
              </li>
              <li>
                <b>Değişiklik:</b> Transfer saatinden <b>en az 24 saat</b> önce yapılan değişiklik talepleri, Hizmet Sağlayıcı'nın uygunluk durumuna göre değerlendirilir. 1 saatten fazla değişiklikler için yeniden ücretlendirme yapılır.
              </li>
              <li>
                <b>Paylaşımlı/promosyonlu transferler:</b> ve özel kampanyalı transferlerde iptal ve iade yapılamaz. Promosyon ve indirimler birleştirilemez.
              </li>
            </ul>
          </section>

          {/* Sorumluluk Reddi */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">5. Sorumluluk Reddi</h2>
            <p>
              Platform, hizmetin güvenli, zamanında ve sorunsuz gerçekleşmesi için Hizmet Sağlayıcı seçimini titizlikle yapar; ancak aracın arızalanması, trafik, hava koşulları, kaptan/şoför davranışı, kaza, ceza, gecikme, iptal, mücbir sebepler ve üçüncü kişilerden kaynaklanan herhangi bir zarar, kayıp, iptal, hasar veya gecikmeden doğrudan sorumlu değildir. Tüm operasyonel sorumluluk Hizmet Sağlayıcı'ya aittir.
            </p>
            <p>
              Müşteri ile Hizmet Sağlayıcı arasındaki anlaşmazlıklarda, YolcuTransferi.com arabulucu olarak iletişimi kolaylaştırır; fakat taraflardan biri olarak sorumluluk üstlenmez.
            </p>
          </section>

          {/* Politika - KVKK, Gizlilik, Çerez */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">6. KVKK, Gizlilik ve Çerez Politikası</h2>
            <p>
              YolcuTransferi.com, tüm müşteri ve kullanıcı verilerini <PolicyBtn name="kvkk" />, <PolicyBtn name="gizlilik" /> ve <PolicyBtn name="cerez" /> hükümlerine uygun olarak işler, korur ve saklar. Çerezler ve kişisel veriler ile ilgili ayrıntılı bilgi almak için ilgili politika metinlerine başvurabilirsiniz.
            </p>
          </section>

          {/* Kullanım Şartları */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">7. Diğer Koşullar ve Kullanım</h2>
            <p>
              Platformu kullanan her kullanıcı <PolicyBtn name="kullanim" /> metninde yer alan tüm kullanım şartlarını peşinen kabul etmiş sayılır.
            </p>
          </section>

          {/* Yetkili Mahkeme */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">8. Yetkili Mahkeme</h2>
            <p>
              Tüm uyuşmazlıklarda İstanbul Anadolu Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-[#181614] rounded-2xl max-w-2xl w-full p-7 overflow-y-auto max-h-[80vh] border-2 border-[#bfa658] shadow-2xl relative">
              <button
                className="absolute top-4 right-5 text-[#bfa658] font-bold text-xl px-3 py-1 rounded-full bg-[#ffeec2]/10 hover:bg-[#ffeec2]/25 transition"
                onClick={() => setShowPopup(false)}
              >
                Kapat
              </button>
              <h2 className="text-xl text-[#ffd700] font-bold text-center mb-4">{popupTitle}</h2>
              <div className="policy-popup-body">{popupContent}</div>
            </div>
          </div>
        )}

        {/* Style */}
        <style jsx>{`
          .policy-link {
            color: #ffeec2;
            text-decoration: underline;
            transition: color .15s;
          }
          .policy-link:hover {
            color: #bfa658;
          }
          .policy-popup-body {
            color: #ecd9aa;
            font-size: 1.03rem;
            line-height: 1.72;
            max-width: 100%;
            word-break: break-word;
          }
          .policy-html :global(h1), .policy-html :global(h2) {
            color: #bfa658 !important;
            margin-top: 1.2em;
            margin-bottom: .6em;
            font-size: 1.18em;
            font-weight: bold;
          }
          .policy-html :global(a) {
            color: #ffeec2 !important;
            text-decoration: underline;
          }
          .policy-html :global(p), .policy-html :global(li) {
            color: #ecd9aa !important;
            font-size: 1.02em;
          }
        `}</style>
      </section>
    </main>
  );
}
