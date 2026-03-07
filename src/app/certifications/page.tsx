import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Certifications from '@/components/sections/Certifications'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: "Professional Certifications & Credentials | Flutter Developer Certificate | React, Next.js Qualifications",
  description: "View Rehman Farouq's comprehensive professional certifications and verified credentials. Discover Flutter development certificates, React qualifications, Next.js expertise, web development certifications, programming achievements, and technical qualifications that validate expertise.",
  keywords: "professional certifications, developer credentials, Flutter developer certificate, React development certification, Next.js qualifications, web development certificates, programming certifications, technical qualifications, software development credentials, IT certifications, professional development certificates, verified developer skills, coding certifications, technology certificates",
  openGraph: {
    title: "Professional Certifications & Credentials | Flutter Developer Certificate | React, Next.js Qualifications",
    description: "View Rehman Farouq's comprehensive professional certifications and verified credentials. Discover Flutter development certificates, React qualifications, Next.js expertise, and web development certifications.",
    url: "https://rehmanfarouq.site/certifications",
    type: "website",
    siteName: "Rehman Farouq Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Certifications & Credentials | Flutter Developer Certificate",
    description: "View Rehman Farouq's comprehensive professional certifications and verified credentials. Discover Flutter development certificates, React qualifications, and Next.js expertise.",
  },
}

export default function CertificationsPage() {
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
              <span className="text-sm font-medium text-teal-600 dark:text-teal-400">Certifications</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <AnimatedSection delay={200}>
            <Certifications />
          </AnimatedSection>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
