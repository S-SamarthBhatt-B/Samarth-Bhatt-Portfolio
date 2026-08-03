import { registerCommand } from '@/commands/registry';

const CHARSET = 'アイウエオカキクケコ0123456789ABCDEF';

function randomLine(length: number): string {
  return Array.from({ length }, () => CHARSET[Math.floor(Math.random() * CHARSET.length)]).join(' ');
}

registerCommand({
  name: 'matrix',
  description: 'Follow the white rabbit',
  hidden: true,
  execute: () => {
    const art = Array.from({ length: 8 }, () => randomLine(20)).join('\n');
    return [
      { variant: 'success', content: 'Wake up, Samarth...' },
      { variant: 'node', node: { kind: 'ascii', art } },
      { variant: 'muted', content: 'There is no spoon.' },
    ];
  },
});
