import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useOSState } from '@/hooks/useOSState';
import { useBootSequence } from '@/hooks/useBootSequence';
import BootLine from './BootLine';
import ProgressBar from './ProgressBar';
import AsciiLogo from './AsciiLogo';
import { welcomeMessage } from '@/constants/bootSequence';

export default function BootScreen() {
  const enterTerminal = useOSState((s) => s.enterTerminal);
  const [skip, setSkip] = useState(false);
  const { stage, visibleLines, progress } = useBootSequence(enterTerminal, skip);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setSkip(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,136,0.12),transparent_55%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px]" />

      <AnimatePresence mode="wait">
        {stage === 'black' && <div key="black" className="h-full w-full" />}

        {stage === 'powering-on' && (
          <motion.div
            key="powering-on"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <p className="text-sm uppercase tracking-[0.45em] text-os-muted">SamarthOS Firmware</p>
            <p className="font-mono text-lg text-os-accent text-glow sm:text-2xl">
              Powering On<span className="animate-blink">...</span>
            </p>
            <p className="max-w-md font-mono text-sm text-os-muted">Initializing CPU, memory, and portfolio engine.</p>
          </motion.div>
        )}

        {stage === 'boot-lines' && (
          <motion.div
            key="boot-lines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-xl space-y-1.5 rounded-xl border border-os-border/60 bg-black/30 p-5 backdrop-blur"
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-os-muted">Hardware Scan</p>
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
            className="flex w-full max-w-md flex-col items-center gap-6"
          >
            <p className="font-mono text-sm text-os-muted">Loading Services and Experience Layers...</p>
            <ProgressBar progress={progress} />
          </motion.div>
        )}

        {stage === 'opening-terminal' && (
          <motion.div
            key="opening-terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-os-muted">Authentication</p>
            <p className="font-mono text-lg text-os-accent text-glow sm:text-2xl">
              Starting Terminal<span className="animate-blink">...</span>
            </p>
          </motion.div>
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
            className="flex flex-col items-center gap-3 text-center font-mono"
          >
            <p className="text-lg text-os-text sm:text-xl">{welcomeMessage.greeting}</p>
            <p className="text-sm text-os-muted sm:text-base">
              Press <span className="text-os-accent text-glow">Enter</span> or <span className="text-os-accent text-glow">Space</span> to skip.
            </p>
            <p className="text-sm text-os-muted sm:text-base">
              Type <span className="text-os-accent text-glow">&quot;{welcomeMessage.promptCommand}&quot;</span> to begin.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
