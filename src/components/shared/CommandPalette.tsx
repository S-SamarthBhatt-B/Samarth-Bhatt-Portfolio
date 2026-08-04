import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCommand, FiTerminal, FiLayout } from 'react-icons/fi';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { useOSState } from '@/hooks/useOSState';
import { getVisibleCommands } from '@/commands/registry';
import { guiSections } from '@/constants/sections';

interface PaletteItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette() {
  const { isOpen, close, setPendingCommand } = useCommandPalette();
  const mode = useOSState((s) => s.mode);
  const enterTerminal = useOSState((s) => s.enterTerminal);
  const beginGuiTransition = useOSState((s) => s.beginGuiTransition);
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setHighlighted(0);
      // Wait a tick for the modal to mount before focusing.
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [isOpen]);

  const items = useMemo<PaletteItem[]>(() => {
    const modeItems: PaletteItem[] =
      mode === 'terminal'
        ? [{ id: 'goto-gui', label: 'Open Desktop', description: 'Switch to the graphical portfolio', icon: <FiLayout />, action: beginGuiTransition }]
        : mode === 'gui'
          ? [{ id: 'goto-terminal', label: 'Open Terminal', description: 'Switch back to the terminal', icon: <FiTerminal />, action: enterTerminal }]
          : [];

    const commandItems: PaletteItem[] =
      mode === 'terminal'
        ? getVisibleCommands().map((cmd) => ({
            id: `cmd-${cmd.name}`,
            label: cmd.name,
            description: cmd.description,
            icon: <FiTerminal />,
            action: () => setPendingCommand(cmd.name),
          }))
        : [];

    const sectionItems: PaletteItem[] =
      mode === 'gui'
        ? guiSections.map((section) => ({
            id: `section-${section.id}`,
            label: section.label,
            description: `Jump to the ${section.label} section`,
            icon: <FiLayout />,
            action: () => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' }),
          }))
        : [];

    return [...modeItems, ...sectionItems, ...commandItems];
  }, [mode, beginGuiTransition, enterTerminal, setPendingCommand]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => item.label.toLowerCase().includes(q) || item.description.toLowerCase().includes(q));
  }, [items, query]);

  const runItem = (item: PaletteItem | undefined) => {
    if (!item) return;
    item.action();
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runItem(filtered[highlighted]);
    } else if (e.key === 'Escape') {
      close();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-lg overflow-hidden rounded-xl shadow-glow"
          >
            <div className="flex items-center gap-2 border-b border-os-border/70 px-4 py-3">
              <FiCommand className="h-4 w-4 text-os-muted" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setHighlighted(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={mode === 'terminal' ? 'Search commands...' : 'Search sections...'}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="flex-1 bg-transparent font-mono text-sm text-os-text outline-none placeholder:text-os-muted"
                aria-label="Command palette search"
              />
              <kbd className="rounded border border-os-border px-1.5 py-0.5 font-mono text-[10px] text-os-muted">esc</kbd>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && <p className="px-3 py-6 text-center text-sm text-os-muted">No matches.</p>}
              {filtered.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => runItem(item)}
                  onMouseEnter={() => setHighlighted(index)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left font-mono text-sm transition-colors ${
                    highlighted === index ? 'bg-os-accentSoft text-os-accent' : 'text-os-text hover:bg-os-accentSoft/50'
                  }`}
                >
                  <span className="flex-shrink-0 text-os-muted">{item.icon}</span>
                  <span className="flex-shrink-0">{item.label}</span>
                  <span className="truncate text-xs text-os-muted">{item.description}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
