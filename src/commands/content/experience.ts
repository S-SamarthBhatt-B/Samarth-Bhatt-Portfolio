import { registerCommand } from '@/commands/registry';
import { experience } from '@/constants/experience';

registerCommand({
  name: 'experience',
  description: 'My work and training experience',
  execute: () =>
    experience.flatMap((e) => [
      { variant: 'success' as const, content: `${e.role} — ${e.organization}` },
      { variant: 'muted' as const, content: e.period },
      ...e.points.map((point) => ({ variant: 'text' as const, content: `• ${point}` })),
    ]),
});
