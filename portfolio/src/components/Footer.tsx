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
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and description */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">S4INT</h3>
            <p className="text-gray-400 max-w-md">
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
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={link.name}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Mark Joseph Livado. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
