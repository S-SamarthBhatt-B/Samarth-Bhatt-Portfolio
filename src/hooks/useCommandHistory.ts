import { useCallback, useRef, useState } from 'react';

const STORAGE_KEY = 'samarthos_command_history';
const MAX_HISTORY = 100;

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    /* localStorage unavailable (private browsing, quota) — fail silently */
  }
}

/**
 * Tracks submitted commands for Up/Down arrow recall, persisted across sessions.
 * `pointer` of null means "not currently browsing history" (blank/live input).
 */
export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>(() => loadHistory());
  const pointerRef = useRef<number | null>(null);

  const push = useCallback((cmd: string) => {
    setHistory((prev) => {
      const next = [...prev.filter((c) => c !== cmd), cmd].slice(-MAX_HISTORY);
      saveHistory(next);
      return next;
    });
    pointerRef.current = null;
  }, []);

  /** Returns the command text to show, or null if the caller should leave input untouched. */
  const navigate = useCallback(
    (direction: 'up' | 'down'): string | null => {
      if (history.length === 0) return null;

      if (direction === 'up') {
        pointerRef.current = pointerRef.current === null ? history.length - 1 : Math.max(0, pointerRef.current - 1);
        return history[pointerRef.current];
      }

      // direction === 'down'
      if (pointerRef.current === null) return null;
      const nextPointer = pointerRef.current + 1;
      if (nextPointer >= history.length) {
        pointerRef.current = null;
        return '';
      }
      pointerRef.current = nextPointer;
      return history[nextPointer];
    },
    [history],
  );

  const resetPointer = useCallback(() => {
    pointerRef.current = null;
  }, []);

  return { push, navigate, resetPointer };
}
