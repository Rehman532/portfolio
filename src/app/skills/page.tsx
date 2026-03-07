import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Skills from '@/components/sections/Skills'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: "Technical Skills & Expertise | Full Stack Developer | Flutter, React, Next.js, TypeScript Skills",
  description: "Explore Rehman Farouq's comprehensive technical skills and programming expertise. Master of Flutter, React, Next.js, TypeScript, JavaScript, Node.js, Tailwind CSS, Git, and modern web development technologies. View skill levels and proficiency.",
  keywords: "technical skills, programming expertise, full stack developer skills, Flutter developer skills, React development expertise, Next.js proficiency, TypeScript skills, JavaScript programming, Node.js backend skills, Tailwind CSS expertise, Git version control, web development skills, mobile app development skills, programming languages, software development expertise, technical stack",
  openGraph: {
    title: "Technical Skills & Expertise | Full Stack Developer | Flutter, React, Next.js, TypeScript Skills",
    description: "Explore Rehman Farouq's comprehensive technical skills and programming expertise. Master of Flutter, React, Next.js, TypeScript, JavaScript, Node.js, and modern web development technologies.",
    url: "https://rehmanfarouq.site/skills",
    type: "website",
    siteName: "Rehman Farouq Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Skills & Expertise | Full Stack Developer | Flutter, React, Next.js",
    description: "Explore Rehman Farouq's comprehensive technical skills and programming expertise. Master of Flutter, React, Next.js, TypeScript, and modern web development technologies.",
  },
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 animate-in slide-in-from-top duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Portfolio</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Skills</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection delay={200}>
            <Skills />
          </AnimatedSection>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
