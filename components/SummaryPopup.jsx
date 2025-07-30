"use client";
import React from "react";

export default function SummaryPopup({
  open, onClose, onNext,
  from, to, date, time, people, segment, transfer,
  name, surname, tc, phone, email, pnr, note, extras,
  sigorta, sigortaTutar, transferUcreti, vehicleText,
  onRemoveSigorta,
  peopleCount
}) {
  if (!open) return null;

  // Su ekstrası
  const suSayisi = extras?.filter(x => x === "su").length || 0;
  let suUcretsiz = 0, suUcretli = 0;
  if (segment === "Prime+") suUcretsiz = suSayisi;
  else {
    suUcretsiz = Math.min(Number(peopleCount), suSayisi);
    suUcretli = Math.max(0, suSayisi - Number(peopleCount));
  }

  return (
    <div className="popup-overlay">
      <div className="popup-inner">
        <h2 className="text-2xl font-bold text-[#bfa658] mb-2">Rezervasyon Özeti</h2>
        <ul className="mb-3">
          <li><b>Nereden:</b> {from}</li>
          <li><b>Nereye:</b> {to}</li>
          <li><b>Tarih:</b> {date}</li>
          <li><b>Saat:</b> {time}</li>
          <li><b>Kişi:</b> {people}</li>
          <li><b>Segment:</b> {segment}</li>
          <li><b>Transfer Türü:</b> {transfer}</li>
          {vehicleText && <li><b style={{color:'#bfa658'}}>Araç Seçimi:</b> {vehicleText}</li>}
          {pnr && <li><b>PNR:</b> {pnr}</li>}
          {sigorta && (
            <li style={{display:'flex',alignItems:'center'}}>
              <span><b>YolcuTransferi Özel Sigorta:</b> {sigortaTutar} TL <span style={{fontSize:12,color:'#777'}}>(transfer bedelinin %20'si)</span></span>
              <button className="ml-2 text-red-500" onClick={onRemoveSigorta} title="Sigortayı kaldır">🗑️</button>
            </li>
          )}
          {suSayisi > 0 && (
            <li>
              <b>Su:</b> {suSayisi} adet
              {suUcretsiz > 0 && <span style={{color:'#4caf50'}}> (ilk {suUcretsiz} adet su ikram)</span>}
              {suUcretli > 0 && <span style={{color:'#d32f2f'}}> ({suUcretli} adet ücretli)</span>}
            </li>
          )}
        </ul>
        <div className="mb-4">
          <b>Ekstralar:</b> {extras.filter(x=>x!=="su").length === 0 ? "Yok" : extras.filter(x=>x!=="su").join(", ")}
        </div>
        <div className="flex gap-2">
          <button className="btn-cancel" onClick={onClose}>Vazgeç</button>
          <button className="btn-main" onClick={onNext}>Devam Et & Ödeme</button>
        </div>
      </div>
      <style>{`
        .popup-overlay {position:fixed;z-index:9999;top:0;left:0;width:100vw;height:100vh;background:rgba(30,20,0,0.82);display:flex;align-items:center;justify-content:center;}
        .popup-inner {background:#23200e;padding:34px 30px;border-radius:18px;max-width:430px;width:96vw;box-shadow:0 12px 48px 0 #bfa65860;}
        .btn-main {background:linear-gradient(90deg,#bfa658,#ffeec2);font-weight:600;padding:10px 24px;border-radius:8px;}
        .btn-cancel {background:#222;border:1px solid #bfa658;font-weight:500;padding:10px 18px;border-radius:8px;color:#fff;}
      `}</style>
    </div>
  );
}
