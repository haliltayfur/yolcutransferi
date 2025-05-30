import { useTranslations } from "next-intl";

export default function ReservationPage() {
  const t = useTranslations();
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold">{t("menu.reservation")}</h1>
    </main>
  );
}
