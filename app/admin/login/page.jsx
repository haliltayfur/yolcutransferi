// PATH: /app/admin/login/page.jsx
"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function AdminLoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [mail, setMail] = useState("");
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  function handleEnter(e, fn) {
    if (e.key === "Enter") fn();
  }

  const handleMail = async () => {
    setMsg("");
    if (
      !["info@yolcutransferi.com", "byhaliltayfur@hotmail.com"].includes(
        mail.trim().toLowerCase()
      )
    ) {
      setMsg("Yetkisiz e-posta!");
      return;
    }
    setStep(2);
  };

  const handleKod = async () => {
    setMsg("");
    if (code.trim() !== "111111") {
      setMsg("Kod hatalı!");
      return;
    }
    setStep(3);
  };

  const handlePass = async () => {
    setMsg("");
    if (pass !== "Marmara1*!") {
      setMsg("Şifre hatalı!");
      return;
    }
    localStorage.setItem("admin_auth", "ok");
    const next = searchParams.get("next") || "/admin";
    router.replace(next);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#232112] border-2 border-[#bfa658] p-8 rounded-2xl shadow-2xl max-w-xs w-full">
        <h2 className="text-center text-2xl text-[#bfa658] font-bold mb-6">Admin Giriş</h2>
        {step === 1 && (
          <>
            <label className="font-bold text-[#bfa658]">M</label>
            <input
              type="email"
              className="w-full border rounded px-2 py-2 mt-1 mb-2 bg-black text-[#ffeec2]"
              placeholder="Admin Mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              onKeyDown={(e) => handleEnter(e, handleMail)}
              autoFocus
            />
            <button
              className="w-full mt-2 bg-[#bfa658] text-black font-bold py-2 rounded hover:bg-yellow-500"
              onClick={handleMail}
            >
              Devam Et
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <label className="font-bold text-[#bfa658]">K</label>
            <input
              type="text"
              className="w-full border rounded px-2 py-2 mt-1 mb-2 bg-black text-[#ffeec2]"
              placeholder="Kod"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => handleEnter(e, handleKod)}
              autoFocus
            />
            <button
              className="w-full mt-2 bg-[#bfa658] text-black font-bold py-2 rounded hover:bg-yellow-500"
              onClick={handleKod}
            >
              Devam Et
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <label className="font-bold text-[#bfa658]">P</label>
            <input
              type="password"
              className="w-full border rounded px-2 py-2 mt-1 mb-2 bg-black text-[#ffeec2]"
              placeholder="Şifre"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => handleEnter(e, handlePass)}
              autoFocus
            />
            <button
              className="w-full mt-2 bg-[#bfa658] text-black font-bold py-2 rounded hover:bg-yellow-500"
              onClick={handlePass}
            >
              Giriş
            </button>
          </>
        )}
        {msg && <div className="mt-2 text-red-400 font-bold text-sm text-center">{msg}</div>}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginInner />
    </Suspense>
  );
}
// PATH: /app/admin/login/page.jsx
