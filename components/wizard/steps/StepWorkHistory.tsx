"use client";

import { useState } from "react";
import type { ResumeData, WorkExperience } from "@/types";
import { IconTrash } from "@/components/ui/icons";

interface StepWorkHistoryProps {
  data: ResumeData;
  onAddWork: () => void;
  onRemoveWork: (id: string) => void;
  onUpdateWork: (id: string, updated: Partial<WorkExperience>) => void;
  onReorderWork: (id: string, direction: "up" | "down") => void;
  onAddBullet: (workId: string) => void;
  onRemoveBullet: (workId: string, idx: number) => void;
  onUpdateBullet: (workId: string, idx: number, text: string) => void;
  onReorderBullet: (workId: string, idx: number, direction: "up" | "down") => void;
}

export default function StepWorkHistory({
  data,
  onAddWork,
  onRemoveWork,
  onUpdateWork,
  onReorderWork,
  onAddBullet,
  onRemoveBullet,
  onUpdateBullet,
  onReorderBullet,
}: StepWorkHistoryProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    data.workHistory[0]?.id || null
  );

  return (
    <div className="space-y-5 font-sans">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-0.5">
            Work Experience ({data.workHistory.length})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Chronological employment history and bullet-point achievements.
          </p>
        </div>
        <button
          onClick={onAddWork}
          className="flex items-center gap-1.5 rounded-xl bg-zinc-900 dark:bg-white px-3 py-1.5 text-xs font-bold text-white dark:text-zinc-900 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>＋</span> Add Role
        </button>
      </div>

      {data.workHistory.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">
            No work experience positions added yet.
          </p>
          <button
            onClick={onAddWork}
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-300 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            ＋ Add First Position
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {data.workHistory.map((item, index) => {
            const isExpanded = expandedId === item.id;
            const isFirst = index === 0;
            const isLast = index === data.workHistory.length - 1;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded
                    ? "border-zinc-400 dark:border-zinc-600 bg-white dark:bg-zinc-800/80 shadow-md"
                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                {/* Accordion Header */}
                <div
                  className="flex items-center justify-between p-3.5 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700 text-[11px] font-mono font-bold text-zinc-700 dark:text-zinc-300">
                      {index + 1}
                    </span>
                    <div className="truncate">
                      <div className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {item.title || "Untitled Position"}
                      </div>
                      <div className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                        {item.company || "Company Name"} • {item.date.start || "Start"} to {item.date.end || "End"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onReorderWork(item.id, "up")}
                      disabled={isFirst}
                      title="Move Up"
                      className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => onReorderWork(item.id, "down")}
                      disabled={isLast}
                      title="Move Down"
                      className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => onRemoveWork(item.id)}
                      title="Delete Role"
                      className="p-1 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer ml-1"
                    >
                      <IconTrash className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-zinc-400 dark:text-zinc-500 text-xs ml-1">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Expanded Form Content */}
                {isExpanded && (
                  <div className="border-t border-zinc-200 dark:border-zinc-700/60 p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => onUpdateWork(item.id, { title: e.target.value })}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          Company & Location
                        </label>
                        <input
                          type="text"
                          value={item.company}
                          onChange={(e) => onUpdateWork(item.id, { company: e.target.value })}
                          placeholder="e.g. Acme Corp, Remote"
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
                            onUpdateWork(item.id, { date: { ...item.date, start: e.target.value } })
                          }
                          placeholder="YYYY-MM (e.g. 2023-01)"
                          className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                          End Date
                        </label>
                        <input
                          type="text"
                          value={item.date.end}
                          onChange={(e) =>
                            onUpdateWork(item.id, { date: { ...item.date, end: e.target.value } })
                          }
                          placeholder="YYYY-MM or Current"
                          className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
                        />
                      </div>
                    </div>

                    {/* Bullets Manager */}
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                          Bullet Point Achievements ({item.bullets.length})
                        </label>
                        <button
                          onClick={() => onAddBullet(item.id)}
                          className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          ＋ Add Bullet
                        </button>
                      </div>

                      {item.bullets.length === 0 ? (
                        <p className="text-xs text-zinc-400 italic py-2">
                          No bullet points for this role yet. Click &quot;＋ Add Bullet&quot; above.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {item.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2">
                              <span className="text-xs text-zinc-400 mt-2 select-none">•</span>
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) => onUpdateBullet(item.id, bIdx, e.target.value)}
                                placeholder="Describe key achievement, tech stack used, and metrics..."
                                className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-900/90 p-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500/40"
                              />
                              <div className="flex flex-col gap-0.5 pt-1">
                                <button
                                  onClick={() => onReorderBullet(item.id, bIdx, "up")}
                                  disabled={bIdx === 0}
                                  title="Move bullet up"
                                  className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                                >
                                  ▲
                                </button>
                                <button
                                  onClick={() => onReorderBullet(item.id, bIdx, "down")}
                                  disabled={bIdx === item.bullets.length - 1}
                                  title="Move bullet down"
                                  className="text-[10px] text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-20 cursor-pointer"
                                >
                                  ▼
                                </button>
                                <button
                                  onClick={() => onRemoveBullet(item.id, bIdx)}
                                  title="Remove bullet"
                                  className="text-[11px] text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
