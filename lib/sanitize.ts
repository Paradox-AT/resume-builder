import type { ResumeData, WorkExperience, Education, Skill, SectionTitles } from "@/types";

/**
 * Sanitizes any raw object/JSON data into a fully-conforming ResumeData object.
 * Ensures arrays, strings, and nested properties have safe fallback defaults
 * to prevent runtime crashes (e.g. missing bullets, undefined skills).
 */
export function sanitizeResumeData(raw: unknown): ResumeData {
  if (!raw || typeof raw !== "object") {
    return createEmptyResumeData();
  }

  const data = raw as Record<string, unknown>;

  const personalInfoRaw = (data.personalInfo && typeof data.personalInfo === "object"
    ? data.personalInfo
    : {}) as Record<string, unknown>;

  const personalInfo = {
    name: typeof personalInfoRaw.name === "string" ? personalInfoRaw.name : "Your Name",
    role: typeof personalInfoRaw.role === "string" ? personalInfoRaw.role : "Your Role / Title",
    avatarInitials: typeof personalInfoRaw.avatarInitials === "string" ? personalInfoRaw.avatarInitials : undefined,
    profilePhotoUrl: typeof personalInfoRaw.profilePhotoUrl === "string" ? personalInfoRaw.profilePhotoUrl : undefined,
  };

  const summary = typeof data.summary === "string" ? data.summary : "";

  const sectionTitlesRaw = (data.sectionTitles && typeof data.sectionTitles === "object"
    ? data.sectionTitles
    : {}) as Record<string, unknown>;

  const sectionTitles: SectionTitles = {
    summary: typeof sectionTitlesRaw.summary === "string" ? sectionTitlesRaw.summary : undefined,
    workHistory: typeof sectionTitlesRaw.workHistory === "string" ? sectionTitlesRaw.workHistory : undefined,
    education: typeof sectionTitlesRaw.education === "string" ? sectionTitlesRaw.education : undefined,
    skills: typeof sectionTitlesRaw.skills === "string" ? sectionTitlesRaw.skills : undefined,
    languages: typeof sectionTitlesRaw.languages === "string" ? sectionTitlesRaw.languages : undefined,
  };

  const contactRaw = (data.contact && typeof data.contact === "object"
    ? data.contact
    : {}) as Record<string, unknown>;

  const contact = {
    phone: typeof contactRaw.phone === "string" ? contactRaw.phone : "",
    email: typeof contactRaw.email === "string" ? contactRaw.email : "",
    linkedin: typeof contactRaw.linkedin === "string" ? contactRaw.linkedin : "",
    github: typeof contactRaw.github === "string" ? contactRaw.github : "",
    address: typeof contactRaw.address === "string" ? contactRaw.address : undefined,
  };

  const workHistory = Array.isArray(data.workHistory)
    ? data.workHistory.map((item, idx) => sanitizeWorkExperience(item, idx))
    : [];

  const education = Array.isArray(data.education)
    ? data.education.map((item, idx) => sanitizeEducation(item, idx))
    : [];

  const skills = Array.isArray(data.skills)
    ? data.skills.map((item) => sanitizeSkill(item))
    : [];

  const languages = Array.isArray(data.languages)
    ? data.languages.map((item) => sanitizeSkill(item))
    : [];

  return {
    personalInfo,
    summary,
    sectionTitles,
    contact,
    workHistory,
    education,
    skills,
    languages,
  };
}

function sanitizeWorkExperience(item: unknown, idx: number): WorkExperience {
  if (!item || typeof item !== "object") {
    return {
      id: `work-${Date.now()}-${idx}`,
      date: { start: "", end: "" },
      title: "Position Title",
      company: "Company Name",
      bullets: [],
    };
  }

  const obj = item as Record<string, unknown>;
  const dateRaw = (obj.date && typeof obj.date === "object" ? obj.date : {}) as Record<string, unknown>;

  return {
    id: typeof obj.id === "string" && obj.id ? obj.id : `work-${Date.now()}-${idx}`,
    date: {
      start: typeof dateRaw.start === "string" ? dateRaw.start : "",
      end: typeof dateRaw.end === "string" ? dateRaw.end : "",
    },
    title: typeof obj.title === "string" ? obj.title : "",
    company: typeof obj.company === "string" ? obj.company : "",
    bullets: Array.isArray(obj.bullets)
      ? obj.bullets.map((b) => (typeof b === "string" ? b : String(b)))
      : [],
  };
}

function sanitizeEducation(item: unknown, idx: number): Education {
  if (!item || typeof item !== "object") {
    return {
      id: `edu-${Date.now()}-${idx}`,
      date: { start: "", end: "" },
      degree: "Degree / Certificate",
      school: "Institution Name",
    };
  }

  const obj = item as Record<string, unknown>;
  const dateRaw = (obj.date && typeof obj.date === "object" ? obj.date : {}) as Record<string, unknown>;

  return {
    id: typeof obj.id === "string" && obj.id ? obj.id : `edu-${Date.now()}-${idx}`,
    date: {
      start: typeof dateRaw.start === "string" ? dateRaw.start : "",
      end: typeof dateRaw.end === "string" ? dateRaw.end : "",
    },
    degree: typeof obj.degree === "string" ? obj.degree : "",
    school: typeof obj.school === "string" ? obj.school : "",
  };
}

function sanitizeSkill(item: unknown): Skill {
  if (!item || typeof item !== "object") {
    return { name: "Skill", level: 3 };
  }

  const obj = item as Record<string, unknown>;
  const name = typeof obj.name === "string" ? obj.name : "Skill";
  let level = typeof obj.level === "number" ? Math.round(obj.level) : 3;
  if (level < 1) level = 1;
  if (level > 5) level = 5;

  return { name, level };
}

export function createEmptyResumeData(): ResumeData {
  return {
    personalInfo: {
      name: "Your Name",
      role: "Your Professional Role",
    },
    summary: "",
    sectionTitles: {
      summary: "Professional Summary",
      workHistory: "Work Experience",
      education: "Education",
      skills: "Skills & Qualifications",
      languages: "Languages",
    },
    contact: {
      phone: "",
      email: "",
      linkedin: "",
      github: "",
    },
    workHistory: [],
    education: [],
    skills: [],
    languages: [],
  };
}
