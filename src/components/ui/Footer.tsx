import { profile } from '@/constants/profile';
import { useOSState } from '@/hooks/useOSState';

export default function Footer() {
  const enterTerminal = useOSState((s) => s.enterTerminal);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-os-border px-6 py-8 text-center">
      <p className="font-mono text-xs text-os-muted">
        © {year} {profile.name}. Built as SamarthOS.
      </p>
      <button
        onClick={enterTerminal}
        className="mt-2 font-mono text-xs text-os-accent hover:underline"
      >
        ← back to terminal
      </button>
    </footer>
  );
}
