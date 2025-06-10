"use client";
import { useState, useEffect } from "react";

export default function RezCustomerInfoPopup({ show, onClose, onNext, info }) {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [tc, setTc] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [rezervAd, setRezervAd] = useState("");
  const [tel2, setTel2] = useState("");
  const [ucusNo, setUcusNo] = useState("");
  const [ekstraNot, setEkstraNot] = useState("");

  // Otomatik doldurma: rezervasyon yapan adı yolcu adıyla dolmalı
  useEffect(() => {
    setRezervAd(`${ad} ${soyad}`);
  }, [ad, soyad]);

  // Havalimanı mı kontrolü
  const isAirport = (info?.from || "").toLowerCase().includes("hava") || (info?.to || "").toLowerCase().includes("hava");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAirport && !ucusNo) {
      alert("Havalimanı transferlerinde uçuş numarası (PNR) gereklidir!");
      return;
    }
    onNext({
      ad, soyad, tc, tel, email, rezervAd, tel2, ucusNo, ekstraNot
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in border border-gold/50">
        <button onClick={onClose} className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500 font-bold">×</button>
        <h3 className="text-xl font-bold mb-3 text-center text-gold">Yolcu Bilgileri</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-bold text-gray-700">Adı</label>
              <input autoComplete="given-name" type="text" className="input" placeholder="Adı" value={ad} onChange={e => setAd(e.target.value)} required />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-bold text-gray-700">Soyadı</label>
              <input autoComplete="family-name" type="text" className="input" placeholder="Soyadı" value={soyad} onChange={e => setSoyad(e.target.value)} required />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-bold text-gray-700">TC Kimlik No</label>
              <input autoComplete="off" type="text" className="input" placeholder="TC Kimlik No" value={tc} onChange={e => setTc(e.target.value)} required />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-bold text-gray-700">Telefon No</label>
              <input autoComplete="tel" type="text" className="input" placeholder="Telefon No" value={tel} onChange={e => setTel(e.target.value)} required />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700">Mail</label>
            <input autoComplete="email" type="email" className="input" placeholder="Mail" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700">Rezervasyon Yapan</label>
            <input autoComplete="off" type="text" className="input" placeholder="Rezervasyon yapan (ad soyad)" value={rezervAd} onChange={e => setRezervAd(e.target.value)} required />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700">2. İrtibat Numarası</label>
            <input autoComplete="tel" type="text" className="input" placeholder="2. İrtibat Numarası" value={tel2} onChange={e => setTel2(e.target.value)} />
          </div>
          {isAirport &&
            <div className="flex flex-col">
              <label className="text-sm font-bold text-gray-700">Uçuş Numarası / PNR</label>
              <input autoComplete="off" type="text" className="input" placeholder="Uçuş Numarası / PNR" value={ucusNo} onChange={e => setUcusNo(e.target.value)} required />
            </div>
          }
          <div className="flex flex-col">
            <label className="text-sm font-bold text-gray-700">Ekstra İstekler & Notlar</label>
            <textarea
              className="input"
              placeholder="Ekstra isteklerinizi ve notlarınızı buradan belirtiniz."
              value={ekstraNot}
              onChange={e => setEkstraNot(e.target.value)}
              rows={2}
            />
          </div>
          <button className="bg-gold hover:bg-yellow-400 text-black font-bold rounded-xl px-6 py-3 transition text-lg w-full mt-2">
            Ödeme Adımına Geç
          </button>
        </form>
        <button className="underline text-gray-500 hover:text-gray-900 mt-2 w-full" onClick={onClose}>Geri</button>
      </div>
      <style jsx>{`
        .animate-fade-in { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; transform: scale(.95);} to { opacity: 1; transform: scale(1);} }
      `}</style>
    </div>
  );
}
