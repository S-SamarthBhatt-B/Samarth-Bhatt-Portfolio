import profileImage from '@/assets/images/profile.jpg';

// ⚠️ PLACEHOLDER — replace email/phone with your real details before deploying.
export const profile = {
  name: 'Samarth Bhatt',
  handle: 'S-SamarthBhatt-B',
  title: 'Data Science & Blockchain Student',
  tagline: 'B.Tech CSE (Blockchain) @ CGC University Mohali — Batch 2024–2028',
  location: 'Mohali, Punjab, India',
  bio: [
    "I'm a B.Tech Computer Science & Blockchain student at CGC University Mohali, building a hands-on data science portfolio one project at a time.",
    'My toolkit runs through Python, Excel, and Power BI — I like taking a dataset from raw CSV to a polished, decision-ready dashboard.',
    "Outside of coursework, I run Surventure SMP, a Minecraft server I administer end-to-end: plugin config, economy systems, permissions, the works.",
  ],
  email: 'your.email@example.com', // TODO: replace
  phone: '+91 00000 00000', // TODO: replace
  avatar: profileImage,
  // These are relative (no leading slash) so they resolve correctly under
  // GitHub Pages' subpath base — always prefix with import.meta.env.BASE_URL at the point of use.
  resumePath: 'resume/Samarth_Bhatt_Resume.pdf',
  bannerPath: 'banner/banner.jpg',
  socials: [
    { label: 'GitHub', url: 'https://github.com/S-SamarthBhatt-B', handle: '@S-SamarthBhatt-B' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/samarth-bhatt29', handle: 'samarth-bhatt29' },
  ],
} as const;
