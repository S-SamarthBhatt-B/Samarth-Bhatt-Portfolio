import { registerCommand } from '@/commands/registry';

registerCommand({
  name: 'whoareyou',
  description: 'Ask the terminal who it is',
  hidden: true,
  execute: () => [
    {
      variant: 'text',
      content: "I'm SamarthOS — a terminal built by Samarth Bhatt to show off his work in a way a plain resume never could.",
    },
  ],
});
