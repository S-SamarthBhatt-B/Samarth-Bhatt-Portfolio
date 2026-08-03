import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'name',
  description: 'Show my full name',
  execute: () => [{ variant: 'success', content: profile.name }],
});
