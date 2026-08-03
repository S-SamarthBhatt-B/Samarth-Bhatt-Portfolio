import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'date',
  description: 'Show the current date and time',
  execute: () => [{ variant: 'text', content: new Date().toString() }],
});
