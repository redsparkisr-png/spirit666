import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) return NextResponse.json({ ok: false }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) return NextResponse.json({ ok: false }, { status: 500 });

  const admin = createClient(url, key);
  await admin
    .from("guide_tokens" as any)
    .update({ first_accessed_at: new Date().toISOString() })
    .eq("token", token)
    .is("first_accessed_at", null);

  return NextResponse.json({ ok: true });
}
