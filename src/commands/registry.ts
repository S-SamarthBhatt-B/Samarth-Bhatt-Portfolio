import type { CommandDefinition } from '@/types/terminal.types';

const commands = new Map<string, CommandDefinition>();

/** Registers a command under its name and all aliases. Called once per command module, on import. */
export function registerCommand(def: CommandDefinition): void {
  commands.set(def.name.toLowerCase(), def);
  def.aliases?.forEach((alias) => commands.set(alias.toLowerCase(), def));
}

export function getCommand(name: string): CommandDefinition | undefined {
  return commands.get(name.toLowerCase());
}

/** Commands shown in `help` and offered by autocomplete — excludes hidden easter eggs. */
export function getVisibleCommands(): CommandDefinition[] {
  const seen = new Set<string>();
  const result: CommandDefinition[] = [];
  commands.forEach((def) => {
    if (!def.hidden && !seen.has(def.name)) {
      seen.add(def.name);
      result.push(def);
    }
  });
  return result.sort((a, b) => a.name.localeCompare(b.name));
}
