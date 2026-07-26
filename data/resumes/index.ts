import type { ResumeData } from "@/types/resume";
import { blockchainResume } from "./blockchain";
import { fullstackResume } from "./fullstack";

/**
 * Single source of truth for all resume profiles.
 * To add a new profile: create the data file and add an entry to RESUME_REGISTRY.
 */
export const RESUME_REGISTRY = [
  { id: "blockchain", label: "Blockchain Engineer", icon: "⛓️", data: blockchainResume },
  { id: "fullstack", label: "Full-Stack Engineer", icon: "⚡", data: fullstackResume },
] as const;

export type ResumeType = typeof RESUME_REGISTRY[number]["id"];

export interface ResumeProfile {
  id: ResumeType;
  label: string;
  icon: string;
  data: ResumeData;
}

/** Look up resume data by profile type. Falls back to the first entry. */
export function getResumeData(type?: string): ResumeData {
  const profile = RESUME_REGISTRY.find((p) => p.id === type);
  return profile ? profile.data : RESUME_REGISTRY[0].data;
}
