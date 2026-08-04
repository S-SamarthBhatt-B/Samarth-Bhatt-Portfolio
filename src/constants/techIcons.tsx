import type { IconType } from 'react-icons';
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiGithub,
  SiGooglecolab,
  SiTailwindcss,
  SiVite,
  SiFramer,
  SiSqlite,
  SiMysql,
  SiJupyter,
  SiOpenjdk,
} from 'react-icons/si';
import { TbCode, TbChartInfographic } from 'react-icons/tb';
import { FaJava, FaCss3Alt, FaHtml5 } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

/**
 * Maps a stack technology name (as written in constants/projects.ts) to an
 * icon component. Matching is case-insensitive. Anything unmapped falls
 * back to a generic code icon rather than breaking — this means adding a
 * new technology to a project never requires touching this file.
 *
 * Power BI has no official simple-icons entry (no public brand icon), so
 * it uses a generic chart icon instead.
 */
const ICON_MAP: Record<string, IconType> = {
  python: SiPython,
  pandas: SiPandas,
  numpy: SiNumpy,
  'power bi': TbChartInfographic,
  powerbi: TbChartInfographic,
  dax: TbChartInfographic,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  'node.js': SiNodedotjs,
  nodejs: SiNodedotjs,
  express: SiExpress,
  html: FaHtml5,
  css: FaCss3Alt,
  git: SiGit,
  github: SiGithub,
  'vs code': VscVscode,
  'visual studio code': VscVscode,
  'google colab': SiGooglecolab,
  colab: SiGooglecolab,
  tailwind: SiTailwindcss,
  'tailwind css': SiTailwindcss,
  vite: SiVite,
  framer: SiFramer,
  'framer motion': SiFramer,
  sql: SiMysql,
  sqlite: SiSqlite,
  jupyter: SiJupyter,
  java: FaJava,
  openjdk: SiOpenjdk,
};

export function getTechIcon(techName: string): IconType {
  const key = techName.trim().toLowerCase();
  return ICON_MAP[key] ?? TbCode;
}
