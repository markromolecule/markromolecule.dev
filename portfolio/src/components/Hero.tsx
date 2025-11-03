import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { certifications, fontFamilies } from '@/components/common/constants/hero-constants';

export function Hero() {
  const [currentFont, setCurrentFont] = useState('font-bold');
  
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * fontFamilies.length);
      setCurrentFont(fontFamilies[randomIndex]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900 relative overflow-hidden">
          {/* Background Design Elements */}
          <div className="absolute inset-0">
            {/* Geometric shapes */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-xl opacity-60"></div>
            <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-lg opacity-50"></div>
            <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-md opacity-40"></div>
            <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-sm opacity-30"></div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>
            
            {/* Animated floating elements */}
            <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 dark:bg-cyan-500 rounded-full opacity-40 animate-ping"></div>
            <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-purple-400 dark:bg-purple-500 rounded-full opacity-50 animate-bounce"></div>
          </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Hi, I'm{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 ${currentFont} transition-all duration-500`}>
                Joseph
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Building reliable and modern mobile & web experiences
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToProjects}
              size="lg"
              className="text-lg px-8 py-3"
            >
              View My Work
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const element = document.querySelector('#about');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-lg px-8 py-3"
            >
              Learn More
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              disabled
              className={cn(
                // Base styles
                'text-lg px-8 py-3',
                // Disabled state emphasis
                'opacity-50 cursor-not-allowed',
                // Visual indicators for disabled state
                'border-dashed border-2',
                'bg-gray-50 dark:bg-gray-800',
                'text-gray-400 dark:text-gray-500',
                'hover:opacity-50 hover:cursor-not-allowed',
                // Remove any hover effects
                'hover:bg-gray-50 dark:hover:bg-gray-800',
                'hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              Résumé
            </Button>
          </div>
          
              {/* Certifications Section */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Certified Professional
                  </p>
                  
                  {/* Dynamic Certifications */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    {certifications.map((cert) => (
                      <a 
                        key={cert.id}
                        href={cert.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="flex items-center space-x-3 bg-white dark:bg-gray-900 rounded-lg px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                          <img 
                            src={cert.image} 
                            alt={cert.alt} 
                            className="w-12 h-12 object-contain"
                          />
                          <div className="text-left">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {cert.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {cert.subtitle}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
        </div>
      </div>
    </section>
  );
}
