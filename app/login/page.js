//app/login/page.js
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [type, setType] = useState("musteri");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState("");
  const [code, setCode] = useState("");

  // Giriş/Üye Ol
  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    if (step === 1) {
      const res = await fetch("/api/uyelikler/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sifre }),
      });
      const data = await res.json();
      if (data.success) {
        setStep(2); setMsg("");
      } else {
        setMsg(data.error || "Giriş başarısız.");
      }
    } else if (step === 2) {
      const res = await fetch("/api/uyelikler/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (data.success) {
        setMsg("Giriş başarılı!"); // Burada JWT/session vs. başlatılabilir.
        // window.location.href = "/";
      } else {
        setMsg(data.error || "Kod yanlış veya süresi dolmuş.");
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Giriş / Üye Ol</h1>
      <form className="bg-white text-black px-8 py-7 rounded-xl shadow-lg w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        {/* Üyelik Tipi */}
        <div>
          <label className="block mb-1 font-semibold">Üyelik Tipi:</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="w-full border rounded px-2 py-1"
          >
            <option value="musteri">Müşteri</option>
            <option value="sofor">Araçlı Şoför</option>
            <option value="firma">Firma</option>
            <option value="isbirligi">İş Birliği</option>
          </select>
        </div>
        {/* Diğer giriş/üyelik alanları */}
        {step === 1 && (
          <>
            <div>
              <label className="block mb-1 font-semibold">E-posta:</label>
              <input type="email" required className="w-full border rounded px-2 py-1" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Şifre:</label>
              <input type="password" required className="w-full border rounded px-2 py-1" value={sifre} onChange={e => setSifre(e.target.value)} />
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
            >
              Giriş Yap / Üye Ol
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <label className="block mb-1 font-semibold">Mailine Gelen Kod:</label>
              <input type="text" required className="w-full border rounded px-2 py-1" value={code} onChange={e => setCode(e.target.value)} />
            </div>
            <button
              type="submit"
              className="w-full mt-2 bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
            >
              Kodu Doğrula
            </button>
          </>
        )}
        {msg && <div className="text-center text-red-600 font-bold mt-2">{msg}</div>}
      </form>
    </div>
  );
}
//app/login/page.js
