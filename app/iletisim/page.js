"use client";
import { useState } from "react";
import Image from "next/image";

export default function Iletisim() {
  const [form, setForm] = useState({ ad: "", email: "", telefon: "", mesaj: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const resp = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (resp.ok) {
        setStatus("success");
        setForm({ ad: "", email: "", telefon: "", mesaj: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-10 px-2">
      <h1 className="text-3xl font-bold mb-6 text-[#6e5a1e]">İletişim</h1>
      <div className="w-full flex flex-col md:flex-row gap-10 items-center justify-center">
        <div className="hidden md:block">
          <Image
            src="/iletisim-illustrasyon.png"
            alt="İletişim"
            width={300}
            height={240}
            className="rounded-lg shadow"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-black/70 border-4 border-[#6e5a1e] rounded-xl p-6 w-full max-w-md shadow-lg"
        >
          <input
            type="text"
            name="ad"
            placeholder="Adınız Soyadınız"
            className="bg-[#222] border border-[#6e5a1e] rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
            value={form.ad}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            className="bg-[#222] border border-[#6e5a1e] rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="telefon"
            placeholder="Telefon (Opsiyonel)"
            className="bg-[#222] border border-[#6e5a1e] rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
            value={form.telefon}
            onChange={handleChange}
          />
          <textarea
            name="mesaj"
            placeholder="Mesajınız"
            className="bg-[#222] border border-[#6e5a1e] rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none min-h-[80px]"
            value={form.mesaj}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-[#6e5a1e] hover:bg-[#8c7327] text-white font-bold py-3 px-6 rounded-xl text-lg shadow"
            disabled={loading}
          >
            {loading ? "Gönderiliyor..." : "Mesajı Gönder"}
          </button>
          {status === "success" && (
            <div className="text-green-400 text-sm mt-2">Mesajınız iletildi, en kısa sürede dönüş yapılacaktır.</div>
          )}
          {status === "error" && (
            <div className="text-red-400 text-sm mt-2">Mesaj gönderilemedi. Lütfen tekrar deneyin.</div>
          )}
        </form>
      </div>
    </div>
  );
}
