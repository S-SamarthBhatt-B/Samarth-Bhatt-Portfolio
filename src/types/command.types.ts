export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  period: string;
  points: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  period: string;
  detail?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  handle: string;
}
