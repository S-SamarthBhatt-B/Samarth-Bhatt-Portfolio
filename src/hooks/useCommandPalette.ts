import { create } from 'zustand';

interface CommandPaletteState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Set when the palette picks a terminal command while in Terminal mode;
   *  Terminal.tsx watches this and runs + clears it. Keeps the palette
   *  decoupled from the Terminal component's own execution state. */
  pendingCommand: string | null;
  setPendingCommand: (command: string) => void;
  clearPendingCommand: () => void;
}

export const useCommandPalette = create<CommandPaletteState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  pendingCommand: null,
  setPendingCommand: (command) => set({ pendingCommand: command }),
  clearPendingCommand: () => set({ pendingCommand: null }),
}));
