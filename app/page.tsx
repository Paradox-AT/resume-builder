import type { Metadata } from "next";
import { Suspense } from "react";
import ResumeViewWrapper from "@/components/ResumeViewWrapper";
import { getResumeData } from "@/data/resumes";

const defaultResume = getResumeData();

export const metadata: Metadata = {
  title: `${defaultResume.personalInfo.name} – ${defaultResume.personalInfo.role}`,
  description: defaultResume.summary || `Interactive professional resume for ${defaultResume.personalInfo.name}.`,
  openGraph: {
    title: `${defaultResume.personalInfo.name} – ${defaultResume.personalInfo.role}`,
    description: defaultResume.summary || `Interactive professional resume for ${defaultResume.personalInfo.name}.`,
    type: "profile",
  },
};

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center text-white text-xs">Loading Resume Builder...</div>}>
      <ResumeViewWrapper />
    </Suspense>
  );
}
