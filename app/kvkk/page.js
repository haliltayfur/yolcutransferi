"use client";
import { useEffect, useState, useRef } from "react";

// === Popup Bileşeni (iletişim sayfasındakiyle aynı) ===
function PolicyPopup({ open, onClose, onConfirm, url = "/kvkk-aydinlatma" }) {
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(url)
      .then(res => res.text())
      .then(htmlStr => {
        const div = document.createElement("div");
        div.innerHTML = htmlStr;
        let content = div.querySelector("main") || div.querySelector("section") || div;
        Array.from(content.querySelectorAll("a")).forEach(a => {
          a.setAttribute("target", "_blank");
          a.setAttribute("rel", "noopener noreferrer");
          a.classList.add("underline", "hover:text-[#FFD700]", "transition", "font-semibold");
        });
        setHtml(content.innerHTML);
        setLoading(false);
      });
  }, [open, url]);

  useEffect(() => {
    if (!open || !scrollRef.current) return;
    const el = scrollRef.current;
    function onScroll() {
      setShowScroll(true);
      clearTimeout(el._scrollTimeout);
      el._scrollTimeout = setTimeout(() => setShowScroll(false), 1000);
    }
    el.addEventListener("scroll", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[1.5px]">
      <div className="relative w-[98vw] md:w-[900px] max-w-3xl bg-[#171204] rounded-[24px] border-[3px] border-[#bfa658] px-0 pt-14 shadow-2xl flex flex-col overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-7 text-[#FFD700] hover:text-white text-lg font-bold w-28 h-11 flex items-center justify-center rounded-full bg-black/40 border-[2px] border-[#bfa658] hover:bg-[#ffd70022] transition"
          aria-label="Kapat"
        >Kapat</button>
        <h2 className="text-2xl font-extrabold text-[#bfa658] mb-4 text-center tracking-tight">
          KVKK Aydınlatma Metni
        </h2>
        <div className="relative flex-1">
          <div
            ref={scrollRef}
            className="text-[1rem] text-[#ecd9aa] max-h-[57vh] overflow-y-auto px-7 pb-2 policy-popup-scrollbar transition-all"
            style={{ scrollbarWidth: "none" }}
          >
            {loading
              ? <div className="text-center py-10 text-lg text-[#ffeec2]/70">Yükleniyor...</div>
              : <div dangerouslySetInnerHTML={{ __html: html }} />
            }
          </div>
          <div className={`pointer-events-none absolute top-0 right-2 h-full w-1.5 rounded-full bg-gradient-to-b from-[#bfa65899] to-[#bfa65800] shadow-lg transition-opacity duration-500 ${showScroll ? "opacity-70" : "opacity-0"}`} />
        </div>
        <button
          onClick={() => { onConfirm && onConfirm(); onClose(); }}
          className="mt-3 w-[90%] mx-auto py-3 rounded-2xl bg-gradient-to-tr from-[#FFD700] to-[#bfa658] text-black font-extrabold text-lg shadow-md border-2 border-[#bfa658] hover:scale-105 transition mb-4"
        >
          Tümünü okudum, onaylıyorum
        </button>
      </div>
    </div>
  );
}
// ==== Popup Sonu ====

export default function Kvkk() {
  const [kvkkOnay, setKvkkOnay] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  // Popup'ta onay tıklanınca checkbox otomatik işaretlensin
  const handleKvkkConfirm = () => setKvkkOnay(true);

  return (
    <main className="flex justify-center items-center min-h-[90vh] bg-black">
      <section className="w-full max-w-4xl mx-auto border border-[#bfa658] rounded-3xl shadow-2xl px-6 md:px-12 py-14 bg-gradient-to-br from-black via-[#19160a] to-[#302811] mt-16 mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#bfa658] tracking-tight mb-1 text-center">
          KVKK Politikası
        </h1>
        <div className="text-lg text-[#ffeec2] font-semibold text-center mb-8">
          Kişisel Verileriniz Güvende, Tüm Haklarınız Bizimle Güvende!
        </div>
        <div className="text-base md:text-lg text-[#ecd9aa] leading-relaxed font-normal space-y-6">
          <p>
            YolcuTransferi.com olarak, kişisel verilerinizi yalnızca transfer işlemlerinizin güvenle yürütülmesi amacıyla işleriz. KVKK Aydınlatma Metni'ni mutlaka inceleyiniz.
          </p>
          {/* ... diğer metinler ... */}
        </div>
        {/* KVKK Onay checkbox ve popup trigger */}
        <div className="flex items-center gap-2 mt-8">
          <input
            type="checkbox"
            checked={kvkkOnay}
            onChange={e => setKvkkOnay(e.target.checked)}
            required
            className="accent-[#FFD700] w-4 h-4"
            id="kvkkonay"
          />
          <label htmlFor="kvkkonay" className="text-xs text-gray-200 select-none">
            <button
              type="button"
              onClick={() => setPopupOpen(true)}
              className="underline text-[#FFD700] hover:text-[#bfa658] cursor-pointer outline-none"
              style={{ padding: 0, border: "none", background: "transparent" }}
            >
              KVKK Aydınlatma Metni’ni
            </button>{" "}
            okudum, onaylıyorum.
          </label>
        </div>
        <PolicyPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handleKvkkConfirm}
          url="/kvkk-aydinlatma" // veya kendi endpoint'in
        />
      </section>
    </main>
  );
}
