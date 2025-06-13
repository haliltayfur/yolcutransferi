"use client";
import { useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    // Demo: admin/admin
    if (user === "admin" && pass === "admin") setLogin(true);
    else alert("Hatalı giriş");
  }

  if (!login) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/40 py-8">
        <section className="w-full max-w-sm bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold">
          <h1 className="text-2xl font-bold text-gold mb-6 text-center">Admin Girişi</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              className="px-4 py-2 rounded-lg border"
              value={user}
              onChange={e => setUser(e.target.value)}
              autoFocus
            />
            <input
              type="password"
              placeholder="Şifre"
              className="px-4 py-2 rounded-lg border"
              value={pass}
              onChange={e => setPass(e.target.value)}
            />
            <button type="submit" className="bg-gold text-black font-semibold rounded-lg py-2 mt-3">Giriş Yap</button>
          </form>
        </section>
      </main>
    );
  }

  // Giriş başarılıysa ana admin menü
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-xl bg-black/80 rounded-2xl shadow-lg px-8 py-10 border border-gold flex flex-col items-center">
        <h1 className="text-2xl font-bold text-gold mb-10 text-center">Admin Paneli</h1>
        <div className="flex flex-col gap-6 w-full max-w-xs">
          <Link
            href="/admin/rezervasyonlar"
            className="bg-gold text-black font-bold rounded-lg px-6 py-4 text-lg shadow hover:bg-yellow-500 transition text-center"
          >
            Rezervasyon Talepleri
          </Link>
          <Link
            href="/admin/iletisim"
            className="bg-gold text-black font-bold rounded-lg px-6 py-4 text-lg shadow hover:bg-yellow-500 transition text-center"
          >
            İletişimden Gelenler
          </Link>
        </div>
      </section>
    </main>
  );
}
