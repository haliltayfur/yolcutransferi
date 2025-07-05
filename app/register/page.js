// PATH: /app/register/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [tip, setTip] = useState("musteri");
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [telefon, setTelefon] = useState("");
  const [il, setIl] = useState("");
  const [msg, setMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setMsg("Kayıt oluşturuluyor...");
    const res = await fetch("/api/uyelikler", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tip, ad, soyad, email, sifre, telefon, il }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify({ tip, ad, soyad, email, telefon, il }));
      setMsg("");
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        router.replace("/");
      }, 2600);
    } else {
      setMsg(data.error || "Kayıt başarısız.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleRegister} className="bg-white text-black p-8 rounded-xl shadow w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Üye Ol</h1>
        <select value={tip} onChange={e => setTip(e.target.value)} className="w-full p-3 border rounded mb-3">
          <option value="musteri">Müşteri</option>
          <option value="sofor">Araçlı Şoför</option>
          <option value="firma">Firma</option>
          <option value="isbirligi">İş Birliği</option>
        </select>
        <input type="text" placeholder="Adınız" required className="w-full p-3 border rounded mb-3" value={ad} onChange={e => setAd(e.target.value)} />
        <input type="text" placeholder="Soyadınız" required className="w-full p-3 border rounded mb-3" value={soyad} onChange={e => setSoyad(e.target.value)} />
        <input type="email" placeholder="E-posta" required className="w-full p-3 border rounded mb-3" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Şifre" required className="w-full p-3 border rounded mb-3" value={sifre} onChange={e => setSifre(e.target.value)} />
        <input type="tel" placeholder="Telefon" required className="w-full p-3 border rounded mb-3" value={telefon} onChange={e => setTelefon(e.target.value)} />
        <input type="text" placeholder="İl" required className="w-full p-3 border rounded mb-3" value={il} onChange={e => setIl(e.target.value)} />
        <button type="submit" className="w-full bg-yellow-400 py-2 rounded font-bold" disabled={!!msg && msg.startsWith("Kayıt")}>
          Üye Ol
        </button>
        {msg && <div className="mt-3 text-red-500">{msg}</div>}
      </form>
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white text-black px-8 py-10 rounded-xl shadow-xl flex flex-col items-center gap-2">
            <div className="text-2xl font-bold text-yellow-600">✔️</div>
            <div className="font-bold text-lg">Teşekkürler, üyeliğiniz oluşturuldu.</div>
            <div>Otomatik giriş yapılıyor. Hoş geldiniz!</div>
          </div>
        </div>
      )}
    </div>
  );
}
// PATH: /app/register/page.js
