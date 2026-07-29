import type { NextConfig } from "next";

const isGithubActions = Boolean(process.env.GITHUB_ACTIONS);
const rawRepo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const repoName = rawRepo.replace(/\/$/, "");

const nextConfig: NextConfig = {
  ...(isGithubActions && {
    output: "export",
    basePath: repoName ? `/${repoName}` : "",
    images: { unoptimized: true },
  }),
};

export default nextConfig;
