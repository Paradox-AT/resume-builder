"use client";

import type { ResumeData, Skill } from "@/types";

interface StepSkillsProps {
  data: ResumeData;
  onAddSkill: (category: "skills" | "languages") => void;
  onRemoveSkill: (category: "skills" | "languages", idx: number) => void;
  onUpdateSkill: (category: "skills" | "languages", idx: number, updated: Partial<Skill>) => void;
}

export default function StepSkills({
  data,
  onAddSkill,
  onRemoveSkill,
  onUpdateSkill,
}: StepSkillsProps) {
  const renderSkillSection = (
    title: string,
    subtitle: string,
    category: "skills" | "languages",
    items: Skill[]
  ) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-0.5">
            {title} ({items.length})
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>
        <button
          onClick={() => onAddSkill(category)}
          className="flex items-center gap-1 rounded-xl bg-zinc-900 dark:bg-white px-2.5 py-1 text-xs font-bold text-white dark:text-zinc-900 shadow-xs hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>＋</span> Add {category === "skills" ? "Skill" : "Language"}
        </button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-4 text-center text-xs text-zinc-400">
          No items added. Click &quot;＋ Add&quot; to begin.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 p-2.5 shadow-2xs"
            >
              <input
                type="text"
                value={item.name}
                onChange={(e) => onUpdateSkill(category, idx, { name: e.target.value })}
                placeholder="Skill name"
                className="w-1/2 bg-transparent text-xs font-semibold text-zinc-900 dark:text-white focus:outline-none border-b border-transparent focus:border-zinc-400"
              />

              {/* 1-5 Star/Level rating picker */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onUpdateSkill(category, idx, { level: lvl })}
                    title={`Level ${lvl} of 5`}
                    className={`h-4 w-4 rounded-full text-[9px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                      lvl <= item.level
                        ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 scale-105"
                        : "bg-zinc-200 dark:bg-zinc-700 text-zinc-400"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => onRemoveSkill(category, idx)}
                  title="Remove"
                  className="ml-1 text-xs text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 font-sans">
      {renderSkillSection(
        "Technical Skills & Frameworks",
        "Key platforms, databases, and architectures.",
        "skills",
        data.skills
      )}

      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
        {renderSkillSection(
          "Programming Languages & Tools",
          "Languages, scripting, and development tools.",
          "languages",
          data.languages
        )}
      </div>
    </div>
  );
}
