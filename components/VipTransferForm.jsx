"use client";
import { useState } from "react";
import ExtrasSelector from "./ExtrasSelector";
import RezSummaryPopup from "./RezSummaryPopup";
import RezCustomerInfoPopup from "./RezCustomerInfoPopup";
import PaymentForm from "./PaymentForm";

import { vehicles } from "../data/vehicleList";
import { extrasList } from "../data/extras";
import { rotarList } from "../data/rotarOptions";
import { fakeFirms } from "../data/fakeFirms";

export default function VipTransferForm() {
  // Form State'leri
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].value);
  const [personCount, setPersonCount] = useState(1);
  const [extras, setExtras] = useState([]);
  const [rotar, setRotar] = useState(rotarList[0].hours);

  // Popup/Adım state
  const [showSummary, setShowSummary] = useState(false);
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [summaryData, setSummaryData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Ekstralar/araçlar
  const selectedVehicleObj = vehicles.find(v => v.value === selectedVehicle) || vehicles[0];
  const maxPerson = selectedVehicleObj.max;

  // Fiyat hesaplama fonksiyonu
  function calculatePrice(currentExtras, currentRotar) {
    // Fiyatı örnekle: gerçek firmalardan alınmış gibi simüle
    const distance = 35, hour = 1;
    const base = 1200 + (selectedVehicleObj.max * 100);
    const firmPrices = fakeFirms.map(firm => firm.fiyat(base, distance, hour));
    let avg = null, message = "";
    if (firmPrices.filter(Boolean).length >= 5) {
      avg = Math.round(firmPrices.reduce((a, b) => a + b, 0) / firmPrices.length);
      message = "";
    } else {
      avg = 0;
      message = "Seçtiğiniz özellikler için en az 5 firmadan fiyat alınamadı. Size özel fiyat çalışıp iletişim numaranızdan ulaşacağız.";
    }
    let ekstraFiyat = 0;
    let alkolSecili = false;
    let kuruyemisSecili = false;
    let yeniExtras = [...currentExtras];

    // Alkol seçildiyse fiyatı %10 artır, kuruyemiş seçildiyse ve alkol de varsa kuruyemişin üstünü çiz!
    const alkolKeys = ["bira", "sarap", "viski"];
    const kuruyemisKey = "cookies";
    if (alkolKeys.some(a => currentExtras.includes(a))) {
      alkolSecili = true;
      // Alkol fiyatlarına %10 ekle
      ekstraFiyat += extrasList.filter(e => alkolKeys.includes(e.key) && currentExtras.includes(e.key))
        .reduce((t, e) => t + Math.round(e.price * 1.1), 0);
    }
    // Eğer kuruyemiş seçiliyse ve alkol de seçiliyse fiyatı toplama ekleme!
    if (currentExtras.includes(kuruyemisKey)) {
      kuruyemisSecili = true;
      if (!alkolSecili) {
        ekstraFiyat += extrasList.find(e => e.key === kuruyemisKey).price;
      }
      // Alkol varsa kuruyemiş ücreti eklenmez!
    }
    // Diğer ekstralar
    ekstraFiyat += extrasList.filter(e => !alkolKeys.includes(e.key) && e.key !== kuruyemisKey && currentExtras.includes(e.key))
      .reduce((t, e) => t + e.price, 0);
    // Rotar garantisi
    ekstraFiyat += (currentRotar > 1 ? rotarList.find(r => r.hours === currentRotar)?.price || 0 : 0);

    // Transfer ücreti (kar, masraf, indirim)
    const kar = Math.round(avg * 0.35);
    const masraflar = Math.round(avg * 0.18) + 150;
    let toplam = avg + masraflar + kar + ekstraFiyat;
    let indirim = Math.round(toplam * 0.1);
    toplam = toplam - indirim;
    return { avg, masraflar, kar, ekstraFiyat, toplam, indirim, message, alkolSecili, kuruyemisSecili };
  }

  // Fiyatı Gör butonu → popup adımına geç
  const handleShowSummary = (e) => {
    e.preventDefault();
    const fiyatlar = calculatePrice(extras, rotar);
    setSummaryData({
      from, to, date, time, vehicle: selectedVehicleObj.label,
      personCount, extras, rotar, fiyatlar,
    });
    setShowSummary(true);
  };

  // Özetten müşteri info adımına geç
  const handleGoToCustomerInfo = () => {
    setShowSummary(false);
    setTimeout(() => setShowCustomerInfo(true), 200);
  };

  // Müşteri bilgileri adımından ödeme adımına geç
  const handleGoToPayment = (customer) => {
    setCustomerData(customer);
    setShowCustomerInfo(false);
    setPaymentAmount(summaryData.fiyatlar.toplam);
    setTimeout(() => setShowPayment(true), 200);
  };

  // Popuplardan geri dönüşler
  const handleBackFromSummary = () => setShowSummary(false);
  const handleBackFromCustomerInfo = () => {
    setShowCustomerInfo(false);
    setTimeout(() => setShowSummary(true), 200);
  };
  const handleBackFromPayment = () => {
    setShowPayment(false);
    setTimeout(() => setShowCustomerInfo(true), 200);
  };

  // Ekstra silme ve fiyatı güncelleme
  const removeExtraAndUpdate = (key) => {
    const newExtras = extras.filter(e => e !== key);
    setExtras(newExtras);
    const fiyatlar = calculatePrice(newExtras, rotar);
    setSummaryData({
      ...summaryData, extras: newExtras, fiyatlar,
    });
  };

  // Rotar değiştirme ve fiyatı güncelleme
  const handleRotarChange = (v) => {
    setRotar(v);
    const fiyatlar = calculatePrice(extras, v);
    setSummaryData({
      ...summaryData, rotar: v, fiyatlar,
    });
  };

  // Form inputları grid ile daha geniş
  return (
    <section className="w-full flex flex-col items-center py-10 px-3 bg-black">
      <div className="bg-[#161616] rounded-2xl shadow-2xl px-8 py-8 max-w-5xl w-full border border-gold/15">
        <h3 className="text-2xl font-bold text-gold mb-7 text-center">VIP Transferinizi Planlayın</h3>
        <form className="grid grid-cols-1 md:grid-cols-6 gap-3 w-full justify-center items-center" onSubmit={handleShowSummary}>
          <input type="text" className="input md:col-span-1" placeholder="Nereden?" value={from} onChange={e => setFrom(e.target.value)} required />
          <input type="text" className="input md:col-span-1" placeholder="Nereye?" value={to} onChange={e => setTo(e.target.value)} required />
          <input type="date" className="input md:col-span-1" placeholder="Tarih" value={date} onChange={e => setDate(e.target.value)} required />
          <input type="time" className="input md:col-span-1" placeholder="Saat" value={time} onChange={e => setTime(e.target.value)} required />
          <select className="input md:col-span-1" value={selectedVehicle}
            onChange={e => { setSelectedVehicle(e.target.value); setPersonCount(1); }}>
            {vehicles.map(v => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
          <select className="input md:col-span-1" value={personCount} onChange={e => setPersonCount(Number(e.target.value))}>
            {Array.from({ length: maxPerson }, (_, i) => (
              <option key={i+1} value={i+1}>{i+1} Kişi</option>
            ))}
          </select>
          {/* Tam genişlikte fiyat butonu */}
          <button type="submit" className="md:col-span-6 bg-gold hover:bg-yellow-400 text-black font-semibold rounded-xl px-8 py-3 whitespace-nowrap transition text-lg mt-2 w-full">
            Fiyatı Gör
          </button>
        </form>
        {/* Ekstralar sadece ikon ve isim */}
        <ExtrasSelector selectedExtras={extras} onToggle={key => setExtras(extras.includes(key) ? extras.filter(e => e !== key) : [...extras, key])} />
        {/* Rotar garantisi */}
        <div className="flex justify-center mt-4">
          <select
            className="input flex-1 min-w-[200px] max-w-xs"
            value={rotar}
            onChange={e => handleRotarChange(Number(e.target.value))}
          >
            {rotarList.map(r => (
              <option key={r.hours} value={r.hours}>{r.label}</option>
            ))}
            <option value={12}>Sınırsız (1000₺, 12 saat bekleme, iptal yok)</option>
          </select>
        </div>
      </div>

      {/* Rezervasyon Özeti Popup */}
      <RezSummaryPopup
        show={showSummary}
        summaryData={{ ...summaryData, extras, rotar, from, to, date, time, vehicle: selectedVehicleObj.label, personCount }}
        onRemoveExtra={removeExtraAndUpdate}
        onClose={handleBackFromSummary}
        onPaymentStep={handleGoToCustomerInfo}
      />

      {/* Müşteri Bilgi Adımı */}
      <RezCustomerInfoPopup
        show={showCustomerInfo}
        onClose={handleBackFromCustomerInfo}
        onNext={handleGoToPayment}
        info={{ from, to }}
      />

      {/* Ödeme Adımı */}
      <PaymentForm
        show={showPayment}
        amount={paymentAmount}
        onClose={handleBackFromPayment}
        onSuccess={() => setShowPayment(false)}
      />
    </section>
  );
}
