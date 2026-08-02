import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-2 flex items-center justify-between font-mono text-xs text-os-muted">
        <span>LOADING SYSTEM</span>
        <span className="text-os-accent">{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full border border-os-border bg-os-panel">
        <motion.div
          className="h-full rounded-full bg-os-accent shadow-glowSm"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear', duration: 0.1 }}
        />
      </div>
    </div>
  );
}
