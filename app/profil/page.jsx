// app/profil/page.jsx
"use client";
import { useState, useEffect } from "react";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Kullanıcı bilgisini localStorage'dan çek
    try {
      const u = JSON.parse(localStorage.getItem("user_info"));
      setUser(u);
      setForm(u);
      setPhoto(u?.photo || "");
    } catch {
      setUser(null);
    }
  }, []);

  // Profil fotoğrafı seçilince
  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  // Profil fotoğrafını yükle
  async function handleUploadPhoto(e) {
    e.preventDefault();
    if (!selectedFile || !user) return setStatus("Dosya seçilmedi!");

    const formData = new FormData();
    // Kullanıcıya özel dosya ismi: üyeno.png
    formData.append("file", selectedFile);
    formData.append("filename", `${user.uyeNo}.png`);

    setStatus("Yükleniyor...");
    const r = await fetch("/api/uye/upload-photo", {
      method: "POST",
      body: formData,
    });
    const data = await r.json();
    if (data.success) {
      setPhoto(data.photoUrl);
      const newUser = { ...user, photo: data.photoUrl };
      setUser(newUser);
      setForm(newUser);
      localStorage.setItem("user_info", JSON.stringify(newUser));
      setStatus("Profil fotoğrafı başarıyla yüklendi!");
    } else {
      setStatus(data.error || "Yükleme hatası!");
    }
  }

  // Bilgileri kaydet
  async function handleSave(e) {
    e.preventDefault();
    setStatus("Kaydediliyor...");
    // Sadece üyeno değiştirilemez!
    const saveForm = { ...form };
    delete saveForm.uyeNo;

    const r = await fetch("/api/uye/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uyeNo: user.uyeNo, ...saveForm }),
    });
    const data = await r.json();
    if (data.success) {
      setUser(data.uye);
      setForm(data.uye);
      localStorage.setItem("user_info", JSON.stringify(data.uye));
      setEdit(false);
      setStatus("Güncellendi.");
    } else {
      setStatus(data.error || "Kayıt hatası!");
    }
  }

  if (!user) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="p-6 bg-white/90 rounded-2xl border shadow-md text-black">
          <div className="text-xl font-bold mb-4">Giriş yapmalısınız.</div>
          <a
            href="/login"
            className="inline-block px-5 py-2 rounded bg-yellow-400 text-black font-semibold mt-3"
          >
            Giriş Yap
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-[#bfa658]">Profilim</h1>
      <div className="bg-black/80 p-6 rounded-2xl shadow-xl border border-[#bfa658] flex flex-col items-center gap-7">
        {/* Profil Fotoğrafı */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={photo || "/profile-default.png"}
            alt="Profil"
            className="w-32 h-32 rounded-full border-4 border-yellow-500 object-cover"
            style={{ background: "#222" }}
          />
          <form onSubmit={handleUploadPhoto} className="flex flex-col items-center gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2 text-sm"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-1 bg-yellow-400 text-black font-bold rounded shadow hover:bg-yellow-300"
            >
              Fotoğrafı Yükle
            </button>
            <div className="text-sm text-[#ffeec2]">{status}</div>
          </form>
        </div>

        {/* Bilgiler - Düzenleme */}
        <form
          onSubmit={handleSave}
          className="w-full max-w-lg flex flex-col gap-2 mt-4"
        >
          <div>
            <span className="font-bold text-[#bfa658] mr-1">Üye Numarası:</span>
            {user.uyeNo}
          </div>
          {user.type === "firma" && (
            <div>
              <span className="font-bold text-[#bfa658] mr-1">Firma Adı:</span>
              {edit ? (
                <input
                  value={form.firmaAdi || ""}
                  onChange={e =>
                    setForm(f => ({ ...f, firmaAdi: e.target.value }))
                  }
                  className="border px-2 py-1 rounded"
                />
              ) : (
                user.firmaAdi || "-"
              )}
            </div>
          )}
          <div>
            <span className="font-bold text-[#bfa658] mr-1">Ad Soyad:</span>
            {edit ? (
              <input
                value={form.ad || ""}
                onChange={e => setForm(f => ({ ...f, ad: e.target.value }))}
                className="border px-2 py-1 rounded"
              />
            ) : (
              user.ad || "-"
            )}
          </div>
          <div>
            <span className="font-bold text-[#bfa658] mr-1">E-posta:</span>
            {edit ? (
              <input
                value={form.email || ""}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="border px-2 py-1 rounded"
              />
            ) : (
              user.email || "-"
            )}
          </div>
          <div>
            <span className="font-bold text-[#bfa658] mr-1">Telefon:</span>
            {edit ? (
              <input
                value={form.telefon || ""}
                onChange={e => setForm(f => ({ ...f, telefon: e.target.value }))}
                className="border px-2 py-1 rounded"
              />
            ) : (
              user.telefon || "-"
            )}
          </div>
          <div>
            <span className="font-bold text-[#bfa658] mr-1">Üyelik Tipi:</span>
            {user.type || "-"}
          </div>
          <div>
            <span className="font-bold text-[#bfa658] mr-1">Şehir:</span>
            {edit ? (
              <input
                value={form.il || ""}
                onChange={e => setForm(f => ({ ...f, il: e.target.value }))}
                className="border px-2 py-1 rounded"
              />
            ) : (
              user.il || "-"
            )}
          </div>

          <div className="flex gap-3 mt-3">
            {!edit ? (
              <button
                type="button"
                onClick={() => setEdit(true)}
                className="px-4 py-1 bg-yellow-400 text-black rounded shadow font-bold"
              >
                Düzenle
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="px-4 py-1 bg-yellow-400 text-black rounded shadow font-bold"
                >
                  Kaydet
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEdit(false);
                    setForm(user);
                  }}
                  className="px-4 py-1 bg-gray-300 text-black rounded shadow font-bold"
                >
                  Vazgeç
                </button>
              </>
            )}
          </div>
          <div className="text-sm text-[#ffeec2] mt-2">{status}</div>
        </form>
      </div>
    </main>
  );
}
// app/profil/page.jsx
