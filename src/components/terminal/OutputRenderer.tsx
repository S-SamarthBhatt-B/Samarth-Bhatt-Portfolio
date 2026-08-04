import type { TerminalOutputNode } from '@/types/terminal.types';
import { projects } from '@/constants/projects';
import { profile } from '@/constants/profile';
import CopyButton from '@/components/shared/CopyButton';

interface OutputRendererProps {
  node: TerminalOutputNode;
}

/**
 * Renders every TerminalOutputNode kind defined in terminal.types.ts.
 * Commands stay data-only (they return a `{ kind, ... }` payload); all
 * presentation lives here, so adding a new command never means writing new JSX.
 */
export default function OutputRenderer({ node }: OutputRendererProps) {
  switch (node.kind) {
    case 'ascii':
      return <pre className="whitespace-pre font-mono text-xs text-os-accent text-glow sm:text-sm">{node.art}</pre>;

    case 'help-table':
      return (
        <div className="my-1 grid grid-cols-[minmax(84px,auto)_1fr] gap-x-4 gap-y-1 font-mono text-sm">
          {node.rows.map((row) => (
            <div key={row.command} className="contents">
              <span className="text-os-accent">{row.command}</span>
              <span className="text-os-muted">{row.description}</span>
            </div>
          ))}
        </div>
      );

    case 'help-groups':
      return (
        <div className="my-2 space-y-3 font-mono text-sm">
          {node.groups.map((group) => (
            <div key={group.title} className="rounded-lg border border-os-border/50 bg-black/20 p-3">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-os-accent">{group.title}</p>
              <div className="grid grid-cols-[minmax(84px,auto)_1fr] gap-x-4 gap-y-1">
                {group.rows.map((row) => (
                  <div key={row.command} className="contents">
                    <span className="text-os-accent">{row.command}</span>
                    <span className="text-os-muted">{row.description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case 'skills-table':
      return (
        <div className="my-1 space-y-2 font-mono text-sm">
          {node.groups.map((group) => (
            <div key={group.category}>
              <p className="text-os-accent">{group.category}</p>
              <p className="text-os-muted">{group.items.join(', ')}</p>
            </div>
          ))}
        </div>
      );

    case 'project-list':
      return (
        <ul className="my-1 space-y-1 font-mono text-sm">
          {node.projectIds.map((id, i) => {
            const project = projects.find((p) => p.id === id);
            if (!project) return null;
            return (
              <li key={id} className="text-os-text">
                <span className="text-os-accent">[{i + 1}]</span> {project.title}{' '}
                <span className="text-os-muted">— {project.tagline}</span>
              </li>
            );
          })}
          <li className="pt-1 text-os-muted">Type &quot;projects &lt;number&gt;&quot; to view details.</li>
        </ul>
      );

    case 'project-detail': {
      const project = projects.find((p) => p.id === node.projectId);
      if (!project) return <p className="font-mono text-sm text-os-error">Project not found.</p>;
      return (
        <div className="my-1 space-y-1 font-mono text-sm">
          <p className="text-base text-os-accent text-glow">{project.title}</p>
          <p className="text-os-muted">{project.tagline}</p>
          <p className="text-os-text">{project.description}</p>
          <p>
            <span className="text-os-muted">Stack: </span>
            {project.stack.join(', ')}
          </p>
          <ul className="list-inside list-disc text-os-text">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {project.githubUrl && (
            <p className="break-all">
              <span className="text-os-muted">GitHub: </span>
              <a className="text-os-accent underline" href={project.githubUrl} target="_blank" rel="noreferrer">
                {project.githubUrl}
              </a>
            </p>
          )}
          {project.demoUrl && (
            <p className="break-all">
              <span className="text-os-muted">Demo: </span>
              <a className="text-os-accent underline" href={project.demoUrl} target="_blank" rel="noreferrer">
                {project.demoUrl}
              </a>
            </p>
          )}
        </div>
      );
    }

    case 'link':
      return (
        <p className="break-all font-mono text-sm">
          <span className="text-os-muted">{node.label}: </span>
          <a className="text-os-accent underline" href={node.url} target="_blank" rel="noreferrer">
            {node.url}
          </a>
        </p>
      );

    case 'profile-card':
      return (
        <div className="my-1 flex items-center gap-3 font-mono text-sm sm:gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            width={64}
            height={64}
            className="h-14 w-14 flex-shrink-0 rounded-full border border-os-accent/40 object-cover shadow-glowSm sm:h-16 sm:w-16"
          />
          <div className="min-w-0">
            <p className="text-base text-os-accent text-glow sm:text-lg">{profile.name}</p>
            <p className="text-os-muted">{profile.title}</p>
            <p className="text-xs text-os-muted/80 sm:text-sm">{profile.tagline}</p>
          </div>
        </div>
      );

    case 'contact-card':
      return (
        <div className="my-1 space-y-1 break-all font-mono text-sm">
          <p className="flex items-center gap-1">
            <span className="text-os-muted">Email: </span>
            <a className="text-os-accent underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <CopyButton value={profile.email} label="Copy email" />
          </p>
          <p className="flex items-center gap-1">
            <span className="text-os-muted">Phone: </span>
            {profile.phone}
            <CopyButton value={profile.phone} label="Copy phone number" />
          </p>
          {profile.socials.map((s) => (
            <p key={s.label}>
              <span className="text-os-muted">{s.label}: </span>
              <a className="text-os-accent underline" href={s.url} target="_blank" rel="noreferrer">
                {s.handle}
              </a>
            </p>
          ))}
        </div>
      );

    default:
      return null;
  }
}
