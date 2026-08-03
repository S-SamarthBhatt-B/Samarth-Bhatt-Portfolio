import { registerCommand } from '@/commands/registry';
import { education } from '@/constants/education';

registerCommand({
  name: 'education',
  description: 'My educational background',
  execute: () =>
    education.flatMap((e) => [
      { variant: 'success' as const, content: e.degree },
      { variant: 'muted' as const, content: `${e.institution} — ${e.period}` },
      ...(e.detail ? [{ variant: 'text' as const, content: e.detail }] : []),
    ]),
});
