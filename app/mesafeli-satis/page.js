"use client";
import { useState } from "react";

const POLICY_LINKS = [
  {
    id: "kvkk",
    label: "KVKK Politikası",
    url: "/kvkk",
  },
  {
    id: "gizlilik",
    label: "Gizlilik Politikası",
    url: "/gizlilik-politikasi",
  },
  {
    id: "cerez",
    label: "Çerez Politikası",
    url: "/cerez",
  },
  {
    id: "iade",
    label: "İptal & İade",
    url: "/iade",
  },
  {
    id: "kullanim",
    label: "Kullanım Şartları",
    url: "/kullanim-sartlari",
  },
];

export default function MesafeliSatisSozlesmesi() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState("");
  const [popupTitle, setPopupTitle] = useState("");

  // Pop-up'a ilgili sayfanın içeriğini dinamik çek
  async function handlePopup(link) {
    setPopupTitle(link.label);
    setShowPopup(true);
    setPopupContent(
      <div className="text-[#ecd9aa] text-center py-6">Yükleniyor...</div>
    );
    // Next.js route'dan dinamik olarak çeker
    try {
      const res = await fetch(link.url);
      const html = await res.text();
      // Sadece <main> içindeki metni çekmek için regex kullanılır
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

        {/* Sözleşme metni */}
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-8">
          {/* ... [Tüm önceki sözleşme bölümleri buraya aynı şekilde gelir, kısaltıldı] ... */}

          {/* Örnek bir blok */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">5. Sorumluluk Reddi</h2>
            <p>
              Platform, hizmetin güvenli, zamanında ve sorunsuz gerçekleşmesi için Hizmet Sağlayıcı seçimini titizlikle yapar; ancak aracın arızalanması, trafik, hava koşulları, kaptan/şoför davranışı, kaza, ceza, gecikme, iptal, mücbir sebepler ve üçüncü kişilerden kaynaklanan herhangi bir zarar, kayıp, iptal, hasar veya gecikmeden doğrudan sorumlu değildir. Tüm operasyonel sorumluluk Hizmet Sağlayıcı'ya aittir.
            </p>
          </section>

          {/* Linkli politika satırı */}
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center items-center mt-10 mb-2 text-[1.06rem] font-semibold">
            {POLICY_LINKS.map((link, idx) => (
              <span key={link.id} className="inline-flex items-center">
                <button
                  type="button"
                  className="policy-link underline decoration-dotted decoration-2 underline-offset-2"
                  onClick={() => handlePopup(link)}
                  style={{
                    color: "#ffeec2",
                    cursor: "pointer",
                    padding: "0 2px",
                  }}
                >
                  {link.label}
                </button>
                {idx < POLICY_LINKS.length - 1 && (
                  <span className="mx-2 text-[#ffd700a0] font-bold">|</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Slogan */}
        <div
          className="text-center text-lg font-bold mt-10 mb-1 tracking-tight"
          style={{
            color: "#ffeec2",
            textShadow: "0 2px 9px #0008",
            fontSize: "1.23rem",
          }}
        >
          YolcuTransferi.com olarak; hem sizi hem hizmeti sunanı koruyan, tarafları adil ve şeffaf biçimde gözeten bu sözleşmeyle, en iyi deneyimi ve güvenli yolculuğu garanti ediyoruz.
        </div>

        {/* Dinamik Popup */}
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

        <style jsx>{`
          .policy-link:hover {
            color: #bfa658 !important;
            text-decoration: underline;
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
