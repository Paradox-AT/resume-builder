import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsCompactProps {
  data: ResumeData;
}

export default function AtsCompact({ data }: AtsCompactProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-6 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-4 text-xs theme-ats-compact">
      <header className="border-b border-zinc-300 pb-2 mb-3 flex justify-between items-baseline flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{personalInfo.name} <span className="font-normal text-zinc-600 text-sm">| {personalInfo.role}</span></h1>
        </div>
        <div className="text-[11px] text-zinc-500 flex flex-wrap gap-x-2">
          {contact.phone && <span>{contact.phone}</span>}
          {contact.email && <span>• {contact.email}</span>}
          {contact.linkedin && <span>• {contact.linkedin}</span>}
          {contact.github && <span>• {contact.github}</span>}
          {contact.address && <span>• {contact.address}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-3">
          <p className="text-[11px] leading-relaxed text-zinc-700">{summary}</p>
        </section>
      )}

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-3">
          {workHistory && workHistory.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-2">Work Experience</h2>
              <div className="space-y-3">
                {workHistory.map((job) => (
                  <article key={job.id} className="break-inside-avoid">
                    <div className="flex justify-between font-bold text-[11px]">
                      <span>{job.title} – <span className="font-semibold text-zinc-600">{job.company}</span></span>
                      <span className="text-[10px] text-zinc-500 font-normal">{job.date.start} – {job.date.end || "Present"}</span>
                    </div>
                    {job.bullets && job.bullets.length > 0 && (
                      <ul className="list-disc pl-3 mt-0.5 text-[11px] text-zinc-700 space-y-0.5">
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
        </div>

        <div className="space-y-3">
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5">Technical Skills</h2>
              <p className="text-[11px] text-zinc-700 leading-relaxed">{skills.map((s) => s.name).join(", ")}</p>
            </section>
          )}

          {education && education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5">Education</h2>
              <div className="space-y-2 text-[11px]">
                {education.map((edu) => (
                  <div key={edu.id} className="break-inside-avoid">
                    <div className="font-bold">{edu.degree}</div>
                    <div className="text-zinc-600">{edu.school}</div>
                    <div className="text-[10px] text-zinc-500">{edu.date.start} – {edu.date.end || "Present"}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section>
              <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-zinc-300 pb-0.5 mb-1.5">Languages</h2>
              <p className="text-[11px] text-zinc-700 leading-relaxed">{languages.map((l) => `${l.name} (${l.level}/5)`).join(", ")}</p>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
