"use client";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const LANGS = [
  { code: "tr", img: "/flags/tr.svg", label: "Türkçe", path: "/" },
  { code: "en", img: "/flags/gb.svg", label: "English", path: "/en" },
  { code: "ar", img: "/flags/sa.svg", label: "Arabic", path: "/ar" },
];

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLangClick = (lang) => {
    if (lang.code === "tr") {
      router.push("/");
    } else {
      router.push(`/${lang.code}`);
    }
  };

  return (
    <div className="flex gap-2 items-center px-2 py-1">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          className="hover:scale-110 transition"
          title={lang.label}
          onClick={() => handleLangClick(lang)}
          aria-label={lang.label}
        >
          <Image
            src={lang.img}
            width={24}
            height={16}
            alt={lang.label}
            className="rounded-sm border border-gray-300 shadow"
          />
        </button>
      ))}
    </div>
  );
}
