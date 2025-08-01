// PATH: /app/login/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/uyelikler/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, sifre }),
    });
    const data = await res.json();
    if (data.ok) {
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.forceChange) {
        router.replace("/sifre-degistir");
      } else {
        setMsg("Giriş başarılı! Yönlendiriliyorsunuz...");
        setTimeout(() => router.replace("/"), 1000);
      }
    } else {
      setMsg(data.error || "Giriş başarısız.");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form onSubmit={handleLogin} className="bg-white text-black p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Giriş Yap</h1>
        <input
          type="email"
          placeholder="E-posta"
          required
          className="w-full p-3 border rounded mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Şifre"
          required
          className="w-full p-3 border rounded mb-3"
          value={sifre}
          onChange={e => setSifre(e.target.value)}
          autoComplete="current-password"
        />
        <button type="submit" className="w-full bg-yellow-400 py-2 rounded font-bold">
          Giriş Yap
        </button>
        <Link href="/sifremi-unuttum" className="block text-sm mt-2 text-blue-700 underline">Şifremi Unuttum</Link>
        {msg && <div className="mt-3 text-red-500">{msg}</div>}
      </form>
    </div>
  );
}
// PATH: /app/login/page.js
