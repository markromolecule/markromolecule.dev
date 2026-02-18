import { ArrowUpRight, Copy, Github, Linkedin, Award } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20 pb-12 md:pt-24 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex flex-col items-start gap-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-tight">
            markromolecule <br />
            builds ideas
          </h1>
        </div>

        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          I'm Joseph, a developer who builds efficient, scalable, and user-centered applications.
          I turn concepts into shipping products.
        </p>

        <div className="pt-4 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
            <a href="#projects" className="w-fit group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-transparent hover:bg-white/5 transition-colors text-base font-medium">
              View Projects
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
        </div>

        {/* Quote Section */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <div className="flex gap-4 mb-4">
            <span className="text-4xl text-white/20 font-serif">"</span>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <span className="text-white">I write code,</span> and I design systems architecture. It started with side projects and turned into
            a passion for building full products. I don't just build fast; I understand what
            needs to be built and make sure it aligns to your business.
          </p>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              "ship <strong className="text-white font-medium">efficiently</strong>, design <strong className="text-white font-medium">intuitively</strong>, and <strong className="text-white font-medium">never stop learning</strong>."
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://github.com/markromolecule"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm text-muted-foreground hover:text-white"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mark-joseph-livado-01945b331/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm text-muted-foreground hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://www.credly.com/badges/e5c4ce97-eabc-44c4-9453-f0e970b1977d/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 transition-colors text-sm text-blue-300"
              >
                <Award className="w-4 h-4" />
                IT Specialist - Database
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
