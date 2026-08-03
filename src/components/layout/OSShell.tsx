import { AnimatePresence, motion } from 'framer-motion';
import { useOSState } from '@/hooks/useOSState';
import BootScreen from '@/components/boot/BootScreen';
import Terminal from '@/components/terminal/Terminal';
import ShutdownScreen from '@/components/terminal/ShutdownScreen';
import GuiPortfolio from '@/components/ui/GuiPortfolio';

/**
 * Top-level mode switcher. Each mode is a full-viewport component;
 * AnimatePresence handles the crossfade as `mode` changes in useOSState.
 * `terminal` and `closing-terminal` share one branch so the Terminal
 * instance (and its scrollback) survives the ui/web closing animation.
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
        {(mode === 'terminal' || mode === 'closing-terminal') && (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <Terminal isClosing={mode === 'closing-terminal'} />
          </motion.div>
        )}
        {mode === 'shutting-down' && (
          <motion.div
            key="shutdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <ShutdownScreen />
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
            <GuiPortfolio />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
