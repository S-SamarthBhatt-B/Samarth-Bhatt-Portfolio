import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import type { Project } from '@/types/project.types';
import WindowPanel from '@/components/shared/WindowPanel';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import { staggerItem } from '@/animations/variants';
import { getTechIcon } from '@/constants/techIcons';
import { useGithubRepoStats } from '@/hooks/useGithubRepoStats';

interface ProjectCardProps {
  project: Project;
  onViewDetails: () => void;
}

const STATUS_LABEL: Record<Project['status'], string> = {
  completed: 'Completed',
  'in-progress': 'In Progress',
  ongoing: 'Ongoing',
};

export default function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  const stats = useGithubRepoStats(project.githubUrl);

  return (
    <motion.div variants={staggerItem}>
      <WindowPanel path={`~/projects/${project.id}`} className="flex h-full flex-col">
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="min-w-0 break-words font-display text-lg font-semibold text-os-text">{project.title}</h3>
            <Badge className="flex-shrink-0">{STATUS_LABEL[project.status]}</Badge>
          </div>
          <p className="mb-3 text-sm text-os-muted">{project.tagline}</p>

          {project.stack.length > 0 && (
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              {project.stack.slice(0, 6).map((tech) => {
                const Icon = getTechIcon(tech);
                return (
                  <span key={tech} title={tech} className="text-os-muted/80 transition-colors hover:text-os-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                );
              })}
            </div>
          )}

          {stats && (
            <div className="mb-3 flex items-center gap-1 font-mono text-xs text-os-muted">
              <FiStar className="h-3.5 w-3.5" />
              <span>{stats.stars}</span>
            </div>
          )}

          <div className="mt-auto flex items-center gap-2 pt-2">
            <Button variant="outline" onClick={onViewDetails} className="w-full">
              View Details
            </Button>
          </div>
        </div>
      </WindowPanel>
    </motion.div>
  );
}
