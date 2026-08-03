import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'pwd',
  description: 'Print the current working directory',
  execute: () => [{ variant: 'success', content: '/home/samarth' }],
});
