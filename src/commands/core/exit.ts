import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'exit',
  description: 'Shut down SamarthOS',
  execute: (ctx) => {
    ctx.triggerShutdown();
  },
});
