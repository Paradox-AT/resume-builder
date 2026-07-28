import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsMinimoProps {
  data: ResumeData;
}

export default function AtsMinimo({ data }: AtsMinimoProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] px-10 py-10 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:px-6 print:py-4 theme-ats-minimo">
      <header className="border-b border-[var(--border-color)] pb-5 text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--accent-color)]">{personalInfo.name}</h1>
        <p className="text-base font-semibold text-[var(--text-secondary)] mt-0.5">{personalInfo.role}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted)] font-medium">
          {contact.phone && <span>{contact.phone}</span>}
          {contact.email && (
            <>
              <span>•</span>
              <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>
            </>
          )}
          {contact.linkedin && (
            <>
              <span>•</span>
              <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.linkedin}</a>
            </>
          )}
          {contact.github && (
            <>
              <span>•</span>
              <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.github}</a>
            </>
          )}
          {contact.address && (
            <>
              <span>•</span>
              <span>{contact.address}</span>
            </>
          )}
        </div>
      </header>

      {summary && (
        <section className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] mb-2">
            {data.sectionTitles?.summary || "Summary"}
          </h2>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{summary}</p>
        </section>
      )}

      {workHistory && workHistory.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[var(--border-color)] pb-1 mb-3 text-[var(--accent-color)]">
            {data.sectionTitles?.workHistory || "Experience"}
          </h2>
          <div className="space-y-4">
            {workHistory.map((job) => (
              <article key={job.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">{job.title} – <span className="font-semibold text-[var(--text-secondary)]">{job.company}</span></h3>
                  <span className="text-xs font-medium text-[var(--text-muted)]">{job.date.start} – {job.date.end || "Present"}</span>
                </div>
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-xs leading-relaxed text-[var(--text-secondary)] space-y-0.5">
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
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[var(--border-color)] pb-1 mb-3 text-[var(--accent-color)]">
            {data.sectionTitles?.education || "Education"}
          </h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                <div>
                  <span className="font-bold text-[var(--text-primary)]">{edu.degree}</span> – <span className="text-[var(--text-secondary)]">{edu.school}</span>
                </div>
                <span className="text-[var(--text-muted)]">{edu.date.start} – {edu.date.end || "Present"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[var(--border-color)] pb-1 mb-2 text-[var(--accent-color)]">
            {data.sectionTitles?.skills || "Skills"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {skills.map((s) => s.name).join(" • ")}
          </p>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-[var(--border-color)] pb-1 mb-2 text-[var(--accent-color)]">
            {data.sectionTitles?.languages || "Languages"}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}
          </p>
        </section>
      )}
    </main>
  );
}
