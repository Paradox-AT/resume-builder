import type { ResumeData } from "@/types/resume";
import { createEmptyResumeData } from "@/lib/sanitize";
import { blockchainResume } from "./blockchain";
import { fullstackResume } from "./fullstack";
import { backendResume } from "./backend";

export interface ResumeProfile {
  id: string;
  label: string;
  icon: string;
  data: ResumeData;
  isCustom?: boolean;
}

/**
 * Infer icon identifier/emoji dynamically from a target role string.
 */
export function inferIconFromRole(role?: string): string {
  const r = (role || "").toLowerCase();
  if (r.includes("golang") || r.includes("go engineer") || r.includes("go developer") || r.includes("go & distributed")) {
    return "🐹";
  }
  if (
    r.includes("blockchain") ||
    r.includes("crypto") ||
    r.includes("web3") ||
    r.includes("solidity") ||
    r.includes("hyperledger")
  ) {
    return "⛓️";
  }
  if (r.includes("full-stack") || r.includes("fullstack") || r.includes("full stack")) {
    return "⚡";
  }
  if (r.includes("frontend") || r.includes("ui") || r.includes("ux") || r.includes("web")) {
    return "🎨";
  }
  if (r.includes("backend") || r.includes("api") || r.includes("database") || r.includes("server")) {
    return "⚙️";
  }
  if (r.includes("devops") || r.includes("cloud") || r.includes("aws") || r.includes("sysadmin")) {
    return "☁️";
  }
  if (
    r.includes("engineer") ||
    r.includes("developer") ||
    r.includes("software") ||
    r.includes("programmer") ||
    r.includes("tech")
  ) {
    return "💻";
  }
  if (r.includes("lead") || r.includes("manager") || r.includes("architect") || r.includes("director")) {
    return "💼";
  }
  return "📄";
}

/**
 * Raw map of built-in preset resume datasets.
 */
const RAW_PRESETS: Record<string, ResumeData> = {
  blockchain: blockchainResume,
  fullstack: fullstackResume,
  backend: backendResume,
};

/**
 * Dynamically generated registry of preset resume profiles.
 * Labels and icons are inferred 100% dynamically from data.personalInfo.role.
 */
export const RESUME_REGISTRY: ResumeProfile[] = Object.entries(RAW_PRESETS).map(
  ([id, data]) => ({
    id,
    label: data.label || data.personalInfo.role,
    icon: inferIconFromRole(data.personalInfo.role),
    data,
  })
);

export type ResumeType = string;

/** Look up resume data by profile type. Falls back to empty resume for custom profiles or first entry. */
export function getResumeData(type?: string): ResumeData {
  const profile = RESUME_REGISTRY.find((p) => p.id === type);
  if (profile) return profile.data;
  if (type?.startsWith("custom-")) {
    return createEmptyResumeData();
  }
  return RESUME_REGISTRY[0].data;
}
