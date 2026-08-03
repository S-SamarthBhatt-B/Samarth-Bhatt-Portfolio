export interface CommandLoaderConfig {
  message: string;
  duration: number;
  progress?: number;
  successMessage?: string;
}

const loaderConfigs: Record<string, CommandLoaderConfig> = {
  about: { message: 'Loading profile...', duration: 500, successMessage: '✔ Profile loaded successfully.' },
  skills: { message: 'Preparing skill matrix...', duration: 650, successMessage: '✔ Skill matrix ready.' },
  projects: { message: 'Scanning project database...', duration: 1000, successMessage: '✔ Project database loaded.' },
  education: { message: 'Gathering academic history...', duration: 600, successMessage: '✔ Education timeline ready.' },
  experience: { message: 'Reviewing experience log...', duration: 700, successMessage: '✔ Experience history loaded.' },
  timeline: { message: 'Building chronology...', duration: 750, successMessage: '✔ Timeline generated.' },
  resume: { message: 'Locating resume...', duration: 1800, successMessage: '✔ Resume ready for download.' },
  github: { message: 'Connecting to GitHub...', duration: 1200, successMessage: '✔ GitHub opened successfully.' },
  linkedin: { message: 'Connecting to LinkedIn...', duration: 1200, successMessage: '✔ LinkedIn opened successfully.' },
  email: { message: 'Preparing email contact...', duration: 700, successMessage: '✔ Email contact ready.' },
  contact: { message: 'Collecting contact details...', duration: 700, successMessage: '✔ Contact card ready.' },
  socials: { message: 'Resolving social channels...', duration: 650, successMessage: '✔ Social links ready.' },
  ui: { message: 'Initializing window manager...', duration: 2200, progress: 0, successMessage: '✔ Desktop ready.' },
  web: { message: 'Loading desktop experience...', duration: 2200, progress: 0, successMessage: '✔ Desktop ready.' },
};

export function getLoaderConfig(commandName: string): CommandLoaderConfig | null {
  return loaderConfigs[commandName.toLowerCase()] ?? null;
}
