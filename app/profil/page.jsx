// app/profil/page.jsx
"use client";
import { useState, useEffect } from "react";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user_info"));
    setUser(u);
    setPhoto(u?.photo || "");
  }, []);

  function handleFileChange(e) {
    setSelectedFile(e.target.files[0]);
  }

  async function handleUploadPhoto(e) {
    e.preventDefault();
    if (!selectedFile || !user) return setStatus("Dosya seçilmedi!");

    const formData = new FormData();
    formData.append("file", selectedFile);
    // Fotoğraf ismi: üyeno.png (tam sabit)
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
      localStorage.setItem("user_info", JSON.stringify(newUser));
      setStatus("Profil fotoğrafı başarıyla yüklendi!");
    } else {
      setStatus(data.error || "Yükleme hatası!");
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
        {/* Diğer profil alanları burada ... */}
      </div>
    </main>
  );
}
// app/profil/page.jsx
