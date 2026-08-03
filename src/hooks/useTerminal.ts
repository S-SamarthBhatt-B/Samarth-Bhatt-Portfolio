import { useCallback, useState } from 'react';
import type { CommandContext, TerminalOutputLine } from '@/types/terminal.types';
import { parseCommand } from '@/utils/commandParser';
import { getCommand, getVisibleCommands } from '@/commands/registry';
import { getClosestCommand } from '@/utils/autocomplete';
import { getLoaderConfig } from '@/utils/terminalLoaders';
import { getTypingSpeed, shouldUseTypewriter } from '@/utils/typing';
import { useOSState } from './useOSState';

let idCounter = 0;
const nextId = () => `line-${idCounter++}`;

export function useTerminal() {
  const [lines, setLines] = useState<TerminalOutputLine[]>([]);
  const enterGui = useOSState((s) => s.beginGuiTransition);
  const beginShutdown = useOSState((s) => s.beginShutdown);

  const pushOutput = useCallback((newLines: Omit<TerminalOutputLine, 'id'>[], commandName?: string) => {
    setLines((prev) => [...prev, ...newLines.map((line) => ({
      ...line,
      id: nextId(),
      commandName: line.commandName ?? commandName,
      typing: line.typing ?? {
        enabled: shouldUseTypewriter(commandName, line.variant),
        speed: getTypingSpeed(commandName, line.variant),
      },
    }))]);
  }, []);

  const clearScreen = useCallback(() => {
    setLines([]);
  }, []);

  const appendLine = useCallback((line: Omit<TerminalOutputLine, 'id'>) => {
    setLines((prev) => [...prev, { ...line, id: nextId() }]);
  }, []);

  const runCommand = useCallback(
    async (raw: string) => {
      pushOutput([{ variant: 'command-echo', content: raw }]);

      const trimmed = raw.trim();
      if (!trimmed) return;

      const { name, args } = parseCommand(trimmed);
      const command = getCommand(name);

      if (!command) {
        const suggestion = getClosestCommand(name, getVisibleCommands().map((c) => c.name));
        const fallbackLines: Array<Omit<TerminalOutputLine, 'id'>> = [
          { variant: 'error', content: `Command not found: ${name}` },
          ...(suggestion
            ? [{ variant: 'muted' as const, content: `Did you mean: ${suggestion}` }]
            : [{ variant: 'muted' as const, content: 'Type "help" to see available commands.' }]),
        ];
        pushOutput(fallbackLines, name);
        return;
      }

      const ctx: CommandContext = {
        args,
        pushOutput,
        clearScreen,
        enterGuiMode: enterGui,
        triggerShutdown: beginShutdown,
      };

      const loaderConfig = getLoaderConfig(name);
      if (loaderConfig) {
        const loaderId = nextId();
        appendLine({
          variant: 'loader',
          loader: {
            message: loaderConfig.message,
            duration: loaderConfig.duration,
            progress: loaderConfig.progress,
            successMessage: loaderConfig.successMessage,
            callback: async () => {
              setLines((prev) => prev.filter((line) => line.id !== loaderId));
              if (loaderConfig.successMessage) {
                pushOutput([{ variant: 'success', content: loaderConfig.successMessage }], name);
              }

              if (name.toLowerCase() === 'ui' || name.toLowerCase() === 'web') {
                ctx.enterGuiMode();
                return;
              }

              try {
                const result = await command.execute(ctx);
                if (result && result.length > 0) {
                  pushOutput(result, name);
                }
              } catch {
                pushOutput([{ variant: 'error', content: 'Something went wrong running that command.' }], name);
              }
            },
          },
        });
        return;
      }

      try {
        const result = await command.execute(ctx);
        if (result && result.length > 0) {
          pushOutput(result);
        }
      } catch {
        pushOutput([{ variant: 'error', content: 'Something went wrong running that command.' }]);
      }
    },
    [appendLine, pushOutput, clearScreen, enterGui, beginShutdown],
  );

  return { lines, runCommand, pushOutput };
}
