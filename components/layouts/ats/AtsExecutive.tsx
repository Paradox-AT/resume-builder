import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsExecutiveProps {
  data: ResumeData;
}

export default function AtsExecutive({ data }: AtsExecutiveProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-10 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-executive font-serif">
      <header className="border-t-4 border-[var(--accent-color)] border-b-2 border-[var(--border-color)] pt-4 pb-4 mb-5 text-center">
        <h1 className="text-3xl font-extrabold uppercase tracking-wider text-[var(--text-primary)]">{personalInfo.name}</h1>
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--accent-color)] mt-1 font-sans">{personalInfo.role}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-[var(--text-muted)] font-sans">
          {contact.phone && <span>{contact.phone}</span>}
          {contact.email && <span>• {contact.email}</span>}
          {contact.linkedin && <span>• {contact.linkedin}</span>}
          {contact.github && <span>• {contact.github}</span>}
          {contact.address && <span>• {contact.address}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-[var(--border-color)] pb-1 mb-2 font-sans text-[var(--text-primary)]">
            {data.sectionTitles?.summary || "Executive Summary"}
          </h2>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{summary}</p>
        </section>
      )}

      {workHistory && workHistory.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-[var(--border-color)] pb-1 mb-3 font-sans text-[var(--text-primary)]">
            {data.sectionTitles?.workHistory || "Executive Experience"}
          </h2>
          <div className="space-y-4">
            {workHistory.map((job) => (
              <article key={job.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{job.title} – <span className="font-normal italic text-[var(--text-secondary)]">{job.company}</span></h3>
                  <span className="text-xs text-[var(--text-muted)] font-sans">{job.date.start} – {job.date.end || "Present"}</span>
                </div>
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="mt-1.5 list-disc pl-5 text-xs text-[var(--text-secondary)] space-y-1">
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
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-[var(--border-color)] pb-1 mb-2 font-sans text-[var(--text-primary)]">
            {data.sectionTitles?.education || "Education & Credentials"}
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline font-bold text-[var(--text-primary)] break-inside-avoid">
                <div>
                  <span>{edu.degree}</span> – <span className="font-normal italic text-[var(--text-secondary)]">{edu.school}</span>
                </div>
                <span className="text-[var(--text-muted)] font-normal font-sans">{edu.date.start} – {edu.date.end || "Present"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-[var(--border-color)] pb-1 mb-2 font-sans text-[var(--text-primary)]">
            {data.sectionTitles?.skills || "Core Competencies"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{skills.map((s) => s.name).join(" • ")}</p>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest border-b border-[var(--border-color)] pb-1 mb-2 font-sans text-[var(--text-primary)]">
            {data.sectionTitles?.languages || "Languages"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
        </section>
      )}
    </main>
  );
}
