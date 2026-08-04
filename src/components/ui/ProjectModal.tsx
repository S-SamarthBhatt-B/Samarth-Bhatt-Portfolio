import type { Project } from '@/types/project.types';
import { FiStar, FiGitBranch } from 'react-icons/fi';
import Modal from '@/components/shared/Modal';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import { getTechIcon } from '@/constants/techIcons';
import { useGithubRepoStats } from '@/hooks/useGithubRepoStats';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const stats = useGithubRepoStats(project?.githubUrl);

  return (
    <Modal isOpen={project !== null} onClose={onClose}>
      {project && (
        <div className="p-6 sm:p-8">
          <div className="mb-1 flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-semibold text-os-text">{project.title}</h3>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-os-muted hover:bg-os-accentSoft hover:text-os-accent"
            >
              ✕
            </button>
          </div>
          <p className="mb-4 text-sm text-os-muted">
            {project.tagline} · {project.year}
          </p>

          <p className="mb-5 leading-relaxed text-os-text">{project.description}</p>

          <div className="mb-5 flex flex-wrap gap-2">
            {project.stack.map((tech) => {
              const Icon = getTechIcon(tech);
              return (
                <Badge key={tech} className="inline-flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5" />
                  {tech}
                </Badge>
              );
            })}
          </div>

          <p className="mb-2 font-mono text-sm text-os-accent">Key features</p>
          <ul className="mb-6 space-y-1.5">
            {project.features.map((feature) => (
              <li key={feature} className="text-sm text-os-text/90">
                • {feature}
              </li>
            ))}
          </ul>

          {(project.screenshots?.length ?? 0) > 0 && (
            <div className="mb-6 space-y-3">
              {project.screenshots!.map((src) => (
                <img key={src} src={src} alt={`${project.title} screenshot`} className="w-full rounded-lg border border-os-border" />
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <Button as="a" href={project.githubUrl} target="_blank" rel="noreferrer" variant="outline">
                View on GitHub
              </Button>
            )}
            {project.demoUrl && (
              <Button as="a" href={project.demoUrl} target="_blank" rel="noreferrer" variant="primary">
                Live Demo
              </Button>
            )}
            {stats && (
              <div className="flex items-center gap-3 font-mono text-xs text-os-muted">
                <span className="inline-flex items-center gap-1">
                  <FiStar className="h-3.5 w-3.5" /> {stats.stars}
                </span>
                <span className="inline-flex items-center gap-1">
                  <FiGitBranch className="h-3.5 w-3.5" /> {stats.forks}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
