#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Tools that have functional components
const functionalTools = [
  {
    id: 'text-converter',
    name: 'TextConverterTool',
    importName: 'TextConverterTool'
  },
  {
    id: 'password-generator',
    name: 'PasswordGeneratorTool',
    importName: 'PasswordGeneratorTool'
  },
  {
    id: 'qr-generator',
    name: 'QRCodeGeneratorTool',
    importName: 'QRCodeGeneratorTool'
  },
  {
    id: 'image-resize',
    name: 'ImageResizeTool',
    importName: 'ImageResizeTool'
  },
  {
    id: 'json-formatter',
    name: 'JSONFormatterTool',
    importName: 'JSONFormatterTool'
  },
  {
    id: 'color-converter',
    name: 'ColorConverterTool',
    importName: 'ColorConverterTool'
  },
  {
    id: 'time-converter',
    name: 'TimeConverterTool',
    importName: 'TimeConverterTool'
  },
  {
    id: 'url-shortener',
    name: 'UrlShortenerTool',
    importName: 'UrlShortenerTool'
  },
  {
    id: 'base64-converter',
    name: 'Base64ConverterTool',
    importName: 'Base64ConverterTool'
  },
  {
    id: 'unit-converter',
    name: 'UnitConverterTool',
    importName: 'UnitConverterTool'
  },
  {
    id: 'markdown-editor',
    name: 'MarkdownEditorTool',
    importName: 'MarkdownEditorTool'
  },
  {
    id: 'hash-generator',
    name: 'HashGeneratorTool',
    importName: 'HashGeneratorTool'
  },
  {
    id: 'wifi-password-generator',
    name: 'WiFiPasswordGeneratorTool',
    importName: 'WiFiPasswordGeneratorTool'
  },
  {
    id: 'css-minifier',
    name: 'CSSMinifierTool',
    importName: 'CSSMinifierTool'
  },
  {
    id: 'html-encoder-decoder',
    name: 'HTMLEncoderDecoderTool',
    importName: 'HTMLEncoderDecoderTool'
  },
  {
    id: 'json-to-csv',
    name: 'JSONToCSVTool',
    importName: 'JSONToCSVTool'
  },
  {
    id: 'email-validator',
    name: 'EmailValidatorTool',
    importName: 'EmailValidatorTool'
  },
  {
    id: 'age-calculator',
    name: 'AgeCalculatorTool',
    importName: 'AgeCalculatorTool'
  },
  {
    id: 'bmi-calculator',
    name: 'BMICalculatorTool',
    importName: 'BMICalculatorTool'
  },
  {
    id: 'tip-calculator',
    name: 'TipCalculatorTool',
    importName: 'TipCalculatorTool'
  },
  {
    id: 'discount-calculator',
    name: 'DiscountCalculatorTool',
    importName: 'DiscountCalculatorTool'
  },
  {
    id: 'fuel-cost-calculator',
    name: 'FuelCostCalculatorTool',
    importName: 'FuelCostCalculatorTool'
  },
  {
    id: 'recipe-scaler',
    name: 'RecipeScalerTool',
    importName: 'RecipeScalerTool'
  },
  {
    id: 'sleep-calculator',
    name: 'SleepCalculatorTool',
    importName: 'SleepCalculatorTool'
  },
  {
    id: 'water-intake',
    name: 'WaterIntakeTool',
    importName: 'WaterIntakeTool'
  },
  {
    id: 'calorie-calculator',
    name: 'CalorieCalculatorTool',
    importName: 'CalorieCalculatorTool'
  },
  {
    id: 'phone-number-formatter',
    name: 'PhoneNumberFormatterTool',
    importName: 'PhoneNumberFormatterTool'
  },
  {
    id: 'word-counter',
    name: 'WordCounterTool',
    importName: 'WordCounterTool'
  },
  {
    id: 'calorie-burner',
    name: 'CalorieBurnerTool',
    importName: 'CalorieBurnerTool'
  },
  {
    id: 'pregnancy-calculator',
    name: 'PregnancyCalculatorTool',
    importName: 'PregnancyCalculatorTool'
  },
  {
    id: 'caffeine-calculator',
    name: 'CaffeineCalculatorTool',
    importName: 'CaffeineCalculatorTool'
  },
  {
    id: 'grade-calculator',
    name: 'GradeCalculatorTool',
    importName: 'GradeCalculatorTool'
  },
  {
    id: 'random-generator',
    name: 'RandomGeneratorTool',
    importName: 'RandomGeneratorTool'
  },
  {
    id: 'timezone-converter',
    name: 'TimezoneConverterTool',
    importName: 'TimezoneConverterTool'
  },
  {
    id: 'roman-numeral',
    name: 'RomanNumeralTool',
    importName: 'RomanNumeralTool'
  },
  {
    id: 'ascii-art',
    name: 'ASCIIArtTool',
    importName: 'ASCIIArtTool'
  },
  {
    id: 'password-strength',
    name: 'PasswordStrengthTool',
    importName: 'PasswordStrengthTool'
  },
  {
    id: 'text-statistics',
    name: 'TextStatisticsTool',
    importName: 'TextStatisticsTool'
  },
  {
    id: 'unit-converter-pro',
    name: 'UnitConverterProTool',
    importName: 'UnitConverterProTool'
  },
  {
    id: 'file-converter',
    name: 'FileConverterTool',
    importName: 'FileConverterTool'
  },
  {
    id: 'project-cost-estimator',
    name: 'ProjectCostEstimatorTool',
    importName: 'ProjectCostEstimatorTool'
  },
  {
    id: 'color-palette-pro',
    name: 'ColorPaletteProTool',
    importName: 'ColorPaletteProTool'
  },
  {
    id: 'app-vs-website',
    name: 'AppVsWebsiteTool',
    importName: 'AppVsWebsiteTool'
  },
  {
    id: 'website-speed-checker',
    name: 'WebsiteSpeedCheckerTool',
    importName: 'WebsiteSpeedCheckerTool'
  },
  {
    id: 'roi-calculator',
    name: 'ROICalculatorTool',
    importName: 'ROICalculatorTool'
  },
  {
    id: 'credit-card-validator',
    name: 'CreditCardValidatorTool',
    importName: 'CreditCardValidatorTool'
  },
  {
    id: 'loan-calculator',
    name: 'LoanCalculatorTool',
    importName: 'LoanCalculatorTool'
  },
  {
    id: 'percentage-calculator',
    name: 'PercentageCalculatorTool',
    importName: 'PercentageCalculatorTool'
  },
  {
    id: 'lorem-ipsum',
    name: 'LoremIpsumTool',
    importName: 'LoremIpsumTool'
  }
]

