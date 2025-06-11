"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 pt-10 pb-7 px-3 border-t border-[#FFD70022] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-16 mb-7">
        {/* Sütun 1: Slogan + Açıklama + Kart & Güven Damgaları */}
        <div className="flex flex-col gap-3">
          <h3 className="footer-title mb-1">VIP transferde ayrıcalık ve güven.</h3>
          <p className="footer-desc mb-2">
            Türkiye’nin lider VIP ve kurumsal yolcu taşıma platformu.<br />
            7/24 profesyonel, lisanslı ve güvenli transfer hizmeti.
          </p>
          {/* Kart ve güven damgaları */}
          <div className="flex items-center gap-4 mt-1">
            <Image src="/tursab.png" alt="TÜRSAB" width={56} height={25} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
            <Image src="/mastercard.png" alt="MasterCard" width={56} height={28} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
            <Image src="/visa.png" alt="Visa" width={56} height={28} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
            <Image src="/Troy.png" alt="TROY" width={56} height={28} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
          </div>
        </div>

        {/* Sütun 2: VIP MENÜ */}
        <div className="flex flex-col gap-3">
          <h3 className="footer-title mb-1">VIP Hizmetler</h3>
          <ul className="footer-list">
            <li><a href="/hizmetler" className="footer-link">Havalimanı VIP Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Şehirlerarası Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Kurumsal Transfer</a></li>
            <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
            <li><a href="/rezervasyon" className="footer-link">Online Rezervasyon</a></li>
            <li><a href="/sofor-basvuru" className="footer-link">Şoför Başvurusu</a></li>
          </ul>
        </div>

        {/* Sütun 3: KURUMSAL/YASAL MENÜ */}
        <div className="flex flex-col gap-3">
          <h3 className="footer-title mb-1">Kurumsal & Yasal</h3>
          <ul className="footer-list">
            <li><a href="/hakkimizda" className="footer-link">Hakkımızda</a></li>
            <li><a href="/kvkk" className="footer-link">KVKK Politikası</a></li>
            <li><a href="/gizlilik-politikasi" className="footer-link">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a></li>
            <li><a href="/mesafeli-satis" className="footer-link">Mesafeli Satış</a></li>
            <li><a href="/iptal-iade" className="footer-link">İptal ve İade</a></li>
            <li><a href="/sss" className="footer-link">S.S.S.</a></li>
          </ul>
        </div>

        {/* Sütun 4: İLETİŞİM */}
        <div className="flex flex-col gap-3">
          <h3 className="footer-title mb-1">İletişim</h3>
          <ul className="footer-list">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-gold" size={16} />
              <a href="tel:+905395267569" className="footer-link">+90 539 526 75 69</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gold" size={16} />
              <a href="mailto:info@yolcutransferi.com" className="footer-link">info@yolcutransferi.com</a>
            </li>
            {/* Türkiye Geneli 7/24 Hizmet */}
            <li className="flex items-center gap-2 mt-2">
              <FaMapMarkerAlt className="text-gold" size={16} />
              <span className="footer-desc">Türkiye Geneli 7/24 Hizmet</span>
            </li>
            {/* Sosyal ikonlar: wsap, insta, x */}
            <li className="flex items-center gap-3 mt-1">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social">
                <FaWhatsapp size={19} />
              </a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social">
                <FaInstagram size={19} />
              </a>
              <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer-social">
                <SiX size={18} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ALT BAND */}
      <div className="max-w-7xl mx-auto mt-7 border-t border-[#FFD70028] pt-3 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-4">
        <div>
          © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
        <div className="flex gap-4 mt-1 md:mt-0">
          <a href="/kvkk" className="footer-link">KVKK</a>
          <span>|</span>
          <a href="/gizlilik-politikasi" className="footer-link">Gizlilik</a>
          <span>|</span>
          <a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a>
        </div>
      </div>
      <style jsx>{`
        .text-gold { color: #FFD700; }
        .footer-title {
          color: #FFD700;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: .03em;
          margin-bottom: 0.6rem;
        }
        .footer-desc {
          font-size: 0.98rem;
          color: #bdbdbd;
          font-weight: 400;
        }
        .footer-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .footer-link {
          color: #bdbdbd;
          font-size: 0.99rem;
          font-weight: 500;
          line-height: 1.65;
          transition: color 0.15s;
        }
        .footer-link:hover {
          color: #FFD700;
        }
        .footer-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 6px;
          transition: color 0.14s, box-shadow 0.18s;
        }
        .footer-social:hover {
          color: #fff8c0;
          box-shadow: 0 0 10px 3px #FFD70060;
          background: #161616;
        }
        @media (max-width: 1024px) {
          .footer-title { font-size: 1rem; }
          .footer-list { gap: 0.28rem; }
        }
      `}</style>
    </footer>
  );
}
