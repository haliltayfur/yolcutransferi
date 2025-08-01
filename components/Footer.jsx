// === Dosya: components/Footer.jsx ===

"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaEnvelope, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-[#151310] pt-8 pb-3 px-2 border-t border-[#FFD70033] text-gray-200 font-sans w-full z-50">
      {/* Ana GRID */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4 pb-4">
        {/* VIP Hizmetler */}
        <div className="pl-2 md:pl-4">
          <h3 className="text-gold text-[1.08rem] font-bold mb-2 tracking-wide">VIP Hizmetler</h3>
          <ul className="flex flex-col gap-1 text-[0.97rem]">
            <li><a href="/vip-havalimani" className="footer-link">Havalimanı VIP Transfer</a></li>
            <li><a href="/sehirler-arasi" className="footer-link">Şehirlerarası Transfer</a></li>
            <li><a href="/kurumsal" className="footer-link">Kurumsal Transfer</a></li>
            <li className="md:block hidden"><a href="https://yolcutransferi.com/dron" className="footer-link">Dron Yolcu Transferi</a></li>
            <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
            <li><a href="/rezervasyon" className="footer-link">Rezervasyon</a></li>
            <li><a href="/uyeol_sofor" className="footer-link">Şoför Başvurusu</a></li>
          </ul>
        </div>
        {/* Kurumsal & Yasal */}
        <div className="pl-2 md:pl-4">
          <h3 className="text-gold text-[1.08rem] font-bold mb-2 tracking-wide">Kurumsal & Yasal</h3>
          <ul className="flex flex-col gap-1 text-[0.97rem]">
            <li><a href="/hakkimizda" className="footer-link">Hakkımızda</a></li>
            <li className="md:block hidden"><a href="/kvkk" className="footer-link">KVKK</a></li>
            <li><a href="/gizlilik-politikasi" className="footer-link">Gizlilik</a></li>
            <li><a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a></li>
            <li><a href="/mesafeli-satis" className="footer-link">Mesafeli Satış</a></li>
            <li><a href="/iade" className="footer-link">İptal ve İade</a></li>
            <li><a href="/sss" className="footer-link">S.S.S.</a></li>
          </ul>
        </div>
        {/* Masaüstü İletişim ve Logolar */}
        <div className="hidden md:flex flex-col items-start justify-start">
          <h3 className="text-gold text-[1.08rem] font-bold mb-2 tracking-wide">İletişim</h3>
          <div className="flex flex-col gap-1 text-[0.97rem]">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gold" />
              <a href="tel:+905395267569" className="footer-link">+90 539 526 75 69</a>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gold" />
              <a href="mailto:info@yolcutransferi.com" className="footer-link">info@yolcutransferi.com</a>
            </div>
            <div className="flex gap-2 mt-2">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="WhatsApp">
                <FaWhatsapp size={21} />
              </a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="X">
                <SiX size={20} />
              </a>
            </div>
          </div>
          {/* LOGO BANDI desktopta */}
          <div
            className="logo-band mt-3"
            style={{
              background: "linear-gradient(90deg,#edece7 0%,#dbdbd7 100%)",
              border: "2.5px solid #bfa658",
              minHeight: "50px",
              borderRadius: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "360px",
              padding: "7px 20px",
              marginLeft: 0,
              marginTop: 16,
              marginBottom: 4,
              gap: "13px",
              boxShadow: "0 3px 18px #bfa65833",
            }}
          >
            <Image src="/tursab.png" alt="TÜRSAB" width={48} height={24} className="footer-card-img desktop-logo" />
            <Image src="/mastercard.png" alt="MasterCard" width={48} height={24} className="footer-card-img desktop-logo" />
            <Image src="/visa.png" alt="Visa" width={48} height={24} className="footer-card-img desktop-logo" />
            <Image src="/Troy.png" alt="TROY" width={48} height={24} className="footer-card-img desktop-logo" />
            <Image src="/iyzico.png" alt="iyzico" width={54} height={24} className="footer-card-img desktop-logo" />
          </div>
        </div>
      </div>

      {/* Mobilde iletişim başlığı ve ikonlar yan yana */}
      <div className="md:hidden flex flex-col items-start mt-2 mb-2 w-full max-w-6xl mx-auto pl-2">
        <div className="flex items-center gap-2 w-full mb-2">
          <h3 className="text-gold text-[1.08rem] font-bold tracking-wide mb-0 whitespace-nowrap">İletişim</h3>
          <div className="flex flex-row flex-wrap gap-2 ml-2">
            <a href="tel:+905395267569" className="footer-social" aria-label="Telefon"><FaPhoneAlt size={19} /></a>
            <a href="mailto:info@yolcutransferi.com" className="footer-social" aria-label="Mail"><FaEnvelope size={18} /></a>
            <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
            <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="Instagram"><FaInstagram size={17} /></a>
            <a href="https://www.linkedin.com/company/yolcutransferi/" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="LinkedIn"><FaLinkedin size={17} /></a>
            <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" className="footer-social" aria-label="X"><SiX size={17} /></a>
          </div>
        </div>
        {/* Mobilde logolar */}
        <div
          className="logo-band mt-2"
          style={{
            background: "linear-gradient(90deg,#edece7 0%,#dbdbd7 100%)",
            border: "2px solid #bfa658",
            minHeight: "38px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "98vw",
            maxWidth: 400,
            padding: "6px 13px",
            marginLeft: 0,
            marginTop: 7,
            marginBottom: 4,
            gap: "15px",
            boxShadow: "0 3px 12px #bfa65833",
          }}
        >
          <Image src="/tursab.png" alt="TÜRSAB" width={36} height={27} className="footer-card-img mobile-logo" />
          <Image src="/mastercard.png" alt="MasterCard" width={36} height={27} className="footer-card-img mobile-logo" />
          <Image src="/visa.png" alt="Visa" width={36} height={27} className="footer-card-img mobile-logo" />
          <Image src="/Troy.png" alt="TROY" width={36} height={27} className="footer-card-img mobile-logo" />
          <Image src="/iyzico.png" alt="iyzico" width={42} height={27} className="footer-card-img mobile-logo" />
        </div>
      </div>

      {/* Alt BAND */}
      <div className="w-full flex flex-col items-center justify-center max-w-6xl mx-auto pt-2 pb-1">
        <div className="text-[15px] text-gold font-semibold text-center mb-0 flex items-center gap-1 flex-wrap justify-center">
          <FaMapMarkerAlt className="inline-block mr-1 text-gold" size={16} />
          Türkiye Geneli 7/24 VIP Transfer Hizmeti &nbsp;
          <span className="text-gray-400 font-light ml-2">
            © {new Date().getFullYear()} <span className="text-gold font-semibold">YolcuTransferi.com</span> • Tüm hakları saklıdır.
          </span>
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
          font-size: 1.11rem;
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
          background: transparent;
          border-radius: 7px;
          padding: 2px 7px;
          object-fit: contain;
          display: inline-block;
          transition: all .2s;
        }
        .desktop-logo { height: 24px !important; }
        .mobile-logo { height: 27px !important; }
        @media (max-width: 900px) {
          .desktop-logo { height: 19px !important; padding: 2px 4px; width: auto !important; }
        }
        @media (max-width: 600px) {
          .footer-card-img { height: 19px !important; }
          .logo-band { padding-left: 5px !important; padding-right: 5px !important; }
        }
        @media (max-width: 480px) {
          .footer-card-img { height: 14px !important; }
          .logo-band { padding-left: 3px !important; padding-right: 3px !important; }
        }
      `}</style>
    </footer>
  );
}

// === Dosya SONU: components/Footer.jsx ===
