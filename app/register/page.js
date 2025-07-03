// PATH: app/register/page.js
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
      setMsg("Kayıt başarılı, giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => router.replace("/login"), 2000);
    } else {
      setMsg(data.error || "Kayıt başarısız.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleRegister} className="bg-white text-black p-8 rounded-xl shadow w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Üye Ol</h1>

        <select value={tip} onChange={(e) => setTip(e.target.value)} className="w-full p-3 border rounded mb-3">
          <option value="musteri">Müşteri</option>
          <option value="sofor">Araçlı Şoför</option>
          <option value="firma">Firma</option>
          <option value="isbirligi">İş Birliği</option>
        </select>

        <input type="text" placeholder="Adınız" required className="w-full p-3 border rounded mb-3" value={ad} onChange={(e) => setAd(e.target.value)} />
        <input type="text" placeholder="Soyadınız" required className="w-full p-3 border rounded mb-3" value={soyad} onChange={(e) => setSoyad(e.target.value)} />
        <input type="email" placeholder="E-posta" required className="w-full p-3 border rounded mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Şifre" required className="w-full p-3 border rounded mb-3" value={sifre} onChange={(e) => setSifre(e.target.value)} />
        <input type="tel" placeholder="Telefon" required className="w-full p-3 border rounded mb-3" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
        <input type="text" placeholder="İl" required className="w-full p-3 border rounded mb-3" value={il} onChange={(e) => setIl(e.target.value)} />

        <button type="submit" className="w-full bg-yellow-400 py-2 rounded font-bold">
          Üye Ol
        </button>

        {msg && <div className="mt-3 text-red-500">{msg}</div>}
      </form>
    </div>
  );
}
// PATH: app/register/page.js
