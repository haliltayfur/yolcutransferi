// PATH: /data/EkstralarAccordion.jsx

import { useState } from "react";
import { extrasListByCategory } from "./extrasByCategory.js";

// Otomatik görsel yolu, yoksa default
function getExtraImage(key) {
  return `/extras/${key}.jpg`;
}

export default function EkstralarAccordion({
  selectedExtras, setSelectedExtras,
  extrasQty, setExtrasQty
}) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-4">
      {extrasListByCategory.map((cat, i) => (
        <div key={cat.category} className="border-b border-[#bfa658] last:border-b-0">
          <button
            type="button"
            className="w-full flex items-center justify-between px-2 py-2 text-left font-bold text-base text-[#bfa658] focus:outline-none select-none"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span>{cat.category}</span>
            <span className="text-xl">{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pb-2">
              {cat.items.map(extra => (
                <div key={extra.key} className="flex items-center gap-3 bg-[#19160a] border border-[#bfa658] rounded-xl px-4 py-2">
                  <img
                    src={getExtraImage(extra.key)}
                    alt={extra.label}
                    className="w-12 h-12 object-cover rounded border border-[#bfa658]/50 mr-2"
                    onError={e => { e.target.src = "/extras/default.jpg"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <label htmlFor={extra.key} className="text-[#ffeec2] font-semibold block">
                      {extra.label}
                    </label>
                    <span className="text-xs text-[#bfa658] block truncate">{extra.description || ""}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.key)}
                    onChange={e => {
                      if (e.target.checked)
                        setSelectedExtras([...selectedExtras, extra.key]);
                      else
                        setSelectedExtras(selectedExtras.filter(k => k !== extra.key));
                    }}
                    className="accent-[#bfa658] w-5 h-5"
                    id={extra.key}
                  />
                  {selectedExtras.includes(extra.key) && (
                    <select
                      className="ml-2 rounded bg-black/70 text-[#ffeec2] border border-[#bfa658] px-2 py-1"
                      value={extrasQty[extra.key] || 1}
                      onChange={e => setExtrasQty(q => ({
                        ...q,
                        [extra.key]: Number(e.target.value)
                      }))}
                    >
                      {[...Array(10)].map((_, idx) => (
                        <option key={idx + 1} value={idx + 1}>{idx + 1} adet</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
