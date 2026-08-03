import { registerCommand } from '@/commands/registry';
import { projects } from '@/constants/projects';

registerCommand({
  name: 'projects',
  description: 'List my projects (try "projects 1" for details)',
  execute: (ctx) => {
    const arg = ctx.args[0];

    if (arg) {
      const index = parseInt(arg, 10) - 1;
      const project = projects[index];
      if (!project || Number.isNaN(index)) {
        return [
          { variant: 'error', content: `No project #${arg}.` },
          { variant: 'muted', content: 'Type "projects" to see the list.' },
        ];
      }
      return [{ variant: 'node', node: { kind: 'project-detail', projectId: project.id } }];
    }

    return [
      { variant: 'muted', content: 'Projects:' },
      { variant: 'node', node: { kind: 'project-list', projectIds: projects.map((p) => p.id) } },
    ];
  },
});
