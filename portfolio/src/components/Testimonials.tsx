
const testimonials = [
     {
          quote: "Mark delivered exactly what we needed. Fast execution, clear communication, and a high-quality website without any technical headaches.",
          name: "Efren Morta",
          title: "CEO, EHM-J Enterprises"
     },
];

export default function Testimonials() {
     return (
          <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
               <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                         <span className="text-muted-foreground block text-lg mb-2 font-normal">what they say</span>
                         testimonials
                    </h2>
               </div>

               <div className="space-y-12">
                    {testimonials.map((testimonial, index) => (
                         <div key={index} className="group">
                              <div className="relative pl-6 md:pl-8 border-l border-white/10 group-hover:border-blue-500 transition-colors duration-300">
                                   <p className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed mb-6">
                                        "{testimonial.quote}"
                                   </p>

                                   <div className="flex items-center gap-3">
                                        <div>
                                             <h3 className="font-medium text-white text-sm">{testimonial.name}</h3>
                                             <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    ))}
               </div>
          </section>
     );
}
