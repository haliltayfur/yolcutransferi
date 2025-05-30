import { useTranslations } from "next-intl";
import { getDictionary } from "@/lib/getDictionary";
export default async function HomePage({ params }) {
  const dict = await getDictionary(params.locale);

  return (
    <main>
      <h1>{dict.menu.home}</h1>
      {/* Diğer içerikler */}
    </main>
  );
