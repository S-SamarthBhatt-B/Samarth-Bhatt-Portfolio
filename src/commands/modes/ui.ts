import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'ui',
  aliases: ['web'],
  description: 'Launch the desktop portfolio',
  execute: (ctx) => {
    ctx.pushOutput([{ variant: 'success', content: 'Booting the SamarthOS desktop...' }]);
    ctx.enterGuiMode();
  },
});
