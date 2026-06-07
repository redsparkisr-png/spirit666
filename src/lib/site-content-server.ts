export interface SiteContentRow {
  id: string;
  key: string;
  value_en: string;
  value_he: string;
  page: string;
  section: string;
  updated_at: string;
}

// Plain REST fetch (not the browser supabase-js client) so this can run safely
// during SSR/SSG without relying on localStorage-based session persistence.
export async function fetchSiteContentServer(): Promise<SiteContentRow[]> {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()}/rest/v1/site_content?select=*&order=key`;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!.trim();

  const res = await fetch(url, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Failed to fetch site content: ${res.status}`);
  return res.json();
}
