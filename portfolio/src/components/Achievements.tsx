const achievements = [
  {
    year: '2025',
    title: '🔥 Create & Conquer Hackathon',
    description: 'Secured 1st place in a competitive hackathon focused on developing innovative virtual assistant solutions.',
  },
  {
    year: '2024',
    title: '📌 Dean’s List Recognition',
    description: 'Achieved Dean’s List status for outstanding academic performance in Information Technology.',
  },
  {
    year: '2022',
    title: '👋🏻 Hello, everyone!',
    description: 'My first line of code',
  }
];

export function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key milestones and accomplishments in my development journey
            </p>
          </div>
        </div>
        
        <div className="space-y-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="relative">
              {/* Timeline line */}
              {index < achievements.length - 1 && (
                <div className="absolute left-4 top-12 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
              )}
              
              <div className="flex items-start space-x-6">
                {/* Year badge */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {achievement.year.slice(-2)}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="bg-white dark:bg-black rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-800">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {achievement.description}
                      </p>
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {achievement.year}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
