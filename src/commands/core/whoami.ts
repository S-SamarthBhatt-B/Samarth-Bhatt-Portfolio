import { registerCommand } from '@/commands/registry';
import { PROMPT_USER } from '@/constants/prompt';

registerCommand({
  name: 'whoami',
  description: 'Display the current user',
  execute: () => [
    { variant: 'text', content: PROMPT_USER },
    { variant: 'node', node: { kind: 'profile-card' } },
  ],
});
