import { registerCommand } from '@/commands/registry';

const CUP_ART = ['      ( (', '       ) )', '    ........', "    |      |]", '    \\      /', "     `----'"].join('\n');

registerCommand({
  name: 'coffee',
  description: 'Brew a virtual coffee',
  hidden: true,
  execute: () => [
    { variant: 'node', node: { kind: 'ascii', art: CUP_ART } },
    { variant: 'success', content: "Here's your coffee. Back to work!" },
  ],
});
