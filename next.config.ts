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
};

export default nextConfig;
