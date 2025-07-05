// PATH: /app/sifre-degistir/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SifreDegistir() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (newPass !== newPass2) return setMsg("Yeni şifreler eşleşmiyor!");
    setMsg("Değiştiriliyor...");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const res = await fetch("/api/uyelikler/sifre-guncelle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, oldPass, newPass }),
    });
    const data = await res.json();
    if (data.success) {
      setMsg("Şifre başarıyla değiştirildi. Giriş ekranına yönlendiriliyorsunuz...");
      setTimeout(() => router.replace("/login"), 1800);
    } else {
      setMsg(data.error || "Hata oluştu!");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Şifre Değiştir</h1>
        <input
          type="password"
          placeholder="Mevcut Şifre"
          required
          className="w-full p-3 border rounded mb-3"
          value={oldPass}
          onChange={e => setOldPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yeni Şifre"
          required
          className="w-full p-3 border rounded mb-3"
          value={newPass}
          onChange={e => setNewPass(e.target.value)}
        />
        <input
          type="password"
          placeholder="Yeni Şifre (Tekrar)"
          required
          className="w-full p-3 border rounded mb-3"
          value={newPass2}
          onChange={e => setNewPass2(e.target.value)}
        />
        <button type="submit" className="w-full bg-yellow-400 py-2 rounded font-bold">
          Değiştir
        </button>
        {msg && <div className="mt-3 text-blue-700">{msg}</div>}
      </form>
    </div>
  );
}
// PATH: /app/sifre-degistir/page.js
