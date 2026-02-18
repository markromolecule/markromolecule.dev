import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

function App() {
  return (
    <div className="min-h-screen text-foreground selection:bg-white/20 relative">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background" style={{
        backgroundImage: `radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
        backgroundRepeat: 'no-repeat',
      }} />
      <Header />
      <main>
        <Hero />
        <Testimonials />
        <Services />
        <Projects />
        <CallToAction />
        <Footer />
      </main>
      <ChatWidget />
    </div>
  );
}

export default App;
