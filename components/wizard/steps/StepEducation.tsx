"use client";

import type { ResumeData, Education } from "@/types";
import { IconTrash } from "@/components/ui/icons";

interface StepEducationProps {
  data: ResumeData;
  onAddEducation: () => void;
  onRemoveEducation: (id: string) => void;
  onUpdateEducation: (id: string, updated: Partial<Education>) => void;
  onReorderEducation: (id: string, direction: "up" | "down") => void;
}

export default function StepEducation({
  data,
  onAddEducation,
  onRemoveEducation,
  onUpdateEducation,
  onReorderEducation,
}: StepEducationProps) {
  return (
    <div className="space-y-5 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-0.5">
            Education ({data.education.length})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Academic degrees, certifications, and institutions.
          </p>
        </div>
        <button
          onClick={onAddEducation}
          className="flex items-center gap-1.5 rounded-xl bg-zinc-900 dark:bg-white px-3 py-1.5 text-xs font-bold text-white dark:text-zinc-900 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>＋</span> Add Degree
        </button>
      </div>

      {data.education.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            No education entries added yet.
          </p>
          <button
            onClick={onAddEducation}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            ＋ Add First Education
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.education.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === data.education.length - 1;

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 p-4 space-y-3 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-[10px] font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      {index + 1}
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">
                      Education Entry #{index + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onReorderEducation(item.id, "up")}
                      disabled={isFirst}
                      title="Move Up"
                      className="p-1 text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 disabled:opacity-20 cursor-pointer"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => onReorderEducation(item.id, "down")}
                      disabled={isLast}
                      title="Move Down"
                      className="p-1 text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 disabled:opacity-20 cursor-pointer"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => onRemoveEducation(item.id)}
                      title="Delete Entry"
                      className="p-1 text-xs text-red-500 rounded hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer ml-1"
                    >
                      <IconTrash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Degree / Specialization
                    </label>
                    <input
                      type="text"
                      value={item.degree}
                      onChange={(e) => onUpdateEducation(item.id, { degree: e.target.value })}
                      placeholder="e.g. Bachelor of Engineering Technology: Computer Science"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      School / Institution
                    </label>
                    <input
                      type="text"
                      value={item.school}
                      onChange={(e) => onUpdateEducation(item.id, { school: e.target.value })}
                      placeholder="e.g. IPS Academy – Indore"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={item.date.start}
                      onChange={(e) =>
                        onUpdateEducation(item.id, { date: { ...item.date, start: e.target.value } })
                      }
                      placeholder="YYYY-MM (e.g. 2013-07)"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                      End Date / Graduation
                    </label>
                    <input
                      type="text"
                      value={item.date.end}
                      onChange={(e) =>
                        onUpdateEducation(item.id, { date: { ...item.date, end: e.target.value } })
                      }
                      placeholder="YYYY-MM (e.g. 2017-06)"
                      className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
