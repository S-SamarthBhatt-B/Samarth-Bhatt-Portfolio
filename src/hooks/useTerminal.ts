import { useCallback, useState } from 'react';
import type { CommandContext, TerminalOutputLine } from '@/types/terminal.types';
import { parseCommand } from '@/utils/commandParser';
import { getCommand } from '@/commands/registry';
import { useOSState } from './useOSState';

let idCounter = 0;
const nextId = () => `line-${idCounter++}`;

export function useTerminal() {
  const [lines, setLines] = useState<TerminalOutputLine[]>([]);
  const enterGui = useOSState((s) => s.enterGui);
  const beginShutdown = useOSState((s) => s.beginShutdown);

  const pushOutput = useCallback((newLines: Omit<TerminalOutputLine, 'id'>[]) => {
    setLines((prev) => [...prev, ...newLines.map((l) => ({ ...l, id: nextId() }))]);
  }, []);

  const clearScreen = useCallback(() => setLines([]), []);

  const runCommand = useCallback(
    async (raw: string) => {
      pushOutput([{ variant: 'command-echo', content: raw }]);

      const trimmed = raw.trim();
      if (!trimmed) return;

      const { name, args } = parseCommand(trimmed);
      const command = getCommand(name);

      if (!command) {
        pushOutput([
          { variant: 'error', content: `Command not found: ${name}` },
          { variant: 'muted', content: `Type "help" to see available commands.` },
        ]);
        return;
      }

      const ctx: CommandContext = {
        args,
        pushOutput,
        clearScreen,
        enterGuiMode: enterGui,
        triggerShutdown: beginShutdown,
      };

      try {
        const result = await command.execute(ctx);
        if (result && result.length > 0) pushOutput(result);
      } catch {
        pushOutput([{ variant: 'error', content: 'Something went wrong running that command.' }]);
      }
    },
    [pushOutput, clearScreen, enterGui, beginShutdown],
  );

  return { lines, runCommand, pushOutput };
}
