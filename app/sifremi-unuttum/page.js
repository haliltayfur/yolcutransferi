// PATH: /app/sifremi-unuttum/page.js
"use client";
import { useState } from "react";

export default function SifremiUnuttum() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("Gönderiliyor...");
    const res = await fetch("/api/uyelikler/sifre-degis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMsg(data.success
      ? "Yeni şifreniz e-posta adresinize gönderildi! İlk girişte şifrenizi değiştirin."
      : (data.error || "Bir hata oluştu."));
    setDone(data.success);
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleSubmit} className="bg-white text-black p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Şifremi Unuttum</h1>
        <input
          type="email"
          placeholder="E-posta"
          required
          className="w-full p-3 border rounded mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={done}
        />
        <button type="submit" className="w-full bg-yellow-400 py-2 rounded font-bold" disabled={done}>
          Yeni Şifre Gönder
        </button>
        {msg && <div className="mt-3 text-green-700">{msg}</div>}
      </form>
    </div>
  );
}
// PATH: /app/sifremi-unuttum/page.js
