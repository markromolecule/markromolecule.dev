import { techIcons } from '@/lib/tech-icons';
import { Button } from '@/components/ui/button';
import { TechStackModal } from './TechStackModal';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useTechStackStore } from '@/stores/use-tech-stack';

export function TechStack() {
  const technologies = useTechStackStore(state => state.technologies);
  const visibleCount = useTechStackStore(state => state.visibleCount);
  const isModalOpen = useTechStackStore(state => state.isModalOpen);
  const setIsModalOpen = useTechStackStore(state => state.setIsModalOpen);
  
  // Show only first N technologies by default (based on visibleCount)
  const visibleTechnologies = technologies
    .filter(tech => tech.isVisible)
    .sort((a, b) => a.order - b.order)
    .slice(0, visibleCount);
  
  return (
    <>
      <section id="tech-stack" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Tech Stack
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
                Technologies and tools I use to build modern web applications
              </p>
            </div>
            
            {/* View All Button - Above Cards */}
            <div className={cn(
              // Layout and positioning
              'flex justify-start mb-4',
              // Responsive positioning
              'hidden sm:flex'
            )}>
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  // Layout and sizing
                  'flex items-center gap-2 px-0 py-1',
                  // Typography
                  'text-sm font-medium',
                  // Colors
                  'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                  // Transitions
                  'transition-all duration-200',
                  // Hover effects
                  'hover:bg-transparent group'
                )}
              >
                <span>View All Technologies</span>
                <ChevronRight className={cn(
                  // Layout and sizing
                  'h-4 w-4',
                  // Colors
                  'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200',
                  // Transitions
                  'transition-all duration-200 group-hover:translate-x-0.5'
                )} />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {visibleTechnologies.map((tech) => {
                const IconComponent = techIcons[tech.name];
                return (
                  <div
                    key={tech.name}
                    className="group bg-white dark:bg-black rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500"
                  >
                    <div className="text-center space-y-2"> 
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                        {IconComponent ? (
                          <IconComponent className="w-6 h-6 text-white" />
                        ) : (
                          <span className="text-white font-bold text-sm">
                            {tech.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {tech.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {tech.category}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Mobile View All Button */}
            <div className={cn(
              // Layout and spacing
              'flex justify-center mt-4',
              // Responsive visibility
              'sm:hidden'
            )}>
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(true)}
                className={cn(
                  // Layout and sizing
                  'flex items-center gap-2 px-0 py-1',
                  // Typography
                  'text-sm font-medium',
                  // Colors
                  'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
                  // Transitions
                  'transition-all duration-200',
                  // Hover effects
                  'hover:bg-transparent group'
                )}
              >
                <span>View All Technologies</span>
                <ChevronRight className={cn(
                  // Layout and sizing
                  'h-4 w-4',
                  // Colors
                  'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200',
                  // Transitions
                  'transition-all duration-200 group-hover:translate-x-0.5'
                )} />
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech Stack Modal */}
      <TechStackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}