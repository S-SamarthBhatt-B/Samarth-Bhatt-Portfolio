import { registerCommand } from '@/commands/registry';
import { PROMPT_USER } from '@/constants/prompt';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'whoami',
  description: 'Display the current user',
  execute: () => [
    { variant: 'text', content: PROMPT_USER },
    { variant: 'muted', content: `This terminal belongs to ${profile.name} — ${profile.title}.` },
  ],
});
