// PATH: app/admin/uyelikler/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function AdminUyelikler() {
  const [uyeler, setUyeler] = useState([]);
  const [tipFilter, setTipFilter] = useState("Hepsi");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Şifre değiştir
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
    <main className="p-1 md:p-8">
      <h2 className="text-3xl mb-5 font-bold text-[#FFD700]">Üyelikler</h2>
      <div className="mb-3 flex flex-col md:flex-row gap-2 md:items-center">
        <div>
          <span className="font-bold mr-2 text-[#FFD700]">Üye Tipi Seç:</span>
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
        <span className="ml-5 text-gray-300 text-sm">{displayUyeler.length} üye bulundu.</span>
      </div>
      {msg && <div className="text-green-500 mb-2">{msg}</div>}
      <table className="w-full border border-[#FFD700] text-[#FFD700] rounded text-center bg-black/90">
        <thead>
          <tr className="bg-[#19160a] text-lg">
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
              <td className="p-2 font-mono text-base">{u.uyeno || u._id?.slice(-6) || "-"}</td>
              <td>{u.ad && u.soyad ? `${u.ad} ${u.soyad}` : (u.firmaAdi || "-")}</td>
              <td>{u.tip || "-"}</td>
              <td>{u.email || "-"}</td>
              <td>{u.telefon || "-"}</td>
              <td>
                <button
                  className="bg-yellow-600 px-3 py-1 rounded font-bold mr-2"
                  onClick={() => handleChangePassword(u.email)}
                  disabled={u.tip === "admin"}
                  title="Yeni şifre üretilip e-posta ile gönderilir."
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
