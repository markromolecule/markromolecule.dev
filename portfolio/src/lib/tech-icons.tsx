import { SiLaravel, SiNextdotjs, SiReact, SiTailwindcss, SiPostgresql, SiGit, SiJavascript, SiPhp} from 'react-icons/si';

export const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Laravel': SiLaravel,
  'Next.js': SiNextdotjs,
  'React Native': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'PostgreSQL': SiPostgresql,
  'Git': SiGit,
  'JavaScript': SiJavascript,
  'Vanilla PHP': SiPhp,
};