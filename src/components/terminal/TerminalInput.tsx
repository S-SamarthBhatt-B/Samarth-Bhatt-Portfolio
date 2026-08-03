import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useCommandHistory } from '@/hooks/useCommandHistory';
import { getVisibleCommands } from '@/commands/registry';
import { getAutocompleteMatches, getClosestCommand, longestCommonPrefix } from '@/utils/autocomplete';
import { promptLabel } from '@/constants/prompt';

interface TerminalInputProps {
  onSubmit: (raw: string) => void;
  /** Called for Ctrl+C so the parent can echo the cancelled line before clearing input. */
  onInterrupt: (currentValue: string) => void;
}

const TerminalInput = forwardRef<HTMLInputElement, TerminalInputProps>(function TerminalInput(
  { onSubmit, onInterrupt },
  forwardedRef,
) {
  const [value, setValue] = useState('');
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { push, navigate, resetPointer } = useCommandHistory();

  // Expose the internal input element to the parent via the forwarded ref,
  // so Terminal.tsx can refocus it when the user clicks anywhere in the scrollback.
  useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const names = getVisibleCommands().flatMap((c) => [c.name, ...(c.aliases ?? [])]);
    setSuggestion(getClosestCommand(value, names));
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (true) {
      case e.key === 'Enter': {
        e.preventDefault();
        const raw = value;
        if (raw.trim()) push(raw.trim());
        onSubmit(raw);
        setValue('');
        resetPointer();
        break;
      }

      case e.key === 'ArrowUp': {
        e.preventDefault();
        const prev = navigate('up');
        if (prev !== null) setValue(prev);
        break;
      }

      case e.key === 'ArrowDown': {
        e.preventDefault();
        const next = navigate('down');
        if (next !== null) setValue(next);
        break;
      }

      case e.key === 'Tab': {
        e.preventDefault();
        const names = getVisibleCommands().flatMap((c) => [c.name, ...(c.aliases ?? [])]);
        const matches = getAutocompleteMatches(value, names);
        if (matches.length === 1) {
          setValue(matches[0]);
        } else if (matches.length > 1) {
          setValue(longestCommonPrefix(matches));
        }
        break;
      }

      case (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l': {
        e.preventDefault();
        onSubmit('clear');
        break;
      }

      case e.ctrlKey && e.key.toLowerCase() === 'c': {
        e.preventDefault();
        onInterrupt(value);
        setValue('');
        resetPointer();
        break;
      }

      default:
        break;
    }
  };

  return (
    <div className="border-t border-os-border pt-2 font-mono text-sm sm:text-base" onClick={() => inputRef.current?.focus()}>
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-os-muted">{promptLabel}</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className="[caret-color:#00FF88] flex-1 bg-transparent text-os-text outline-none"
          aria-label="Terminal command input"
        />
        <span className="animate-blink text-os-accent">▍</span>
      </div>
      {suggestion && value.trim() && (
        <p className="mt-1 text-xs text-os-muted/80">Did you mean: {suggestion}</p>
      )}
    </div>
  );
});

export default TerminalInput;
