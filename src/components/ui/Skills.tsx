import { motion } from 'framer-motion';
import { skillGroups } from '@/constants/skills';
import WindowPanel from '@/components/shared/WindowPanel';
import SectionHeading from '@/components/shared/SectionHeading';
import Badge from '@/components/shared/Badge';
import { fadeUp, revealViewport, staggerContainer, staggerItem } from '@/animations/variants';

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 px-1 py-2">
      <div className="mx-auto max-w-3xl">
        <SectionHeading command="skills" title="Technical Skills" />
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          <WindowPanel path="~/skills.sh">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
              variants={staggerContainer}
              className="space-y-5"
            >
              {skillGroups.map((group) => (
                <motion.div key={group.category} variants={staggerItem}>
                  <p className="mb-2 font-mono text-sm text-os-accent">{group.category}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </WindowPanel>
        </motion.div>
      </div>
    </section>
  );
}
