export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  features: string[];
  images?: string[];
  screenshots?: string[];
  githubUrl?: string;
  demoUrl?: string;
  /** Displayed as a status badge, e.g. "Completed", "In Progress". */
  status: 'completed' | 'in-progress' | 'ongoing';
  year: string;
}
