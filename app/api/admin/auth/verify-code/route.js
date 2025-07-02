import { NextResponse } from "next/server";
import { codes } from "../request-code/route"; // Aynı dosya yoluna göre ayarla

export async function POST(req) {
  const { email, code } = await req.json();
  if (
    codes[email] &&
    codes[email].code === code &&
    codes[email].expires > Date.now()
  ) {
    // Doğru kod, giriş izni ver
    delete codes[email]; // Kodu sil, tek kullanımlık
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: "Kod yanlış veya süresi dolmuş." }, { status: 401 });
}
