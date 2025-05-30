import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">{t("welcome")}</h1>
      <h2 className="text-2xl mb-2">{t("slogan")}</h2>
      <p className="mb-5 max-w-xl text-center">{t("desc")}</p>
      <button className="bg-yellow-400 text-black font-semibold py-2 px-6 rounded-xl text-lg">
        {t("get_offer")}
      </button>
    </main>
  );
}
