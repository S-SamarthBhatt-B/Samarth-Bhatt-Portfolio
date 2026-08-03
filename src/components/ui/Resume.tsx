import { motion } from 'framer-motion';
import { profile } from '@/constants/profile';
import WindowPanel from '@/components/shared/WindowPanel';
import SectionHeading from '@/components/shared/SectionHeading';
import Button from '@/components/shared/Button';
import { fadeUp, revealViewport } from '@/animations/variants';

export default function Resume() {
  const resumeUrl = `${import.meta.env.BASE_URL}${profile.resumePath}`;

  return (
    <section id="resume" className="scroll-mt-20 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading command="resume" title="Resume" />
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          <WindowPanel path="~/resume">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="font-mono text-sm text-os-muted">
                <p>
                  <span className="text-os-accent">-rw-r--r--</span> 1 samarth staff
                </p>
                <p className="mt-1 text-os-text">Samarth_Bhatt_Resume.pdf</p>
              </div>
              <Button as="a" href={resumeUrl} download="Samarth_Bhatt_Resume.pdf" variant="primary">
                Download PDF
              </Button>
            </div>
          </WindowPanel>
        </motion.div>
      </div>
    </section>
  );
}
