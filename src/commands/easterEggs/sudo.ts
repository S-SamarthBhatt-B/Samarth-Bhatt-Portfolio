import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'sudo',
  description: 'Try to gain root access',
  hidden: true,
  execute: (ctx) => {
    const rest = ctx.args.join(' ');
    return [
      {
        variant: 'error',
        content: `Nice try${rest ? ` with "${rest}"` : ''}. This isn't Linux — permission denied.`,
      },
    ];
  },
});
