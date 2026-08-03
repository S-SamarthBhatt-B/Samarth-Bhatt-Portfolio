// Side-effect imports: each module calls registerCommand() at load time.
// Phase 4 will add imports for content/, links/, modes/, and easterEggs/ here.
import '@/commands/core/help';
import '@/commands/core/clear';
import '@/commands/core/date';
import '@/commands/core/whoami';
import '@/commands/core/exit';

export {};
