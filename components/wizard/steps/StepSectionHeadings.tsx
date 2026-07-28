"use client";

import type { SectionTitles } from "@/types";

interface StepSectionHeadingsProps {
  sectionTitles?: SectionTitles;
  onUpdateSectionTitle: (field: keyof SectionTitles, value: string) => void;
}

export default function StepSectionHeadings({
  sectionTitles,
  onUpdateSectionTitle,
}: StepSectionHeadingsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
          Custom Section Headings
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Customize the title headings for each section across all resume themes.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Summary Section Heading
          </label>
          <input
            type="text"
            value={sectionTitles?.summary ?? "Professional Summary"}
            onChange={(e) => onUpdateSectionTitle("summary", e.target.value)}
            placeholder="e.g. Executive Profile"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-900 dark:text-white focus:border-zinc-900 focus:outline-hidden dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Work Experience Section Heading
          </label>
          <input
            type="text"
            value={sectionTitles?.workHistory ?? "Work Experience"}
            onChange={(e) => onUpdateSectionTitle("workHistory", e.target.value)}
            placeholder="e.g. Employment History / Career Experience"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-900 dark:text-white focus:border-zinc-900 focus:outline-hidden dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Education Section Heading
          </label>
          <input
            type="text"
            value={sectionTitles?.education ?? "Education"}
            onChange={(e) => onUpdateSectionTitle("education", e.target.value)}
            placeholder="e.g. Academic Credentials & Degrees"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-900 dark:text-white focus:border-zinc-900 focus:outline-hidden dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Skills Section Heading
          </label>
          <input
            type="text"
            value={sectionTitles?.skills ?? "Skills & Qualifications"}
            onChange={(e) => onUpdateSectionTitle("skills", e.target.value)}
            placeholder="e.g. Technical Competencies / Core Strengths"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-900 dark:text-white focus:border-zinc-900 focus:outline-hidden dark:focus:border-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            Languages Section Heading
          </label>
          <input
            type="text"
            value={sectionTitles?.languages ?? "Languages"}
            onChange={(e) => onUpdateSectionTitle("languages", e.target.value)}
            placeholder="e.g. Multilingual Proficiency"
            className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-900 dark:text-white focus:border-zinc-900 focus:outline-hidden dark:focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}
