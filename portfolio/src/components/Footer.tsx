import { Github, Linkedin, Mail, Instagram } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/markromolecule',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mark-joseph-livado-01945b331/',
    icon: Linkedin,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/josephcstro_',
    icon: Instagram,
  },
  {
    name: 'Email',
    href: 'mailto:livadomc@gmail.com',
    icon: Mail,
  },
];

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-black dark:text-white relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and description */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-black to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              S4INT
            </h3>
            <p className="text-gray-700 dark:text-gray-300 max-w-md">
              Building reliable and modern web experiences with passion and precision.
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 hover:scale-110 transform"
                aria-label={link.name}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Mark Joseph Livado. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
