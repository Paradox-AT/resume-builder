import type { Metadata } from "next";
import { Suspense } from "react";
import PureResumeView from "@/components/PureResumeView";
import { getResumeData } from "@/data/resumes";

const defaultResume = getResumeData();

export const metadata: Metadata = {
  title: `${defaultResume.personalInfo.name} – Resume View`,
  description: defaultResume.summary || `Interactive professional resume for ${defaultResume.personalInfo.name}.`,
  openGraph: {
    title: `${defaultResume.personalInfo.name} – Resume View`,
    description: defaultResume.summary || `Interactive professional resume for ${defaultResume.personalInfo.name}.`,
    type: "profile",
  },
};

export default function ViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen w-full bg-zinc-950 flex items-center justify-center text-white text-xs font-sans">Loading Pure Resume View...</div>}>
      <PureResumeView />
    </Suspense>
  );
}
