import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'contact',
  description: 'Get in touch with me',
  execute: () => [
    { variant: 'muted', content: 'Contact details:' },
    { variant: 'node', node: { kind: 'contact-card' } },
  ],
});
