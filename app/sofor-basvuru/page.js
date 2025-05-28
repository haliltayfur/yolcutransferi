"use client";
import { useState, useRef } from "react";

// Demo: eklenen araçlar localde tutulacak (backend’de diziye yazılır!)
export default function SoforBasvuruPage() {
  const [form, setForm] = useState({
    ad: "",
    soyad: "",
    telefon: "",
    email: "",
    il: "",
    ilce: ""
  });
  const [araclar, setAraclar] = useState([]);
  const [aracForm, setAracForm] = useState({
    plaka: "",
    aracTip: "",
    ruhsatNo: "",
    belge: null
  });
  const [msg, setMsg] = useState("");
  const fileRef = useRef();

  // Ana bilgiler
  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  // Araç alanları
  function handleAracChange(e) {
    setAracForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleFile(e) {
    setAracForm(f => ({ ...f, belge: e.target.files[0] }));
  }

  // Araç ekleme
  function handleAddCar(e) {
    e.preventDefault();
    if (!aracForm.plaka || !aracForm.aracTip || !aracForm.ruhsatNo || !aracForm.belge) {
      setMsg("Tüm araç alanlarını ve belgeyi doldurun.");
      return;
    }
    // Benzersiz plaka ve ruhsat kontrolü
    if (araclar.find(a => a.plaka === aracForm.plaka)) {
      setMsg("Bu plaka zaten eklenmiş!");
      return;
    }
    if (araclar.find(a => a.ruhsatNo === aracForm.ruhsatNo)) {
      setMsg("Bu ruhsat numarası zaten eklenmiş!");
      return;
    }
    setAraclar(arr => [...arr, aracForm]);
    setAracForm({ plaka: "", aracTip: "", ruhsatNo: "", belge: null });
    fileRef.current.value = "";
    setMsg("");
  }

  // Tam başvuru gönder
  function handleSubmit(e) {
    e.preventDefault();
    if (!form.ad || !form.soyad || !form.telefon || !form.email || !form.il || !form.ilce || araclar.length === 0) {
      setMsg("Tüm alanları ve en az 1 araç ekleyin.");
      return;
    }
    // Backend’e gönder
    setMsg("Başvurunuz alındı. En kısa sürede sizinle iletişime geçilecektir!");
    setForm({ ad: "", soyad: "", telefon: "", email: "", il: "", ilce: "" });
    setAraclar([]);
  }

  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center bg-black/30 py-8">
      <section className="w-full max-w-2xl bg-black/70 rounded-2xl shadow-lg px-8 py-10 border border-gold">
        <h1 className="text-2xl md:text-3xl font-bold text-gold mb-6 text-center">
          Şoför/Firma Başvuru & Çoklu Araç Ekleme
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input type="text" name="ad" placeholder="Adınız" className="flex-1 px-4 py-2 rounded-lg border" value={form.ad} onChange={handleChange} />
            <input type="text" name="soyad" placeholder="Soyadınız" className="flex-1 px-4 py-2 rounded-lg border" value={form.soyad} onChange={handleChange} />
          </div>
          <div className="flex gap-2">
            <input type="tel" name="telefon" placeholder="Telefon" className="flex-1 px-4 py-2 rounded-lg border" value={form.telefon} onChange={handleChange} />
            <input type="email" name="email" placeholder="E-posta" className="flex-1 px-4 py-2 rounded-lg border" value={form.email} onChange={handleChange} />
          </div>
          <div className="flex gap-2">
            <input type="text" name="il" placeholder="İl" className="flex-1 px-4 py-2 rounded-lg border" value={form.il} onChange={handleChange} />
            <input type="text" name="ilce" placeholder="İlçe" className="flex-1 px-4 py-2 rounded-lg border" value={form.ilce} onChange={handleChange} />
          </div>
          {/* Araç ekleme */}
          <div className="bg-black/60 rounded-lg p-4 mb-2">
            <div className="font-semibold text-gold mb-2">Araç Ekle</div>
            <div className="flex flex-col md:flex-row gap-2 mb-2">
              <input type="text" name="plaka" placeholder="Araç Plakası" className="flex-1 px-3 py-2 rounded-lg border" value={aracForm.plaka} onChange={handleAracChange} />
              <input type="text" name="aracTip" placeholder="Araç Tipi (Vito, Sedan...)" className="flex-1 px-3 py-2 rounded-lg border" value={aracForm.aracTip} onChange={handleAracChange} />
              <input type="text" name="ruhsatNo" placeholder="Ruhsat No" className="flex-1 px-3 py-2 rounded-lg border" value={aracForm.ruhsatNo} onChange={handleAracChange} />
            </div>
            <div className="flex gap-2 items-center mb-2">
              <input type="file" ref={fileRef} accept="application/pdf,image/jpeg,image/png" onChange={handleFile} className="bg-white rounded" />
              <button type="button" onClick={handleAddCar} className="bg-gold text-black rounded px-3 py-2 font-semibold">Aracı Ekle</button>
            </div>
            {/* Eklenen araçlar */}
            {araclar.length > 0 && (
              <div className="text-gray-200 text-sm mt-2">
                <b>Eklenen Araçlar:</b>
                <ul className="list-disc ml-5">
                  {araclar.map((a, i) => (
                    <li key={i}>{a.plaka} - {a.aracTip} - Ruhsat: {a.ruhsatNo}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button type="submit" className="bg-gold text-black font-semibold py-2 rounded-lg mt-4">Başvuruyu Gönder</button>
        </form>
        {msg && (<div className="mt-4 text-center text-gold font-semibold">{msg}</div>)}
      </section>
    </main>
  );
}
