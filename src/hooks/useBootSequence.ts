import { useEffect, useState } from 'react';
import { bootLines } from '@/constants/bootSequence';
import { sleep } from '@/utils/sleep';

export type BootStage =
  | 'black'
  | 'powering-on'
  | 'boot-lines'
  | 'progress-bar'
  | 'opening-terminal'
  | 'logo'
  | 'welcome';

interface BootSequenceState {
  stage: BootStage;
  visibleLines: string[];
  progress: number;
}

/**
 * Drives the full startup flow described in the SamarthOS spec:
 * black screen -> "Powering On..." -> boot lines -> progress bar ->
 * "Opening Terminal..." -> ASCII logo -> welcome message -> onComplete.
 *
 * Each stage's timing lives here so BootScreen stays a pure render layer.
 */
export function useBootSequence(onComplete: () => void) {
  const [state, setState] = useState<BootSequenceState>({
    stage: 'black',
    visibleLines: [],
    progress: 0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Reduced-motion users still get the full sequence, just compressed.
    const speed = prefersReducedMotion ? 0.15 : 1;
    let cancelled = false;

    async function run() {
      // Stage 1: black screen, no UI
      await sleep(900 * speed);
      if (cancelled) return;

      // Stage 2: Powering On...
      setState((s) => ({ ...s, stage: 'powering-on' }));
      await sleep(1000 * speed);
      if (cancelled) return;

      // Stage 3: boot lines, one by one
      setState((s) => ({ ...s, stage: 'boot-lines' }));
      for (let i = 0; i < bootLines.length; i += 1) {
        if (cancelled) return;
        await sleep(220 * speed);
        setState((s) => ({ ...s, visibleLines: bootLines.slice(0, i + 1) }));
      }
      await sleep(300 * speed);
      if (cancelled) return;

      // Stage 4: progress bar 0 -> 100
      setState((s) => ({ ...s, stage: 'progress-bar' }));
      const steps = 40;
      for (let i = 1; i <= steps; i += 1) {
        if (cancelled) return;
        await sleep(25 * speed);
        setState((s) => ({ ...s, progress: Math.round((i / steps) * 100) }));
      }
      await sleep(250 * speed);
      if (cancelled) return;

      // Stage 5: Opening Terminal...
      setState((s) => ({ ...s, stage: 'opening-terminal' }));
      await sleep(800 * speed);
      if (cancelled) return;

      // Stage 6: ASCII logo
      setState((s) => ({ ...s, stage: 'logo' }));
      await sleep(1400 * speed);
      if (cancelled) return;

      // Stage 7: welcome message, then launch terminal
      setState((s) => ({ ...s, stage: 'welcome' }));
      await sleep(1300 * speed);
      if (cancelled) return;

      onComplete();
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}
