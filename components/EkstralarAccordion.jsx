"use client";
import { useState } from "react";
import { extrasList } from "../data/extras";

const extraKategori = {
  Yiyecek: ["sandvic", "kuruyemis", "cikolata", "kahvalti", "ogle_yemegi", "aksam_yemegi", "glutensiz_menü"],
  İçecek: ["su", "kola", "kola_zero", "soda", "meyve_suyu", "cay_kahve"],
  Alkol: ["bira_3lu", "sampanya", "sarap", "viski", "prosecco"],
  Diğer: [
    "cocuk_koltugu", "hayvan_kutusu", "evcil_hayvan", "hostes", "mini_bar", "wifi", "gazete", "airpods",
    "powerbank", "welcoming", "cicek", "kisisel_asistan", "guvenlik", "hediye_paketi", "rehber"
  ],
};

function getKategori(key) {
  for (const [cat, list] of Object.entries(extraKategori)) {
    if (list.includes(key)) return cat;
  }
  return "Diğer";
}

export default function EkstralarAccordion({ value = [], onChange }) {
  const gruplu = extrasList.reduce((obj, extra) => {
    const kategori = getKategori(extra.key);
    if (!obj[kategori]) obj[kategori] = [];
    obj[kategori].push(extra);
    return obj;
  }, {});
  const [open, setOpen] = useState("");

  function handleCheck(e) {
    const { value: v, checked } = e.target;
    if (checked) onChange([...value, v]);
    else onChange(value.filter(x => x !== v));
  }

  return (
    <div className="w-full">
      {Object.keys(gruplu).map(kategori => (
        <div key={kategori} className="mb-2">
          <button
            type="button"
            onClick={() => setOpen(open === kategori ? "" : kategori)}
            className="w-full text-left px-4 py-3 rounded-xl bg-[#23221a] text-[#bfa658] font-semibold shadow hover:bg-[#2c2a20] transition"
          >
            {kategori}
          </button>
          {open === kategori && (
            <div className="pl-2 pr-2 py-2 flex flex-col gap-1 bg-black/80 rounded-b-xl border-l-4 border-[#bfa658] mt-1 overflow-x-auto">
              {gruplu[kategori].map(extra => (
                <label
                  key={extra.key}
                  className="flex items-center gap-2 cursor-pointer text-[#ffeec2] select-none py-1"
                  style={{ wordBreak: "break-word", fontSize: 15 }}
                >
                  <input
                    type="checkbox"
                    value={extra.key}
                    checked={value.includes(extra.key)}
                    onChange={handleCheck}
                    className="accent-[#bfa658] scale-125"
                  />
                  <span>{extra.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
