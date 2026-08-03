import { motion } from 'framer-motion';

interface BootLineProps {
  text: string;
}

export default function BootLine({ text }: BootLineProps) {
  return (
    <motion.p
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="font-mono text-sm text-os-accent/90 sm:text-base"
    >
      <span className="mr-2 text-os-muted">$</span>
      {text}
    </motion.p>
  );
}
