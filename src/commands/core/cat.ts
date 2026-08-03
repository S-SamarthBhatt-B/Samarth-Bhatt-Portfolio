import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'cat',
  description: 'Print a portfolio file',
  execute: (ctx) => {
    const target = ctx.args[0]?.toLowerCase();
    if (!target) {
      return [{ variant: 'muted', content: 'Usage: cat <file>' }];
    }

    const files: Record<string, string> = {
      about: 'Samarth is a data-driven builder who enjoys turning messy information into polished insight.',
      resume: 'Resume is available via the resume command.',
      projects: 'Projects are available via the projects command.',
      skills: 'Skills are available via the skills command.',
      contact: 'Contact details are available via the contact command.',
    };

    const value = files[target];
    return value ? [{ variant: 'text', content: value }] : [{ variant: 'error', content: `File not found: ${target}` }];
  },
});
