import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { techIcons } from '@/lib/tech-icons';
import { cn } from '@/lib/utils';

const technologies = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'Kotlin', category: 'Mobile' },
  { name: 'Vanilla PHP', category: 'Backend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Git', category: 'Version Control' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Visual Studio Code', category: 'Development Tools' },
  { name: 'Postman', category: 'Development Tools' },
];

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TechStackModal({ isOpen, onClose }: TechStackModalProps) {
  // Group technologies by category
  const groupedTech = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  const categories = Object.keys(groupedTech);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        // Layout and dimensions
        'max-w-4xl max-h-[80vh] w-full',
        // Spacing and padding
        'p-0',
        // Background and borders
        'bg-white dark:bg-black border-gray-200 dark:border-gray-800',
        // External classes
        'overflow-hidden',
        // Hide default close button
        '[&>button:last-child]:hidden'
      )}>
        <DialogHeader className={cn(
          // Layout and spacing
          'relative flex flex-row items-center p-6 pb-4',
          // Borders
          'border-b border-gray-200 dark:border-gray-800'
        )}>
          <DialogTitle className={cn(
            // Typography
            'text-2xl font-bold text-gray-900 dark:text-white',
            // Layout
            'flex-1'
          )}>
            Complete Tech Stack
          </DialogTitle>
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                // Layout and sizing
                'h-8 w-8 absolute right-4 top-1/2 -translate-y-1/2',
                // Colors
                'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>

        <div className={cn(
          // Layout and spacing
          'p-6 pt-4 overflow-y-auto max-h-[60vh]',
          // Responsive spacing
          'space-y-8'
        )}>
          {categories.map((category) => (
            <div key={category} className={cn(
              // Layout and spacing
              'space-y-4'
            )}>
              <h3 className={cn(
                // Typography
                'text-lg font-semibold text-gray-900 dark:text-white',
                // Borders
                'border-b border-gray-200 dark:border-gray-800 pb-2'
              )}>
                {category}
              </h3>
              
              <div className={cn(
                // Layout
                'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'
              )}>
                {groupedTech[category].map((tech) => {
                  const IconComponent = techIcons[tech.name];
                  return (
                    <div
                      key={tech.name}
                      className={cn(
                        // Layout and spacing
                        'flex flex-col items-center p-3',
                        // Borders and corners
                        'rounded-lg border border-gray-200 dark:border-gray-800',
                        // Background
                        'bg-gray-50 dark:bg-gray-900',
                        // Hover state
                        'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200'
                      )}
                    >
                      <div className={cn(
                        // Layout and sizing
                        'w-10 h-10 mb-2',
                        // Borders and corners
                        'rounded-lg',
                        // Background
                        'bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center'
                      )}>
                        {IconComponent ? (
                          <IconComponent className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-bold text-xs">
                            {tech.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <span className={cn(
                        // Typography
                        'text-xs font-medium text-gray-700 dark:text-gray-300 text-center'
                      )}>
                        {tech.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
