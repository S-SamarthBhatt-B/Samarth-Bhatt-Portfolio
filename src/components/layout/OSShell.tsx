import { AnimatePresence, motion } from 'framer-motion';
import { useOSState } from '@/hooks/useOSState';
import BootScreen from '@/components/boot/BootScreen';
import Terminal from '@/components/terminal/Terminal';

/**
 * Top-level mode switcher. Each mode is a full-viewport component;
 * AnimatePresence handles the crossfade as `mode` changes in useOSState.
 * The GUI mode component is added in Phase 5.
 */
export default function OSShell() {
  const mode = useOSState((s) => s.mode);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-os-bg">
      <AnimatePresence mode="wait">
        {mode === 'boot' && (
          <motion.div key="boot" exit={{ opacity: 0 }} className="h-full w-full">
            <BootScreen />
          </motion.div>
        )}
        {(mode === 'terminal' || mode === 'shutting-down') && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Terminal />
          </motion.div>
        )}
        {mode === 'gui' && (
          <motion.div
            key="gui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full overflow-y-auto"
          >
            {/* Populated in Phase 5 with the full GUI portfolio sections */}
            <div className="flex h-full items-center justify-center text-os-muted">
              GUI mode — arriving in Phase 5
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
