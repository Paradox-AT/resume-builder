import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsMinimalProps {
  data: ResumeData;
}

export default function AtsMinimal({ data }: AtsMinimalProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-10 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-minimal">
      <div className="border-l-4 border-zinc-900 pl-6 space-y-6">
        <header>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{personalInfo.name}</h1>
          <p className="text-base font-semibold text-zinc-600 mt-0.5">{personalInfo.role}</p>
          <div className="mt-2 text-xs font-medium text-zinc-500 flex flex-wrap gap-x-3 gap-y-1">
            {contact.phone && <span>{contact.phone}</span>}
            {contact.email && <span>• {contact.email}</span>}
            {contact.linkedin && <span>• {contact.linkedin}</span>}
            {contact.github && <span>• {contact.github}</span>}
            {contact.address && <span>• {contact.address}</span>}
          </div>
        </header>

        {summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Summary</h2>
            <p className="text-xs leading-relaxed text-zinc-700">{summary}</p>
          </section>
        )}

        {workHistory && workHistory.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">Experience</h2>
            <div className="space-y-4">
              {workHistory.map((job) => (
                <article key={job.id} className="break-inside-avoid">
                  <div className="flex justify-between items-baseline font-bold text-sm text-zinc-900">
                    <span>{job.title} – <span className="font-semibold text-zinc-600">{job.company}</span></span>
                    <span className="text-xs font-medium text-zinc-500">{job.date.start} – {job.date.end || "Present"}</span>
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
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Education</h2>
            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between font-semibold text-zinc-900 break-inside-avoid">
                  <span>{edu.degree} – <span className="font-normal text-zinc-600">{edu.school}</span></span>
                  <span className="text-zinc-500 font-normal">{edu.date.start} – {edu.date.end || "Present"}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Skills</h2>
            <p className="text-xs text-zinc-700 leading-relaxed">{skills.map((s) => s.name).join(" • ")}</p>
          </section>
        )}

        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Languages</h2>
            <p className="text-xs text-zinc-700 leading-relaxed">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
          </section>
        )}
      </div>
    </main>
  );
}
