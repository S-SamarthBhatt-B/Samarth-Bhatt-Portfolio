import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'ui',
  aliases: ['web'],
  description: 'Launch the graphical portfolio',
  execute: (ctx) => {
    ctx.pushOutput([{ variant: 'success', content: 'Launching graphical interface...' }]);
    ctx.enterGuiMode();
  },
});
