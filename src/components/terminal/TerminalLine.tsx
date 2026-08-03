import type { TerminalOutputLine } from '@/types/terminal.types';
import { promptLabel } from '@/constants/prompt';
import OutputRenderer from './OutputRenderer';

interface TerminalLineProps {
  line: TerminalOutputLine;
}

const VARIANT_COLOR: Record<string, string> = {
  text: 'text-os-text',
  success: 'text-os-accent',
  error: 'text-os-error',
  warn: 'text-os-warn',
  muted: 'text-os-muted',
};

export default function TerminalLine({ line }: TerminalLineProps) {
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

  return (
    <p className={`whitespace-pre-wrap font-mono text-sm sm:text-base ${VARIANT_COLOR[line.variant] ?? 'text-os-text'}`}>
      {line.content}
    </p>
  );
}
