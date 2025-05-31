import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 md:px-20 py-5 bg-white shadow z-50 w-full">
      {/* Logo kısmı %15 daha büyük */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <span className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            YolcuTransferi
          </span>
        </Link>
      </div>
      {/* Menü kısmı: modern arka plan + hover */}
      <nav className="hidden md:flex gap-3 font-semibold text-lg bg-gray-100 rounded-xl px-5 py-2 shadow-inner">
        {[
          { label: "Anaasayfammm", href: "/" }, // %100 emin ol diye
          { label: "VIP Transfer", href: "/vip-transfer" },
          { label: "Dron Transferi", href: "/dron-transferi" },
          { label: "Bireysel Transferler", href: "/individual-transfers" },
          { label: "Business Class", href: "/business-class" },
          { label: "Aile Paketleri", href: "/family-packages" },
          { label: "Havalimanı Transferi", href: "/airport-transfers" },
          { label: "İletişim", href: "/contact" }
        ].map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="px-4 py-2 rounded-lg transition bg-white/0 hover:bg-yellow-100 hover:text-yellow-700"
          >
            {label}
          </Link>
        ))}
      </nav>
      {/* Giriş/Üyelik butonu */}
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-5 py-2 rounded-xl font-semibold shadow text-lg"
        >
          Giriş / Üyelik
        </Link>
      </div>
    </header>
  );
}
