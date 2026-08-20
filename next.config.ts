import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isGhPages ? { unoptimized: true } : {}),
  },
  compress: true,
  ...(isGhPages
    ? { output: "export" as const, basePath, assetPrefix: `${basePath}/`, trailingSlash: false }
    : {}),
};

export default nextConfig;
