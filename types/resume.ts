export interface ContactInfo {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  address?: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface WorkExperience {
  id: string;
  date: DateRange;
  title: string;
  company: string;
  bullets: string[];
}

export interface Education {
  id: string;
  date: DateRange;
  degree: string;
  school: string;
}

export interface Skill {
  name: string;
  level: number; // 1 to 5 scale
}

export interface ResumeData {
  personalInfo: {
    name: string;
    role: string;
    avatarInitials?: string;
    profilePhotoUrl?: string;
  };
  summary: string;
  contact: ContactInfo;
  workHistory: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Skill[];
}
