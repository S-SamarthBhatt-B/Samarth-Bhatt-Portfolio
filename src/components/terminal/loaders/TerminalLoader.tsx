import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

interface TerminalLoaderProps {
  message: string;
  duration: number;
  spinner?: string[];
  progress?: number;
  successMessage?: string;
  callback: () => void | Promise<void>;
}

const DEFAULT_SPINNER = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export default function TerminalLoader({
  message,
  duration,
  spinner = DEFAULT_SPINNER,
  progress,
  successMessage,
  callback,
}: TerminalLoaderProps) {
  const [frame, setFrame] = useState(0);
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);

  const steps = useMemo(() => Math.max(16, Math.round(duration / 80)), [duration]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFrame((prev) => (prev + 1) % spinner.length);
    }, 70);
    return () => window.clearInterval(interval);
  }, [spinner.length]);

  useEffect(() => {
    let cancelled = false;
    const start = window.setTimeout(() => {
      if (!cancelled) {
        setDone(true);
        void callback();
      }
    }, duration);

    const progressInterval = window.setInterval(() => {
      if (cancelled) return;
      setPercent((prev) => {
        const next = prev + 100 / steps;
        return next >= 100 ? 100 : next;
      });
    }, duration / steps);

    return () => {
      cancelled = true;
      window.clearTimeout(start);
      window.clearInterval(progressInterval);
    };
  }, [callback, duration, steps]);

  useEffect(() => {
    if (typeof progress === 'number') {
      setPercent(progress);
    }
  }, [progress]);

  return (
    <AnimatePresence mode="wait">
      {!done ? (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="my-2 space-y-2 rounded-lg border border-os-border/50 bg-black/20 p-3 font-mono text-sm"
        >
          <div className="flex items-center gap-2 text-os-accent">
            <span className="min-w-6 text-center">{spinner[frame]}</span>
            <span>{message}</span>
          </div>

          {/* Additional loading hint to provide more context while commands load */}
          <p className="text-xs text-os-muted">Preparing command output... Please wait.</p>

          {typeof progress === 'number' && (
            <div className="space-y-1">
              <div className="h-1.5 overflow-hidden rounded-full bg-os-border/60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="h-full rounded-full bg-os-accent"
                />
              </div>
              <p className="text-xs text-os-muted">{Math.round(percent)}%</p>
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-2 rounded-lg border border-os-accent/25 bg-os-accent/10 p-3 font-mono text-sm text-os-accent"
        >
          {successMessage ?? 'Done.'}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
