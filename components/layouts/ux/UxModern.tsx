"use client";

import { useState } from "react";
import "@/styles/ux.css";
import type { ResumeData } from "@/types";
import { getInitials } from "@/lib";

interface UxModernProps {
  data: ResumeData;
}

export default function UxModern({ data }: UxModernProps) {
  const { personalInfo, summary, contact, workHistory, education, skills, languages } = data;
  const initials = personalInfo.avatarInitials || getInitials(personalInfo.name);
  const [imgError, setImgError] = useState(false);

  const hasPhoto = Boolean(personalInfo.profilePhotoUrl) && !imgError;

  return (
    <main id="main-content" className="page ux-layout mx-auto theme-ux-modern">
      {/* Fixed sidebar background element for multi-page print repeating */}
      <div className="print-sidebar-bg" aria-hidden="true" />

      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:p-4 focus:text-zinc-950 focus:outline focus:outline-2"
      >
        Skip to main content
      </a>

      {/* ═══════════ LEFT COLUMN ═══════════ */}
      <div className="col-left">
        {/* HEADER */}
        <header className="resume-header">
          <div className="avatar" aria-hidden="true">
            <span className="avatar-text">{initials}</span>
          </div>
          <div>
            <h1>{personalInfo.name}</h1>
            <div className="role">{personalInfo.role}</div>
          </div>
        </header>

        {/* PROFESSIONAL SUMMARY */}
        <section className="section" aria-labelledby="summary-heading">
          <div className="sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
              </svg>
            </div>
            <h2 id="summary-heading" className="sec-title">
              {data.sectionTitles?.summary || "Professional Summary"}
            </h2>
          </div>
          <p className="summary-text">{summary}</p>
        </section>

        {/* WORK HISTORY */}
        <section className="section" aria-labelledby="work-heading">
          <div className="sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
              </svg>
            </div>
            <h2 id="work-heading" className="sec-title">
              {data.sectionTitles?.workHistory || "Work History"}
            </h2>
          </div>

          <div className="work-list">
            {workHistory.map((job) => (
              <article key={job.id} className="work-item">
                <div className="wi-date">
                  {job.date.start} –<br />{job.date.end}
                </div>

                <div className="wi-track" aria-hidden="true">
                  <div className="wi-dot" />
                </div>

                <div className="wi-body">
                  <h3 className="wi-title">{job.title}</h3>
                  <div className="wi-company">{job.company}</div>
                  <ul className="wi-bullets">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section" aria-labelledby="education-heading">
          <div className="sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <h2 id="education-heading" className="sec-title">
              {data.sectionTitles?.education || "Education"}
            </h2>
          </div>

          {education.map((edu) => (
            <div key={edu.id} className="edu-item">
              <div className="edu-date">
                {edu.date.start} –<br />{edu.date.end}
              </div>
              <div className="edu-track" aria-hidden="true">
                <div className="edu-dot" />
              </div>
              <div className="edu-body">
                <h3 className="edu-degree">{edu.degree}</h3>
                <div className="edu-school">{edu.school}</div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ═══════════ RIGHT COLUMN ═══════════ */}
      <aside className="col-right" aria-label="Contact and skills information">
        {/* PROFILE PHOTO */}
        <div className="profile-photo-container">
          <div className="profile-photo-placeholder" aria-label="Profile photo" role="img">
            <svg viewBox="0 0 24 24" className="profile-photo-icon" aria-hidden="true">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            {hasPhoto && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={personalInfo.profilePhotoUrl}
                alt={personalInfo.name || "Profile Photo"}
                className="profile-photo-img"
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>

        {/* CONTACT */}
        <section className="r-section" aria-labelledby="contact-heading">
          <div className="r-sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <h2 id="contact-heading" className="r-sec-title">
              Contact
            </h2>
          </div>

          <div className="c-item">
            <div className="c-label">Phone</div>
            <div className="c-val">{contact.phone}</div>
          </div>
          <div className="c-item">
            <div className="c-label">E-mail</div>
            <div className="c-val">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
          <div className="c-item">
            <div className="c-label">LinkedIn</div>
            <div className="c-val">
              <a href={`https://${contact.linkedin}`} target="_blank" rel="noopener noreferrer">
                {contact.linkedin}
              </a>
            </div>
          </div>
          <div className="c-item">
            <div className="c-label">GitHub</div>
            <div className="c-val">
              <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer">
                {contact.github}
              </a>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="r-section" aria-labelledby="skills-heading">
          <div className="r-sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
              </svg>
            </div>
            <h2 id="skills-heading" className="r-sec-title">
              {data.sectionTitles?.skills || "Skills"}
            </h2>
          </div>

          {skills.map((skill) => (
            <div key={skill.name} className="sk-item">
              <span className="sk-name">{skill.name}</span>
              <div className="sk-dots" aria-label={`${skill.level} out of 5`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx < skill.level ? "on" : "off"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* LANGUAGES */}
        <section className="r-section" aria-labelledby="languages-heading">
          <div className="r-sec-head">
            <div className="ico" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
              </svg>
            </div>
            <h2 id="languages-heading" className="r-sec-title">
              {data.sectionTitles?.languages || "Languages"}
            </h2>
          </div>

          {languages.map((lang) => (
            <div key={lang.name} className="sk-item">
              <span className="sk-name">{lang.name}</span>
              <div className="sk-dots" aria-label={`${lang.level} out of 5`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${idx < lang.level ? "on" : "off"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>
      </aside>
    </main>
  );
}
