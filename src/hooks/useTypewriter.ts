import { useEffect, useState, useRef } from 'react';

interface UseTypewriterOptions {
  /** Characters per second. */
  speed?: number;
  /** Delay before typing starts. */
  startDelay?: number;
  /** Skip animation entirely (used to respect prefers-reduced-motion). */
  instant?: boolean;
  /** Optional callback once typing completes. */
  onComplete?: () => void;
  /** Whether the animation is currently active. */
  active?: boolean;
}

/**
 * Types out `text` character by character, returning the current visible
 * substring and a boolean for whether typing has finished.
 */
export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 18, startDelay = 0, instant = false, onComplete, active = true } = options;
  const [displayed, setDisplayed] = useState(instant || !active ? text : '');
  const [done, setDone] = useState(instant || !active);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      setDone(true);
      finishedRef.current = true;
      return;
    }

    if (instant) {
      setDisplayed(text);
      setDone(true);
      finishedRef.current = true;
      onComplete?.();
      return;
    }

    let cancelled = false;
    let index = 0;
    finishedRef.current = false;
    setDisplayed('');
    setDone(false);

    const step = (timestamp: number) => {
      if (cancelled) return;
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
        lastFrameRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      // Compute target index based on configured characters-per-second speed.
      const targetIndex = Math.min(text.length, Math.floor((elapsed / 1000) * speed));
      if (targetIndex !== index) {
        index = targetIndex;
        setDisplayed(text.slice(0, index));
      }

      if (index >= text.length) {
        setDone(true);
        finishedRef.current = true;
        onComplete?.();
        return;
      }

      lastFrameRef.current = timestamp;
      rafRef.current = window.requestAnimationFrame(step);
    };

    if (startDelay > 0) {
      timeoutRef.current = window.setTimeout(() => {
        if (!cancelled) {
          rafRef.current = window.requestAnimationFrame(step);
        }
      }, startDelay);
    } else {
      rafRef.current = window.requestAnimationFrame(step);
    }

    // Support global skip keys (Enter / Space / Escape) by listening for the
    // shared "terminal-skip-typing" custom event. This allows the parent
    // terminal to signal all active typewriters to finish immediately without
    // each instance registering its own keydown handler.
    const handleSkip = () => {
      if (finishedRef.current || cancelled) return;
      // Finish immediately.
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setDisplayed(text);
      setDone(true);
      finishedRef.current = true;
      onComplete?.();
    };

    window.addEventListener('terminal-skip-typing', handleSkip as EventListener);

    return () => {
      cancelled = true;
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
      lastFrameRef.current = null;
      window.removeEventListener('terminal-skip-typing', handleSkip as EventListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, instant, active]);

  return { displayed, done };
}
