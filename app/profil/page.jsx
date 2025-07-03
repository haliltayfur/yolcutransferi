// PATH: app/profil/page.jsx
"use client";
import { useState, useEffect } from "react";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ ad: "", soyad: "", email: "", telefon: "", il: "", tip: "" });

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user_info"));
    setUser(u);
    if (u) setForm(u);
  }, []);

  async function handleUpdate(e) {
    e.preventDefault();
    // Profil güncelleme API isteği burada
    // Başarılıysa localStorage güncelle
    localStorage.setItem("user_info", JSON.stringify(form));
    alert("Profil güncellendi!");
  }

  if (!user) return <div>Önce giriş yapınız.</div>;

  return (
    <main className="flex flex-col items-center mt-10">
      <div className="bg-white rounded-xl shadow p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4">Profilim</h1>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input value={form.ad} onChange={e => setForm({ ...form, ad: e.target.value })} className="w-full border rounded px-3 py-2" />
          <input value={form.soyad} onChange={e => setForm({ ...form, soyad: e.target.value })} className="w-full border rounded px-3 py-2" />
          <input value={form.email} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
          <input value={form.telefon} onChange={e => setForm({ ...form, telefon: e.target.value })} className="w-full border rounded px-3 py-2" />
          <input value={form.il} onChange={e => setForm({ ...form, il: e.target.value })} className="w-full border rounded px-3 py-2" />
          <div className="font-bold">Üyelik Tipi: <span className="text-blue-800">{form.tip}</span></div>
          {/* Profil resmi ekleme/yenileme için input eklenebilir */}
          <button type="submit" className="w-full bg-yellow-500 py-2 rounded font-bold">Güncelle</button>
        </form>
      </div>
    </main>
  );
}
// PATH: app/profil/page.jsx
