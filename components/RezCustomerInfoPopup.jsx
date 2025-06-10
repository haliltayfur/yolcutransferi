import { useState } from "react";

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

  const isAirport = (info?.from || "").toLowerCase().includes("hava") || (info?.to || "").toLowerCase().includes("hava");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAirport && !ucusNo) {
      alert("Havalimanı transferlerinde uçuş numarası gereklidir!");
      return;
    }
    onNext({
      ad, soyad, tc, tel, email, rezervAd, tel2, ucusNo, ekstraNot
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
        <button onClick={onClose} className="absolute top-2 right-3 text-lg text-gray-400 hover:text-red-500 font-bold">×</button>
        <h3 className="text-xl font-bold mb-3 text-center text-gold">Yolcu Bilgileri</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input type="text" className="input flex-1" placeholder="Adı" value={ad} onChange={e => setAd(e.target.value)} required />
            <input type="text" className="input flex-1" placeholder="Soyadı" value={soyad} onChange={e => setSoyad(e.target.value)} required />
          </div>
          <input type="text" className="input" placeholder="TC Kimlik No" value={tc} onChange={e => setTc(e.target.value)} required />
          <input type="text" className="input" placeholder="Telefon No" value={tel} onChange={e => setTel(e.target.value)} required />
          <input type="email" className="input" placeholder="Mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="text" className="input" placeholder="Rezervasyon yapan (ad soyad)" value={rezervAd} onChange={e => setRezervAd(e.target.value)} required />
          <input type="text" className="input" placeholder="2. İrtibat Numarası" value={tel2} onChange={e => setTel2(e.target.value)} />
          {isAirport &&
            <input type="text" className="input" placeholder="Uçuş Numarası / PNR" value={ucusNo} onChange={e => setUcusNo(e.target.value)} required />
          }
          <textarea
            className="input"
            placeholder="Ekstra isteklerinizi ve notlarınızı buradan belirtiniz."
            value={ekstraNot}
            onChange={e => setEkstraNot(e.target.value)}
            rows={2}
          />
          <button className="bg-gold hover:bg-yellow-400 text-black font-bold rounded-xl px-6 py-3 transition text-lg w-full mt-2">Ödeme Adımına Geç</button>
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
