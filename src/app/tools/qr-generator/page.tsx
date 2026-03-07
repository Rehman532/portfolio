import { Metadata } from 'next'
import QRCodeGeneratorTool from '@/components/tools/QRCodeGeneratorTool'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: "Free QR Code Generator Online | Create Custom QR Codes | URL, Text, WiFi QR Code Maker",
  description: "Generate custom QR codes instantly for URLs, text, WiFi, contact info, and more. Free online QR code generator with customizable colors, sizes, and downloadable formats. Perfect for business cards, marketing, and sharing information.",
  keywords: "QR code generator online, free QR code maker, custom QR codes, URL QR code generator, text to QR code, WiFi QR code generator, QR code creator, QR code generator with logo, downloadable QR codes, QR code marketing tool, business QR code generator, QR code for social media, QR code design tool, instant QR code creation",
  openGraph: {
    title: "Free QR Code Generator Online | Create Custom QR Codes | URL, Text, WiFi QR Code Maker",
    description: "Generate custom QR codes instantly for URLs, text, WiFi, and more. Free online QR code generator with customizable colors, sizes, and downloadable formats.",
    url: "https://rehmanfarouq.site/tools/qr-generator",
    type: "website",
    siteName: "Rehman Farouq Developer Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free QR Code Generator Online | Create Custom QR Codes",
    description: "Generate custom QR codes instantly for URLs, text, WiFi, and more. Free online QR code generator with customizable options and downloads.",
  },
}

export default function QRGeneratorPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 animate-in slide-in-from-top duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/#tools"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Tools</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Developer Tools</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">QR Code Generator</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl ring-4 ring-white/10">
              <QRCodeGeneratorTool />
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
