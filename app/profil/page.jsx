// app/profil/page.jsx
"use client";
import { useState, useEffect } from "react";

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Kullanıcı bilgisini localStorage'dan çek
    try {
      const u = JSON.parse(localStorage.getItem("user_info"));
      setUser(u);
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
    // Kullanıcıya özel dosya ismi: _id.png (veya email.png)
    const filename =
      (user._id
        ? String(user._id)
        : user.email
        ? user.email.replace(/[@.]/g, "")
        : "user") + ".png";
    formData.append("file", selectedFile);
    formData.append("filename", filename);

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

        {/* Kullanıcı Bilgileri */}
        <div className="w-full max-w-lg">
          <div className="flex flex-col gap-2">
            <div>
              <span className="font-bold text-[#bfa658] mr-1">Ad Soyad:</span>
              {user.ad || "-"}
            </div>
            <div>
              <span className="font-bold text-[#bfa658] mr-1">E-posta:</span>
              {user.email || "-"}
            </div>
            <div>
              <span className="font-bold text-[#bfa658] mr-1">Telefon:</span>
              {user.telefon || "-"}
            </div>
            <div>
              <span className="font-bold text-[#bfa658] mr-1">Üyelik Tipi:</span>
              {user.type || "-"}
            </div>
            <div>
              <span className="font-bold text-[#bfa658] mr-1">Şehir:</span>
              {user.il || "-"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
// app/profil/page.jsx
