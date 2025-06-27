// app/api/admin/rezervasyonlar/route.js

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// ... (Eğer başka GET/POST methodların varsa yukarıya ekle, bu sadece PATCH içindir.)

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { id, hide } = body;
    if (!id) return NextResponse.json({ error: "ID zorunlu" }, { status: 400 });

    const db = await connectToDatabase();
    await db.collection("rezervasyonlar").updateOne(
      { _id: new ObjectId(id) },
      { $set: { hide: !!hide } }
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() || "Hata" }, { status: 500 });
  }
}

// app/api/admin/rezervasyonlar/route.js
