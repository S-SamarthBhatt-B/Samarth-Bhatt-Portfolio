import { motion } from 'framer-motion';
import { education } from '@/constants/education';
import { experience } from '@/constants/experience';
import WindowPanel from '@/components/shared/WindowPanel';
import SectionHeading from '@/components/shared/SectionHeading';
import { fadeUp, revealViewport, staggerContainer, staggerItem } from '@/animations/variants';

interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  points: string[];
  tag: 'education' | 'experience';
}

const entries: TimelineEntry[] = [
  ...education.map(
    (e): TimelineEntry => ({
      id: e.id,
      period: e.period,
      title: e.degree,
      subtitle: e.institution,
      points: e.detail ? [e.detail] : [],
      tag: 'education',
    }),
  ),
  ...experience.map(
    (e): TimelineEntry => ({
      id: e.id,
      period: e.period,
      title: `${e.role} — ${e.organization}`,
      subtitle: e.organization,
      points: e.points,
      tag: 'experience',
    }),
  ),
];

export default function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-20 px-1 py-2">
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          command="cat timeline.log"
          title="Timeline"
          subtitle="Education and training, in the order they happened."
        />
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          <WindowPanel path="~/timeline.log">
            <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={staggerContainer}>
              <ul className="space-y-6 border-l border-os-border pl-6">
                {entries.map((entry) => (
                  <motion.li key={entry.id} variants={staggerItem} className="relative">
                    <span
                      className={`absolute -left-[1.68rem] top-1.5 h-2.5 w-2.5 rounded-full ${
                        entry.tag === 'education' ? 'bg-os-accent' : 'bg-os-warn'
                      }`}
                    />
                    <p className="font-mono text-xs text-os-muted">{entry.period}</p>
                    <p className="mt-0.5 font-medium text-os-text">{entry.title}</p>
                    <p className="text-sm text-os-muted">{entry.subtitle}</p>
                    {entry.points.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {entry.points.map((point) => (
                          <li key={point} className="text-sm text-os-text/90">
                            • {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </WindowPanel>
        </motion.div>
      </div>
    </section>
  );
}
