import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is opened through forwarded preview hosts; without this
  // Next.js answers 403 for its own CSS/JS and the page renders unstyled.
  // "null" is the opaque origin Cursor's preview iframe sends. Without it,
  // Next.js answers 403 for /_next CSS and JS and the page renders unstyled.
  allowedDevOrigins: ["127.0.0.1", "localhost", "null", "*.*", "**.*"],
  // Files in public/ are not hashed: replacing one keeps its versioned-name rule (see HANDOFF),
  // and a day of freshness plus background revalidation makes repeat visits nearly free.
  async headers() {
    return ["/figma/:path*", "/video/:path*", "/lottie/:path*", "/wallpaper/:path*", "/boot/:path*", "/music/:path*"].map((source) => ({
      source,
      headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
    }));
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
