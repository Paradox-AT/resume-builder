import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsModernProps {
  data: ResumeData;
}

export default function AtsModern({ data }: AtsModernProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-8 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-modern">
      <header className="border-b-2 border-[var(--border-color)] pb-4 mb-4 flex justify-between items-end flex-wrap gap-2">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--accent-color)]">{personalInfo.name}</h1>
          <p className="text-base font-semibold text-[var(--text-secondary)]">{personalInfo.role}</p>
        </div>
        <div className="text-right text-xs text-[var(--text-muted)] font-medium space-y-0.5">
          {contact.phone && <div>{contact.phone}</div>}
          {contact.email && <div>{contact.email}</div>}
          {contact.linkedin && <div>{contact.linkedin}</div>}
          {contact.github && <div>{contact.github}</div>}
          {contact.address && <div>{contact.address}</div>}
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] border-b border-[var(--border-color)] pb-1 mb-2">
            {data.sectionTitles?.summary || "Professional Summary"}
          </h2>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{summary}</p>
        </section>
      )}

      {workHistory && workHistory.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] border-b border-[var(--border-color)] pb-1 mb-3">
            {data.sectionTitles?.workHistory || "Work History"}
          </h2>
          <div className="space-y-4">
            {workHistory.map((job) => (
              <article key={job.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold text-sm text-[var(--text-primary)]">
                  <span>{job.title} <span className="font-semibold text-[var(--text-secondary)]">@ {job.company}</span></span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">{job.date.start} – {job.date.end || "Present"}</span>
                </div>
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-xs text-[var(--text-secondary)] space-y-0.5">
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
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] border-b border-[var(--border-color)] pb-1 mb-2">
            {data.sectionTitles?.education || "Education"}
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between font-semibold text-[var(--text-primary)] break-inside-avoid">
                <span>{edu.degree} – {edu.school}</span>
                <span className="text-[var(--text-muted)] font-medium">{edu.date.start} – {edu.date.end || "Present"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] border-b border-[var(--border-color)] pb-1 mb-2">
            {data.sectionTitles?.skills || "Skills"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{skills.map((s) => s.name).join(" • ")}</p>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--accent-color)] border-b border-[var(--border-color)] pb-1 mb-2">
            {data.sectionTitles?.languages || "Languages"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
        </section>
      )}
    </main>
  );
}
