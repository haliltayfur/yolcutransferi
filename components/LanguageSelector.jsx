"use client";
import { useRouter } from "next/navigation";

const LANGS = [
  { code: "tr", label: "Türkçe", url: "/", img: "https://flagcdn.com/tr.svg" },
  { code: "en", label: "English", url: "/en", img: "https://flagcdn.com/gb.svg" },
  { code: "ar", label: "Arabic", url: "/ar", img: "https://flagcdn.com/sa.svg" },
];

export default function LanguageSelector() {
  const router = useRouter();

  const handleLangClick = (lang) => {
    router.push(lang.url);
  };

  return (
    <div className="flex gap-2 items-center justify-center py-2">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          className="hover:scale-110 transition"
          title={lang.label}
          onClick={() => handleLangClick(lang)}
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
