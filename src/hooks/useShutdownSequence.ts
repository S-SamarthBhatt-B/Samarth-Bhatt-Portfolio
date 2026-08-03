import { useEffect, useState } from 'react';
import { sleep } from '@/utils/sleep';

const shutdownLines = [
  'Saving session...',
  'Closing terminal modules...',
  'Unmounting file system...',
  'Shutting down SamarthOS...',
];

export type ShutdownStage = 'lines' | 'black' | 'done';

export function useShutdownSequence() {
  const [stage, setStage] = useState<ShutdownStage>('lines');
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      for (let i = 0; i < shutdownLines.length; i += 1) {
        if (cancelled) return;
        await sleep(350);
        setVisibleLines((prev) => [...prev, shutdownLines[i]]);
      }
      await sleep(500);
      if (cancelled) return;
      setStage('black');
      await sleep(1200);
      if (cancelled) return;
      setStage('done');
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { stage, visibleLines };
}
