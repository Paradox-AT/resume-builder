"use client";

import type { WorkExperience } from "@/types";

interface WorkHistorySectionProps {
  workHistory: WorkExperience[];
  title?: string;
  variant?: "ux-timeline" | "ux-cards" | "ux-compact" | "ats-clean" | "ats-academic";
  className?: string;
}

export default function WorkHistorySection({
  workHistory,
  title = "Work Experience",
  variant = "ux-timeline",
  className = "",
}: WorkHistorySectionProps) {
  if (!workHistory || workHistory.length === 0) return null;

  if (variant === "ats-clean" || variant === "ats-academic") {
    return (
      <section className={`mb-6 print:mb-4 ${className}`} aria-labelledby="work-heading">
        <h2 id="work-heading" className="text-xs font-bold uppercase tracking-wider border-b border-[var(--border-color)] pb-1 mb-3 text-[var(--text-primary)]">
          {title}
        </h2>
        <div className="space-y-4">
          {workHistory.map((item) => (
            <div key={item.id} className="break-inside-avoid page-break-inside-avoid">
              <div className="flex flex-wrap justify-between items-baseline gap-1">
                <span className="font-bold text-sm text-[var(--text-primary)]">{item.title}</span>
                <span className="text-xs text-[var(--text-secondary)] font-medium">
                  {item.date.start} – {item.date.end || "Present"}
                </span>
              </div>
              <div className="flex flex-wrap justify-between items-baseline text-xs text-[var(--text-secondary)] mb-1.5">
                <span className="font-semibold italic">{item.company}</span>
              </div>
              {item.bullets && item.bullets.length > 0 && (
                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[var(--text-secondary)]">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Default UX timeline format
  return (
    <section className={`section ${className}`} aria-labelledby="work-heading">
      <div className="sec-head">
        <div className="ico" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 1.99 2H20c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
          </svg>
        </div>
        <h2 id="work-heading">{title}</h2>
      </div>

      <div className="timeline">
        {workHistory.map((item) => (
          <article key={item.id} className="t-item break-inside-avoid page-break-inside-avoid">
            <div className="t-role">{item.title}</div>
            <div className="t-meta">
              <span>{item.company}</span> • <span>{item.date.start} – {item.date.end || "Present"}</span>
            </div>
            {item.bullets && item.bullets.length > 0 && (
              <ul className="t-desc">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
