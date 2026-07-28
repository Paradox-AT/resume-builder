import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsTechnicalProps {
  data: ResumeData;
}

export default function AtsTechnical({ data }: AtsTechnicalProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-8 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-technical">
      <header className="border-b-2 border-zinc-900 pb-3 mb-4 flex justify-between items-baseline flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-black text-zinc-900 tracking-tight">{personalInfo.name}</h1>
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-600 mt-0.5">{personalInfo.role}</p>
        </div>
        <div className="text-right text-xs font-medium text-zinc-500">
          {contact.phone && <div>{contact.phone} • {contact.email}</div>}
          {(contact.linkedin || contact.github) && <div>{contact.linkedin} • {contact.github}</div>}
          {contact.address && <div>{contact.address}</div>}
        </div>
      </header>

      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">Summary</h2>
          <p className="text-xs leading-relaxed text-zinc-700">{summary}</p>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-2 text-zinc-900">Technical Skills & Competencies</h2>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {skills.map((s) => (
              <div key={s.name} className="flex justify-between border-b border-zinc-100 pb-1">
                <span className="font-semibold text-zinc-900">{s.name}</span>
                <span className="text-zinc-500 font-medium">Proficiency: {s.level}/5</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {workHistory && workHistory.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-3 text-zinc-900">Work Experience</h2>
          <div className="space-y-3.5">
            {workHistory.map((job) => (
              <article key={job.id} className="break-inside-avoid">
                <div className="flex justify-between font-bold text-xs text-zinc-900">
                  <span>{job.title} – <span className="font-semibold text-zinc-600">{job.company}</span></span>
                  <span className="text-[11px] font-normal text-zinc-500">{job.date.start} – {job.date.end || "Present"}</span>
                </div>
                {job.bullets && job.bullets.length > 0 && (
                  <ul className="mt-1 list-disc pl-4 text-xs text-zinc-700 space-y-0.5">
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
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">Education</h2>
          <div className="space-y-1.5 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between font-semibold text-zinc-900 break-inside-avoid">
                <span>{edu.degree} – {edu.school}</span>
                <span className="font-normal text-zinc-500">{edu.date.start} – {edu.date.end || "Present"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5 text-zinc-900">Languages</h2>
          <p className="text-xs text-zinc-700">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
        </section>
      )}
    </main>
  );
}
