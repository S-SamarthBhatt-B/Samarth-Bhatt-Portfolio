import { motion } from 'framer-motion';
import { profile } from '@/constants/profile';
import WindowPanel from '@/components/shared/WindowPanel';
import SectionHeading from '@/components/shared/SectionHeading';
import Button from '@/components/shared/Button';
import CopyButton from '@/components/shared/CopyButton';
import { fadeUp, revealViewport } from '@/animations/variants';

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 px-1 py-2">
      <div className="mx-auto max-w-2xl">
        <SectionHeading command="contact" title="Get in Touch" subtitle="Reach out directly — I read everything." />
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          <WindowPanel path="~/contact">
            <div className="space-y-4 font-mono text-sm">
              <div className="flex items-center justify-between border-b border-os-border/60 pb-3">
                <span className="text-os-muted">Email</span>
                <div className="flex items-center gap-1">
                  <a href={`mailto:${profile.email}`} className="text-os-accent hover:underline">
                    {profile.email}
                  </a>
                  <CopyButton value={profile.email} label="Copy email" />
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-os-border/60 pb-3">
                <span className="text-os-muted">Phone</span>
                <div className="flex items-center gap-1">
                  <span className="text-os-text">{profile.phone}</span>
                  <CopyButton value={profile.phone} label="Copy phone number" />
                </div>
              </div>
              {profile.socials.map((social) => (
                <div key={social.label} className="flex items-center justify-between border-b border-os-border/60 pb-3 last:border-b-0 last:pb-0">
                  <span className="text-os-muted">{social.label}</span>
                  <a href={social.url} target="_blank" rel="noreferrer" className="text-os-accent hover:underline">
                    {social.handle}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button as="a" href={`mailto:${profile.email}`} variant="primary" className="w-full">
                Send me an email
              </Button>
            </div>
          </WindowPanel>
        </motion.div>
      </div>
    </section>
  );
}
