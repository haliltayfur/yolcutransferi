"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-200 pt-10 pb-7 px-3 border-t border-[#FFD70022] font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-10 mb-5">
        {/* SOL BLOK: Slogan + Açıklama + Kart & Güven Damgaları */}
        <div className="flex flex-col gap-2">
          <p className="text-gold font-bold text-base mb-1 leading-tight">
            “VIP transferde ayrıcalık ve güven.”
          </p>
          <p className="text-xs text-gray-400 mb-2">
            Türkiye’nin lider VIP ve kurumsal yolcu taşıma platformu.<br />
            7/24 profesyonel, lisanslı ve güvenli transfer hizmeti.
          </p>
          {/* Kart ve güven damgaları: Sıra: TÜRSAB, MasterCard(%10 büyük), Visa, Troy(%10 büyük) */}
          <div className="flex items-center gap-4 mt-3">
            <Image src="/tursab.png" alt="TÜRSAB" width={62} height={25} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
            <Image src="/mastercard.png" alt="MasterCard" width={51} height={26} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
            <Image src="/visa.png" alt="Visa" width={46} height={23} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
            <Image src="/Troy.png" alt="TROY" width={51} height={26} style={{ background: "#fff", borderRadius: 6, padding: 2 }} />
          </div>
        </div>

        {/* VIP MENÜ */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gold text-lg font-bold mb-3 tracking-wide">VIP Hizmetler</h3>
          <ul className="space-y-1.5 text-[15px]">
            <li><a href="/hizmetler" className="footer-link">Havalimanı VIP Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Şehirlerarası Transfer</a></li>
            <li><a href="/hizmetler" className="footer-link">Kurumsal Transfer</a></li>
            <li><a href="/araclar" className="footer-link">VIP Araçlar</a></li>
            <li><a href="/rezervasyon" className="footer-link">Online Rezervasyon</a></li>
            <li><a href="/sofor-basvuru" className="footer-link">Şoför Başvurusu</a></li>
          </ul>
        </div>

        {/* KURUMSAL/YASAL MENÜ */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gold text-lg font-bold mb-3 tracking-wide">Kurumsal & Yasal</h3>
          <ul className="space-y-1.5 text-[15px]">
            <li><a href="/hakkimizda" className="footer-link">Hakkımızda</a></li>
            <li><a href="/kvkk" className="footer-link">KVKK Politikası</a></li>
            <li><a href="/gizlilik-politikasi" className="footer-link">Gizlilik Politikası</a></li>
            <li><a href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</a></li>
            <li><a href="/mesafeli-satis" className="footer-link">Mesafeli Satış</a></li>
            <li><a href="/iptal-iade" className="footer-link">İptal ve İade</a></li>
            <li><a href="/sss" className="footer-link">S.S.S.</a></li>
          </ul>
        </div>

        {/* İLETİŞİM + SOSYAL */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gold text-lg font-bold mb-3 tracking-wide">İletişim</h3>
          <ul className="space-y-1.5 text-[15px]">
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-gold" size={16} />
              <a href="tel:+905395267569" className="footer-link">+90 539 526 75 69</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-gold" size={16} />
              <a href="mailto:info@yolcutransferi.com" className="footer-link">info@yolcutransferi.com</a>
            </li>
            {/* Sosyal ikonlar: Whatsapp, Instagram, X */}
            <li className="flex items-center gap-3 mt-2 mb-2">
              <a href="https://wa.me/905395267569" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social">
                <FaWhatsapp size={21} />
              </a>
              <a href="https://www.instagram.com/yolcutransferi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social">
                <FaInstagram size={21} />
              </a>
              <a href="https://x.com/yolcutransferi" target="_blank" rel="noopener noreferrer" aria-label="X" className="footer-social">
                <SiX size={19} />
              </a>
            </li>
            <li className="flex items-center gap-2 mt-1">
              <FaMapMarkerAlt className="text-gold" size={16} />
              <span className="text-xs text-gray-400">Türkiye Geneli 7/24 Hizmet</span>
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
        .footer-link {
          color: #bdbdbd;
          transition: color 0.15s;
          font-weight: 500;
        }
        .footer-link:hover {
          color: #FFD700;
        }
        .footer-social {
          color: #FFD700;
          border-radius: 50%;
          padding: 7px;
          transition: color 0.14s, box-shadow 0.18s;
        }
        .footer-social:hover {
          color: #fff8c0;
          box-shadow: 0 0 10px 3px #FFD70060;
          background: #161616;
        }
      `}</style>
    </footer>
  );
}
