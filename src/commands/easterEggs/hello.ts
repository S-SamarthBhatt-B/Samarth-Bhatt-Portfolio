import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'hello',
  description: 'Say hello',
  hidden: true,
  execute: () => [
    { variant: 'text', content: 'Hey there! Thanks for exploring SamarthOS.' },
    { variant: 'muted', content: 'Type "help" if you get lost.' },
  ],
});
