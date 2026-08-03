import { registerCommand } from '@/commands/registry';
import { sleep } from '@/utils/sleep';

registerCommand({
  name: 'hack',
  description: 'Attempt to hack the mainframe',
  hidden: true,
  execute: async (ctx) => {
    const steps = ['Bypassing firewall...', 'Cracking encryption...', 'Accessing mainframe...'];
    for (const step of steps) {
      await sleep(500);
      ctx.pushOutput([{ variant: 'success', content: step }]);
    }
    await sleep(500);
    ctx.pushOutput([{ variant: 'error', content: 'Access denied. Nice try 😄' }]);
  },
});
