// middleware.js (proje kökünde)
import { NextResponse } from "next/server";

// Hangi path'leri koruyacak?
export const config = {
  matcher: ["/api/:path*"],
};

export function middleware(request) {
  // Burada gerçek admin login/session kontrolünü eklemen gerek!
  // Örnek: Admin ise devam etsin, değilse 401 dön.
  // Örneğin: Bir cookie (örn: "admin_auth") kontrolü yapalım:

  const adminCookie = request.cookies.get("admin_auth");
  if (!adminCookie || adminCookie.value !== "true") {
    // İstersen özel bir JSON response da verebilirsin:
    return new NextResponse(
      JSON.stringify({ error: "Yetkisiz erişim" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  // Admin ise, istek devam etsin:
  return NextResponse.next();
}
