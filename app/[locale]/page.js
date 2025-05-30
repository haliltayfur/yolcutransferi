"use client";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("menu");
  return (
    <main>
      <h1>{t("home")}</h1>
      {/* Diğer içerikler buraya yazılır */}
    </main>
  );
}
