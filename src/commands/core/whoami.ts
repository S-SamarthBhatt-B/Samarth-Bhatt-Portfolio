import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'whoami',
  description: 'Display the current user',
  execute: () => [{ variant: 'node', node: { kind: 'profile-card' } }],
});
