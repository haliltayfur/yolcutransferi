// components/KvkkPopup.jsx
import React, { useState, useEffect } from "react";

export default function KvkkPopup({ open, onClose, text = "", onConfirm }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setScrolled(false), [open]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#18140dcc] z-[1000] flex items-center justify-center">
      <div className="relative w-[97vw] max-w-2xl bg-[#231d0f] border border-[#bfa658] rounded-2xl p-8 max-h-[90vh] flex flex-col shadow-2xl">
        <button className="absolute top-4 right-6 text-2xl text-[#bfa658] font-bold" onClick={onClose}>×</button>
        <div className="text-2xl font-bold mb-4 text-[#bfa658] text-center">KVKK, Mesafeli Satış ve Tüm Politikalar</div>
        <div
          className="overflow-y-auto policy-content text-[#ffeec2] text-base leading-relaxed px-2"
          style={{
            maxHeight: "45vh", border: "1px solid #bfa658",
            borderRadius: 10, background: "#2a2415", padding: 18
          }}
          onScroll={e => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            if (scrollTop + clientHeight >= scrollHeight - 10) setScrolled(true);
          }}
        >
          {text
            ? <div dangerouslySetInnerHTML={{ __html: text }} />
            : <div className="italic text-[#ffd700]">Yükleniyor...</div>
          }
        </div>
        <button
          className={`w-full mt-6 btn font-bold text-lg py-2 rounded-lg transition
            ${scrolled ? "bg-gradient-to-r from-[#bfa658] to-[#ffeec2] text-black" : "bg-[#7e7355] text-white cursor-not-allowed"}`}
          onClick={() => { if (scrolled && onConfirm) onConfirm(); if (scrolled && onClose) onClose(); }}
          disabled={!scrolled}
        >
          {scrolled ? "Okudum, Onaylıyorum" : "Metni sona kadar okuyunuz"}
        </button>
        <style jsx>{`
          .policy-content h1, .policy-content h2 {
            color: #ffd700;
            margin-top: 16px; margin-bottom: 8px;
            font-weight: bold;
            font-size: 1.15em;
          }
          .policy-content ul, .policy-content ol {
            margin-left: 16px;
            margin-bottom: 10px;
          }
          .policy-content li {
            margin-bottom: 7px;
            line-height: 1.5;
          }
          .policy-content a {
            color: #ffd700;
            text-decoration: underline;
          }
        `}</style>
      </div>
    </div>
  );
}
