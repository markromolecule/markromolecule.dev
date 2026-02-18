import { ArrowUpRight } from 'lucide-react';

const projects = [
     {
          name: "EHM-J Enterprises",
          tags: ["React", "PostgreSQL", "Tawk.to"],
          quote: "An e-commerce platform for HVAC services and products, featuring product catalogs, service booking, secure payment processing, and live chat to agent integration.",
          url: "https://www.ehmj-enterprises.app/home"
     },
     {
          name: "Sentinel PH",
          tags: ["Next.JS", "Expo", "Hono", "MediaPipe", "LiveKit", "PostgreSQL"],
          quote: "A mobile and web-based proctoring system with gaze tracking and audio analysis for secure on-site and remote examinations",
          url: "https://www.sentinelph.tech/"
     }
];

export default function Projects() {
     return (
          <section id="projects" className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
               <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 flex items-center gap-2">
                         <span className="text-muted-foreground text-lg font-normal">_</span>
                         featured projects
                    </h2>
                    <p className="text-muted-foreground text-lg">
                         Selected works showcasing specialized skills in full-stack development.
                    </p>
               </div>

               <div className="flex flex-col gap-8">
                    {projects.map((project) => (
                         <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              key={project.name}
                              className="group block border-b border-white/5 pb-8 last:border-0 last:pb-0"
                         >
                              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
                                   <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-white text-xl group-hover:text-blue-400 transition-colors">
                                             {project.name}
                                        </h3>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-400 transition-colors opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 duration-300" />
                                   </div>

                                   <div className="flex flex-wrap gap-x-3 gap-y-1">
                                        {project.tags.map((tag) => (
                                             <span key={tag} className="text-xs text-muted-foreground/60 font-light">
                                                  {tag}
                                             </span>
                                        ))}
                                   </div>
                              </div>

                              <p className="text-muted-foreground text-base font-light leading-relaxed max-w-xl group-hover:text-foreground/80 transition-colors duration-300">
                                   {project.quote}
                              </p>
                         </a>
                    ))}
               </div>
          </section>
     );
}
