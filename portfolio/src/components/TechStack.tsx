import { techIcons } from '@/lib/tech-icons';

const technologies = [
  { name: 'Laravel', category: 'Framework' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'React Native', category: 'Mobile' },
  { name: 'JavaScript', category: 'Programming Language' },
  { name: 'Vanilla PHP', category: 'Backend' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Git', category: 'Version Control' },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Tech Stack
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I use to build modern web applications
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-12">
            {technologies.map((tech) => {
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
        </div>
      </div>
    </section>
  );
}