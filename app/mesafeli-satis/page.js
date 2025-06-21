"use client";
import Link from "next/link";

// KVKK’daki gibi GOLD ve açık tonlar kullanılacak.
export default function MesafeliSatisSozlesmesi() {
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
              <li>Müşteri rezervasyonunu platform üzerinden online olarak tamamlar, ödeme anında alınır.</li>
              <li>Hizmet bedeli, ilgili Hizmet Sağlayıcı ile yapılan anlaşmaya göre Platform tarafından tahsil edilir, gerekli komisyon ve vergiler düşüldükten sonra hizmet sağlayıcıya aktarılır. (Müşterinin ödediği toplam bedel ile hizmet sağlayıcıya aktarılan bedel farklı olabilir; bu konuda Platform'un ticari sır ve fiyatlandırma serbestisi saklıdır.)</li>
            </ul>
          </section>

          {/* İptal, İade ve Değişiklik */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">4. İptal, İade ve Değişiklik Şartları</h2>
            <ul className="list-disc pl-6 space-y-1 text-[#ffeec2]">
              <li><b>Bireysel Transferlerde:</b> Müşteri, transfer saatinden en az <b>8 saat</b> önce iptal talebini <a href="mailto:info@yolcutransferi.com" className="policy-link">info@yolcutransferi.com</a> adresine bildirirse, ödemesi işlem/komisyon masrafları kesilerek iade edilir. 8 saatten kısa sürede yapılan iptallerde iade yapılmaz.</li>
              <li><b>Kurumsal transfer, minibüs, otobüs, dron ve tekne/organizasyonlarda:</b> İptal hakkı transfer saatinden <b>en az 5 gün</b> önce bildirilirse geçerlidir. Aksi halde iade yapılmaz. Tekne ve dron rezervasyonlarında iptal süresi <b>7 iş günü</b>dür.</li>
              <li><b>Değişiklik:</b> Transfer saatinden <b>en az 24 saat</b> önce yapılan değişiklik talepleri, Hizmet Sağlayıcı'nın uygunluk durumuna göre değerlendirilir. 1 saatten fazla değişiklikler için yeniden ücretlendirme yapılır.</li>
              <li><b>Paylaşımlı/promosyonlu transferler:</b> ve özel kampanyalı transferlerde iptal ve iade yapılamaz. Promosyon ve indirimler birleştirilemez.</li>
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

          {/* Yetkili Mahkeme */}
          <section>
            <h2 className="text-[#bfa658] font-bold text-xl mb-1">6. Yetkili Mahkeme</h2>
            <p>
              Tüm uyuşmazlıklarda İstanbul Anadolu Mahkemeleri ve İcra Daireleri yetkilidir.
            </p>
          </section>
        </div>

        {/* Politika linkleri */}
        <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center mt-12 text-[1.06rem] font-semibold">
          <Link href="/kvkk" className="policy-link">KVKK Politikası</Link>
          <span>|</span>
          <Link href="/gizlilik-politikasi" className="policy-link">Gizlilik Politikası</Link>
          <span>|</span>
          <Link href="/cerez" className="policy-link">Çerez Politikası</Link>
          <span>|</span>
          <Link href="/iade" className="policy-link">İptal &amp; İade</Link>
          <span>|</span>
          <Link href="/kullanim-sartlari" className="policy-link">Kullanım Şartları</Link>
        </div>

        {/* Slogan */}
        <div className="text-center text-xl font-extrabold mt-10 mb-1 tracking-tight"
          style={{
            color: "#ffd700",
            letterSpacing: ".01em",
            textShadow: "0 2px 12px #0007"
          }}>
          YolcuTransferi.com – Adil, şeffaf ve güvenilir hizmetin sözleşmesi!
        </div>

        {/* Styles - KVKK ile birebir aynı */}
        <style jsx>{`
          .policy-link {
            color: #ffeec2;
            text-decoration: underline;
            transition: color .15s;
          }
          .policy-link:hover {
            color: #bfa658;
          }
        `}</style>
      </section>
    </main>
  );
}
