import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, phone, lang } = body as { email?: string; phone?: string; lang?: string };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );

    // Save lead (INSERT policy allows anon; sanitize_public_lead trigger enforces safe defaults)
    await sb.from("leads").insert({
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      source: "blueprint",
      status: "new",
    });

    // Fetch guide access token from CMS
    const { data: tokenRow, error: tokenErr } = await sb
      .from("site_content")
      .select("value_en")
      .eq("key", "access_token")
      .eq("page", "buyer_guide")
      .single();

    if (tokenErr || !tokenRow?.value_en) {
      // Token not configured — fall back to WhatsApp so the lead still has a path
      return NextResponse.json({ fallbackWhatsapp: true });
    }

    const l = lang === "he" ? "he" : "en";
    const guideUrl = `/${l}/buyer-guide-2026?token=${tokenRow.value_en}`;
    return NextResponse.json({ url: guideUrl });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
