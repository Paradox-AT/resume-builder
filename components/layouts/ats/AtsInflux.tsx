import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsInfluxProps {
  data: ResumeData;
}

export default function AtsInflux({ data }: AtsInfluxProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] p-8 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:p-6 theme-ats-influx">
      {/* HEADER BANNER */}
      <header className="border-b-2 border-zinc-900 pb-4 mb-4 text-center">
        <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900">{personalInfo.name}</h1>
        <p className="text-sm font-bold text-zinc-600 uppercase tracking-widest mt-1">{personalInfo.role}</p>
        <div className="mt-2 text-xs font-semibold text-zinc-500 flex flex-wrap justify-center gap-x-3">
          {contact.phone && <span>{contact.phone}</span>}
          {contact.email && <span>• {contact.email}</span>}
          {contact.linkedin && <span>• {contact.linkedin}</span>}
          {contact.github && <span>• {contact.github}</span>}
          {contact.address && <span>• {contact.address}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider bg-zinc-100 p-1.5 mb-2 text-zinc-900">Summary</h2>
          <p className="text-xs leading-relaxed text-zinc-700">{summary}</p>
        </section>
      )}

      {workHistory && workHistory.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider bg-zinc-100 p-1.5 mb-3 text-zinc-900">Experience</h2>
          <div className="space-y-4">
            {workHistory.map((job) => (
              <article key={job.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold text-sm text-zinc-900">
                  <span>{job.title} – <span className="font-semibold text-zinc-600">{job.company}</span></span>
                  <span className="text-xs text-zinc-500">{job.date.start} – {job.date.end || "Present"}</span>
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
        <section className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider bg-zinc-100 p-1.5 mb-2 text-zinc-900">Education</h2>
          <div className="space-y-2 text-xs">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline font-semibold break-inside-avoid">
                <span>{edu.degree} – {edu.school}</span>
                <span className="text-zinc-500">{edu.date.start} – {edu.date.end || "Present"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-black uppercase tracking-wider bg-zinc-100 p-1.5 mb-2 text-zinc-900">Skills</h2>
          <p className="text-xs text-zinc-700">{skills.map((s) => s.name).join(" • ")}</p>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section>
          <h2 className="text-xs font-black uppercase tracking-wider bg-zinc-100 p-1.5 mb-2 text-zinc-900">Languages</h2>
          <p className="text-xs text-zinc-700">{languages.map((l) => `${l.name} (${l.level}/5)`).join(" • ")}</p>
        </section>
      )}
    </main>
  );
}
