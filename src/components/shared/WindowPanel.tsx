import type { ReactNode } from 'react';
import GlassPanel from './GlassPanel';

interface WindowPanelProps {
  /** Shown in the title bar, terminal-path style, e.g. "~/about.sh" */
  path: string;
  children: ReactNode;
  className?: string;
}

/**
 * Renders content inside a mock OS window: title bar with traffic-light dots
 * and a command-path label. This is the signature visual device connecting
 * the GUI mode back to the terminal mode it grew out of.
 */
export default function WindowPanel({ path, children, className = '' }: WindowPanelProps) {
  return (
    <GlassPanel className={`overflow-hidden ${className}`}>
      <div className="flex items-center gap-2 border-b border-os-border/70 bg-black/20 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-os-error/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-os-warn/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-os-accent/70" />
        <span className="ml-2 font-mono text-xs text-os-muted">{path}</span>
      </div>
      <div className="p-5 sm:p-7">{children}</div>
    </GlassPanel>
  );
}
