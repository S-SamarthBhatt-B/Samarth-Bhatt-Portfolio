import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Timeline from './Timeline';
import Projects from './Projects';
import Resume from './Resume';
import Contact from './Contact';
import Footer from './Footer';
import Dock from './Dock';

export default function GuiPortfolio() {
  return (
    <div className="relative min-h-screen bg-os-bg">
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Projects />
      <Resume />
      <Contact />
      <Footer />
      <Dock />
    </div>
  );
}
