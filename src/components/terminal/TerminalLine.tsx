import { useEffect } from 'react';
import type { TerminalOutputLine } from '@/types/terminal.types';
import { promptLabel } from '@/constants/prompt';
import { useTypewriter } from '@/hooks/useTypewriter';
import OutputRenderer from './OutputRenderer';
import TerminalLoader from './loaders/TerminalLoader';

interface TerminalLineProps {
  line: TerminalOutputLine;
  skipTyping?: boolean;
}

const VARIANT_COLOR: Record<string, string> = {
  text: 'text-os-text',
  success: 'text-os-accent',
  error: 'text-os-error',
  warn: 'text-os-warn',
  muted: 'text-os-muted',
};

export default function TerminalLine({ line, skipTyping = false }: TerminalLineProps) {
  const useTyping = line.typing?.enabled ?? true;
  const speed = line.typing?.speed ?? 50;
  const { displayed, done } = useTypewriter(line.content ?? '', {
    speed,
    instant: !line.content || line.variant === 'command-echo' || skipTyping || !useTyping,
    active: line.variant !== 'loader',
  });

  useEffect(() => {
    if (line.variant === 'command-echo' || line.variant === 'loader') return;
    window.dispatchEvent(new Event('terminal-typing-tick'));
  }, [displayed, line.variant]);

  // Notify the terminal when this line's typing has completed so the parent
  // can reset any skip flags and keep state consistent across the UI.
  useEffect(() => {
    if (!done) return;
    if (line.variant === 'command-echo' || line.variant === 'loader') return;
    window.dispatchEvent(new Event('terminal-typing-complete'));
  }, [done, line.variant]);

  if (line.variant === 'command-echo') {
    return (
      <p className="whitespace-pre-wrap font-mono text-sm sm:text-base">
        <span className="text-os-muted">{promptLabel}</span> <span className="text-os-text">{line.content}</span>
      </p>
    );
  }

  if (line.variant === 'node' && line.node) {
    return <OutputRenderer node={line.node} />;
  }

  if (line.variant === 'loader' && line.loader) {
    return <TerminalLoader message={line.loader.message} duration={line.loader.duration} progress={line.loader.progress} successMessage={line.loader.successMessage} callback={line.loader.callback ?? (() => undefined)} />;
  }

  const showCursor = useTyping && line.variant !== 'command-echo' && line.variant !== 'loader';

  return (
    <p className={`whitespace-pre-wrap font-mono text-sm sm:text-base ${VARIANT_COLOR[line.variant] ?? 'text-os-text'}`}>
      {displayed}
      <span className={`ml-0.5 ${showCursor ? 'animate-blink text-os-accent' : 'text-transparent'}`}>▍</span>
    </p>
  );
}
