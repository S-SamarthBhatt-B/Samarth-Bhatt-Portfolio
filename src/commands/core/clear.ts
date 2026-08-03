import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'clear',
  aliases: ['cls'],
  description: 'Clear the terminal screen',
  execute: (ctx) => {
    ctx.clearScreen();
  },
});
