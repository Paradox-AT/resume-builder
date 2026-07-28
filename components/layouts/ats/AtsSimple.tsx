import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsSimpleProps {
  data: ResumeData;
}

export default function AtsSimple({ data }: AtsSimpleProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-8 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-simple">
      <header className="mb-4">
        <h1 className="text-3xl font-extrabold text-[var(--accent-color)]">{personalInfo.name}</h1>
        <p className="text-sm font-semibold text-[var(--text-secondary)] mt-0.5">{personalInfo.role}</p>
        <div className="mt-1 text-xs text-[var(--text-muted)] font-medium flex flex-wrap gap-x-2">
          {contact.phone && <span>{contact.phone}</span>}
          {contact.email && <span>| {contact.email}</span>}
          {contact.linkedin && <span>| {contact.linkedin}</span>}
          {contact.github && <span>| {contact.github}</span>}
          {contact.address && <span>| {contact.address}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1 border-b border-[var(--border-color)] pb-0.5">
            {data.sectionTitles?.summary || "Summary"}
          </h2>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{summary}</p>
        </section>
      )}

      {workHistory && workHistory.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-2 border-b border-[var(--border-color)] pb-0.5">
            {data.sectionTitles?.workHistory || "Experience"}
          </h2>
          <div className="space-y-3">
            {workHistory.map((job) => (
              <article key={job.id} className="break-inside-avoid">
                <div className="flex justify-between font-bold text-xs text-[var(--text-primary)]">
                  <span>{job.title} – {job.company}</span>
                  <span className="font-normal text-[var(--text-muted)]">{job.date.start} – {job.date.end || "Present"}</span>
                </div>
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="mt-0.5 list-disc pl-4 text-xs text-[var(--text-secondary)] space-y-0.5">
                    {job.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {education && education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1 border-b border-[var(--border-color)] pb-0.5">
            {data.sectionTitles?.education || "Education"}
          </h2>
          <div className="space-y-1.5 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between font-semibold text-[var(--text-primary)] break-inside-avoid">
                <span>{edu.degree} – {edu.school}</span>
                <span className="font-normal text-[var(--text-muted)]">{edu.date.start} – {edu.date.end || "Present"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1 border-b border-[var(--border-color)] pb-0.5">
            {data.sectionTitles?.skills || "Skills"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">{skills.map((s) => s.name).join(" • ")}</p>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1 border-b border-[var(--border-color)] pb-0.5">
            {data.sectionTitles?.languages || "Languages"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
        </section>
      )}
    </main>
  );
}
