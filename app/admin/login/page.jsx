//app/admin/login/page.jsx
"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  // Kod gönderme
  async function sendCode() {
    setMsg("");
    const r = await fetch("/api/admin/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await r.json();
    if (data.success) { setStep(2); setMsg(""); }
    else setMsg(data.error || "Kod gönderilemedi.");
  }

  // Kod doğrulama
  async function verifyCode() {
    setMsg("");
    const r = await fetch("/api/admin/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await r.json();
    if (data.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_auth", "ok");
        window.location.href = "/admin";
      }
    } else setMsg(data.error || "Kod yanlış veya süresi dolmuş.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-[#19160a] rounded-2xl shadow-xl border border-[#bfa658] w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-[#bfa658] text-center">Admin Giriş</h1>
        {step === 1 && (
          <>
            <input
              type="email"
              className="w-full p-3 rounded border mb-4 bg-black text-[#ffeec2] focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
              placeholder=""
              onKeyDown={e => { if(e.key === "Enter") sendCode(); }}
            />
            <button onClick={sendCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700">Devam Et</button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              className="w-full p-3 rounded border mb-4 bg-black text-[#ffeec2] focus:outline-none"
              value={code}
              onChange={e => setCode(e.target.value)}
              autoFocus
              placeholder=""
              onKeyDown={e => { if(e.key === "Enter") verifyCode(); }}
            />
            <button onClick={verifyCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700">Giriş</button>
          </>
        )}
        <div className="mt-4 text-center text-[#ffeec2]">{msg}</div>
      </div>
    </main>
  );
}
//app/admin/login/page.jsx
