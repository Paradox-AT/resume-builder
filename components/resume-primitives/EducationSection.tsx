"use client";

import type { Education } from "@/types";

interface EducationSectionProps {
  education: Education[];
  title?: string;
  variant?: "ux-sidebar" | "ux-cards" | "ats-clean";
  className?: string;
}

export default function EducationSection({
  education,
  title = "Education",
  variant = "ux-sidebar",
  className = "",
}: EducationSectionProps) {
  if (!education || education.length === 0) return null;

  if (variant === "ats-clean") {
    return (
      <section className={`mb-6 print:mb-4 ${className}`} aria-labelledby="edu-heading">
        <h2 id="edu-heading" className="text-xs font-bold uppercase tracking-wider border-b border-[var(--border-color)] pb-1 mb-3 text-[var(--text-primary)]">
          {title}
        </h2>
        <div className="space-y-3">
          {education.map((item) => (
            <div key={item.id} className="break-inside-avoid page-break-inside-avoid">
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <span className="font-bold text-sm text-[var(--text-primary)]">{item.degree}</span>
                <span className="text-xs text-[var(--text-secondary)] font-medium">
                  {item.date.start} – {item.date.end || "Present"}
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-baseline text-xs text-[var(--text-secondary)]">
                <span className="font-semibold italic">{item.school}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default UX section
  return (
    <section className={`section ${className}`} aria-labelledby="edu-heading">
      <div className="sec-head">
        <div className="ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
          </svg>
        </div>
        <h2 id="edu-heading">{title}</h2>
      </div>

      <div className="space-y-4">
        {education.map((item) => (
          <div key={item.id} className="edu-item break-inside-avoid page-break-inside-avoid">
            <div className="font-bold text-sm">{item.degree}</div>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {item.school} • {item.date.start} – {item.date.end || "Present"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
