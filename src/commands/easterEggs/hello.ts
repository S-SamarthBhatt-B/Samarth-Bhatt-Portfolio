import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'hello',
  aliases: ['whoareyou'],
  description: 'Say hello',
  hidden: true,
  execute: () => [
    { variant: 'success', content: 'Hello, visitor. SamarthOS is online.' },
    { variant: 'muted', content: 'Type "help" if you get lost.' },
  ],
});
