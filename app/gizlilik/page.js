// app/gizlilik/page.js
export const metadata = {
  title: "Gizlilik Politikası | YolcuTransferi.com",
  description: "YolcuTransferi.com Gizlilik Politikası: Kişisel verileriniz nasıl saklanır, kullanılır ve korunur? Detaylı bilgi için sayfamızı ziyaret edin.",
};

export default function Gizlilik() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-200">
      <h1 className="text-3xl font-bold text-gold mb-4">Gizlilik Politikası</h1>
      <p className="mb-4">
        YolcuTransferi.com olarak, kişisel verilerinizin gizliliği ve güvenliği bizim için büyük önem taşımaktadır. Bu sayfada, bilgilerinizin hangi amaçlarla toplandığı, nasıl kullanıldığı ve korunduğu ile ilgili bilgilere ulaşabilirsiniz.
      </p>
      <h2 className="text-xl font-semibold text-gold mt-6 mb-2">Hangi Bilgileri Topluyoruz?</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Ad, soyad, iletişim bilgileri (telefon, e-posta), adres bilgisi</li>
        <li>Transfer rezervasyon detayları</li>
        <li>Ödeme bilgileri (sadece ödeme sağlayıcısı üzerinden, sitemizde kart verisi tutulmaz)</li>
        <li>Web sitemizde gezinme ve kullanım verileri</li>
      </ul>
      <h2 className="text-xl font-semibold text-gold mt-6 mb-2">Bilgileri Nasıl Kullanıyoruz?</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Rezervasyon işlemlerinizi gerçekleştirmek ve onaylamak</li>
        <li>Size daha iyi hizmet sunmak, destek sağlamak ve bilgi vermek</li>
        <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        <li>Hizmetlerimizi geliştirmek ve kullanıcı deneyimini iyileştirmek</li>
      </ul>
      <h2 className="text-xl font-semibold text-gold mt-6 mb-2">Bilgilerinizin Güvenliği</h2>
      <p className="mb-4">
        Kişisel verileriniz, en son teknolojiyle korunmakta olup, üçüncü şahıslarla açık rızanız olmadan paylaşılmaz. Tüm ödemeler güvenli altyapı üzerinden yapılmaktadır.
      </p>
      <h2 className="text-xl font-semibold text-gold mt-6 mb-2">Çerezler (Cookies)</h2>
      <p className="mb-4">
        Web sitemizde kullanıcı deneyimini geliştirmek için çerezler kullanılmaktadır. Çerez kullanımı ile ilgili detaylara <a href="/cerez" className="underline text-gold">Çerez Politikası</a> sayfamızdan ulaşabilirsiniz.
      </p>
      <h2 className="text-xl font-semibold text-gold mt-6 mb-2">Haklarınız</h2>
      <p className="mb-4">
        Kişisel verilerinizle ilgili bilgi almak, güncelleme veya silme talepleriniz için bizimle <a href="/iletisim" className="underline text-gold">iletişime</a> geçebilirsiniz.
      </p>
      <h2 className="text-xl font-semibold text-gold mt-6 mb-2">İletişim</h2>
      <p>
        Gizlilik politikamız ile ilgili sorularınız için info@yolcutransferi.com adresinden bize ulaşabilirsiniz.
      </p>
    </main>
  );
}
