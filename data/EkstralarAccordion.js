// /components/EkstralarAccordion.js

import { useState } from "react";
// Kategorileri ve ekstraları buradan çek:
const extrasByCategory = {
  "Yiyecek": ["sandvic", "kuruyemis"],
  "İçecek": ["su", "kola", "meyve_suyu"],
  "Alkol": ["sampanya", "viski", "bira_3lu", "sarap"],
  "Diğer": ["cocuk_koltugu", "wifi", "hostes", "mini_bar", "telefon_sarj_kiti", "ozel_karsilama"]
};

const extrasLabels = {
  sandvic: "Sandviç",
  kuruyemis: "Kuruyemiş",
  su: "Su",
  kola: "Kola",
  meyve_suyu: "Meyve Suyu",
  sampanya: "Şampanya",
  viski: "Viski",
  bira_3lu: "3'lü Bira",
  sarap: "Şarap",
  cocuk_koltugu: "Çocuk Koltuğu",
  wifi: "Wi-Fi",
  hostes: "Hostes",
  mini_bar: "Mini Bar",
  telefon_sarj_kiti: "Telefon Şarj Kiti",
  ozel_karsilama: "Özel Karşılama",
};

export default function EkstralarAccordion({ selectedExtras, setSelectedExtras }) {
  const [openCat, setOpenCat] = useState(null);

  function toggleCat(cat) {
    setOpenCat(openCat === cat ? null : cat);
  }

  function handleCheck(e) {
    const { value, checked } = e.target;
    if (checked) setSelectedExtras([...selectedExtras, value]);
    else setSelectedExtras(selectedExtras.filter(x => x !== value));
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {Object.entries(extrasByCategory).map(([cat, items]) => (
        <div key={cat} className="mb-2">
          <button
            type="button"
            onClick={() => toggleCat(cat)}
            className="w-full text-left px-4 py-3 rounded-xl bg-[#23221a] text-[#bfa658] font-semibold shadow hover:bg-[#2c2a20] transition"
          >
            {cat}
          </button>
          {openCat === cat && (
            <div className="pl-6 pr-2 py-2 flex flex-col gap-2 bg-black/70 rounded-b-xl border-l-4 border-[#bfa658] mt-1">
              {items.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer text-[#ffeec2]">
                  <input
                    type="checkbox"
                    value={item}
                    checked={selectedExtras.includes(item)}
                    onChange={handleCheck}
                    className="accent-[#bfa658] scale-125"
                  />
                  {extrasLabels[item] || item}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
