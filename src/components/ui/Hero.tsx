import { motion } from 'framer-motion';
import { profile } from '@/constants/profile';
import Button from '@/components/shared/Button';
import { useOSState } from '@/hooks/useOSState';

export default function Hero() {
  const enterTerminal = useOSState((s) => s.enterTerminal);

  return (
    <section id="hero" className="flex min-h-screen scroll-mt-20 flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 font-mono text-sm text-os-muted"
      >
        <span className="text-os-accent">guest@samarthos</span>:~$ whoami
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-4xl font-bold text-os-text sm:text-6xl md:text-7xl"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 max-w-xl font-mono text-base text-os-accent text-glow sm:text-lg"
      >
        {profile.title}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-2 max-w-lg text-sm text-os-muted sm:text-base"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-3"
      >
        <Button as="a" href="#projects" variant="primary">
          View Projects
        </Button>
        <Button as="a" href="#contact" variant="outline">
          Get in Touch
        </Button>
        <Button variant="ghost" onClick={enterTerminal}>
          ← Back to Terminal
        </Button>
      </motion.div>
    </section>
  );
}
