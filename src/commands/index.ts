// Side-effect imports: each module calls registerCommand() at load time.
import '@/commands/core/help';
import '@/commands/core/clear';
import '@/commands/core/date';
import '@/commands/core/time';
import '@/commands/core/whoami';
import '@/commands/core/pwd';
import '@/commands/core/ls';
import '@/commands/core/cat';
import '@/commands/core/exit';
import '@/commands/core/theme';

import '@/commands/content/about';
import '@/commands/content/name';
import '@/commands/content/skills';
import '@/commands/content/projects';
import '@/commands/content/education';
import '@/commands/content/experience';
import '@/commands/content/resume';
import '@/commands/content/timeline';
import '@/commands/content/stats';

import '@/commands/modes/ui';

import '@/commands/links/github';
import '@/commands/links/linkedin';
import '@/commands/links/contact';
import '@/commands/links/email';
import '@/commands/links/phone';
import '@/commands/links/socials';

import '@/commands/easterEggs/matrix';
import '@/commands/easterEggs/coffee';
import '@/commands/easterEggs/hack';
import '@/commands/easterEggs/sudo';
import '@/commands/easterEggs/fortune';
import '@/commands/easterEggs/hello';
import '@/commands/easterEggs/whoareyou';

export {};
