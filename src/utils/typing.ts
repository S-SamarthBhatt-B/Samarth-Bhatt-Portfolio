export const DEFAULT_TYPING_SPEED = 50;

export const COMMAND_TYPING_SPEED: Record<string, number> = {
  help: 60,
  about: 45,
  skills: 55,
  projects: 40,
  resume: 55,
  error: 80,
  boot: 25,
  ai: 35,
};

const ALWAYS_TYPEWRITER_COMMANDS = new Set<string>([
  'help',
  'about',
  'skills',
  'projects',
  'education',
  'experience',
  'timeline',
  'contact',
  'socials',
  'techstack',
  'certifications',
  'stats',
  'whoami',
  'pwd',
  'ls',
  'cat',
  'date',
  'time',
  'theme',
]);

const NON_TYPEWRITER_COMMANDS = new Set<string>([
  'clear',
  'exit',
  'ui',
  'web',
  'matrix',
  'coffee',
  'fortune',
  'hack',
  'sudo',
  'hello',
  'whoareyou',
]);

export function getTypingSpeed(commandName?: string, variant?: string): number {
  const normalizedCommand = commandName?.toLowerCase() ?? '';
  if (variant === 'error') return COMMAND_TYPING_SPEED.error;
  if (normalizedCommand && COMMAND_TYPING_SPEED[normalizedCommand]) {
    return COMMAND_TYPING_SPEED[normalizedCommand];
  }
  return DEFAULT_TYPING_SPEED;
}

export function shouldUseTypewriter(commandName?: string, variant?: string): boolean {
  const normalizedCommand = commandName?.toLowerCase() ?? '';
  if (!normalizedCommand) return true;
  if (NON_TYPEWRITER_COMMANDS.has(normalizedCommand)) return false;
  if (ALWAYS_TYPEWRITER_COMMANDS.has(normalizedCommand)) return true;
  if (variant === 'error') return true;
  return true;
}
