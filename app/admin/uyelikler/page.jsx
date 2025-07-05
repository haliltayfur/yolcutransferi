// PATH: app/admin/uyelikler/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function AdminUyelikler() {
  const [uyeler, setUyeler] = useState([]);
  const [tipFilter, setTipFilter] = useState("Hepsi");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Şifre değiştir için email girilirse
  async function handleChangePassword(email) {
    setMsg("Şifre değiştiriliyor...");
    const res = await fetch("/api/uyelikler/sifre-degis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (data.success) setMsg("Yeni şifre e-posta ile gönderildi.");
    else setMsg(data.error || "Şifre değiştirilemedi!");
    setTimeout(() => setMsg(""), 3400);
  }

  // Sil butonu
  async function handleDelete(id) {
    if (!window.confirm("Bu üyeyi silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    const res = await fetch(`/api/uyelikler?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setUyeler(u => u.filter(u => u._id !== id));
      setMsg("Üye başarıyla silindi.");
    } else {
      setMsg(data.error || "Silinemedi!");
    }
    setLoading(false);
    setTimeout(() => setMsg(""), 2400);
  }

  useEffect(() => {
    async function fetchUyeler() {
      const res = await fetch("/api/uyelikler");
      const data = await res.json();
      setUyeler(data.items || []);
    }
    fetchUyeler();
  }, []);

  // Filtrelenmiş üyeler
  const displayUyeler = uyeler.filter(u => 
    tipFilter === "Hepsi" || (u.tip || "").toLowerCase() === tipFilter.toLowerCase()
  );

  return (
    <main className="p-8">
      <h2 className="text-3xl mb-5 font-bold text-[#FFD700]">Üyelikler</h2>
      <div className="mb-3">
        <select
          value={tipFilter}
          onChange={e => setTipFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option>Hepsi</option>
          <option>musteri</option>
          <option>sofor</option>
          <option>firma</option>
          <option>isbirligi</option>
          <option>admin</option>
        </select>
      </div>
      {msg && <div className="text-green-500 mb-2">{msg}</div>}
      <table className="w-full border border-[#FFD700] text-[#FFD700] rounded">
        <thead>
          <tr className="bg-[#19160a]">
            <th className="p-2">Üye No</th>
            <th>Adı / Firma</th>
            <th>Tip</th>
            <th>E-posta</th>
            <th>Telefon</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {displayUyeler.map(u => (
            <tr key={u._id} className="border-b border-[#FFD70022]">
              <td className="p-2">{u._id?.slice(-4) || "-"}</td>
              <td>{u.ad && u.soyad ? `${u.ad} ${u.soyad}` : (u.firmaAdi || "-")}</td>
              <td>{u.tip || "-"}</td>
              <td>{u.email || "-"}</td>
              <td>{u.telefon || "-"}</td>
              <td>
                <button
                  className="bg-yellow-600 px-3 py-1 rounded font-bold mr-2"
                  onClick={() => handleChangePassword(u.email)}
                  disabled={u.tip === "admin"}
                >
                  Şifre Değiştir
                </button>
                {u.tip !== "admin" && (
                  <button
                    className="bg-red-600 px-3 py-1 rounded font-bold"
                    onClick={() => handleDelete(u._id)}
                    disabled={loading}
                  >
                    Sil
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
// PATH: app/admin/uyelikler/page.jsx
