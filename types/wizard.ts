import type { ResumeData } from "./resume";

export type StepId = "personal" | "summary" | "work" | "education" | "skills" | "headings";

export interface WizardStep {
  id: StepId;
  label: string;
  icon: string;
  description: string;
}

export interface JsonImportResult {
  success: boolean;
  data?: ResumeData;
  error?: string;
}
