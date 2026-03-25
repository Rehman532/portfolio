import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'
import Blog from '@/components/sections/Blog'
import Footer from '@/components/layout/Footer'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Testimonials from '@/components/sections/Testimonials'
import Certifications from '@/components/sections/Certifications'

export const metadata: Metadata = {
  title: "Rehman Farouq - Full Stack Developer | Flutter & Next.js Portfolio | React, TypeScript, Web Development",
  description: "Professional full stack developer portfolio showcasing expertise in Flutter, Next.js, React, TypeScript, and modern web development. Explore innovative mobile apps, web applications, developer tools, and technical projects. Hire for freelance development work.",
  keywords: "full stack developer, Flutter developer, Next.js developer, React developer, TypeScript, web development, mobile app development, portfolio, software engineer, frontend developer, backend developer, freelance developer, React Native, Tailwind CSS, Node.js, JavaScript, developer tools",
  openGraph: {
    title: "Rehman Farouq - Full Stack Developer | Flutter & Next.js Portfolio | React, TypeScript, Web Development",
    description: "Professional full stack developer portfolio showcasing expertise in Flutter, Next.js, React, TypeScript, and modern web development. Explore innovative mobile apps, web applications, developer tools, and technical projects. Hire for freelance development work.",
    url: "https://rehmanfarouq.site",
    type: "website",
    siteName: "Rehman Farouq Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rehman Farouq - Full Stack Developer | Flutter & Next.js Portfolio",
    description: "Professional full stack developer portfolio showcasing expertise in Flutter, Next.js, React, TypeScript, and modern web development.",
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
      {/* <Blog /> */}
      <Testimonials />
      <Certifications />
      <Contact />
      <Footer />
      <ScrollProgress />
    </div>
  );
}
