import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'ls',
  description: 'List available portfolio directories',
  execute: () => [
    { variant: 'muted', content: 'about  education  experience  projects  resume  skills  socials' },
  ],
});
