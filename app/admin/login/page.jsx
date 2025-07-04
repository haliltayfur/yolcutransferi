"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ eposta: mail, sifre: password }),
      headers: { "Content-Type": "application/json" }
    });
    setLoading(false);
    const data = await res.json();
    if (res.ok && data.ok) {
      // Başarılı giriş
      localStorage.setItem("admin_auth", "ok");
      window.location.href = "/admin";
    } else {
      setMsg(data.error || "Şifre hatalı!");
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto p-6 bg-black rounded-lg shadow-lg mt-20">
      <input
        type="email"
        placeholder="E-posta"
        value={mail}
        onChange={e => setMail(e.target.value)}
        className="p-3 rounded-lg bg-[#181810] border border-[#bfa658] text-[#ffeec2] font-semibold"
        autoFocus
        autoComplete="off"
        required
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="p-3 rounded-lg bg-[#181810] border border-[#bfa658] text-[#ffeec2] font-semibold"
        autoComplete="off"
        required
      />
      <button type="submit" disabled={loading} className="bg-[#bfa658] rounded-lg text-black font-bold py-2">
        {loading ? "..." : "Giriş Yap"}
      </button>
      {msg && <div className="text-red-500 text-center mt-3">{msg}</div>}
    </form>
  );
}
