import type { SkillGroup } from '@/types/command.types';

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'SQL', 'JavaScript'],
  },
  {
    category: 'Data Science',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'EDA', 'Statistical Analysis'],
  },
  {
    category: 'BI & Spreadsheets',
    items: ['Power BI', 'DAX', 'Excel (PivotTables, Power Query)', 'openpyxl', 'VBA'],
  },
  {
    category: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'Google Colab', 'VS Code'],
  },
  {
    category: 'Systems & Ops',
    items: ['Windows/Linux Administration', 'Server Configuration', 'BIOS Troubleshooting'],
  },
];
