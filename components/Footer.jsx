"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#151310] pt-12 pb-3 px-3 border-t border-[#FFD70022] text-gray-200 font-sans z-50">
      {/* Ana GRID */}
      <div className="w-full flex justify-center">
        <div className="
          max-w-6xl w-full
          grid grid-cols-1 
          xs:grid-cols-2
          md:grid-cols-3
          gap-x-10 gap-y-8 pb-6
          ">
          {/* 1. VIP Hizmetler */}
          <div>
            <h3 className="text-gold text-lg font-bold mb-4 tracking-wide">VIP Hizmetler</h3>
            <ul className="flex flex-col gap-2 text-[1rem]">
              <li><a href="/vip-havalimani" className="footer-link">Havalimanı VIP Transfer</a></li>
              <li><a href="/sehirler-arasi" className="footer-link">Şehirlerarası Transfer</a></li>
              <li><a href="/kurumsal" className="footer-link">Kurumsal Transfer</a></li>
              <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
              <li><a href="/rezervasyon" className="footer-link">Online Rezervasyon</a></li>
              <li><a href="/uyeol_sofor" className="footer-link">Şoför Başvurusu</a></li>
            </ul>
          </div>
          {/* 2. Kurumsal & Yasal */}
          <div>
            <h3 className="text-gold text-lg font-bold mb-4 tracking-wide">Kurumsal & Yasal</h3>
            <ul className="flex flex-col gap-2 text-[1rem]">
              <li><a href="/hakkimizda" className="footer-link">Hakkımızda</a></li>
              <li><a href="/kvkk" className="footer-link">KVKK Politikası</a></li>
              <li><a href="/gizlilik-politikasi" className="footer-link">Gizlilik Politikası</a></li>
              <li><a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a></li>
              <li><a href="/mesafeli-satis" className="footer-link">Mesafeli Satış</a></li>
              <li><a href="/iade" className="footer-link">İptal ve İade</a></li>
              <li><a href="/sss" className="footer-link">S.S.S.</a></li>
            </ul>
          </div>
          {/* 3. İletişim + Sosyal */}
          <div className="xs:col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
            <h3 className="text-gold text-lg font-bold mb-4 tracking-wide">İletişim</h3>
            <div className="flex flex-col gap-2 text-[1rem]">
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
            <div className="flex gap-4 mt-5">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="WhatsApp">
                <FaWhatsapp size={22} />
              </a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">
                <FaInstagram size={21} />
              </a>
              <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="X">
                <SiX size={21} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* ALT BAND: Mobilde blok blok, masaüstünde yatayda üçe bölünür */}
      <div className="footer-bottom-mobile w-full flex flex-col md:flex-row md:items-center justify-between max-w-6xl mx-auto pt-6 pb-2 gap-2">
        {/* Telif */}
        <div className="text-[15px] text-gray-400 flex-1 flex justify-center md:justify-start items-center">
          © {new Date().getFullYear()} <span className="text-gold font-semibold ml-1">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
        {/* Orta logolar */}
        <div className="footer-cards flex flex-row items-center justify-center gap-3 flex-1 flex-wrap">
          <Image src="/tursab.png" alt="TÜRSAB" width={54} height={28} className="footer-card-img" style={{objectFit:"contain"}} />
          <Image src="/mastercard.png" alt="MasterCard" width={44} height={28} className="footer-card-img" style={{objectFit:"contain"}} />
          <Image src="/visa.png" alt="Visa" width={44} height={28} className="footer-card-img" style={{objectFit:"contain"}} />
          <Image src="/Troy.png" alt="TROY" width={44} height={28} className="footer-card-img" style={{objectFit:"contain"}} />
          <Image src="/iyzico.png" alt="iyzico" width={54} height={30} className="footer-card-img" style={{objectFit:"contain"}} />
        </div>
        {/* Sağ Menü */}
        <div className="footer-legal flex gap-3 flex-1 justify-center md:justify-end items-center text-base">
          <a href="/kvkk" className="footer-link">KVKK</a>
          <span className="hidden xs:inline">|</span>
          <a href="/gizlilik-politikasi" className="footer-link">Gizlilik</a>
          <span className="hidden xs:inline">|</span>
          <a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a>
        </div>
      </div>
      <style jsx>{`
        .footer-link {
          color: #e5e5e5;
          text-decoration: none;
          transition: color .16s;
        }
        .footer-link:hover {
          color: #FFD700;
        }
        .footer-social {
          color: #FFD700;
          background: #181818;
          border-radius: 50%;
          padding: 10px;
          font-size: 1.18rem;
          box-shadow: 0 0 14px 1px #FFD70026;
          transition: all 0.18s;
          display: flex; align-items: center; justify-content: center;
        }
        .footer-social:hover {
          color: #181818;
          background: #FFD700;
          box-shadow: 0 0 16px 5px #FFD70059;
          transform: scale(1.13);
        }
        .footer-card-img {
          background: #fff;
          border-radius: 8px;
          padding: 4px 9px;
          height: 30px !important;
          width: auto !important;
          object-fit: contain;
          box-shadow: 0 1px 7px 0 #3332;
          display: inline-block;
        }
        @media (max-width: 700px) {
          .footer-card-img { height: 22px !important; padding: 2px 6px; }
        }
        @media (max-width: 600px) {
          .footer-bottom-mobile {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 8px !important;
          }
          .footer-cards {
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 8px !important;
            margin: 0 auto 0.4rem auto !important;
          }
          .footer-legal {
            flex-direction: row;
            justify-content: center !important;
            font-size: 14px !important;
            gap: 10px !important;
            margin-bottom: 4px;
          }
          .footer-bottom-mobile > div {
            justify-content: center !important;
            text-align: center !important;
          }
        }
        @media (max-width: 450px) {
          .footer-card-img { height: 17px !important; }
          .footer-link { font-size: 0.99rem !important; }
        }
      `}</style>
    </footer>
  );
}
