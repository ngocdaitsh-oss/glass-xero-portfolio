import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The dev server is opened through forwarded preview hosts; without this
  // Next.js answers 403 for its own CSS/JS and the page renders unstyled.
  // "null" is the opaque origin Cursor's preview iframe sends. Without it,
  // Next.js answers 403 for /_next CSS and JS and the page renders unstyled.
  allowedDevOrigins: ["127.0.0.1", "localhost", "null", "*.*", "**.*"],
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
