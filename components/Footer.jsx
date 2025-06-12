"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#14120f] pt-16 pb-8 px-3 border-t border-[#FFD70022] text-gray-200 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-12 pb-14 border-b border-[#FFD70033]">
        {/* 1 - Slogan & Açıklama & Kartlar */}
        <div className="flex flex-col w-full items-start">
          <div className="font-bold text-gold text-[1.14rem] mb-2">
            VIP transferde ayrıcalık ve güven.
          </div>
          <div className="text-base text-gray-300 mb-8 w-full">
            Türkiye’nin lider VIP ve kurumsal yolcu taşıma platformu.<br />
            7/24 profesyonel, lisanslı ve sigortalı hizmet.
          </div>
          <div className="flex flex-row gap-3 mt-1 w-full">
            <div className="footer-card-wrap">
              <Image src="/tursab.png" alt="TÜRSAB" width={50} height={28} className="footer-card-img" />
            </div>
            <div className="footer-card-wrap">
              <Image src="/mastercard.png" alt="MasterCard" width={50} height={28} className="footer-card-img" />
            </div>
            <div className="footer-card-wrap">
              <Image src="/visa.png" alt="Visa" width={50} height={28} className="footer-card-img" />
            </div>
            <div className="footer-card-wrap">
              <Image src="/Troy.png" alt="TROY" width={50} height={28} className="footer-card-img" />
            </div>
          </div>
        </div>
        {/* 2 - VIP Hizmetler */}
        <div className="flex flex-col w-full items-start">
          <h3 className="text-gold text-lg font-semibold mb-8">VIP Hizmetler</h3>
          <ul className="flex flex-col gap-2 w-full">
            <li><a href="/hizmetler" className="footer-link">Havalimanı VIP Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Şehirlerarası Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Kurumsal Transfer</a></li>
            <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
            <li><a href="/rezervasyon" className="footer-link">Online Rezervasyon</a></li>
            <li><a href="/sofor-basvuru" className="footer-link">Şoför Başvurusu</a></li>
          </ul>
        </div>
        {/* 3 - Kurumsal & Yasal */}
        <div className="flex flex-col w-full items-start">
          <h3 className="text-gold text-lg font-semibold mb-8">Kurumsal & Yasal</h3>
          <ul className="flex flex-col gap-2 w-full">
            <li><a href="/hakkimizda" className="footer-link">Hakkımızda</a></li>
            <li><a href="/kvkk" className="footer-link">KVKK Politikası</a></li>
            <li><a href="/gizlilik-politikasi" className="footer-link">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a></li>
            <li><a href="/mesafeli-satis" className="footer-link">Mesafeli Satış</a></li>
            <li><a href="/iptal-iade" className="footer-link">İptal ve İade</a></li>
            <li><a href="/sss" className="footer-link">S.S.S.</a></li>
          </ul>
        </div>
        {/* 4 - İletişim ve Sosyal */}
        <div className="flex flex-col w-full items-start">
          <h3 className="text-gold text-lg font-semibold mb-8">İletişim</h3>
          <div className="flex flex-col gap-2 text-base mb-1 w-full">
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
          <div className="flex gap-3 mt-4">
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
      {/* ALT BAND */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-7 text-gray-400 text-[15px]">
        <div>
          © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </div>
        <div className="flex gap-3 mt-3 md:mt-0 text-base">
          <a href="/kvkk" className="footer-link">KVKK</a>
          <span>|</span>
          <a href="/gizlilik-politikasi" className="footer-link">Gizlilik</a>
          <span>|</span>
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
        .footer-card-wrap {
          background: #fff;
          border-radius: 8px;
          padding: 4px 8px 4px 8px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 1px 7px 0 #3332;
        }
        .footer-card-img {
          height: 24px !important;
          width: auto !important;
          object-fit: contain;
        }
      `}</style>
    </footer>
  );
}
