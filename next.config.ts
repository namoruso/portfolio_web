import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "portfolio_web";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    images: {
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
    },
    ...(isGithubPages
        ? {
              basePath: `/${repoName}`,
              assetPrefix: `/${repoName}`,
          }
        : {}),
};

export default nextConfig;
