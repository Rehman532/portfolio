import { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: "Home | Rehman Farouq - Flutter & Next.js Developer",
  description: "Welcome to my portfolio! I'm Rehman Farouq, a passionate Flutter and Next.js developer creating innovative mobile and web applications.",
  openGraph: {
    title: "Home | Rehman Farouq - Flutter & Next.js Developer",
    description: "Welcome to my portfolio! I'm Rehman Farouq, a passionate Flutter and Next.js developer creating innovative mobile and web applications.",
    url: "https://rehmanfarouq.site",
  },
}

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
