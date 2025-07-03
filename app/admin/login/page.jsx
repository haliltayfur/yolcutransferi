// PATH: app/admin/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function sendCode() {
    setMsg("Kod gönderiliyor...");
    const r = await fetch("/api/admin/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await r.json();
    if (data.success) {
      setStep(2);
      setMsg("Kod e-posta adresinize gönderildi.");
    } else setMsg(data.error || "Kod gönderilemedi.");
  }

  async function verifyCode() {
    setMsg("Kod doğrulanıyor...");
    const r = await fetch("/api/admin/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await r.json();
    if (data.success) {
      setStep(3);
      setMsg("Kod doğru, şifrenizi girin.");
    } else setMsg(data.error || "Kod yanlış veya süresi dolmuş.");
  }

  async function verifyPassword() {
    setMsg("Şifre kontrol ediliyor...");
    const r = await fetch("/api/admin/auth/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await r.json();
    if (data.success) {
      localStorage.setItem("admin_auth", "ok");
      setMsg("Giriş başarılı! Yönlendiriliyorsunuz...");
      router.replace("/admin");
    } else setMsg(data.error || "Şifre yanlış.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-[#19160a] rounded-2xl shadow-xl border border-[#bfa658] w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-[#bfa658] text-center">Admin Giriş</h1>

        {step === 1 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Admin E-posta (M)</label>
            <input
              type="email"
              placeholder="M"
              className="w-full p-3 rounded border mb-4 bg-black text-[#ffd]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={sendCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700"
            >
              Kod Gönder
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Maildeki Kod (K)</label>
            <input
              type="text"
              placeholder="K"
              className="w-full p-3 rounded border mb-4 bg-black text-[#ffd]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={verifyCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700"
            >
              Kodu Doğrula
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Şifre (P)</label>
            <input
              type="password"
              placeholder="P"
              className="w-full p-3 rounded border mb-4 bg-black text-[#ffd]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={verifyPassword}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700"
            >
              Giriş Yap
            </button>
          </>
        )}

        <div className="mt-4 text-center text-[#ffeec2]">{msg}</div>
      </div>
    </main>
  );
}
// PATH: app/admin/login/page.jsx
