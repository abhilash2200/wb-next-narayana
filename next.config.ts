
import type { NextConfig } from "next";

const apiBaseUrl = (process.env.NEXT_API_BASE_URL ?? "").trim().replace(/\/$/, "");

let apiHostname = "";
try {
  if (apiBaseUrl) {
    apiHostname = new URL(apiBaseUrl).hostname;
  }
} catch {
  // invalid url
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: apiHostname
      ? [
          {
            protocol: "https",
            hostname: apiHostname,
            pathname: "/**",
          },
        ]
      : [],
  },

  async rewrites() {
    return [
      {
        source: "/api/school-finder/:path*",
        destination: `${apiBaseUrl}/school-finder/:path*`,
      },
      {
        source: "/api/pages/:citySlug",
        destination: `${apiBaseUrl}/pages/:citySlug`,
      },
      {
        source: "/api/pages/:path*",
        destination: `${apiBaseUrl}/pages/:path*`,
      },
      {
        source: "/api/admission/downloads/:singleUseToken",
        destination: `${apiBaseUrl}/downloads/:singleUseToken`,
      },
      {
        source: "/api/admission/:path*",
        destination: `${apiBaseUrl}/admission/:path*`,
      },
    ];
  },
};

export default nextConfig;
