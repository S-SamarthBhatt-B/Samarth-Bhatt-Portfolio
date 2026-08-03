import { motion } from 'framer-motion';
import type { Project } from '@/types/project.types';
import WindowPanel from '@/components/shared/WindowPanel';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';
import { staggerItem } from '@/animations/variants';

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
  return (
    <motion.div variants={staggerItem}>
      <WindowPanel path={`~/projects/${project.id}`} className="flex h-full flex-col">
        <div className="flex flex-1 flex-col">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-os-text">{project.title}</h3>
            <Badge className="flex-shrink-0">{STATUS_LABEL[project.status]}</Badge>
          </div>
          <p className="mb-3 text-sm text-os-muted">{project.tagline}</p>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="text-xs text-os-muted/80">
                #{tech.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
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
