import { registerCommand, getVisibleCommands } from '@/commands/registry';

registerCommand({
  name: 'help',
  description: 'List all available commands',
  execute: () => {
    const rows = getVisibleCommands().map((c) => ({ command: c.name, description: c.description }));
    return [
      { variant: 'muted', content: 'Available commands:' },
      { variant: 'node', node: { kind: 'help-table', rows } },
    ];
  },
});
