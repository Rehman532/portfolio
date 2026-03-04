import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Testimonials from '@/components/sections/Testimonials'
import Certifications from '@/components/sections/Certifications'

export default function Home() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Testimonials />
      <Certifications />
      <Contact />
      <Footer />
      <ScrollProgress />
    </div>
  );
}
