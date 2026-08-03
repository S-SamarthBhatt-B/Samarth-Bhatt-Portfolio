import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTerminal } from '@/hooks/useTerminal';
import { useOSState } from '@/hooks/useOSState';
import { promptLabel } from '@/constants/prompt';
import { sleep } from '@/utils/sleep';
import TerminalLine from './TerminalLine';
import TerminalInput from './TerminalInput';
import '@/commands'; // side-effect: registers every command with the registry
import { useTerminalTransition } from '@/hooks/useTerminalTransition';

const CLOSE_DURATION_MS = 650;

interface TerminalProps {
  /** True while the `ui`/`web` commands are transitioning into GUI mode. */
  isClosing?: boolean;
}

export default function Terminal({ isClosing = false }: TerminalProps) {
  const { lines, runCommand, pushOutput } = useTerminal();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputElRef = useRef<HTMLInputElement>(null);
  const [skipTyping, setSkipTyping] = useState(false);
  const { state: transitionState, beginClear } = useTerminalTransition();
  const enterGui = useOSState((s) => s.enterGui);

  // Auto-scroll to the newest output whenever the scrollback changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    const handleTypingTick = () => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    };

    const handleTypingComplete = () => {
      // Reset skip state when active typing completes so subsequent lines will
      // animate normally.
      setSkipTyping(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Escape') {
        event.preventDefault();
        // Signal local state so lines that check skipTyping render instantly.
        setSkipTyping(true);
        // Broadcast a shared event so all active typewriter instances can
        // finish immediately without attaching their own key handlers.
        window.dispatchEvent(new Event('terminal-skip-typing'));
      }
    };

    window.addEventListener('terminal-typing-tick', handleTypingTick);
    window.addEventListener('terminal-typing-complete', handleTypingComplete);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('terminal-typing-tick', handleTypingTick);
      window.removeEventListener('terminal-typing-complete', handleTypingComplete);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // When closing (triggered by `ui`/`web`), play the collapse animation in
  // place — the same Terminal instance stays mounted so scrollback isn't
  // lost — then hand off to GUI mode once the animation finishes.
  useEffect(() => {
    if (!isClosing) return;
    let cancelled = false;
    (async () => {
      await sleep(CLOSE_DURATION_MS);
      if (!cancelled) enterGui();
    })();
    return () => {
      cancelled = true;
    };
  }, [isClosing, enterGui]);

  const handleInterrupt = (currentValue: string) => {
    pushOutput([{ variant: 'muted', content: `${promptLabel} ${currentValue}^C` }]);
  };

  const handleSubmit = (raw: string) => {
    if (raw.trim().toLowerCase() === 'clear' || raw.trim().toLowerCase() === 'cls') {
      beginClear();
    }
    runCommand(raw);
  };

  // Clicking anywhere in the terminal (scrollback included) should refocus the
  // input, since browsers blur an active input on any outside mousedown by
  // default. Skip refocusing if the click was part of selecting text, so
  // copying output still works normally.
  const handleReclaimFocus = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    inputElRef.current?.focus();
  };

  return (
    <motion.div
      animate={isClosing ? { opacity: 0, scale: 0.85, filter: 'blur(6px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: CLOSE_DURATION_MS / 1000, ease: 'easeIn' }}
      className="relative flex h-full w-full flex-col bg-os-bg p-4 sm:p-6"
      onMouseUp={handleReclaimFocus}
    >
      <div className="crt-overlay" />
      <motion.div
        animate={transitionState.phase === 'out' ? { opacity: 0, y: -6 } : transitionState.phase === 'in' ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        ref={scrollRef}
        className="terminal-scroll flex-1 overflow-y-auto pr-2"
      >
        {lines.length === 0 && (
          <p className="mb-2 font-mono text-sm text-os-muted">Session started. Type &quot;help&quot; to begin.</p>
        )}
        {lines.map((line) => (
          <TerminalLine key={line.id} line={line} skipTyping={skipTyping} />
        ))}
      </motion.div>
      <TerminalInput ref={inputElRef} onSubmit={handleSubmit} onInterrupt={handleInterrupt} />
    </motion.div>
  );
}
