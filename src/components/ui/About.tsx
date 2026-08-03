import { motion } from 'framer-motion';
import { profile } from '@/constants/profile';
import WindowPanel from '@/components/shared/WindowPanel';
import SectionHeading from '@/components/shared/SectionHeading';
import { fadeUp, revealViewport } from '@/animations/variants';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading command="about" title="About Me" />
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          <WindowPanel path="~/about.sh">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <img
                src={profile.avatar}
                alt={profile.name}
                width={96}
                height={96}
                className="h-24 w-24 flex-shrink-0 rounded-full border border-os-accent/40 object-cover shadow-glow"
              />
              <div className="space-y-4 text-center sm:text-left">
                {profile.bio.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-os-text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </WindowPanel>
        </motion.div>
      </div>
    </section>
  );
}
