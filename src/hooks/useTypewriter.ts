import { useEffect, useState } from 'react';

interface UseTypewriterOptions {
  /** Milliseconds between each character. */
  speed?: number;
  /** Delay before typing starts. */
  startDelay?: number;
  /** Skip animation entirely (used to respect prefers-reduced-motion). */
  instant?: boolean;
}

/**
 * Types out `text` character by character, returning the current visible
 * substring and a boolean for whether typing has finished.
 */
export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 18, startDelay = 0, instant = false } = options;
  const [displayed, setDisplayed] = useState(instant ? text : '');
  const [done, setDone] = useState(instant);

  useEffect(() => {
    if (instant) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    let cancelled = false;
    let index = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    setDisplayed('');
    setDone(false);

    const startTimer = setTimeout(() => {
      if (cancelled) return;
      interval = setInterval(() => {
        if (cancelled) return;
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, instant]);

  return { displayed, done };
}
