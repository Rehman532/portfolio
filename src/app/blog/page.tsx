import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Blog from '@/components/sections/Blog'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: "Blog | Rehman Farouq - Flutter & Next.js Developer",
  description: "Read articles, tutorials, and insights about Flutter, Next.js, and modern web development. Learn best practices, tips, and tricks for mobile and web development.",
  openGraph: {
    title: "Blog | Rehman Farouq - Flutter & Next.js Developer",
    description: "Read articles, tutorials, and insights about Flutter, Next.js, and modern web development. Learn best practices, tips, and tricks for mobile and web development.",
    url: "https://rehmanfarouq.site/blog",
  },
}

export default function BlogPage() {
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
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Blog</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatedSection delay={200}>
          <Blog />
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
