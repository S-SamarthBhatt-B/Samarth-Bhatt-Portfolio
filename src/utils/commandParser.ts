export interface ParsedCommand {
  name: string;
  args: string[];
  raw: string;
}

/** Splits a raw terminal input line into a command name and its arguments. */
export function parseCommand(raw: string): ParsedCommand {
  const trimmed = raw.trim();
  const parts = trimmed.split(/\s+/).filter(Boolean);
  const [name = '', ...args] = parts;
  return { name: name.toLowerCase(), args, raw: trimmed };
}
