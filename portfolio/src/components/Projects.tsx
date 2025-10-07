import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'LakbAI',
    description: 'The project aims to modernize traditional jeepney transportation through a QR code–based checkpoint and fare system, enhanced with AI features for route prediction and fare optimization. Features include user authentication, QR code scanning, and payment integration.',
    tech: ['React Native', 'Laravel', 'MySQL', 'Xendit'],
    github: 'https://github.com/markromolecule/LakbAI',
    demo: 'https://lakb-ai-two.vercel.app',
  },
  {
    title: 'Nexus',
    description: 'This activity is a collaborative project where we work as a team to design and develop a simple gaming platform landing page. Each member is responsible for creating a uniquely styled landing page, while following a shared structure and design guidelines to ensure consistency and teamwork.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    github: 'https://github.com/markromolecule/Nexus',
    demo: 'https://nexus-phi-three.vercel.app',
  },
];

export function Projects() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingUrl, setPendingUrl] = useState<string | null>(null);
  const [pendingType, setPendingType] = useState<'code' | 'demo' | null>(null);

  const handleLinkClick = (url: string, type: 'code' | 'demo') => {
    setPendingUrl(url);
    setPendingType(type);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingUrl) {
      window.open(pendingUrl, '_blank', 'noopener,noreferrer');
    }
    setDialogOpen(false);
    setPendingUrl(null);
    setPendingType(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setPendingUrl(null);
    setPendingType(null);
  };

  return (
    <>
          <section id="projects" className="py-20 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Projects
              </h2>
              {/* Horizontal Thunder/Zigzag Line */}
              <div className="flex justify-center">
                <svg 
                  width="96" 
                  height="8" 
                  viewBox="0 0 96 8" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto"
                >
                  <defs>
                    <linearGradient id="thunderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0 4 L8 1 L16 6 L24 2 L32 7 L40 3 L48 5 L56 1 L64 6 L72 2 L80 5 L88 3 L96 4" 
                    stroke="url(#thunderGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                A collection of projects showcasing my skills and experience
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-200 dark:bg-gray-900 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                        >
                          {tech}
                        </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleLinkClick(project.github, 'code')}
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleLinkClick(project.demo, 'demo')}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>External Link Confirmation</DialogTitle>
            <DialogDescription>
              You are about to leave this site and visit an external link. 
              {pendingType === 'code' ? ' This will open the GitHub repository.' : ' This will open the live demo.'}
              <br /><br />
              <strong>URL:</strong> {pendingUrl}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
