"use client";

import { useState, useRef } from "react";
import type { ResumeData } from "@/types";
import { RESUME_REGISTRY } from "@/data/resumes";
import {
  IconDownload,
  IconUpload,
  IconRefresh,
  IconTrash,
} from "@/components/ui/icons";

interface StepExportImportProps {
  data: ResumeData;
  onExportDownload: () => void;
  onImportFile: (file: File) => Promise<{ success: boolean; error?: string }>;
  onResetToPreset: (presetId?: string) => void;
  onResetToEmpty: () => void;
}

export default function StepExportImport({
  onExportDownload,
  onImportFile,
  onResetToPreset,
  onResetToEmpty,
}: StepExportImportProps) {
  const [importStatus, setImportStatus] = useState<{ type: "idle" | "success" | "error"; message?: string }>({
    type: "idle",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus({ type: "idle" });
    const result = await onImportFile(file);

    if (result.success) {
      setImportStatus({ type: "success", message: "Resume JSON successfully imported and applied!" });
    } else {
      setImportStatus({ type: "error", message: result.error || "Failed to import JSON file." });
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* EXPORT SECTION */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
          <IconDownload className="h-4 w-4" /> Download Resume Data
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          Save your current resume data as a `.json` file to back it up or transfer to another session.
        </p>

        <button
          onClick={onExportDownload}
          className="flex items-center justify-center gap-2 w-full rounded-xl bg-zinc-900 dark:bg-white p-3 text-xs font-bold text-white dark:text-zinc-900 shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <IconDownload className="h-4 w-4" /> Download JSON File (.json)
        </button>
      </div>

      {/* IMPORT SECTION */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
          <IconUpload className="h-4 w-4" /> Upload & Import JSON
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          Upload a previously saved `.json` resume data file. Max size 1MB.
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          className="hidden"
          id="resume-json-upload"
        />

        <label
          htmlFor="resume-json-upload"
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 text-center cursor-pointer hover:border-zinc-500 dark:hover:border-zinc-500 transition-colors"
        >
          <IconUpload className="h-6 w-6 text-zinc-400" />
          <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
            Click or drag JSON file here to import
          </span>
          <span className="text-[11px] text-zinc-400">Supports standard ResumeData format</span>
        </label>

        {importStatus.type === "success" && (
          <div className="mt-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            ✓ {importStatus.message}
          </div>
        )}

        {importStatus.type === "error" && (
          <div className="mt-2.5 rounded-xl bg-red-500/10 border border-red-500/30 p-2.5 text-xs text-red-600 dark:text-red-400 font-semibold">
            ⚠️ {importStatus.message}
          </div>
        )}
      </div>

      {/* PRESETS SEEDING */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1.5">
          <IconRefresh className="h-4 w-4" /> Preset Templates & Reset
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
          Overwrites current form state with starter templates or a blank slate.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {RESUME_REGISTRY.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onResetToPreset(preset.id)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer"
            >
              <IconRefresh className="h-3.5 w-3.5 text-zinc-500" /> Seed {preset.label}
            </button>
          ))}

          <button
            onClick={onResetToEmpty}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 p-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 cursor-pointer"
          >
            <IconTrash className="h-3.5 w-3.5 text-red-500" /> Start Blank
          </button>
        </div>
      </div>
    </div>
  );
}
