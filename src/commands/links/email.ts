import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'email',
  description: 'Show my email address',
  execute: () => [
    { variant: 'success', content: profile.email },
    { variant: 'muted', content: 'Type "contact" for all my details.' },
  ],
});
