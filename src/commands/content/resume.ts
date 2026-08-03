import { registerCommand } from '@/commands/registry';
import { profile } from '@/constants/profile';

registerCommand({
  name: 'resume',
  description: 'Download my resume (PDF)',
  execute: () => {
    const url = `${import.meta.env.BASE_URL}${profile.resumePath}`;
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Samarth_Bhatt_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return [
      { variant: 'success', content: 'Downloading resume...' },
      { variant: 'node', node: { kind: 'link', label: 'Direct link', url } },
    ];
  },
});
