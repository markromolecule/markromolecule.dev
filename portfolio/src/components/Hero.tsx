import { Button } from '@/components/ui/button';

const certifications = [
  {
    id: 'microsoft-databases',
    title: 'Microsoft IT Specialist',
    subtitle: 'Databases',
    image: 'https://images.credly.com/images/49a492cd-5f72-4c9d-aafa-06649e4853fb/MicrosoftTeams-image__5_.png',
    url: 'https://www.credly.com/badges/e5c4ce97-eabc-44c4-9453-f0e970b1977d/public_url',
    alt: 'Microsoft IT Specialist: Databases'
  },
];

export function Hero() {
  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
        <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
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
