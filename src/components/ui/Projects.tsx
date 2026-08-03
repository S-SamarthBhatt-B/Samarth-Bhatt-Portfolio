import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/constants/projects';
import type { Project } from '@/types/project.types';
import SectionHeading from '@/components/shared/SectionHeading';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { fadeUp, revealViewport, staggerContainer } from '@/animations/variants';

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          <SectionHeading
            command="projects"
            title="Projects"
            subtitle="A mix of data science coursework, self-directed builds, and one very active Minecraft server."
          />
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onViewDetails={() => setSelected(project)} />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
