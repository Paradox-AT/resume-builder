"use client";

import type { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
  languages?: Skill[];
  variant?: "ux-sidebar" | "ux-progress" | "ux-chips" | "ats-clean";
  className?: string;
}

export default function SkillsSection({
  skills,
  languages,
  variant = "ux-sidebar",
  className = "",
}: SkillsSectionProps) {
  if (variant === "ats-clean") {
    return (
      <section className={`mb-6 print:mb-4 ${className}`} aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-xs font-bold uppercase tracking-wider border-b border-[var(--border-color)] pb-1 mb-3 text-[var(--text-primary)]">
          Skills & Qualifications
        </h2>
        {skills && skills.length > 0 && (
          <div className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
            <span className="font-semibold text-[var(--text-primary)]">Technical Skills: </span>
            {skills.map((s) => s.name).join(" • ")}
          </div>
        )}
        {languages && languages.length > 0 && (
          <div className="text-xs text-[var(--text-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--text-primary)]">Languages: </span>
            {languages.map((l) => `${l.name} (${l.level || 5}/5)`).join(" • ")}
          </div>
        )}
      </section>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {skills && skills.length > 0 && (
        <section className="section" aria-labelledby="skills-heading">
          <div className="sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <h2 id="skills-heading">Skills</h2>
          </div>
          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.name} className="s-chip">
                <span>{s.name}</span>
                {s.level && <span className="s-stars">{"★".repeat(Math.min(5, Math.max(1, s.level)))}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="section" aria-labelledby="lang-heading">
          <div className="sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
              </svg>
            </div>
            <h2 id="lang-heading">Languages</h2>
          </div>
          <div className="space-y-1.5 text-xs">
            {languages.map((l) => (
              <div key={l.name} className="flex justify-between items-center">
                <span className="font-semibold">{l.name}</span>
                <span className="text-zinc-500 dark:text-zinc-400">Level {l.level}/5</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
