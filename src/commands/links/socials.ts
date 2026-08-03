import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'socials',
  description: 'View all my social links',
  execute: () => [
    { variant: 'muted', content: 'Find me here:' },
    ...profile.socials.map((s) => ({
      variant: 'node' as const,
      node: { kind: 'link' as const, label: s.label, url: s.url },
    })),
  ],
});
