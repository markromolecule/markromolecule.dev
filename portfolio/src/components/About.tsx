export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              About Me
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
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I'm a third-year BS Information Technology student at NU Dasmariñas, 
              passionate about building efficient and user-focused mobile and web applications.

            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
             When I'm not coding, I enjoy exploring new technologies, building personal projects, 
             and continuously learning to stay up-to-date with the latest trends in web development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
