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
 * Drives the startup flow with a cinematic sequence and a skip path.
 */
export function useBootSequence(onComplete: () => void, skip = false) {
  const [state, setState] = useState<BootSequenceState>({
    stage: 'black',
    visibleLines: [],
    progress: 0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = prefersReducedMotion ? 0.16 : 1;
    let cancelled = false;

    const finish = () => {
      if (cancelled) return;
      setState({ stage: 'welcome', visibleLines: bootLines, progress: 100 });
      onComplete();
    };

    async function run() {
      if (skip) {
        finish();
        return;
      }

      await sleep(700 * speed);
      if (cancelled || skip) return finish();

      setState((s) => ({ ...s, stage: 'powering-on' }));
      await sleep(900 * speed);
      if (cancelled || skip) return finish();

      setState((s) => ({ ...s, stage: 'boot-lines' }));
      for (let i = 0; i < bootLines.length; i += 1) {
        if (cancelled || skip) return finish();
        await sleep(170 * speed);
        setState((s) => ({ ...s, visibleLines: bootLines.slice(0, i + 1) }));
      }
      await sleep(250 * speed);
      if (cancelled || skip) return finish();

      setState((s) => ({ ...s, stage: 'progress-bar' }));
      const steps = 42;
      for (let i = 1; i <= steps; i += 1) {
        if (cancelled || skip) return finish();
        await sleep(22 * speed);
        setState((s) => ({ ...s, progress: Math.round((i / steps) * 100) }));
      }
      await sleep(220 * speed);
      if (cancelled || skip) return finish();

      setState((s) => ({ ...s, stage: 'opening-terminal' }));
      await sleep(700 * speed);
      if (cancelled || skip) return finish();

      setState((s) => ({ ...s, stage: 'logo' }));
      await sleep(900 * speed);
      if (cancelled || skip) return finish();

      setState((s) => ({ ...s, stage: 'welcome' }));
      await sleep(900 * speed);
      if (cancelled || skip) return finish();

      finish();
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [onComplete, skip]);

  return state;
}
