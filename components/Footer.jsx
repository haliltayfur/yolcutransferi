"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 pt-12 pb-7 px-3 border-t border-[#FFD70022] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-14 gap-y-10 mb-10">
        {/* Sütun 1: Slogan + Açıklama + Kart & Güven Damgaları */}
        <div className="flex flex-col items-start gap-4 min-w-0">
          <h3 className="footer-title">VIP transferde ayrıcalık ve güven.</h3>
          <div className="footer-desc mb-1">
            Türkiye’nin lider VIP ve kurumsal yolcu taşıma platformu.<br />
            7/24 profesyonel, lisanslı ve güvenli transfer hizmeti.
          </div>
          <div className="flex items-center gap-5 mt-1">
            <Image src="/tursab.png" alt="TÜRSAB" width={62} height={30} style={{ background: "#fff", borderRadius: 7, padding: 3 }} />
            <Image src="/mastercard.png" alt="MasterCard" width={62} height={30} style={{ background: "#fff", borderRadius: 7, padding: 3 }} />
            <Image src="/visa.png" alt="Visa" width={62} height={30} style={{ background: "#fff", borderRadius: 7, padding: 3 }} />
            <Image src="/Troy.png" alt="TROY" width={62} height={30} style={{ background: "#fff", borderRadius: 7, padding: 3 }} />
          </div>
        </div>

        {/* Sütun 2: VIP Hizmetler */}
        <div className="flex flex-col items-start gap-4 min-w-0">
          <h3 className="footer-title">VIP Hizmetler</h3>
          <ul className="footer-list">
            <li><a href="/hizmetler" className="footer-link">Havalimanı VIP Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Şehirlerarası Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Kurumsal Transfer</a></li>
            <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
            <li><a href="/rezervasyon" className="footer-link">Online Rezervasyon</a></li>
            <li><a href="/sofor-basvuru" className="footer-link">Şoför Başvurusu</a></li>
          </ul>
        </div>

        {/* Sütun 3: Kurumsal & Yasal */}
        <div className="flex flex-col items-start gap-4 min-w-0">
          <h3 className="footer-title">Kurumsal & Yasal</h3>
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

        {/* Sütun 4: İletişim */}
        <div className="flex flex-col items-start gap-4 min-w-0">
          <h3 className="footer-title">İletişim</h3>
          <div className="footer-list">
            <div className="flex items-center gap-2 mb-1">
              <FaPhoneAlt className="text-gold" size={17} />
              <a href="tel:+905395267569" className="footer-link">+90 539 526 75 69</a>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <FaEnvelope className="text-gold" size={17} />
              <a href="mailto:info@yolcutransferi.com" className="footer-link">info@yolcutransferi.com</a>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <FaMapMarkerAlt className="text-gold" size={17} />
              <span className="footer-desc">Türkiye Geneli 7/24 Hizmet</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social">
                <FaWhatsapp size={22} />
              </a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social">
                <FaInstagram size={22} />
              </a>
              <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer-social">
                <SiX size={21} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bant */}
      <div className="max-w-7xl mx-auto mt-8 border-t border-[#FFD70028] pt-4 flex flex-col md:flex-row justify-between items-center text-[15px] text-gray-400 gap-5">
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
          font-size: 1.13rem;
          font-weight: 700;
          letter-spacing: .02em;
          margin-bottom: 0.4rem;
        }
        .footer-desc {
          font-size: 1.01rem;
          color: #bdbdbd;
          font-weight: 400;
          line-height: 1.6;
        }
        .footer-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .footer-link {
          color: #bdbdbd;
          font-size: 1.01rem;
          font-weight: 500;
          line-height: 1.66;
          transition: color 0.15s;
        }
        .footer-link:hover {
          color: #FFD700;
        }
        .footer-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 9px;
          font-size: 1.17rem;
          transition: color 0.14s, box-shadow 0.18s, transform 0.16s;
        }
        .footer-social:hover {
          color: #fff8c0;
          box-shadow: 0 0 13px 3px #FFD70066;
          background: #161616;
          transform: scale(1.17);
        }
        @media (max-width: 1024px) {
          .footer-title { font-size: 1.04rem; }
          .footer-list { gap: 0.29rem; }
        }
      `}</style>
    </footer>
  );
}
