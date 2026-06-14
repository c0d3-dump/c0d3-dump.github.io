import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollReveal from './components/ScrollReveal';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Currently from './components/Currently';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ScrollReveal>
          <About />
        </ScrollReveal>
        <ScrollReveal>
          <Skills />
        </ScrollReveal>
        <ScrollReveal>
          <Projects />
        </ScrollReveal>
        <ScrollReveal>
          <Stats />
        </ScrollReveal>
        <ScrollReveal>
          <Currently />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
