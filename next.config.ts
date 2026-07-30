import type { NextConfig } from "next";

const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);
const rawRepo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const repoName = rawRepo.replace(/\/$/, "");
const basePath = repoName ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  ...(isGithubActions && {
    output: "export",
    basePath,
    images: { unoptimized: true },
    env: {
      NEXT_PUBLIC_BASE_PATH: basePath,
    },
  }),
};

export default nextConfig;
