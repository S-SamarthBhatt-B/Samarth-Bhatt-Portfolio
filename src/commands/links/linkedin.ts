import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'linkedin',
  aliases: ['li'],
  description: 'Open my LinkedIn profile',
  execute: () => {
    const url = profile.socials.find((s) => s.label === 'LinkedIn')?.url ?? '';
    window.open(url, '_blank', 'noopener,noreferrer');
    return [{ variant: 'node', node: { kind: 'link', label: 'LinkedIn', url } }];
  },
});
