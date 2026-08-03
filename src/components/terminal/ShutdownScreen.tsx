import { AnimatePresence, motion } from 'framer-motion';
import { useShutdownSequence } from '@/hooks/useShutdownSequence';

export default function ShutdownScreen() {
  const { stage, visibleLines } = useShutdownSequence();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-black px-6">
      <AnimatePresence mode="wait">
        {stage === 'lines' && (
          <motion.div
            key="lines"
            exit={{ opacity: 0 }}
            className="w-full max-w-md space-y-1.5 font-mono text-sm text-os-accent/90"
          >
            {visibleLines.map((line) => (
              <motion.p key={line} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-os-muted">$</span> {line}
              </motion.p>
            ))}
          </motion.div>
        )}

        {stage === 'black' && (
          <motion.div key="black" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full" />
        )}

        {stage === 'done' && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center font-mono">
            <p className="text-os-muted">SamarthOS has powered off.</p>
            <p className="mt-2 text-os-accent text-glow">Refresh this page to boot again.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
