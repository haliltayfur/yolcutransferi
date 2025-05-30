import { useTranslations } from "next-intl";

export default function SozlesmePage() {
  const t = useTranslations();
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold">Sözleşme</h1>
      {/* İsterseniz buraya çevirilerle detay içerik ekleyebilirsiniz */}
    </main>
  );
}
