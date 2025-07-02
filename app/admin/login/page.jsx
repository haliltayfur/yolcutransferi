// app/admin/login/page.jsx

"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email] = useState("info@yolcutransferi.com");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendCode() {
    setLoading(true);
    setMsg("");
    try {
      const r = await fetch("/api/admin/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await r.json();
      if (data.success) {
        setStep(2);
        setMsg("Giriş kodu e-posta adresinize gönderildi.");
      } else setMsg(data.error || "Kod gönderilemedi.");
    } catch {
      setMsg("Sunucu hatası. Tekrar deneyin.");
    }
    setLoading(false);
  }

  async function verifyCode() {
    setLoading(true);
    setMsg("");
    try {
      const r = await fetch("/api/admin/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await r.json();
      if (data.success) {
        setMsg("Giriş başarılı! Yönlendiriliyorsunuz...");
        localStorage.setItem("admin_auth", "ok");
        setTimeout(() => window.location.href = "/admin", 800);
      } else {
        setMsg(data.error || "Kod yanlış veya süresi dolmuş.");
      }
    } catch {
      setMsg("Sunucu hatası. Tekrar deneyin.");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-[#19160a] rounded-2xl shadow-xl border border-[#bfa658] w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-[#bfa658] text-center">Admin Giriş</h1>
        {step === 1 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Admin E-posta</label>
            <input
              type="email"
              className="w-full p-3 rounded border mb-4 bg-black/40 text-[#ffeec2] font-semibold"
              value={email}
              readOnly
              autoFocus
            />
            <button
              onClick={sendCode}
              disabled={loading}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700 disabled:opacity-60"
            >
              {loading ? "Gönderiliyor..." : "Giriş Kodu Gönder"}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Maildeki Giriş Kodu</label>
            <input
              type="text"
              className="w-full p-3 rounded border mb-4 bg-black/40 text-[#ffeec2] font-semibold tracking-widest"
              maxLength={8}
              value={code}
              autoFocus
              onChange={e => setCode(e.target.value)}
              placeholder="Kodu girin"
            />
            <button
              onClick={verifyCode}
              disabled={loading || !code}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700 disabled:opacity-60"
            >
              {loading ? "Doğrulanıyor..." : "Kodu Doğrula"}
            </button>
          </>
        )}
        <div className={`mt-4 text-center ${msg.includes("başarılı") ? "text-green-400" : "text-[#ffeec2]"}`}>{msg}</div>
        {step === 2 &&
          <button
            onClick={() => { setStep(1); setCode(""); setMsg(""); }}
            className="mt-4 w-full underline text-xs text-[#bfa658] hover:text-yellow-500"
          >
            Kodu almadınız mı? Yeniden gönder
          </button>
        }
      </div>
    </main>
  );
}
