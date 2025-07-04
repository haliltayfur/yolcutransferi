// app/admin/login/page.jsx
"use client";
import { useState, useRef, useEffect } from "react";

export default function AdminLoginPage() {
  const [step, setStep] = useState(1); // 1: mail, 2: kod, 3: şifre
  const [mail, setMail] = useState("");
  const [kod, setKod] = useState("");
  const [sifre, setSifre] = useState("");
  const [msg, setMsg] = useState("");
  const inputRef = useRef();

  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [step]);

  // Enter ile ilerleme desteği
  function handleKey(e) { if (e.key === "Enter") ilerle(); }

  function ilerle() {
    if (step === 1 && mail.trim()) {
      // Sadece örnek, API çağrısı ile mail kontrolü burada
      setStep(2);
      setKod("");
      setMsg("");
    } else if (step === 2 && kod.trim()) {
      // Sadece örnek, kod kontrolü burada
      setStep(3);
      setSifre("");
      setMsg("");
    } else if (step === 3 && sifre.trim()) {
      // Şifreyi burada doğrula, başarılıysa /admin'e yönlendir
      if (
        (mail === "info@yolcutransferi.com" || mail === "byhaliltayfur@hotmail.com") &&
        sifre === "Marmara1*!"
      ) {
        window.location.href = "/admin";
      } else {
        setMsg("Yetkisiz giriş veya hatalı şifre!");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-[#19160a] border-2 border-[#bfa658] rounded-2xl shadow-2xl px-10 py-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-[#bfa658] mb-8">Admin Giriş</h1>
        {step === 1 && (
          <>
            <label className="font-semibold text-[#bfa658] mb-2">M</label>
            <input
              ref={inputRef}
              type="email"
              placeholder=""
              className="w-64 px-4 py-3 border-2 border-[#bfa658] rounded-lg bg-black text-white text-lg mb-4 focus:outline-none focus:ring"
              value={mail}
              onChange={e => setMail(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
            />
            <button
              className="w-64 bg-[#bfa658] text-black font-bold py-3 rounded-lg mt-2 hover:bg-[#ffeec2] transition"
              onClick={ilerle}
            >
              →
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <label className="font-semibold text-[#bfa658] mb-2">K</label>
            <input
              ref={inputRef}
              type="text"
              placeholder=""
              className="w-64 px-4 py-3 border-2 border-[#bfa658] rounded-lg bg-black text-white text-lg mb-4 focus:outline-none focus:ring"
              value={kod}
              onChange={e => setKod(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
            />
            <button
              className="w-64 bg-[#bfa658] text-black font-bold py-3 rounded-lg mt-2 hover:bg-[#ffeec2] transition"
              onClick={ilerle}
            >
              →
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <label className="font-semibold text-[#bfa658] mb-2">P</label>
            <input
              ref={inputRef}
              type="password"
              placeholder=""
              className="w-64 px-4 py-3 border-2 border-[#bfa658] rounded-lg bg-black text-white text-lg mb-4 focus:outline-none focus:ring"
              value={sifre}
              onChange={e => setSifre(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
            />
            <button
              className="w-64 bg-[#bfa658] text-black font-bold py-3 rounded-lg mt-2 hover:bg-[#ffeec2] transition"
              onClick={ilerle}
            >
              →
            </button>
          </>
        )}
        {msg && <div className="text-red-400 font-semibold mt-3">{msg}</div>}
      </div>
    </div>
  );
}
// app/admin/login/page.jsx
