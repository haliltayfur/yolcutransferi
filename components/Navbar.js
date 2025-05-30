'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ dict, locale }) {
  // Path ayarlama örneği
  return (
    <nav>
      <ul style={{ display: "flex", gap: 20 }}>
        <li><Link href={`/${locale}/`}>{dict.menu.home}</Link></li>
        <li><Link href={`/${locale}/vip`}>{dict.menu.vipTransfer}</Link></li>
        <li><Link href={`/${locale}/dron`}>{dict.menu.dronTransfer}</Link></li>
        <li><Link href={`/${locale}/bireysel`}>{dict.menu.individualTransfers}</Link></li>
        <li><Link href={`/${locale}/business`}>{dict.menu.businessClass}</Link></li>
        <li><Link href={`/${locale}/aile`}>{dict.menu.familyPackages}</Link></li>
        <li><Link href={`/${locale}/havalimani`}>{dict.menu.airportTransfers}</Link></li>
        <li><Link href={`/${locale}/iletisim`}>{dict.menu.contact}</Link></li>
        <li style={{ marginLeft: 30 }}><Link href={`/${locale}/login`}>{dict.login}</Link></li>
      </ul>
    </nav>
  );
}
