import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'about',
  description: 'Learn more about me',
  execute: () => [
    { variant: 'node', node: { kind: 'profile-card' } },
    ...profile.bio.map((line) => ({ variant: 'text' as const, content: line })),
  ],
});
