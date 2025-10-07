import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { Achievements } from '@/components/Achievements';
import { Footer } from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Achievements />
      </main>
      <Footer />
    </div>
  );
}

export default App;
