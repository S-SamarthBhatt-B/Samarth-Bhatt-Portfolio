/** A single rendered line/block of output in the terminal scrollback. */
export interface TerminalOutputLine {
  id: string;
  /** How this line should render. */
  variant: 'text' | 'success' | 'error' | 'warn' | 'muted' | 'command-echo' | 'node';
  /** Plain text content. Omit when using `node` variant. */
  content?: string;
  /** For 'node' variant: a React node key resolved by the OutputRenderer registry. */
  node?: TerminalOutputNode;
  /** Whether this line should type out character-by-character when first rendered. */
  animated?: boolean;
}

/** Structured payload for rich, non-plain-text output (tables, project cards, links). */
export type TerminalOutputNode =
  | { kind: 'ascii'; art: string }
  | { kind: 'help-table'; rows: { command: string; description: string }[] }
  | { kind: 'skills-table'; groups: { category: string; items: string[] }[] }
  | { kind: 'project-list'; projectIds: string[] }
  | { kind: 'project-detail'; projectId: string }
  | { kind: 'link'; label: string; url: string }
  | { kind: 'contact-card' };

export interface CommandContext {
  /** Raw arguments after the command name. */
  args: string[];
  /** Push additional output lines asynchronously (e.g. after a delay). */
  pushOutput: (lines: Omit<TerminalOutputLine, 'id'>[]) => void;
  /** Clear the terminal scrollback. */
  clearScreen: () => void;
  /** Switch the OS into GUI mode (used by `ui`/`web`). */
  enterGuiMode: () => void;
  /** Trigger the fake shutdown sequence (used by `exit`). */
  triggerShutdown: () => void;
}

export type CommandResult = Omit<TerminalOutputLine, 'id'>[] | void;

export interface CommandDefinition {
  name: string;
  aliases?: string[];
  description: string;
  /** Hidden commands are excluded from `help` and autocomplete suggestions. */
  hidden?: boolean;
  execute: (ctx: CommandContext) => CommandResult | Promise<CommandResult>;
}
