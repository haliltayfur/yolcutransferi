"use client";
import { useState } from "react";
import Link from "next/link";

export default function MesafeliSatisSozlesmesi() {
  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState(null);

  // KVKK ve Gizlilik metinleri
  const KVKK = (
    <div className="space-y-4 text-[#ecd9aa]">
      <h2 className="text-xl font-bold text-[#bfa658]">KVKK Politikası</h2>
      <p>
        YolcuTransferi.com olarak, kişisel verilerin korunmasına ve gizliliğine en üst düzeyde önem veriyoruz. Tüm müşteri, sürücü, iş ortağı ve ziyaretçi verileri 6698 sayılı KVKK'ya uygun şekilde işlenir, saklanır ve asla üçüncü kişilerle izinsiz paylaşılmaz. <br />
        Detaylı bilgi için <Link href="/kvkk" className="underline text-[#ffeec2] hover:text-[#bfa658]">KVKK Aydınlatma Metni</Link> sayfamızı ziyaret edebilirsiniz.
      </p>
    </div>
  );

  const Gizlilik = (
    <div className="space-y-4 text-[#ecd9aa]">
      <h2 className="text-xl font-bold text-[#bfa658]">Gizlilik Politikası</h2>
      <p>
        YolcuTransferi.com’da tüm ziyaretçi ve müşteri verileri güvenli şekilde korunur. Web sitemizde çerezler ve oturum verileri sadece hizmet kalitesini artırmak amacıyla kullanılır. Detaylar ve haklarınız için <Link href="/gizlilik-politikasi" className="underline text-[#ffeec2] hover:text-[#bfa658]">Gizlilik Politikası</Link> sayfamıza göz atabilirsiniz.
      </p>
    </div>
  );

  // Popup açıcı fonksiyon
  const handlePopup = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  // Popup kapama fonksiyonu
  const handleClose = () => {
    setShowPopup(false);
    setPopupContent(null);
  };

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          Mesafeli Satış Sözleşmesi
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          {`YolcuTransferi.com'dan yapılan her rezervasyon aşağıdaki sözleşme koşullarına tabidir.`}
        </div>

        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">

          {/* Sözleşme Metni */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">1. Taraflar ve Tanımlar</h2>
            <p>
              Bu sözleşme, <span className="font-bold">YolcuTransferi.com</span> ("Platform") üzerinden hizmet alan gerçek/tüzel kişi ("Müşteri") ile taşımacılık, transfer, tekne turu ve organizasyon hizmeti sağlayan üçüncü taraf hizmet verenler ("Hizmet Sağlayıcı") arasında, Platform’un aracı olduğu rezervasyonlarda geçerlidir. Platform, bizzat taşıma/organizasyon hizmeti vermez; sadece müşteri ile hizmet sağlayıcıyı bir araya getirir.
            </p>
          </section>

          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">2. Hizmet Konusu</h2>
            <p>
              Müşteri, YolcuTransferi.com üzerinden; VIP transfer, havalimanı transferi, şehirlerarası taşıma, tekne turu, kurumsal organizasyon ve benzeri hizmetler için rezervasyon yapar. Tüm operasyonel sorumluluk ilgili hizmeti fiilen sunan Hizmet Sağlayıcı'ya aittir. Platform; araç, şoför, tekne, kaptan veya organizasyon ekibi istihdam etmez, doğrudan hizmet sunmaz.
            </p>
          </section>

          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">3. Rezervasyon, Ödeme ve Onay</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li>Müşteri rezervasyonunu platform üzerinden online olarak tamamlar, ödeme anında alınır.</li>
              <li>Rezervasyonun işleme alınması için sözleşmenin ve <button className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup(<>{KVKK}{Gizlilik}</>)}>KVKK / Gizlilik Politikası</button> onaylanmalıdır.</li>
              <li>Hizmet bedeli, ilgili Hizmet Sağlayıcı ile yapılan anlaşmaya göre Platform tarafından tahsil edilir, gerekli komisyon ve vergiler düşüldükten sonra hizmet sağlayıcıya aktarılır.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">4. İptal, İade ve Değişiklik Şartları</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li>
                <b>İptal:</b> Müşteri, transfer/organizasyon saatinden en az <b>48 saat önce</b> yazılı olarak iptal talebinde bulunursa, ödemesi işlem masrafları kesilerek iade edilir.
              </li>
              <li>
                <b>48 saatten kısa sürede</b> yapılan iptallerde iade yapılmaz. İptal ve iade talepleri, <a href="mailto:destek@yolcutransferi.com" className="underline">destek@yolcutransferi.com</a> adresine iletilmelidir.
              </li>
              <li>
                <b>Değişiklik:</b> Transfer saatinden <b>en az 24 saat</b> önce yapılan değişiklik talepleri, Hizmet Sağlayıcı'nın uygunluk durumuna göre değerlendirilir.
              </li>
              <li>
                <b>Paylaşımlı/Promosyonlu</b> veya özel kampanyalı transferlerde iptal ve iade yapılamaz.
              </li>
              <li>
                <b>Tekne & Organizasyon hizmetlerinde</b> iptal, sözleşmeye özel hükümlerle düzenlenir; aksi belirtilmedikçe 72 saat önceden yazılı talep zorunludur.
              </li>
              <li>
                <b>Force majeure (mücbir sebep)</b> halleri dışında, Platform’un ve Hizmet Sağlayıcı’nın tek taraflı sorumluluğu yoktur. Hizmet sağlayıcı kaynaklı sorunlarda, iade veya alternatif sağlama yükümlülüğü doğrudan Hizmet Sağlayıcı'ya aittir.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">5. Sorumluluk Reddi</h2>
            <p>
              Platform, hizmetin güvenli, zamanında ve sorunsuz gerçekleşmesi için Hizmet Sağlayıcı seçimini titizlikle yapar; ancak aracın arızalanması, trafik, hava koşulları, kaptan/şoför davranışı, kaza, ceza, gecikme, iptal, mücbir sebepler ve üçüncü kişilerden kaynaklanan herhangi bir zarar, kayıp, iptal, hasar veya gecikmeden doğrudan sorumlu değildir. Tüm operasyonel sorumluluk Hizmet Sağlayıcı'ya aittir.
            </p>
            <p>
              Müşteri ile Hizmet Sağlayıcı arasındaki anlaşmazlıklarda, YolcuTransferi.com arabulucu olarak iletişimi kolaylaştırır; fakat taraflardan biri olarak sorumluluk üstlenmez.
            </p>
          </section>

          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">6. KVKK, Gizlilik ve Çerez Politikası</h2>
            <p>
              Rezervasyon yapan ve sözleşmeyi onaylayan müşteri, <button className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup(<>{KVKK}{Gizlilik}</>)}>Kişisel Verilerin Korunması</button> ve <button className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup(Gizlilik)}>Gizlilik Politikası</button> ile <Link href="/cerez-politikasi" className="underline text-[#ffeec2] hover:text-[#bfa658]">Çerez Politikası</Link>'nı okuduğunu ve kabul ettiğini beyan eder. Politikaların tam metnine buradan ulaşabilir, talep halinde kopyasını isteyebilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">7. Yetkili Mahkeme</h2>
            <p>
              Tüm uyuşmazlıklarda İstanbul Anadolu Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>
        </div>

        {/* Onay kutusu ve rezervasyon butonu örneği */}
        <form className="mt-10 space-y-6">
          <div className="flex items-start">
            <input type="checkbox" required id="sozlesmeOnay" className="mt-1 w-5 h-5 accent-[#bfa658]"/>
            <label htmlFor="sozlesmeOnay" className="ml-3 text-[#ffeec2] text-base font-semibold">
              Yukarıdaki <b>Mesafeli Satış Sözleşmesi</b> ile <button type="button" className="underline text-[#ffeec2] hover:text-[#bfa658]" onClick={() => handlePopup(<>{KVKK}{Gizlilik}</>)}>KVKK ve Gizlilik Politikası</button>'nı okudum, anladım ve tüm şartları kabul ediyorum.
            </label>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-tr from-[#cbb26a] to-[#bfa658] text-black font-bold text-lg px-7 py-3 rounded-xl shadow-md transition hover:scale-105 hover:from-[#e6d199] hover:to-[#c4ad5f] border border-[#fff6ce]"
          >
            Rezervasyonu Tamamla
          </button>
        </form>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
            <div className="bg-[#1b1b1b] rounded-2xl max-w-2xl w-full p-8 overflow-y-auto max-h-[80vh] border-2 border-[#bfa658] shadow-2xl relative">
              <button
                className="absolute top-4 right-6 text-[#ffeec2] font-bold text-xl px-4 py-1 rounded-full bg-[#bfa658]/20 hover:bg-[#bfa658]/40 transition disabled:opacity-60"
                disabled={false}
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
