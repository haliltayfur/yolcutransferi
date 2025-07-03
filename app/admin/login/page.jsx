// app/admin/login/page.jsx
"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginInner() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("admin_auth") === "ok") {
        router.replace("/admin");
      }
    }
  }, [router]);

  async function sendCode() {
    setMsg("Kod gönderiliyor...");
    const r = await fetch("/api/admin/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await r.json();
    if (data.success) {
      setStep(2); setMsg("");
    } else setMsg(data.error || "Kod gönderilemedi.");
  }

  async function verifyCode() {
    setMsg("");
    const r = await fetch("/api/admin/auth/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    const data = await r.json();
    if (data.success) {
      setStep(3); setMsg("");
    } else setMsg(data.error || "Kod yanlış veya süresi dolmuş.");
  }

  async function verifyPassword() {
    setMsg("Doğrulanıyor...");
    const r = await fetch("/api/admin/auth/verify-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await r.json();
    if (data.success) {
      localStorage.setItem("admin_auth", "ok");
      const next = searchParams.get("next") || "/admin";
      window.location.href = next;
    } else setMsg(data.error || "Şifre hatalı.");
  }

  function handleKey(e, cb) {
    if (e.key === "Enter") cb();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-8 bg-[#19160a] rounded-2xl shadow-xl border border-[#bfa658] w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-[#bfa658] text-center">Admin Giriş</h1>
        {step === 1 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">E-posta</label>
            <input
              type="email"
              className="w-full p-3 rounded border mb-4 bg-black text-[#ffd]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => handleKey(e, sendCode)}
              autoFocus
            />
            <button onClick={sendCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700"
            >Kodu Gönder</button>
          </>
        )}
        {step === 2 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Kod</label>
            <input
              type="text"
              className="w-full p-3 rounded border mb-4"
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyDown={e => handleKey(e, verifyCode)}
              autoFocus
            />
            <button onClick={verifyCode}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700"
            >Kodu Doğrula</button>
          </>
        )}
        {step === 3 && (
          <>
            <label className="block mb-2 text-[#ffeec2]">Şifre</label>
            <input
              type="password"
              className="w-full p-3 rounded border mb-4"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => handleKey(e, verifyPassword)}
              autoFocus
            />
            <button onClick={verifyPassword}
              className="w-full bg-[#bfa658] text-black font-bold rounded-xl py-3 hover:bg-yellow-700"
            >Giriş Yap</button>
          </>
        )}
        <div className="mt-4 text-center text-[#ffeec2]">{msg}</div>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  // Suspense ile sarmak artık zorunlu!
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <LoginInner />
    </Suspense>
  );
}
// app/admin/login/page.jsx
