export function About() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto rounded-full"></div>
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
