import { registerCommand } from '@/commands/registry';
import { skillGroups } from '@/constants/skills';

registerCommand({
  name: 'skills',
  description: 'View my technical skills',
  execute: () => [
    { variant: 'muted', content: 'Technical Skills:' },
    { variant: 'node', node: { kind: 'skills-table', groups: skillGroups } },
  ],
});
