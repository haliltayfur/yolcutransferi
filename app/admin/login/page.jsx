"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("info@yolcutransferi.com");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");

  async function sendCode() {
    setMsg("Kod gönderiliyor...");
    const r = await fetch("/api/admin/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await r.json();
    if (data.success) { setStep(2); setMsg("Kod e-posta adresinize gönderildi."); }
    else setMsg(data.error || "Kod gönderilemedi.");
  }

  async function verifyCode() {
    setMsg("Doğrulanıyor...");
    const r = await fetch("/api/admin/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await r.json();
    if (data.success) {
      setMsg("Giriş başarılı! Yönlendiriliyorsunuz...");
      // Burada bir cookie set edilebilir ya da yönlendirme yapılabilir
      window.location.href = "/admin"; // admin paneline yönlendir
    } else setMsg(data.error || "Kod yanlış veya süresi dolmuş.");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-[#19160a] rounded-2xl shadow-xl border border-[#bfa658] w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-[#bfa658] text-center">Admin Giriş</h1>
        {step === 1 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Admin E-posta</label>
            <input type="email" className="w-full p-3 rounded border mb-4" value={email} readOnly />
            <button onClick={sendCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700">Giriş Kodu Gönder</button>
          </>
        )}
        {step === 2 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Maildeki Giriş Kodu</label>
            <input type="text" className="w-full p-3 rounded border mb-4" value={code} onChange={e => setCode(e.target.value)} />
            <button onClick={verifyCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700">Kodu Doğrula</button>
          </>
        )}
        <div className="mt-4 text-center text-[#ffeec2]">{msg}</div>
      </div>
    </main>
  );
}
