const technologies = [
     "Next.js", "TypeScript", 
     "Hono", "Prisma", "Kysely",
     "PostgreSQL", "MySQL", 
     "Expo", "Git",
     "Postman", "Docker"
];

export default function Services() {
     return (
          <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
               <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                         <span className="text-muted-foreground block text-lg mb-2 font-normal">my stack</span>
                         technologies
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                         The tools I use to build scalable applications.
                    </p>
               </div>

               <div className="flex flex-wrap gap-x-8 gap-y-2 max-w-2xl">
                    {technologies.map((tech, index) => (
                         <span
                              key={index}
                              className="text-xl md:text-2xl text-muted-foreground/60 hover:text-white transition-colors duration-300 cursor-default font-light"
                         >
                              {tech}
                         </span>
                    ))}
               </div>
          </section>
     );
}
