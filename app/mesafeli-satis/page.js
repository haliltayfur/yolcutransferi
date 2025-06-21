"use client";
import { useState } from "react";
import Link from "next/link";

// Dinamik içerikleri fetch ile getirecek örnek fonksiyon (api ile entegre etmek için)
async function fetchPageContent(path) {
  const res = await fetch(path);
  if (res.ok) {
    return await res.text();
  }
  return "Yüklenemedi. Lütfen tekrar deneyin.";
}

export default function MesafeliSatisSozlesmesi() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  // Popup açıcı: Dinamik ilgili sayfadan içerik çek (örn: /api/policy?type=kvkk gibi backend kurarsın)
  const handlePopup = async (type) => {
    let content;
    switch (type) {
      case "kvkk":
        content = await fetchPageContent("/kvkk");
        break;
      case "gizlilik":
        content = await fetchPageContent("/gizlilik-politikasi");
        break;
      case "cerez":
        content = await fetchPageContent("/cerez-politikasi");
        break;
      case "iade":
        content = await fetchPageContent("/iade");
        break;
      case "sartlar":
        content = await fetchPageContent("/kullanim-sartlari");
        break;
      default:
        content = "Yüklenemedi.";
    }
    setPopupContent(
      <div className="text-[#ecd9aa] leading-relaxed space-y-4 max-h-[70vh] overflow-y-auto" dangerouslySetInnerHTML={{ __html: content }} />
    );
    setShowPopup(true);
  };

  // Popup kapama
  const handleClose = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  return (
    <main className="flex justify-center items-center min-h-[92vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Mesafeli Satış Sözleşmesi
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-7">
          {`YolcuTransferi.com'dan yapılan her rezervasyon aşağıdaki sözleşme koşullarına tabidir.`}
        </div>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-7">

          {/* Taraflar ve Tanımlar */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">1. Taraflar ve Tanımlar</h2>
            <p>
              Bu sözleşme, <b>YolcuTransferi.com</b> ("Platform") üzerinden hizmet alan gerçek/tüzel kişi ("Müşteri") ile taşımacılık, transfer, tekne turu, drone ile yolculuk ve organizasyon hizmeti sağlayan üçüncü taraf hizmet verenler, aracı ve iş birlikçiler ("Hizmet Sağlayıcı") arasında geçerlidir.
              Platform, aracı rolüyle sadece rezervasyon sürecini yönetir; bizzat araç, şoför, tekne, kaptan, drone, minibüs veya organizasyon ekibi istihdam etmez, doğrudan hizmet sunmaz. Ancak tüm hizmet verenleri özenle, deneyim, güvenlik ve gizlilik kriterlerine göre seçer, lüks ve kişiye özel hizmetin sürdürülebilirliği için kalite denetimi sağlar.
            </p>
          </section>

          {/* Hizmet Konusu */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">2. Hizmet Konusu</h2>
            <p>
              Müşteri, Platform üzerinden; VIP transfer, havalimanı transferi, şehirlerarası transfer, tekne turu, drone ile özel ulaşım, kurumsal organizasyon, minibüs/otobüs taşımacılığı ve benzeri hizmetler için rezervasyon yapabilir. Sunulan araç seçenekleri: VIP araçlar, standart araçlar, minibüs, otobüs, tekne ve drone taşımacılığıdır. Tüm operasyonel ve hukuki sorumluluk, hizmeti fiilen sunan <b>Hizmet Sağlayıcı</b>’ya aittir.
            </p>
          </section>

          {/* Rezervasyon ve Ödeme */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">3. Rezervasyon, Ödeme ve Onay</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li>
                Rezervasyonlar, YolcuTransferi.com üzerinden online olarak alınır ve ödemeler anında tahsil edilir.
              </li>
              <li>
                Hizmet bedeli, ilgili Hizmet Sağlayıcı ile yapılan anlaşmaya göre Platform tarafından tahsil edilir, gerekli komisyon ve vergiler düşüldükten sonra hizmet sağlayıcıya aktarılır. Müşterinin ödediği tutar ile Hizmet Sağlayıcı'ya ödenen bedel, Platform’un iş modeli ve ticari sır kapsamında değişiklik gösterebilir.
              </li>
              <li>
                Rezervasyonun işleme alınabilmesi için, Mesafeli Satış Sözleşmesi, <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("kvkk")}>KVKK</button>, <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("gizlilik")}>Gizlilik</button>, <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("cerez")}>Çerez</button>, <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("iade")}>İptal &amp; İade</button> ve <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("sartlar")}>Kullanım Şartları</button>‘nı okuduğunuzu ve kabul ettiğinizi onaylamanız gereklidir.
              </li>
            </ul>
          </section>

          {/* İptal, İade ve Değişiklik */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">4. İptal, İade ve Değişiklik Şartları</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li>
                <b>Bireysel transferler:</b> Rezervasyonun <b>en az 8 saat öncesine</b> kadar info@yolcutransferi.com adresine yazılı olarak iptal bildirimi yapılırsa, ödemenin tamamı iade edilir. 8 saatten az süre kala yapılan iptallerde herhangi bir iade yapılmaz; hizmet, müşteri adına tahsis edilmiş sayılır.
              </li>
              <li>
                <b>Kurumsal toplu transfer (otobüs/minibüs/tekne/drone):</b> Rezervasyonun <b>en az 5 gün</b> öncesine kadar yazılı iptal mümkündür. Aksi durumda ücret iadesi yapılmaz.
              </li>
              <li>
                <b>Tekne ve drone rezervasyonlarında:</b> Yolculuk tarihinden <b>en az 7 iş günü</b> önce iptal yapılmalıdır. Daha kısa süreli rezervasyonlarda iptal hakkı yoktur.
              </li>
              <li>
                <b>Değişiklik:</b> Transfer saatinden <b>en az 24 saat önce</b> yapılan değişiklik talepleri, Hizmet Sağlayıcı’nın uygunluk durumuna göre değerlendirilir. 1 saatten fazla saat/detay değişikliği için yeniden ücretlendirme yapılır.
              </li>
              <li>
                <b>Paylaşımlı, promosyonlu, kampanyalı transferlerde:</b> İptal ve iade yapılamaz. Farklı promosyonlar veya indirimler birleştirilemez.
              </li>
              <li>
                İptal/iade ve değişiklik talepleri, sadece info@yolcutransferi.com adresine e-posta ile yapılmalıdır.
              </li>
            </ul>
          </section>

          {/* Sorumluluk Reddi */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">5. Sorumluluk Reddi ve Arabuluculuk</h2>
            <p>
              YolcuTransferi.com, tüm hizmet sağlayıcıları özenle seçer ve lüks, güvenli, gizlilik esaslı, yüksek standartta bir deneyim sunmayı hedefler. Ancak; Platform, aracın arızası, şoför/kaptan davranışı, trafik, kaza, gecikme, teknik arıza, organizasyonel veya üçüncü şahıs nedenli zararlardan doğrudan sorumlu değildir.
            </p>
            <p>
              Tüm sorumluluk hizmeti sunan Hizmet Sağlayıcı'dadır. Müşteri ile Hizmet Sağlayıcı arasındaki anlaşmazlıklarda YolcuTransferi.com, sadece arabuluculuk ve iletişimi kolaylaştırma görevi üstlenir, doğrudan taraf olmaz.
            </p>
          </section>

          {/* Politikalar ve Yasal */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">6. Politika Linkleri ve Onay</h2>
            <div className="flex flex-wrap gap-4 mb-2">
              <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("kvkk")}>KVKK</button>
              <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("gizlilik")}>Gizlilik</button>
              <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("cerez")}>Çerez</button>
              <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("iade")}>İptal &amp; İade</button>
              <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup("sartlar")}>Kullanım Şartları</button>
            </div>
            <p>
              Tüm politika, gizlilik ve şart metinleri yukarıdaki linklerde güncel olarak yayınlanır ve açılan popup ile sayfanın en güncel içeriği doğrudan gösterilir.
            </p>
          </section>

          {/* Mahkeme */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">7. Yetkili Mahkeme</h2>
            <p>
              Tüm uyuşmazlıklarda İstanbul Anadolu Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>
        </div>

        {/* Onay kutusu ve buton */}
        <form className="mt-10 space-y-6">
          <div className="flex items-start">
            <input type="checkbox" required id="sozlesmeOnay" className="mt-1 w-5 h-5 accent-[#bfa658]"/>
            <label htmlFor="sozlesmeOnay" className="ml-3 text-[#ffeec2] text-base font-semibold">
              Yukarıdaki Mesafeli Satış Sözleşmesi, <span className="underline cursor-pointer" onClick={() => handlePopup("kvkk")}>KVKK</span>, <span className="underline cursor-pointer" onClick={() => handlePopup("gizlilik")}>Gizlilik</span>, <span className="underline cursor-pointer" onClick={() => handlePopup("iade")}>İptal &amp; İade</span>, <span className="underline cursor-pointer" onClick={() => handlePopup("sartlar")}>Kullanım Şartları</span> ve <span className="underline cursor-pointer" onClick={() => handlePopup("cerez")}>Çerez</span> politikalarını okudum, anladım ve tüm şartları kabul ediyorum.
            </label>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Rezervasyonu Tamamla
          </button>
        </form>

        {/* Alt Slogan */}
        <div className="mt-12 text-center text-2xl font-bold tracking-wide text-[#FFD700] drop-shadow-lg">
          YolcuTransferi.com — adil, şeffaf ve tüm tarafları koruyan bu sözleşmeyle en iyi hizmeti sunar.
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-[#1b1b1b] rounded-2xl max-w-2xl w-full p-8 overflow-y-auto max-h-[80vh] border-2 border-[#bfa658] shadow-2xl relative">
              <button
                className="absolute top-4 right-6 text-[#ffeec2] font-bold text-xl px-4 py-1 rounded-full bg-[#bfa658]/20 hover:bg-[#bfa658]/40 transition disabled:opacity-60"
                onClick={handleClose}
              >
                Kapat
              </button>
              <div className="mt-2 space-y-8">{popupContent}</div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
