import { useCallback, useEffect, useRef, useState } from 'react';

interface TerminalTransitionState {
  visible: boolean;
  phase: 'idle' | 'out' | 'in';
}

export function useTerminalTransition() {
  const [state, setState] = useState<TerminalTransitionState>({ visible: true, phase: 'idle' });
  const timeoutRef = useRef<number | null>(null);

  const beginClear = useCallback(() => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setState({ visible: false, phase: 'out' });

    timeoutRef.current = window.setTimeout(() => {
      setState({ visible: true, phase: 'in' });
      timeoutRef.current = window.setTimeout(() => {
        setState({ visible: true, phase: 'idle' });
      }, 180);
    }, 220);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { state, beginClear };
}
