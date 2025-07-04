// PATH: /app/admin/login/page.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function LoginInner() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Giriş yapanı admin paneline at
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("admin_auth") === "ok") {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Giriş yapılıyor...");
    // Örneğin admin: admin@yolcutransferi.com / şifre: YOLCU2024!
    if (email === "admin@yolcutransferi.com" && pass === "YOLCU2024!") {
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_auth", "ok");
      }
      setMsg("Başarılı, yönlendiriliyor...");
      setTimeout(() => {
        // Eğer next param varsa oraya git, yoksa admin ana sayfa
        const next = searchParams.get("next");
        router.replace(next && next.startsWith("/admin") ? next : "/admin");
      }, 900);
    } else {
      setMsg("Hatalı e-posta veya şifre!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-[#19160a] to-[#282314]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-7 rounded-2xl shadow-2xl bg-black/90 border border-[#bfa658] flex flex-col gap-5"
        style={{ marginTop: 60 }}
      >
        <h1 className="text-2xl font-bold text-[#bfa658] text-center">Admin Giriş</h1>
        <input
          type="email"
          className="p-3 rounded-lg bg-[#181818] border border-[#bfa658] text-[#ffeec2] font-semibold focus:outline-none"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <input
          type="password"
          className="p-3 rounded-lg bg-[#181818] border border-[#bfa658] text-[#ffeec2] font-semibold focus:outline-none"
          placeholder="Şifre"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 py-2 rounded-xl bg-[#bfa658] text-black font-bold text-lg hover:bg-yellow-700 transition"
        >
          Giriş Yap
        </button>
        <div className="text-center mt-2 text-[#ffeec2] min-h-[24px]">{msg}</div>
      </form>
    </div>
  );
}

// Suspense ile sarmalandı, böylece build hatası gelmez!
export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="text-[#ffeec2] p-8 text-center">Yükleniyor...</div>}>
      <LoginInner />
    </Suspense>
  );
}
// PATH: /app/admin/login/page.jsx
