"use client";

import { useId } from "react";
import type { ResumeData } from "@/types";
import { IconSparkles } from "@/components/ui/icons";

interface StepSummaryProps {
  data: ResumeData;
  onUpdateSummary: (summary: string) => void;
}

export default function StepSummary({ data, onUpdateSummary }: StepSummaryProps) {
  const summaryId = useId();

  const charCount = data.summary.length;
  const wordCount = data.summary.trim() ? data.summary.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4 font-sans">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
          Executive Summary
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          A high-impact 3–5 sentence narrative highlighting your architectural mastery, core accomplishments, leadership capabilities, and specialized domain expertise.
        </p>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor={summaryId} className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Professional Summary Statement
            </label>
            <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              {wordCount} words | {charCount} chars
            </div>
          </div>

          <textarea
            id={summaryId}
            rows={7}
            value={data.summary}
            onChange={(e) => onUpdateSummary(e.target.value)}
            placeholder="e.g. Enterprise Blockchain Architect and Engineering Leader with nearly a decade of experience spearheading..."
            className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 p-3 text-xs leading-relaxed text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/60 p-3.5 text-xs text-zinc-600 dark:text-zinc-400 space-y-1.5">
        <div className="font-semibold text-zinc-900 dark:text-zinc-200 flex items-center gap-1.5">
          <IconSparkles className="h-4 w-4 text-zinc-500" /> Summary Writing Tips for ATS & Executive Readers:
        </div>
        <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] leading-normal">
          <li>Lead with your primary title and total years of experience.</li>
          <li>Mention 2–3 core technical competencies or platforms (e.g. Ethereum, Hyperledger Fabric, Go, TypeScript).</li>
          <li>Quantify achievements (e.g., &quot;delivered zero-downtime migration for high-throughput clients&quot;).</li>
        </ul>
      </div>
    </div>
  );
}
