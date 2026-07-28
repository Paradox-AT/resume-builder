import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsMinimalProps {
  data: ResumeData;
}

export default function AtsMinimal({ data }: AtsMinimalProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-10 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-minimal">
      <div className="border-l-4 border-[var(--accent-color)] pl-6 space-y-6">
        <header>
          <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">{personalInfo.name}</h1>
          <p className="text-base font-semibold text-[var(--accent-color)] mt-0.5">{personalInfo.role}</p>
          <div className="mt-2 text-xs font-medium text-[var(--text-muted)] flex flex-wrap gap-x-3 gap-y-1">
            {contact.phone && <span>{contact.phone}</span>}
            {contact.email && <span>• {contact.email}</span>}
            {contact.linkedin && <span>• {contact.linkedin}</span>}
            {contact.github && <span>• {contact.github}</span>}
            {contact.address && <span>• {contact.address}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] mb-2">
              {data.sectionTitles?.summary || "Summary"}
            </h2>
            <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{summary}</p>
          </section>
        )}

        {workHistory && workHistory.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] mb-3">
              {data.sectionTitles?.workHistory || "Experience"}
            </h2>
            <div className="space-y-4">
              {workHistory.map((job) => (
                <article key={job.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-sm text-[var(--text-primary)]">
                    <span>{job.title} – <span className="font-semibold text-[var(--text-secondary)]">{job.company}</span></span>
                    <span className="text-xs font-medium text-[var(--text-muted)]">{job.date.start} – {job.date.end || "Present"}</span>
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
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] mb-2">
              {data.sectionTitles?.education || "Education"}
            </h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between font-semibold text-[var(--text-primary)] break-inside-avoid">
                  <span>{edu.degree} – <span className="font-normal text-[var(--text-secondary)]">{edu.school}</span></span>
                  <span className="text-[var(--text-muted)] font-normal">{edu.date.start} – {edu.date.end || "Present"}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] mb-2">
              {data.sectionTitles?.skills || "Skills"}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{skills.map((s) => s.name).join(" • ")}</p>
          </section>
        )}

        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] mb-2">
              {data.sectionTitles?.languages || "Languages"}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
          </section>
        )}
      </div>
    </main>
  );
}
