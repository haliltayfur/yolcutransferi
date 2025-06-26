import { useState } from "react";
import { extrasListByCategory } from "../../data/extrasByCategory";

export default function EkstralarAccordion({ selectedExtras, setSelectedExtras, extrasQty, setExtrasQty }) {
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
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.key)}
                    onChange={e => {
                      if (e.target.checked) setSelectedExtras([...selectedExtras, extra.key]);
                      else setSelectedExtras(selectedExtras.filter(k => k !== extra.key));
                    }}
                    className="accent-[#bfa658] w-4 h-4"
                    id={extra.key}
                  />
                  <label htmlFor={extra.key} className="flex-1 text-[#ffeec2]">{extra.label}</label>
                  {selectedExtras.includes(extra.key) && (
                    <select
                      className="ml-2 rounded bg-black/70 text-[#ffeec2] border border-[#bfa658] px-2 py-1"
                      value={extrasQty[extra.key] || 1}
                      onChange={e => setExtrasQty(q => ({
                        ...q,
                        [extra.key]: Number(e.target.value)
                      }))}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} adet</option>
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
