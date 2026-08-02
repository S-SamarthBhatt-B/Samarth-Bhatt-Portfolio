import { useEffect } from 'react';
import { useOSState } from '@/hooks/useOSState';

/**
 * TEMPORARY placeholder for Phase 1 scaffolding verification.
 * Replaced in Phase 2 with the full black-screen → boot lines →
 * progress bar → ASCII logo → welcome sequence.
 */
export default function BootScreen() {
  const enterTerminal = useOSState((s) => s.enterTerminal);

  useEffect(() => {
    const timer = setTimeout(enterTerminal, 1200);
    return () => clearTimeout(timer);
  }, [enterTerminal]);

  return (
    <div className="flex h-full w-full items-center justify-center bg-black">
      <p className="animate-pulse text-os-accent text-glow">Powering On...</p>
    </div>
  );
}
