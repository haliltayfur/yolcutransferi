//app/admin/profil/page.jsx
"use client";
import { useState } from "react";

export default function Profil() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function changePassword() {
    setMsg("...");
    const r = await fetch("/api/admin/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });
    const data = await r.json();
    if (data.success) setMsg("Şifre başarıyla değiştirildi.");
    else setMsg(data.error || "Değişiklik başarısız.");
  }

  return (
    <main className="max-w-lg mx-auto pt-12">
      <div className="bg-[#19160a] p-8 rounded-2xl shadow-xl border border-[#bfa658]">
        <h1 className="text-2xl font-bold mb-6 text-[#bfa658] text-center">Şifre Değiştir</h1>
        <input
          type="password"
          className="w-full p-3 rounded border mb-4 bg-black text-[#ffeec2] focus:outline-none"
          placeholder="Mevcut Şifre"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 rounded border mb-4 bg-black text-[#ffeec2] focus:outline-none"
          placeholder="Yeni Şifre"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <button onClick={changePassword}
          className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700">
          Şifreyi Değiştir
        </button>
        <div className="mt-4 text-center text-[#ffeec2]">{msg}</div>
      </div>
    </main>
  );
}
//app/admin/profil/page.jsx
