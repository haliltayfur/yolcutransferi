"use client";
import { useState } from "react";

export default function LoginPage() {
  const [type, setType] = useState("musteri");

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Giriş / Üye Ol</h1>
      <form className="bg-white text-black px-8 py-7 rounded-xl shadow-lg w-full max-w-md space-y-4">
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
        <div>
          <label className="block mb-1 font-semibold">E-posta:</label>
          <input type="email" required className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Şifre:</label>
          <input type="password" required className="w-full border rounded px-2 py-1" />
        </div>
        <button
          type="submit"
          className="w-full mt-2 bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500"
        >
          Giriş Yap / Üye Ol
        </button>
      </form>
    </div>
  );
}
