// PATH: app/admin/uyelikler/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function AdminUyelikler() {
  const [uyeler, setUyeler] = useState([]);
  const [tipFilter, setTipFilter] = useState("Hepsi");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Şifre değiştir
  async function handleChangePassword(email) {
    setMsg("Şifre değiştiriliyor...");
    const res = await fetch("/api/uyelikler/sifre-degis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) setMsg("Yeni şifre e-posta ile gönderildi.");
    else setMsg(data.error || "Şifre değiştirilemedi!");
    setTimeout(() => setMsg(""), 3400);
  }

  // Sil butonu
  async function handleDelete(id) {
    if (!window.confirm("Bu üyeyi silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    const res = await fetch(`/api/uyelikler?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setUyeler(u => u.filter(u => u._id !== id));
      setMsg("Üye başarıyla silindi.");
    } else {
      setMsg(data.error || "Silinemedi!");
    }
    setLoading(false);
    setTimeout(() => setMsg(""), 2400);
  }

  useEffect(() => {
    async function fetchUyeler() {
      const res = await fetch("/api/uyelikler");
      const data = await res.json();
      setUyeler(data.items || []);
    }
    fetchUyeler();
  }, []);

  // Filtrelenmiş üyeler
  const displayUyeler = uyeler.filter(u =>
    tipFilter === "Hepsi"
