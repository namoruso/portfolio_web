import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "portfolio_web";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
    output: "export",
    trailingSlash: true,
    basePath: basePath || undefined,
    assetPrefix: basePath || undefined,
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    images: {
        unoptimized: true,
        formats: ["image/avif", "image/webp"],
    },
};

export default nextConfig;
