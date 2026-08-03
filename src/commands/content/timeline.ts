import { registerCommand } from '@/commands/registry';
import { education } from '@/constants/education';
import { experience } from '@/constants/experience';
import type { TerminalOutputLine } from '@/types/terminal.types';

registerCommand({
  name: 'timeline',
  description: 'Show my education and experience timeline',
  execute: () => {
    const lines: Array<Omit<TerminalOutputLine, 'id'>> = [
      { variant: 'muted', content: 'Timeline:' },
      ...education.flatMap((entry) => [
        { variant: 'success' as const, content: `${entry.degree} — ${entry.institution}` },
        { variant: 'muted' as const, content: entry.period },
      ]),
      ...experience.flatMap((entry) => [
        { variant: 'success' as const, content: `${entry.role} — ${entry.organization}` },
        { variant: 'muted' as const, content: entry.period },
      ]),
    ];

    return lines;
  },
});
