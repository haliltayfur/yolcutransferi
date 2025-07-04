import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  const admins = await db.collection("admin_users").find({}).toArray();
  return NextResponse.json({
    admins: admins.map(a => a.email)
  });
}
