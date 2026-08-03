import { useEffect, useRef } from 'react';
import { useTerminal } from '@/hooks/useTerminal';
import { promptLabel } from '@/constants/prompt';
import TerminalLine from './TerminalLine';
import TerminalInput from './TerminalInput';
import '@/commands'; // side-effect: registers every command with the registry

export default function Terminal() {
  const { lines, runCommand, pushOutput } = useTerminal();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest output whenever the scrollback changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const handleInterrupt = (currentValue: string) => {
    pushOutput([{ variant: 'muted', content: `${promptLabel} ${currentValue}^C` }]);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-os-bg p-4 sm:p-6">
      <div className="crt-overlay" />
      <div ref={scrollRef} className="terminal-scroll flex-1 overflow-y-auto pr-2">
        {lines.length === 0 && (
          <p className="mb-2 font-mono text-sm text-os-muted">Session started. Type &quot;help&quot; to begin.</p>
        )}
        {lines.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}
      </div>
      <TerminalInput onSubmit={runCommand} onInterrupt={handleInterrupt} />
    </div>
  );
}
