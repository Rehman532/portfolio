import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Testimonials from '@/components/sections/Testimonials'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: "Client Testimonials & Reviews | Flutter Developer Feedback | Next.js Development Recommendations",
  description: "Read authentic client testimonials and reviews for Rehman Farouq's Flutter and Next.js development work. Discover client feedback, project recommendations, colleague endorsements, and professional references that validate expertise and quality of work.",
  keywords: "client testimonials, developer reviews, Flutter developer feedback, Next.js development reviews, client recommendations, professional references, software developer testimonials, web development feedback, mobile app development reviews, client success stories, developer endorsements, project testimonials, coding reviews, technical testimonials, client satisfaction",
  openGraph: {
    title: "Client Testimonials & Reviews | Flutter Developer Feedback | Next.js Development Recommendations",
    description: "Read authentic client testimonials and reviews for Rehman Farouq's Flutter and Next.js development work. Discover client feedback, project recommendations, and professional references.",
    url: "https://rehmanfarouq.site/testimonials",
    type: "website",
    siteName: "Rehman Farouq Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Client Testimonials & Reviews | Flutter Developer Feedback",
    description: "Read authentic client testimonials and reviews for Rehman Farouq's Flutter and Next.js development work. Discover client feedback and professional references.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://rehmanfarouq.site/testimonials",
  },
}

export default function TestimonialsPage() {
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
              <span className="text-sm font-medium text-pink-600 dark:text-pink-400">Testimonials</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection delay={200}>
            <Testimonials />
          </AnimatedSection>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
