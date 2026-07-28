import "@/styles/ats.css";
import type { ResumeData } from "@/types";

interface AtsStandardProps {
  data: ResumeData;
}

export default function AtsStandard({ data }: AtsStandardProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;

  return (
    <main id="main-content" className="ats-layout mx-auto flex flex-col w-[794px] max-w-full min-h-[1123px] bg-[var(--bg-color)] px-8 py-8 text-[var(--text-primary)] antialiased shadow-[var(--shadow)] print:w-full print:min-h-0 print:shadow-none print:px-6 print:py-4 theme-ats-standard">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[var(--bg-color)] focus:p-4 focus:text-[var(--text-primary)] focus:outline focus:outline-2"
      >
        Skip to main content
      </a>

      {/* HEADER */}
      <header className="border-b border-[var(--border-color)] pb-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{personalInfo.name}</h1>
        <p className="ats-role mt-1 text-base font-medium sm:text-lg">{personalInfo.role}</p>

        {/* Contact Info Row */}
        <div className="mt-2.5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-[var(--text-secondary)] sm:text-sm">
          <div>
            <span className="font-semibold text-[var(--text-primary)]">Phone: </span>
            {contact.phone}
          </div>
          <div>
            <span className="font-semibold text-[var(--text-primary)]">Email: </span>
            <a href={`mailto:${contact.email}`} className="hover:underline">
              {contact.email}
            </a>
          </div>
          <div>
            <span className="font-semibold text-[var(--text-primary)]">LinkedIn: </span>
            <a
              href={`https://${contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {contact.linkedin}
            </a>
          </div>
          <div>
            <span className="font-semibold text-[var(--text-primary)]">GitHub: </span>
            <a
              href={`https://${contact.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {contact.github}
            </a>
          </div>
        </div>
      </header>

      {/* SUMMARY */}
      <section className="mt-4" aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="text-xs font-bold uppercase tracking-wider sm:text-sm">
          Professional Summary
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">{summary}</p>
      </section>

      {/* WORK HISTORY */}
      <section className="mt-4" aria-labelledby="work-heading">
        <h2 id="work-heading" className="border-b-2 pb-1 text-xs font-bold uppercase tracking-wider sm:text-sm">
          Work History
        </h2>
        <div className="mt-2.5 flex flex-col gap-3">
          {workHistory.map((job) => (
            <article key={job.id} className="break-inside-avoid">
              <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                <h3 className="text-sm font-bold sm:text-base">
                  {job.title} – <span className="font-medium text-[var(--text-secondary)]">{job.company}</span>
                </h3>
                <span className="text-xs font-semibold text-[var(--text-muted)]">{job.date.start} – {job.date.end}</span>
              </div>
              <ul className="mt-1 list-disc pl-4 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
                {job.bullets.map((bullet, idx) => (
                  <li key={idx} className="mt-0.5 first:mt-0 break-inside-avoid">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="mt-4" aria-labelledby="education-heading">
        <h2 id="education-heading" className="border-b-2 pb-1 text-xs font-bold uppercase tracking-wider sm:text-sm">
          Education
        </h2>
        <div className="mt-2.5 flex flex-col gap-2.5">
          {education.map((edu) => (
            <article key={edu.id} className="break-inside-avoid">
              <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                <h3 className="text-sm font-bold sm:text-base">
                  {edu.degree}
                </h3>
                <span className="text-xs font-semibold text-[var(--text-muted)]">{edu.date.start} – {edu.date.end}</span>
              </div>
              <p className="mt-0.5 text-xs font-medium text-[var(--text-secondary)] sm:text-sm">{edu.school}</p>
            </article>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="mt-4" aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="border-b-2 pb-1 text-xs font-bold uppercase tracking-wider sm:text-sm">
          Skills
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
          {skills.map((skill) => skill.name).join(" • ")}
        </p>
      </section>

      {/* LANGUAGES */}
      <section className="mt-4" aria-labelledby="languages-heading">
        <h2 id="languages-heading" className="border-b-2 pb-1 text-xs font-bold uppercase tracking-wider sm:text-sm">
          Languages
        </h2>
        <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-secondary)] sm:text-sm">
          {languages.map((lang) => lang.name).join(" • ")}
        </p>
      </section>
    </main>
  );
}
