"use client";
import { useState } from "react";

export default function PaymentForm({ onPay }) {
  const [card, setCard] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [cvv, setCvv] = useState("");

  return (
    <form className="flex flex-col gap-3 p-4 bg-white rounded-xl text-black" onSubmit={e => { e.preventDefault(); onPay && onPay({ card, name, date, cvv }); }}>
      <label>Kart Numarası
        <input type="text" value={card} onChange={e => setCard(e.target.value)} className="input" maxLength={19} placeholder="1234 5678 9012 3456"/>
      </label>
      <label>İsim Soyisim
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="input" placeholder="Ad Soyad"/>
      </label>
      <label>Son Kullanma Tarihi
        <input type="text" value={date} onChange={e => setDate(e.target.value)} className="input" placeholder="AA/YY" maxLength={5}/>
      </label>
      <label>CVV
        <input type="password" value={cvv} onChange={e => setCvv(e.target.value)} className="input" placeholder="123" maxLength={4}/>
      </label>
      <button type="submit" className="bg-gold text-black font-bold py-2 rounded-xl mt-2">Ödeme Yap</button>
    </form>
  );
}
