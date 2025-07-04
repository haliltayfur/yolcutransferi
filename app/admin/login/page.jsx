// PATH: app/admin/login/page.jsx

"use client";
import { useState } from "react";

export default function AdminLogin() {
  // 1: mail, 2: kod, 3: şifre
  const [step, setStep] = useState(1);
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // MAIL -> KOD AKTİF
  const handleMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    // API’ye istek: admin mail ise kod gönder
    const res = await fetch("/api/admin/auth/request-code", {
      method: "POST",
      body: JSON.stringify({ email: mail }),
      headers: { "Content-Type": "application/json" }
    });
    setLoading(false);
    if (res.ok) {
      setStep(2);
    } else {
      setMsg("Yetkili admin maili giriniz.");
    }
  };

  // KOD -> ŞİFRE
  const handleCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/admin/auth/verify-code", {
      method: "POST",
      body: JSON.stringify({ email: mail, code }),
      headers: { "Content-Type": "application/json" }
    });
    setLoading(false);
    if (res.ok) {
      setStep(3);
    } else {
      setMsg("Kod yanlış veya süresi doldu.");
    }
  };

  // ŞİFRE
  const handlePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/admin/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: mail, code, password }),
      headers: { "Content-Type": "application/json" }
    });
    setLoading(false);
    if (res.ok) {
      localStorage.setItem("admin_auth", "ok");
      window.location.href = "/admin";
    } else {
      setMsg("Şifre hatalı!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-[#19160a] to-[#282314]">
      <div className="bg-black border-2 border-[#bfa658] rounded-3xl px-10 py-12 w-full max-w-sm shadow-2xl">
        <div className="text-2xl font-extrabold mb-5 text-[#bfa658] text-center">Admin Giriş</div>

        {step === 1 && (
          <form onSubmit={handleMail} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="M"
              value={mail}
              onChange={e => setMail(e.target.value)}
              className="p-3 rounded-lg bg-[#181810] border border-[#bfa658] text-[#ffeec2] font-semibold focus:outline-none"
              autoFocus
              autoComplete="off"
              inputMode="email"
              required
            />
            <button type="submit" disabled={loading} className="bg-[#bfa658] rounded-lg text-black font-bold py-2 mt-2">
              {loading ? "..." : "Devam"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCode} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="K"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="p-3 rounded-lg bg-[#181810] border border-[#bfa658] text-[#ffeec2] font-semibold focus:outline-none"
              autoFocus
              autoComplete="off"
              inputMode="numeric"
              required
            />
            <button type="submit" disabled={loading} className="bg-[#bfa658] rounded-lg text-black font-bold py-2 mt-2">
              {loading ? "..." : "Devam"}
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePassword} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="P"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="p-3 rounded-lg bg-[#181810] border border-[#bfa658] text-[#ffeec2] font-semibold focus:outline-none"
              autoFocus
              autoComplete="off"
              required
            />
            <button type="submit" disabled={loading} className="bg-[#bfa658] rounded-lg text-black font-bold py-2 mt-2">
              {loading ? "..." : "Giriş Yap"}
            </button>
          </form>
        )}

        {msg && <div className="text-red-500 text-center mt-3">{msg}</div>}
      </div>
    </div>
  );
}

// PATH: app/admin/login/page.jsx
