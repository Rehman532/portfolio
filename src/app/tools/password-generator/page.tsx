import { Metadata } from 'next'
import PasswordGeneratorTool from '@/components/tools/PasswordGeneratorTool'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: "Free Password Generator Online | Secure Password Creator | Strong Password Tool with Strength Checker",
  description: "Generate strong, secure passwords online with customizable options. Choose password length, character types (uppercase, lowercase, numbers, symbols), and get real-time strength indicators. Create unhackable passwords for accounts, apps, and security.",
  keywords: "password generator online, secure password creator, strong password generator, random password generator, password strength checker, unhackable password generator, free password tool, secure password maker, password generator with symbols, password complexity checker, online password creator, cybersecurity password tool, password security generator, customizable password generator",
  openGraph: {
    title: "Free Password Generator Online | Secure Password Creator | Strong Password Tool with Strength Checker",
    description: "Generate strong, secure passwords online with customizable options. Choose password length, character types, and get real-time strength indicators for maximum security.",
    url: "https://rehmanfarouq.site/tools/password-generator",
    type: "website",
    siteName: "Rehman Farouq Developer Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Password Generator Online | Secure Password Creator",
    description: "Generate strong, secure passwords online with customizable options and real-time strength indicators for maximum security.",
  },
}

export default function PasswordGeneratorPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/#tools"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Tools</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Developer Tools</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Password Generator</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl ring-4 ring-white/10">
            <PasswordGeneratorTool />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
