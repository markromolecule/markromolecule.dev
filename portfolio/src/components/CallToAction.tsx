import { ArrowUpRight, Copy } from 'lucide-react';

export default function CallToAction() {
     return (
          <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center md:text-left">
               <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                         you see what I build. <br />
                         <span className="text-muted-foreground">_</span> let's build your idea next.
                    </h2>
               </div>

               <div className="flex flex-col md:flex-row gap-6 items-center">
                    <a href="mailto:livadomc@gmail.com" className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent hover:bg-white/5 transition-colors text-base font-medium">
                         Contact Me
                         <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                         <span>Or send me an email at →</span>
                         <button
                              className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors group"
                              onClick={() => navigator.clipboard.writeText('livadomc@gmail.com')}
                         >
                              livadomc@gmail.com
                              <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                         </button>
                    </div>
               </div>
          </section>
     );
}
