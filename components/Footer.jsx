"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 pt-14 pb-7 px-3 border-t border-[#FFD70022] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-14 mb-6">
        {/* Sütun 1: Slogan + Açıklama + Kartlar */}
        <div className="flex flex-col gap-5 min-w-0 items-start">
          <h3 className="footer-title">VIP transferde ayrıcalık ve güven.</h3>
          <div className="footer-desc mb-1">
            Türkiye’nin lider VIP ve kurumsal yolcu taşıma platformu.<br />
            7/24 profesyonel, lisanslı ve güvenli transfer hizmeti.
          </div>
          <div className="flex flex-row items-center gap-5 mt-2">
            <Image src="/tursab.png" alt="TÜRSAB" width={54} height={26} className="footer-card" />
            <Image src="/mastercard.png" alt="MasterCard" width={54} height={26} className="footer-card" />
            <Image src="/visa.png" alt="Visa" width={54} height={26} className="footer-card" />
            <Image src="/Troy.png" alt="TROY" width={54} height={26} className="footer-card" />
          </div>
        </div>
        {/* Sütun 2: VIP Hizmetler */}
        <div className="flex flex-col gap-4 min-w-0 items-start">
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
        <div className="flex flex-col gap-4 min-w-0 items-start">
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
        <div className="flex flex-col gap-5 min-w-0 items-start">
          <h3 className="footer-title">İletişim</h3>
          <div className="footer-list">
            <div className="flex items-center gap-2 mb-2">
              <FaPhoneAlt className="text-gold" size={19} />
              <a href="tel:+905395267569" className="footer-link">+90 539 526 75 69</a>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <FaEnvelope className="text-gold" size={19} />
              <a href="mailto:info@yolcutransferi.com" className="footer-link">info@yolcutransferi.com</a>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <FaMapMarkerAlt className="text-gold" size={19} />
              <span className="footer-desc">Türkiye Geneli 7/24 Hizmet</span>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social">
                <FaWhatsapp size={27} />
              </a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social">
                <FaInstagram size={26} />
              </a>
              <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer-social">
                <SiX size={25} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* BÜYÜK ALT BOŞLUK ve KALIN ÇİZGİ */}
      <div className="h-[64px]"></div>
      <div className="border-t border-[#FFD70044]"></div>
      {/* Alt Telif Bant */}
      <div className="max-w-7xl mx-auto pt-4 flex flex-col md:flex-row justify-between items-center text-[15px] text-gray-400 gap-4">
        <div>
          © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
        <div className="flex gap-3 mt-1 md:mt-0">
          <a href="/kvkk" className="footer-link footer-link-bottom">KVKK</a>
          <span>|</span>
          <a href="/gizlilik-politikasi" className="footer-link footer-link-bottom">Gizlilik</a>
          <span>|</span>
          <a href="/kullanim-sartlari" className="footer-link footer-link-bottom">Kullanım Şartları</a>
        </div>
      </div>
      <style jsx>{`
        .text-gold { color: #FFD700; }
        .footer-title {
          color: #FFD700;
          font-size: 1.17rem;
          font-weight: 700;
          letter-spacing: .017em;
          margin-bottom: 0.53rem;
        }
        .footer-desc {
          font-size: 1.08rem;
          color: #bdbdbd;
          font-weight: 400;
          line-height: 1.63;
        }
        .footer-list {
          display: flex;
          flex-direction: column;
          gap: 0.50rem;
        }
        .footer-link {
          color: #bdbdbd;
          font-size: 1.09rem;
          font-weight: 500;
          line-height: 1.66;
          transition: color 0.14s;
          text-decoration: none;
        }
        .footer-link:hover {
          color: #FFD700;
        }
        .footer-link-bottom {
          font-size: 1.09rem !important;
          font-weight: 500 !important;
        }
        .footer-social {
          color: #FFD700;
          background: #191919;
          border-radius: 50%;
          padding: 8px;
          font-size: 1.19rem;
          box-shadow: 0 0 10px 1px #FFD70022;
          transition: color 0.15s, box-shadow 0.18s, background 0.17s, transform 0.13s;
          display: flex; align-items: center; justify-content: center;
        }
        .footer-social:hover {
          color: #fff8c0;
          background: #353535;
          box-shadow: 0 0 14px 4px #FFD70044;
          transform: scale(1.14);
        }
        .footer-card {
          background: #fff;
          border-radius: 7px;
          padding: 3px;
        }
        @media (max-width: 1024px) {
          .footer-title { font-size: 1.10rem; }
          .footer-list { gap: 0.25rem; }
        }
        @media (max-width: 768px) {
          .footer-title { font-size: 1.06rem; }
          .footer-desc { font-size: 1.03rem; }
          .footer-link, .footer-link-bottom { font-size: 1.03rem !important; }
        }
      `}</style>
    </footer>
  );
}
