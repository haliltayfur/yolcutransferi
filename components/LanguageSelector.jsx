"use client";
import { useRouter, usePathname } from "next/navigation";

const LANGS = [
  { code: "tr", img: "https://flagcdn.com/tr.svg", label: "Türkçe" },
  { code: "en", img: "https://flagcdn.com/gb.svg", label: "English" },
  { code: "ar", img: "https://flagcdn.com/sa.svg", label: "Arabic" },
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLangClick = (code) => {
    // Şu anki sayfanın locale'sini değiştir
    let segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex gap-2 items-center justify-center py-2">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          className="hover:scale-110 transition"
          title={lang.label}
          onClick={() => handleLangClick(lang.code)}
          aria-label={lang.label}
        >
          <img
            src={lang.img}
            width={28}
            height={20}
            alt={lang.label}
            className="rounded-sm border border-gray-300 shadow"
          />
        </button>
      ))}
    </div>
  );
}
