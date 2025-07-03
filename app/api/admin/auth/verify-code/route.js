//app/api/admin/auth/verify-code/route.js
import { NextResponse } from "next/server";

global.codes = global.codes || {};

export async function POST(req) {
  const { email, code } = await req.json();
  const entry = global.codes[email];
  if (!entry) {
    return NextResponse.json({ success: false, error: "Kod bulunamadı veya süresi dolmuş." }, { status: 400 });
  }
  if (entry.code !== code) {
    return NextResponse.json({ success: false, error: "Kod yanlış." }, { status: 401 });
  }
  if (Date.now() > entry.expires) {
    delete global.codes[email];
    return NextResponse.json({ success: false, error: "Kodun süresi dolmuş." }, { status: 400 });
  }
  delete global.codes[email];
  return NextResponse.json({ success: true });
}
//app/api/admin/auth/verify-code/route.js
