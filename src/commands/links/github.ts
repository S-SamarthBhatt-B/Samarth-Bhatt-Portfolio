import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'github',
  aliases: ['gh'],
  description: 'Open my GitHub profile',
  execute: () => {
    const url = profile.socials.find((s) => s.label === 'GitHub')?.url ?? '';
    window.open(url, '_blank', 'noopener,noreferrer');
    return [{ variant: 'node', node: { kind: 'link', label: 'GitHub', url } }];
  },
});
