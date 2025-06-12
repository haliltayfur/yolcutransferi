"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#151310] pt-12 pb-5 px-3 border-t border-[#FFD70022] text-gray-200 font-sans">
      {/* 3’lü BLOK — Ortalı */}
      <div className="w-full flex justify-center">
        <div className="max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10 pb-6">
          {/* 1. VIP Hizmetler */}
          <div>
            <h3 className="text-gold text-lg font-bold mb-4 tracking-wide">VIP Hizmetler</h3>
            <ul className="flex flex-col gap-2 text-[1rem]">
              <li><a href="/hizmetler" className="footer-link">Havalimanı VIP Transfer</a></li>
              <li><a href="/hizmetler" className="footer-link">Şehirlerarası Transfer</a></li>
              <li><a href="/hizmetler" className="footer-link">Kurumsal Transfer</a></li>
              <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
              <li><a href="/rezervasyon" className="footer-link">Online Rezervasyon</a></li>
              <li><a href="/sofor-basvuru" className="footer-link">Şoför Başvurusu</a></li>
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
              <li><a href="/iptal-iade" className="footer-link">İptal ve İade</a></li>
              <li><a href="/sss" className="footer-link">S.S.S.</a></li>
            </ul>
          </div>
          {/* 3. İletişim + TÜRSAB */}
          <div className="flex flex-col items-start">
            <h3 className="text-gold text-lg font-bold mb-4 tracking-wide">İletişim</h3>
            <div className="flex flex-col gap-3 text-[1rem]">
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
            <div className="flex gap-4 mt-5 mb-4">
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
            {/* TÜRSAB — Büyük ve Ortada */}
            <div className="w-full flex justify-center">
              <Image src="/tursab.png" alt="TÜRSAB" width={88} height={40} className="footer-tursab-img" style={{objectFit:"contain"}} />
            </div>
          </div>
        </div>
      </div>
      {/* ALT TELİF ve LİNK BANDI */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-7 text-gray-400 text-[15px] gap-3">
        <span>
          © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
        </span>
        <div className="flex gap-3 mt-2 md:mt-0 text-base">
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
        .footer-tursab-img {
          background: #fff;
          border-radius: 10px;
          padding: 6px 14px;
          height: 44px !important;
          width: auto !important;
          object-fit: contain;
          box-shadow: 0 1px 7px 0 #3332;
          margin-top: 4px;
        }
      `}</style>
    </footer>
  );
}
