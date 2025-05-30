import Link from "next/link";
import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";

export default function Header({ locale = "tr" }) {
  const t = useTranslations();

  return (
    <header className="flex items-center justify-between px-8 md:px-20 py-4 bg-white shadow z-50 w-full">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Link href={`/${locale}`}>
          <span className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">YolcuTransferi</span>
        </Link>
      </div>
      <nav className="hidden md:flex gap-6 font-semibold text-base">
        <Link href={`/${locale}`}>{t("menu.home")}</Link>
        <Link href={`/${locale}/vip-transfer`}>{t("menu.vipTransfer")}</Link>
        <Link href={`/${locale}/dron-transferi`}>{t("menu.dronTransfer")}</Link>
        <Link href={`/${locale}/individual-transfers`}>{t("menu.individualTransfers")}</Link>
        <Link href={`/${locale}/business-class`}>{t("menu.businessClass")}</Link>
        <Link href={`/${locale}/family-packages`}>{t("menu.familyPackages")}</Link>
        <Link href={`/${locale}/airport-transfers`}>{t("menu.airportTransfers")}</Link>
        <Link href={`/${locale}/contact`}>{t("menu.contact")}</Link>
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSelector />
        {/* Giriş/Üyelik butonu */}
        <Link
          href={`/${locale}/login`}
          className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-4 py-2 rounded-xl font-semibold"
        >
          {t("login")}
        </Link>
      </div>
    </header>
  );
}
