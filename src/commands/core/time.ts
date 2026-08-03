import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'time',
  description: 'Show the current time',
  execute: () => [{ variant: 'text', content: new Date().toLocaleTimeString() }],
});
