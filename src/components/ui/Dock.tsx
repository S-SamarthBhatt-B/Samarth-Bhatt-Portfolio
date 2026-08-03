import { motion } from 'framer-motion';
import { guiSections } from '@/constants/sections';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useOSState } from '@/hooks/useOSState';

export default function Dock() {
  const activeId = useActiveSection(guiSections.map((s) => s.id));
  const enterTerminal = useOSState((s) => s.enterTerminal);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="glass fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-2 shadow-glow"
      aria-label="Section navigation"
    >
      {guiSections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors sm:text-sm ${
            activeId === section.id ? 'bg-os-accent text-black' : 'text-os-muted hover:text-os-accent'
          }`}
        >
          {section.label}
        </button>
      ))}
      <span className="mx-1 h-5 w-px bg-os-border" />
      <button
        onClick={enterTerminal}
        className="rounded-full px-3 py-1.5 font-mono text-xs text-os-muted hover:text-os-accent sm:text-sm"
        title="Back to terminal"
      >
        ⌘_
      </button>
    </motion.nav>
  );
}
