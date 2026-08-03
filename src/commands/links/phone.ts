import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'phone',
  description: 'Show my phone number',
  execute: () => [
    { variant: 'success', content: profile.phone },
    { variant: 'muted', content: 'Type "contact" for all my details.' },
  ],
});
