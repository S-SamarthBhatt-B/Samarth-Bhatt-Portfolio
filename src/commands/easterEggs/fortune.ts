import { registerCommand } from '@/commands/registry';

const fortunes = [
  'Clean code always looks like it was written by someone who cares.',
  'First, solve the problem. Then, write the code.',
  'The best error message is the one that never shows up.',
  'Data is the new oil, but insight is the refinery.',
  'A good dashboard answers questions nobody thought to ask.',
];

registerCommand({
  name: 'fortune',
  description: 'Receive a random fortune',
  hidden: true,
  execute: () => [{ variant: 'success', content: fortunes[Math.floor(Math.random() * fortunes.length)] }],
});
