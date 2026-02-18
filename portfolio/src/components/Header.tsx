import { ArrowUpRight } from 'lucide-react';

export default function Header() {
     return (
          <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:py-6 flex items-center justify-between">
               <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg tracking-tight">markromolecule</span>
               </div>

               <a href="mailto:livadomc@gmail.com" className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/20 transition-all text-sm font-medium">
                    Contact Me
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
               </a>
          </header>
     );
}
