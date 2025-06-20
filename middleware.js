// /middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  // Sadece /api/kvkk/forms ve /api/iletisim/forms için koruma uygula:
  const url = req.nextUrl.pathname;

  // Korunacak API endpointleri
  const protectedAPIs = [
    "/api/kvkk/forms",
    "/api/iletisim/forms"
    // Buraya başka API’leri de ekleyebilirsin!
  ];

  if (protectedAPIs.some(path => url.startsWith(path))) {
    // Admin session kontrolü (örnek: "adminpanel=1" cookie'si)
    const cookie = req.cookies.get("adminpanel")?.value;
    if (cookie !== "1") {
      return NextResponse.json(
        { error: "Yetkisiz erişim (admin girişi gerekli)" },
        { status: 403 }
      );
    }
  }

  // Diğer isteklere izin ver
  return NextResponse.next();
}

// Hangi path’lerde çalışsın:
export const config = {
  matcher: [
    "/api/kvkk/forms",
    "/api/iletisim/forms",
    // Diğer API path’lerini de buraya ekle!
  ]
};