// Generate updated page content
function generateUpdatedPage(toolId: string, toolName: string, importName: string): string {
  const componentName = toolName.replace(/[^a-zA-Z0-9]/g, '') + 'Page'
  
  return `import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ToolSEO from '@/components/seo/ToolSEO'
import { generateToolSEO } from '@/utils/seo-generator'
import ${importName} from '@/components/tools/${toolName}'

export const metadata: Metadata = generateToolSEO('${toolId}', '${toolName.replace(/([A-Z])/g, ' $1').trim()}')

export default function ${componentName}() {
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
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">${toolName.replace(/([A-Z])/g, ' $1').trim()}</span>
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
                Free ${toolName.replace(/([A-Z])/g, ' $1').trim()} Online - Professional Tool
              </h1>
              <ToolSEO 
                toolId="${toolId}" 
                toolName="${toolName.replace(/([A-Z])/g, ' $1').trim()}" 
                toolDescription="Professional ${toolName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()} tool for accurate and fast results."
                useCases={['for professionals', 'for developers', 'for students', 'for business', 'for personal use']}
              />
              <div className="mt-8">
                <${importName} />
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

// Update functional tools
function updateFunctionalTools() {
  const toolsDir = path.join(__dirname, '../src/app/tools')
  
  functionalTools.forEach(tool => {
    const toolDir = path.join(toolsDir, tool.id)
    const pageFile = path.join(toolDir, 'page.tsx')
    
    // Check if directory exists
    if (!fs.existsSync(toolDir)) {
      console.log(`Directory not found: ${toolDir}`)
      return
    }
    
    // Check if component exists
    const componentFile = path.join(__dirname, `../src/components/tools/${tool.name}.tsx`)
    if (!fs.existsSync(componentFile)) {
      console.log(`⚠️  Component not found: ${tool.name}.tsx (skipping ${tool.id})`)
      return
    }
    
    // Generate and write new page content
    const pageContent = generateUpdatedPage(tool.id, tool.name, tool.importName)
    
    try {
      fs.writeFileSync(pageFile, pageContent, 'utf8')
      console.log(`✅ Updated: ${tool.id}/page.tsx`)
    } catch (error) {
      console.log(`❌ Error updating ${tool.id}:`, error)
    }
  })
}

// Run update
updateFunctionalTools()
console.log('\n🎉 Functional tools update completed!')
