import { registerCommand } from '@/commands/registry';

const helpGroups = [
  {
    title: 'Core',
    rows: [
      { command: 'help', description: 'Show this overview' },
      { command: 'clear / cls', description: 'Clear the terminal' },
      { command: 'date / time', description: 'Show current date or time' },
      { command: 'whoami / pwd', description: 'Show identity or current path' },
      { command: 'ls / cat', description: 'List files or print file content' },
      { command: 'exit', description: 'Shut down the shell' },
    ],
  },
  {
    title: 'Portfolio',
    rows: [
      { command: 'about / name', description: 'Introduce Samarth' },
      { command: 'skills', description: 'View my toolchain' },
      { command: 'projects', description: 'Show featured work' },
      { command: 'education', description: 'Academic background' },
      { command: 'experience', description: 'Career and training history' },
      { command: 'resume', description: 'Download my resume' },
      { command: 'timeline', description: 'See the roadmap' },
      { command: 'stats / techstack / certifications', description: 'Snapshot metrics' },
    ],
  },
  {
    title: 'Links',
    rows: [
      { command: 'github / gh', description: 'Open GitHub' },
      { command: 'linkedin / li', description: 'Open LinkedIn' },
      { command: 'contact', description: 'View contact details' },
      { command: 'email', description: 'Compose an email' },
      { command: 'socials', description: 'Show social links' },
      { command: 'phone', description: 'Show phone number' },
    ],
  },
  {
    title: 'Modes',
    rows: [
      { command: 'ui / web', description: 'Launch the desktop experience' },
      { command: 'theme', description: 'Show the current visual profile' },
    ],
  },
  {
    title: 'Easter Eggs',
    rows: [
      { command: 'coffee', description: 'Brew a virtual coffee' },
      { command: 'matrix', description: 'Enter the simulation' },
      { command: 'fortune', description: 'Read a developer fortune' },
      { command: 'hack', description: 'Run a playful intrusion' },
      { command: 'sudo', description: 'Prompt for superuser privileges' },
      { command: 'hello / whoareyou', description: 'Say hello' },
    ],
  },
];

registerCommand({
  name: 'help',
  description: 'List all available commands',
  execute: () => [
    { variant: 'muted', content: 'Available commands:' },
    { variant: 'node', node: { kind: 'help-groups', groups: helpGroups } },
  ],
});
