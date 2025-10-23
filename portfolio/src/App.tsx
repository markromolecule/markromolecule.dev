import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { TechStack } from '@/components/TechStack';
import { Projects } from '@/components/Projects';
import { Achievements } from '@/components/Achievements';
import { Discussion } from '@/components/Discussion';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Main content sections of the portfolio */}
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Achievements />
        <Discussion />
      </main>
      <Footer />
      {/* Chat widget for real-time interaction */}
      <ChatWidget />
      <Analytics />
    </div>
  );
}

export default App;
