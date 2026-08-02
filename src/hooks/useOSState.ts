import { create } from 'zustand';

export type OSMode = 'boot' | 'terminal' | 'shutting-down' | 'gui';

interface OSState {
  mode: OSMode;
  setMode: (mode: OSMode) => void;
  enterTerminal: () => void;
  enterGui: () => void;
  beginShutdown: () => void;
}

/**
 * Single source of truth for which "screen" of SamarthOS is currently mounted.
 * Kept intentionally tiny — each mode is a full-screen component in
 * `components/layout/OSShell.tsx`, and Framer Motion's AnimatePresence
 * handles the crossfade/transition between them.
 */
export const useOSState = create<OSState>((set) => ({
  mode: 'boot',
  setMode: (mode) => set({ mode }),
  enterTerminal: () => set({ mode: 'terminal' }),
  enterGui: () => set({ mode: 'gui' }),
  beginShutdown: () => set({ mode: 'shutting-down' }),
}));
