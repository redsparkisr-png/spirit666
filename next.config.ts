import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Pre-existing lint issues inherited from the Vite codebase (no-explicit-any,
    // unescaped entities, <img> vs <Image>, etc.) — not functional bugs. Run
    // `next lint` separately to address them; don't let them block production builds.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "vtcpmbjzzbggxhsjpnhu.supabase.co" },
      { protocol: "https", hostname: "zbrkbianodvzpwxgaonb.supabase.co" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
  // Retain trailing slash consistency from old Vite site
  trailingSlash: false,
  async redirects() {
    return [
      // Slug rename: old "4-bedroom-ramat-zvi" → new canonical slug (both languages)
      {
        source: "/:lang/property/4-bedroom-ramat-zvi-open-views-partial-sea-view",
        destination: "/:lang/property/ramat-zvi-home-open-views-partial-sea-view-zichron-yaakov",
        permanent: true,
      },
      // www was already deferring to the apex domain via canonical tags, but both
      // hosts served 200 independently — a hard redirect fully consolidates signals.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.spiritisraelhomes.com" }],
        destination: "https://spiritisraelhomes.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
