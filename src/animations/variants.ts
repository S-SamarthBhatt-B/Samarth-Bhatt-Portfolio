import type { Variants } from 'framer-motion';

/** Standard scroll-reveal: fade up, used by nearly every GUI section. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/** Stagger wrapper for lists of children (skill groups, project cards, timeline entries). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

/** Scroll-reveal viewport config — trigger once, slightly before fully in view. */
export const revealViewport = { once: true, margin: '-80px' } as const;
