import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Version-skew protection: when a new version is deployed, browser tabs that still run the
  // old JavaScript do a full reload on their next navigation instead of running stale code
  // (that is how the old "Cannot read properties of null (reading 'reset')" kept showing up).
  // Render sets RENDER_GIT_COMMIT at build and run time.
  deploymentId: process.env.RENDER_GIT_COMMIT?.slice(0, 12) || undefined,
  experimental: { optimizePackageImports: ["lucide-react"] },
  async headers() {
    return [
      {
        // HTML must never be cached by the browser — always fetch the current version.
        // Hashed assets in /_next/static keep Next's long-lived immutable caching.
        source: "/((?!_next/static|_next/image|favicon.ico).*)",
        headers: [{ key: "Cache-Control", value: "no-store, must-revalidate" }]
      }
    ];
  }
};

export default nextConfig;
