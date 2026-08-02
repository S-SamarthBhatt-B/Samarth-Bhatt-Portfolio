/**
 * TEMPORARY placeholder for Phase 1 scaffolding verification.
 * Replaced in Phase 3 with the full custom terminal engine
 * (input handling, history, autocomplete, cursor, scrollback).
 */
export default function Terminal() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-os-bg p-6 text-center">
      <p className="text-os-accent text-glow font-display text-xl">SamarthOS</p>
      <p className="text-os-muted text-sm">Terminal engine arrives in Phase 3.</p>
    </div>
  );
}
