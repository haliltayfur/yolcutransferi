// === Dosya: components/Footer.jsx ===

"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#151310] pt-9 pb-3 px-2 border-t border-[#FFD70033] text-gray-200 font-sans w-full z-50">
      {/* Üst GRID - Mobilde iki sütun, masaüstünde üç sütun */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 pb-4">
        {/* VIP Hizmetler ve Kurumsal&Yasal */}
        <div className="col-span-2 md:col-span-2 flex flex-col md:flex-row gap-2 md:gap-8">
          {/* VIP Hizmetler */}
          <div className="flex-1">
            <h3 className="text-gold text-base font-bold mb-3 tracking-wide md:text-lg">VIP Hizmetler</h3>
            <ul className="flex flex-col gap-1 text-[0.98rem]">
              <li><a href="/vip-havalimani" className="footer-link">Havalimanı VIP Transfer</a></li>
              <li><a href="/sehirler-arasi" className="footer-link">Şehirlerarası Transfer</a></li>
              <li><a href="/kurumsal" className="footer-link">Kurumsal Transfer</a></li>
              <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
              <li><a href="/rezervasyon" className="footer-link">Rezervasyon</a></li>
              <li><a href="/uyeol_sofor" className="footer-link">Şoför Başvurusu</a></li>
            </ul>
          </div>
          {/* Kurumsal & Yasal */}
          <div className="flex-1">
            <h3 className="text-gold text-base font-bold mb-3 tracking-wide md:text-lg">Kurumsal & Yasal</h3>
            <ul className="flex flex-col gap-1 text-[0.98rem]">
              <li><a href="/hakkimizda" className="footer-link">Hakkımızda</a></li>
              <li><a href="/kvkk" className="footer-link">KVKK</a></li>
              <li><a href="/gizlilik-politikasi" className="footer-link">Gizlilik Politikası</a></li>
              <li><a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a></li>
              <li><a href="/mesafeli-satis" className="footer-link">Mesafeli Satış</a></li>
              <li><a href="/iade" className="footer-link">İptal ve İade</a></li>
              <li><a href="/sss" className="footer-link">S.S.S.</a></li>
            </ul>
          </div>
        </div>
        {/* İletişim ve Sosyal */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
          <h3 className="text-gold text-base font-bold mb-3 tracking-wide md:text-lg">İletişim</h3>
          <div className="flex flex-col gap-1 text-[0.98rem]">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gold" />
              <a href="tel:+905395267569" className="footer-link">+90 539 526 75 69</a>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gold" />
              <a href="mailto:info@yolcutransferi.com" className="footer-link">info@yolcutransferi.com</a>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gold" />
              <span className="text-gray-300">Türkiye Geneli 7/24 Hizmet</span>
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="WhatsApp">
              <FaWhatsapp size={20} />
            </a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">
              <FaInstagram size={19} />
            </a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="X">
              <SiX size={19} />
            </a>
          </div>
        </div>
      </div>
      {/* Alt BAND */}
      <div className="w-full flex flex-col md:flex-row md:items-center justify-between max-w-6xl mx-auto pt-3 pb-1 gap-1">
        {/* Telif */}
        <div className="text-[15px] text-gray-400 flex-1 flex justify-center md:justify-start items-center mb-2 md:mb-0">
          © {new Date().getFullYear()} <span className="text-gold font-semibold ml-1">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
        {/* Logolar */}
        <div className="footer-cards flex flex-row items-center justify-center gap-2 flex-1 flex-wrap">
          <Image src="/tursab.png" alt="TÜRSAB" width={48} height={22} className="footer-card-img" />
          <Image src="/mastercard.png" alt="MasterCard" width={36} height={22} className="footer-card-img" />
          <Image src="/visa.png" alt="Visa" width={36} height={22} className="footer-card-img" />
          <Image src="/Troy.png" alt="TROY" width={36} height={22} className="footer-card-img" />
          <Image src="/iyzico.png" alt="iyzico" width={44} height={22} className="footer-card-img" />
        </div>
      </div>
      <style jsx>{`
        .footer-link {
          color: #e5e5e5;
          text-decoration: none;
          transition: color .14s;
        }
        .footer-link:hover {
          color: #FFD700;
        }
        .footer-social {
          color: #FFD700;
          background: #181818;
          border-radius: 50%;
          padding: 8px;
          font-size: 1.08rem;
          box-shadow: 0 0 8px 1px #FFD70019;
          transition: all 0.17s;
          display: flex; align-items: center; justify-content: center;
        }
        .footer-social:hover {
          color: #181818;
          background: #FFD700;
          box-shadow: 0 0 14px 4px #FFD70033;
          transform: scale(1.11);
        }
        .footer-card-img {
          background: #fff;
          border-radius: 7px;
          padding: 2px 7px;
          height: 22px !important;
          width: auto !important;
          object-fit: contain;
          box-shadow: 0 1px 6px 0 #3331;
          display: inline-block;
        }
        @media (max-width: 900px) {
          .max-w-6xl { max-width: 98vw !important; }
        }
        @media (max-width: 700px) {
          .footer-card-img { height: 16px !important; padding: 2px 4px; }
          .footer-link { font-size: 0.93rem !important; }
        }
        @media (max-width: 650px) {
          .grid-cols-2 { grid-template-columns: 1fr !important; }
          .footer-cards { gap: 4px !important; }
          .text-gold, .footer-link { font-size: 0.97rem !important; }
          h3 { font-size: 1.02rem !important; }
        }
        @media (max-width: 480px) {
          .footer-card-img { height: 13px !important; }
          .footer-link { font-size: 0.89rem !important; }
          h3 { font-size: 0.97rem !important; }
          .text-[15px] { font-size: 0.84rem !important; }
        }
      `}</style>
    </footer>
  );
}

// === Dosya SONU: components/Footer.jsx ===
