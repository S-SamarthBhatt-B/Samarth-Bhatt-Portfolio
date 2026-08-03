import { registerCommand } from '@/commands/registry';
import { projects } from '@/constants/projects';

registerCommand({
  name: 'stats',
  aliases: ['techstack', 'certifications'],
  description: 'Show quick project and stack stats',
  execute: () => {
    const stack = Array.from(new Set(projects.flatMap((project) => project.stack))).sort();
    return [
      { variant: 'success', content: `Projects tracked: ${projects.length}` },
      { variant: 'muted', content: `Stack coverage: ${stack.length} technologies` },
      { variant: 'text', content: `Core stack: ${stack.slice(0, 10).join(', ')}` },
    ];
  },
});
