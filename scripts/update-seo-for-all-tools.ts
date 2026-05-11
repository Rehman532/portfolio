#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// List of all tool pages
const tools = [
  'text-converter',
  'password-generator',
  'qr-generator',
  'image-resize',
  'json-formatter',
  'color-converter',
  'time-converter',
  'url-shortener',
  'base64-converter',
  'unit-converter',
  'markdown-editor',
  'hash-generator',
  'wifi-password-generator',
  'css-minifier',
  'html-encoder-decoder',
  'json-to-csv',
  'email-validator',
  'age-calculator',
  'bmi-calculator',
  'tip-calculator',
  'discount-calculator',
  'fuel-cost-calculator',
  'recipe-scaler',
  'sleep-calculator',
  'water-intake',
  'calorie-calculator',
  'phone-number-formatter',
  'word-counter',
  'calorie-burner',
  'pregnancy-calculator',
  'caffeine-calculator',
  'grade-calculator',
  'random-generator',
  'timezone-converter',
  'roman-numeral',
  'ascii-art',
  'password-strength',
  'text-statistics',
  'unit-converter-pro',
  'file-converter',
  'project-cost-estimator',
  'color-palette-pro',
  'app-vs-website',
  'website-speed-checker',
  'roi-calculator',
  'credit-card-validator',
  'loan-calculator',
  'percentage-calculator',
  'lorem-ipsum'
]

// Tool names (capitalized)
const toolNames = {
  'text-converter': 'Text Converter',
  'password-generator': 'Password Generator',
  'qr-generator': 'QR Code Generator',
  'image-resize': 'Image Resizer',
  'json-formatter': 'JSON Formatter',
  'color-converter': 'Color Converter',
  'time-converter': 'Time Converter',
  'url-shortener': 'URL Shortener',
  'base64-converter': 'Base64 Converter',
  'unit-converter': 'Unit Converter',
  'markdown-editor': 'Markdown Editor',
  'hash-generator': 'Hash Generator',
  'wifi-password-generator': 'WiFi Password Generator',
  'css-minifier': 'CSS Minifier',
  'html-encoder-decoder': 'HTML Encoder/Decoder',
  'json-to-csv': 'JSON to CSV Converter',
  'email-validator': 'Email Validator',
  'age-calculator': 'Age Calculator',
  'bmi-calculator': 'BMI Calculator',
  'tip-calculator': 'Tip Calculator',
  'discount-calculator': 'Discount Calculator',
  'fuel-cost-calculator': 'Fuel Cost Calculator',
  'recipe-scaler': 'Recipe Scaler',
  'sleep-calculator': 'Sleep Calculator',
  'water-intake': 'Water Intake Calculator',
  'calorie-calculator': 'Calorie Calculator',
  'phone-number-formatter': 'Phone Number Formatter',
  'word-counter': 'Word Counter',
  'calorie-burner': 'Calorie Burn Calculator',
  'pregnancy-calculator': 'Pregnancy Calculator',
  'caffeine-calculator': 'Caffeine Calculator',
  'grade-calculator': 'Grade Calculator',
  'random-generator': 'Random Number Generator',
  'timezone-converter': 'Timezone Converter',
  'roman-numeral': 'Roman Numeral Converter',
  'ascii-art': 'ASCII Art Generator',
  'password-strength': 'Password Strength Checker',
  'text-statistics': 'Text Statistics Analyzer',
  'unit-converter-pro': 'Advanced Unit Converter',
  'file-converter': 'File Format Converter',
  'project-cost-estimator': 'Project Cost Estimator',
  'color-palette-pro': 'Color Palette Generator Pro',
  'app-vs-website': 'App vs Website Calculator',
  'website-speed-checker': 'Website Speed Checker',
  'roi-calculator': 'ROI Calculator',
  'credit-card-validator': 'Credit Card Validator',
  'loan-calculator': 'Loan Calculator',
  'percentage-calculator': 'Percentage Calculator',
  'lorem-ipsum': 'Lorem Ipsum Generator'
}

// Generate page template with SEO
function generatePageTemplate(toolId: string, toolName: string): string {
  return `import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ToolSEO from '@/components/seo/ToolSEO'
import { generateToolSEO } from '@/utils/seo-generator'

export const metadata: Metadata = generateToolSEO('${toolId}', '${toolName}')

export default function ${toolName.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/tools"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Tools</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Developer Tools</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">${toolName}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-2xl ring-4 ring-white/10">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Free ${toolName} Online - Professional Tool
              </h1>
              <ToolSEO 
                toolId="${toolId}" 
                toolName="${toolName}" 
                toolDescription="Professional ${toolName.toLowerCase()} tool for accurate and fast results."
                useCases={['for professionals', 'for developers', 'for students', 'for business', 'for personal use']}
              />
              <div className="mt-8">
                <div className="text-center">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6">
                    <p className="text-yellow-800 dark:text-yellow-200">
                      🚧 Tool coming soon! This tool is under development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
`
}

// Update all tool pages
function updateAllToolPages() {
  const toolsDir = path.join(__dirname, '../src/app/tools')
  
  tools.forEach(toolId => {
    const toolDir = path.join(toolsDir, toolId)
    const pageFile = path.join(toolDir, 'page.tsx')
    
    // Check if directory exists
    if (!fs.existsSync(toolDir)) {
      console.log(`Directory not found: ${toolDir}`)
      return
    }
    
    // Generate and write new page content
    const toolName = toolNames[toolId as keyof typeof toolNames] || toolId
    const pageContent = generatePageTemplate(toolId, toolName)
    
    try {
      fs.writeFileSync(pageFile, pageContent, 'utf8')
      console.log(`✅ Updated: ${toolId}/page.tsx`)
    } catch (error) {
      console.log(`❌ Error updating ${toolId}:`, error)
    }
  })
}

// Run the update
updateAllToolPages()
console.log('\n🎉 SEO update completed for all tool pages!')
