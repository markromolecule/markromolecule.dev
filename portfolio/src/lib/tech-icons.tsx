import { 
  SiLaravel, 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiPostgresql, 
  SiGit, 
  SiJavascript, 
  SiPhp,
  SiBootstrap,
  SiTypescript,
  SiExpress,
  SiMysql,
  SiPostman,
  SiKotlin
} from 'react-icons/si';

import { VscVscode } from "react-icons/vsc";

export const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Laravel': SiLaravel,
  'Next.js': SiNextdotjs,
  'React Native': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'Bootstrap': SiBootstrap,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'Git': SiGit,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'Vanilla PHP': SiPhp,
  'Express.js': SiExpress,
  'Visual Studio Code': VscVscode,
  'Postman': SiPostman,
    'Kotlin': SiKotlin,
};