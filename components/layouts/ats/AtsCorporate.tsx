import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsCorporateProps {
  data: ResumeData;
}

export default function AtsCorporate({ data }: AtsCorporateProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-8 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-corporate font-sans">
      {/* Top Corporate Accent Bar Header */}
      <header className="border-t-4 border-[var(--accent-color)] pt-4 pb-4 mb-5 flex justify-between items-start flex-wrap gap-2 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">{personalInfo.name}</h1>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent-color)] mt-0.5">{personalInfo.role}</p>
        </div>
        <div className="text-right text-xs font-medium text-[var(--text-secondary)] space-y-0.5">
          {contact.phone && <div><span className="font-semibold text-[var(--text-primary)]">Tel: </span>{contact.phone}</div>}
          {contact.email && <div><span className="font-semibold text-[var(--text-primary)]">Email: </span><a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a></div>}
          {contact.linkedin && <div><span className="font-semibold text-[var(--text-primary)]">LinkedIn: </span><a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.linkedin}</a></div>}
          {contact.github && <div><span className="font-semibold text-[var(--text-primary)]">GitHub: </span><a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{contact.github}</a></div>}
          {contact.address && <div><span className="font-semibold text-[var(--text-primary)]">Location: </span>{contact.address}</div>}
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider bg-[var(--accent-color)] text-white px-2.5 py-1 mb-2.5 rounded-xs flex items-center justify-between" style={{ color: "#ffffff" }}>
            Profile Summary
          </h2>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{summary}</p>
        </section>
      )}

      {workHistory && workHistory.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider bg-[var(--accent-color)] text-white px-2.5 py-1 mb-3 rounded-xs flex items-center justify-between" style={{ color: "#ffffff" }}>
            Professional Experience
          </h2>
          <div className="space-y-4">
            {workHistory.map((job) => (
              <article key={job.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold text-sm text-[var(--text-primary)]">
                  <span>{job.title} <span className="font-semibold text-[var(--accent-color)]">| {job.company}</span></span>
                  <span className="text-xs font-normal text-[var(--text-muted)]">{job.date.start} – {job.date.end || "Present"}</span>
                </div>
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="mt-1.5 list-disc pl-4 text-xs text-[var(--text-secondary)] space-y-0.5 leading-relaxed">
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
          <h2 className="text-xs font-bold uppercase tracking-wider bg-[var(--accent-color)] text-white px-2.5 py-1 mb-2.5 rounded-xs flex items-center justify-between" style={{ color: "#ffffff" }}>
            Education
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
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider bg-[var(--accent-color)] text-white px-2.5 py-1 mb-2.5 rounded-xs flex items-center justify-between" style={{ color: "#ffffff" }}>
            Technical Skills
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{skills.map((s) => s.name).join(" • ")}</p>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider bg-[var(--accent-color)] text-white px-2.5 py-1 mb-2.5 rounded-xs flex items-center justify-between" style={{ color: "#ffffff" }}>
            Languages
          </h2>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
        </section>
      )}
    </main>
  );
}
