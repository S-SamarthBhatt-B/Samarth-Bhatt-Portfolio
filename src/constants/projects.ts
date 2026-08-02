import type { Project } from '@/types/project.types';

// ⚠️ PLACEHOLDER — swap in real screenshots, links, and refined copy per project.
// Adding a new project later is a one-object addition to this array; nothing else
// needs to change (terminal `projects` command and GUI Projects section both read this).
export const projects: Project[] = [
  {
    id: 'ai-impact-students',
    title: 'AI Impact on Students — Data Analytics',
    tagline: 'Excel → Python → Power BI pipeline on 50,000 synthetic records',
    description:
      'End-to-end analysis of how AI tool usage correlates with student outcomes. Built interactive Excel pivot dashboards, then moved to Python for statistical testing (ANOVA, correlation) before finishing with a Power BI report.',
    stack: ['Excel', 'Python', 'Pandas', 'NumPy', 'Power BI', 'DAX'],
    features: [
      'Interactive pivot dashboards with slicers in Excel',
      'Feature engineering with np.select and pd.qcut',
      'Group-wise statistical testing (ANOVA, correlation)',
      'Power BI report for stakeholder-ready insights',
    ],
    status: 'in-progress',
    year: '2026',
  },
  {
    id: 'osmi-mental-health',
    title: 'OSMI Mental Health in Tech — EDA',
    tagline: 'Full exploratory analysis across Python, Excel, and Power BI',
    description:
      'Summer Training capstone analyzing the OSMI Mental Health in Tech survey dataset, exploring workplace factors correlated with mental health outcomes in the tech industry.',
    stack: ['Python', 'Pandas', 'Seaborn', 'Excel', 'Power BI'],
    features: [
      'Full EDA with cleaning, visualization, and insight generation',
      'Cross-tool workflow: raw data → Python analysis → BI dashboard',
      'Published with a documented README on GitHub',
    ],
    githubUrl: 'https://github.com/S-SamarthBhatt-B',
    status: 'completed',
    year: '2025',
  },
  {
    id: 't20-worldcup-bi',
    title: 'T20 World Cup BI Dashboard',
    tagline: 'Star-schema data model across 6 linked CSV tables',
    description:
      'A business intelligence dashboard built on a proper star-schema design, with a full Power BI build guide and custom DAX measures for tournament performance analysis.',
    stack: ['Power BI', 'DAX', 'Data Modeling'],
    features: [
      'Star-schema dataset spanning 6 CSV tables',
      'Custom DAX measures for player/team performance',
      'Documented build guide for reproducibility',
    ],
    status: 'completed',
    year: '2025',
  },
  {
    id: 'zomato-eda',
    title: 'Zomato EDA',
    tagline: 'Exploratory analysis on real restaurant data',
    description:
      'Exploratory data analysis on a real 148-row Zomato restaurant dataset, uncovering patterns in cuisine, pricing, and ratings.',
    stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    features: ['Real-world (non-synthetic) dataset', 'Cuisine and pricing pattern analysis', 'Ratings distribution insights'],
    status: 'completed',
    year: '2025',
  },
  {
    id: 'surventure-smp',
    title: 'Surventure SMP',
    tagline: 'A self-administered Minecraft survival server',
    description:
      "A Minecraft SMP server I run end-to-end — plugin configuration, economy systems, permissions, and player experience design, all handled solo as a hobby project.",
    stack: ['Paper MC', 'Skript', 'LuckPerms', 'EconomyShopGUI'],
    features: [
      'Custom economy via EconomyShopGUI',
      'Permissions management with LuckPerms',
      'Skript-based custom item behavior fixes',
      'TAB, SuperbVote, and Kits GUI integration',
    ],
    status: 'ongoing',
    year: '2026',
  },
];
