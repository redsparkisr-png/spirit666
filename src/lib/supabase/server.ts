import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

// Server-side Supabase client (uses anon key — read-only public tables only)
export function createServerSupabase() {
  return createClient<Database>(SUPABASE_URL, SUPABASE_KEY);
}
