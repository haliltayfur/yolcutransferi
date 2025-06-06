"use client";
import { useState } from "react";
import { FaWhatsapp, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import { SiX } from "react-icons/si";

const SOCIALS = [
  {
    icon: <FaWhatsapp size={22} />,
    name: "WhatsApp",
    url: "https://wa.me/905395267569"
  },
  {
    icon: <FaInstagram size={22} />,
    name: "Instagram",
    url: "https://instagram.com/yolcutransferi"
  },
  {
    icon: <SiX size={22} />,
    name: "X (Twitter)",
    url: "https://x.com/yolcutransferi"
  }
];

const ILETISIM_NEDENLERI = [
  "Rezervasyon",
  "Öneri",
  "Şikayet",
  "İş Birliği",
  "Fiyat Teklifi",
  "Genel Bilgi",
  "Diğer"
];

export default function Iletisim() {
  const [form, setForm] = useState({
    ad: "",
    telefon: "",
    email: "",
    neden: "",
    mesaj: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target
