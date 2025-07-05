// PATH: app/admin/uyelikler/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function AdminUyelikler() {
  const [uyeler, setUyeler] = useState([]);
  const [tipFilter, setTipFilter] = useState("Hepsi");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [pwModal, setPwModal] = useState({ open: false, email: "", isAdmin: false });
  const [pwValue, setPwValue] = useState("");

  useEffect(() => {
    async function fetchUyeler() {
      const res = await fetch("/api/uyelikler");
      const data = await res.json();
      setUyeler(data.items || []);
    }
    fetchUyeler();
  }, []);

  async function handleChangePassword(email, isAdmin = false) {
    if (isAdmin) {
      setPwModal({ open: true, email, isAdmin: true });
      setPwValue("");
      return;
    }
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

  // Admin için: Şifre modalından post et
  async function handleModalPwChange() {
    setMsg("Şifre güncelleniyor...");
    const res = await fetch("/api/uyelikler/sifre-degis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: pwModal.email, sifre: pwValue }),
    });
    const data = await res.json();
    if (data.success) setMsg("Şifre başarıyla değiştirildi.");
    else setMsg(data.error || "Şifre değiştirilemedi!");
    setPwModal({ open: false, email: "", isAdmin: false });
    setTimeout(() => setMsg(""), 3200);
  }

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
                  onClick={() => handleChangePassword(u.email, u.tip === "admin")}
                  title={u.tip === "admin" ? "Admin şifresini elle belirle" : "Yeni şifre üretilip e-posta ile gönderilir."}
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
      {/* Şifre Değiştir Modalı */}
      {pwModal.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <div className="bg-[#23201a] border-2 border-[#FFD700] p-8 rounded-xl shadow-xl flex flex-col gap-3 min-w-[310px]">
            <div className="font-bold text-lg mb-2 text-[#FFD700]">Yeni Şifre Giriniz</div>
            <input
              type="text"
              value={pwValue}
              onChange={e => setPwValue(e.target.value)}
              className="p-3 rounded border border-[#FFD700] text-black"
              placeholder="Yeni şifre"
              autoFocus
            />
            <div className="flex gap-4 mt-2">
              <button
                className="bg-[#FFD700] text-black font-bold px-5 py-2 rounded"
                onClick={handleModalPwChange}
                disabled={!pwValue}
              >Kaydet</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setPwModal({ open: false, email: "", isAdmin: false })}>Vazgeç</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
// PATH: app/admin/uyelikler/page.jsx
