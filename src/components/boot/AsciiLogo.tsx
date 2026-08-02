import { motion } from 'framer-motion';
import { asciiLogo } from '@/constants/bootSequence';

export default function AsciiLogo() {
  return (
    <motion.pre
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="select-none overflow-x-auto font-mono text-[6px] leading-tight text-os-accent text-glow sm:text-[10px] md:text-sm"
      aria-label="SamarthOS"
    >
      {asciiLogo}
    </motion.pre>
  );
}
