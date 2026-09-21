import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        // Supabase Storage – ganti <your-project-ref> dengan Project ID Supabase kamu
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Fallback: localhost untuk development
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
