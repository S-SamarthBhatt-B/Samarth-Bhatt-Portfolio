import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'theme',
  description: 'Show the current visual theme',
  execute: () => [
    { variant: 'success', content: 'Theme: SamarthOS Dark' },
    { variant: 'muted', content: 'Accent: terminal green · UI: glass + subtle scanlines' },
  ],
});
