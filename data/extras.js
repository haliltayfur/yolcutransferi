// /data/extras.js
import { FaWifi, FaChild, FaDog, FaNewspaper, FaHandshake, FaGift, FaGlassCheers } from "react-icons/fa";

export const extrasList = [
  { key: "wifi", label: "Wi-Fi", price: 500, icon: <FaWifi /> },
  { key: "child_seat", label: "Çocuk koltuğu", price: 500, icon: <FaChild /> },
  { key: "pet_carry", label: "Hayvan taşıma", price: 500, icon: <FaDog /> },
  { key: "gazete", label: "Gazete servisi", price: 200, icon: <FaNewspaper /> },
  { key: "welcoming", label: "Karşılama hizmeti", price: 400, icon: <FaHandshake /> },
  { key: "cookies", label: "Çerez & Kuruyemiş", price: 300, icon: <FaGift /> },
  { key: "bira", label: "3 Bira (Kuruyemiş dahil)", price: 1500, icon: <FaGlassCheers /> },
  { key: "sarap", label: "Şampanya (Kuruyemiş dahil)", price: 3000, icon: <FaGlassCheers /> },
  { key: "viski", label: "Viski (Kuruyemiş dahil)", price: 4000, icon: <FaGlassCheers /> },
];
