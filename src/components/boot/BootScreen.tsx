import { AnimatePresence, motion } from 'framer-motion';
import { useOSState } from '@/hooks/useOSState';
import { useBootSequence } from '@/hooks/useBootSequence';
import BootLine from './BootLine';
import ProgressBar from './ProgressBar';
import AsciiLogo from './AsciiLogo';
import { welcomeMessage } from '@/constants/bootSequence';

/**
 * Orchestrates the full startup flow:
 * Stage 1 black screen -> 2 Powering On -> 3 boot lines -> 4 progress bar ->
 * 5 Opening Terminal -> 6 ASCII logo -> 7 Welcome -> hands off to Terminal mode.
 *
 * All timing lives in useBootSequence; this component is purely presentational.
 */
export default function BootScreen() {
  const enterTerminal = useOSState((s) => s.enterTerminal);
  const { stage, visibleLines, progress } = useBootSequence(enterTerminal);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-black px-6">
      <AnimatePresence mode="wait">
        {stage === 'black' && <div key="black" className="h-full w-full" />}

        {stage === 'powering-on' && (
          <motion.p
            key="powering-on"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-lg text-os-accent text-glow sm:text-2xl"
          >
            Powering On<span className="animate-blink">...</span>
          </motion.p>
        )}

        {stage === 'boot-lines' && (
          <motion.div
            key="boot-lines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl space-y-1.5"
          >
            {visibleLines.map((line) => (
              <BootLine key={line} text={line} />
            ))}
          </motion.div>
        )}

        {stage === 'progress-bar' && (
          <motion.div
            key="progress-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col items-center gap-6"
          >
            <p className="font-mono text-sm text-os-muted">Loading Portfolio...</p>
            <ProgressBar progress={progress} />
          </motion.div>
        )}

        {stage === 'opening-terminal' && (
          <motion.p
            key="opening-terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="font-mono text-lg text-os-accent text-glow sm:text-2xl"
          >
            Opening Terminal<span className="animate-blink">...</span>
          </motion.p>
        )}

        {stage === 'logo' && (
          <motion.div
            key="logo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            className="flex w-full justify-center"
          >
            <AsciiLogo />
          </motion.div>
        )}

        {stage === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-1 text-center font-mono"
          >
            <p className="text-lg text-os-text sm:text-xl">{welcomeMessage.greeting}</p>
            <p className="text-sm text-os-muted sm:text-base">
              Type <span className="text-os-accent text-glow">&quot;{welcomeMessage.promptCommand}&quot;</span> to
              begin.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
