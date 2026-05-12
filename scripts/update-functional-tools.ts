#!/usr/bin/env ts-node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ─── Proper display names — NO regex, hardcoded correctly ────────────────────
const TOOL_DISPLAY_NAMES: Record<string, string> = {
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
  'html-encoder-decoder': 'HTML Encoder / Decoder',
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
  'lorem-ipsum': 'Lorem Ipsum Generator',
}

// ─── Use cases per tool (for ToolSEO component) ───────────────────────────────
const TOOL_USE_CASES: Record<string, string[]> = {
  'text-converter': ['for writers', 'for developers', 'for content creators', 'for students'],
  'password-generator': ['for accounts', 'for WiFi', 'for applications', 'for security'],
  'qr-generator': ['for marketing', 'for business', 'for events', 'for payments'],
  'image-resize': ['for web', 'for social media', 'for printing', 'for developers'],
  'json-formatter': ['for developers', 'for API testing', 'for debugging', 'for data analysis'],
  'color-converter': ['for designers', 'for developers', 'for web design', 'for branding'],
  'time-converter': ['for business', 'for travel', 'for scheduling', 'for global teams'],
  'url-shortener': ['for marketing', 'for social media', 'for analytics', 'for sharing'],
  'base64-converter': ['for developers', 'for data encoding', 'for API integration', 'for security'],
  'unit-converter': ['for students', 'for engineering', 'for cooking', 'for science'],
  'markdown-editor': ['for writers', 'for documentation', 'for developers', 'for blogging'],
  'hash-generator': ['for security', 'for developers', 'for data integrity', 'for checksum'],
  'wifi-password-generator': ['for home networks', 'for offices', 'for security', 'for admins'],
  'css-minifier': ['for developers', 'for optimization', 'for performance', 'for production'],
  'html-encoder-decoder': ['for developers', 'for web development', 'for security', 'for content'],
  'json-to-csv': ['for data processing', 'for data analysis', 'for spreadsheets', 'for developers'],
  'email-validator': ['for developers', 'for marketing', 'for forms', 'for data quality'],
  'age-calculator': ['for personal use', 'for planning', 'for tracking', 'for education'],
  'bmi-calculator': ['for health tracking', 'for fitness', 'for doctors', 'for planning'],
  'tip-calculator': ['for dining', 'for groups', 'for travel', 'for service industry'],
  'discount-calculator': ['for shopping', 'for business', 'for students', 'for finance'],
  'fuel-cost-calculator': ['for travel', 'for logistics', 'for planning', 'for drivers'],
  'recipe-scaler': ['for cooking', 'for baking', 'for meal planning', 'for restaurants'],
  'sleep-calculator': ['for health', 'for sleep tracking', 'for better sleep quality', 'for planning'],
  'water-intake': ['for health', 'for hydration', 'for fitness tracking', 'for daily goals'],
  'calorie-calculator': ['for fitness', 'for nutrition', 'for weight management', 'for health'],
  'phone-number-formatter': ['for contact management', 'for international business', 'for communication'],
  'word-counter': ['for writers', 'for blogging', 'for SEO', 'for content analysis'],
  'calorie-burner': ['for fitness', 'for exercise tracking', 'for weight management'],
  'pregnancy-calculator': ['for expectant mothers', 'for healthcare providers', 'for planning'],
  'caffeine-calculator': ['for health monitoring', 'for productivity', 'for wellness'],
  'grade-calculator': ['for students', 'for education', 'for academic planning'],
  'random-generator': ['for testing', 'for gaming', 'for simulation', 'for random data'],
  'timezone-converter': ['for business', 'for travel', 'for scheduling', 'for global teams'],
  'roman-numeral': ['for education', 'for history', 'for mathematics', 'for students'],
  'ascii-art': ['for fun', 'for design', 'for social media', 'for text art'],
  'password-strength': ['for security', 'for development', 'for auditing', 'for account safety'],
  'text-statistics': ['for writers', 'for SEO optimization', 'for content analysis'],
  'unit-converter-pro': ['for engineering', 'for science', 'for cooking', 'for everyday use'],
  'file-converter': ['for developers', 'for data processing', 'for API integration'],
  'project-cost-estimator': ['for planning', 'for budgeting', 'for project management'],
  'color-palette-pro': ['for designers', 'for branding', 'for UI design', 'for web development'],
  'app-vs-website': ['for planning', 'for decision making', 'for product strategy'],
  'website-speed-checker': ['for optimization', 'for performance', 'for SEO'],
  'roi-calculator': ['for investment', 'for business', 'for finance', 'for planning'],
  'credit-card-validator': ['for security testing', 'for validation', 'for development'],
  'loan-calculator': ['for finance', 'for planning', 'for budgeting', 'for education'],
  'percentage-calculator': ['for students', 'for business', 'for finance', 'for shopping'],
  'lorem-ipsum': ['for designers', 'for developers', 'for mockups', 'for testing'],
}

// ─── Functional tools list ────────────────────────────────────────────────────
const functionalTools = [
  { id: 'text-converter', importName: 'TextConverterTool' },
  { id: 'password-generator', importName: 'PasswordGeneratorTool' },
  { id: 'qr-generator', importName: 'QRCodeGeneratorTool' },
  { id: 'image-resize', importName: 'ImageResizeTool' },
  { id: 'json-formatter', importName: 'JSONFormatterTool' },
  { id: 'color-converter', importName: 'ColorConverterTool' },
  { id: 'time-converter', importName: 'TimeConverterTool' },
  { id: 'url-shortener', importName: 'UrlShortenerTool' },
  { id: 'base64-converter', importName: 'Base64ConverterTool' },
  { id: 'unit-converter', importName: 'UnitConverterTool' },
  { id: 'markdown-editor', importName: 'MarkdownEditorTool' },
  { id: 'hash-generator', importName: 'HashGeneratorTool' },
  { id: 'wifi-password-generator', importName: 'WiFiPasswordGeneratorTool' },
  { id: 'css-minifier', importName: 'CSSMinifierTool' },
  { id: 'html-encoder-decoder', importName: 'HTMLEncoderDecoderTool' },
  { id: 'json-to-csv', importName: 'JSONToCSVTool' },
  { id: 'email-validator', importName: 'EmailValidatorTool' },
  { id: 'age-calculator', importName: 'AgeCalculatorTool' },
  { id: 'bmi-calculator', importName: 'BMICalculatorTool' },
  { id: 'tip-calculator', importName: 'TipCalculatorTool' },
  { id: 'discount-calculator', importName: 'DiscountCalculatorTool' },
  { id: 'fuel-cost-calculator', importName: 'FuelCostCalculatorTool' },
  { id: 'recipe-scaler', importName: 'RecipeScalerTool' },
  { id: 'sleep-calculator', importName: 'SleepCalculatorTool' },
  { id: 'water-intake', importName: 'WaterIntakeTool' },
  { id: 'calorie-calculator', importName: 'CalorieCalculatorTool' },
  { id: 'phone-number-formatter', importName: 'PhoneNumberFormatterTool' },
  { id: 'word-counter', importName: 'WordCounterTool' },
  { id: 'calorie-burner', importName: 'CalorieBurnerTool' },
  { id: 'pregnancy-calculator', importName: 'PregnancyCalculatorTool' },
  { id: 'caffeine-calculator', importName: 'CaffeineCalculatorTool' },
  { id: 'grade-calculator', importName: 'GradeCalculatorTool' },
  { id: 'random-generator', importName: 'RandomGeneratorTool' },
  { id: 'timezone-converter', importName: 'TimezoneConverterTool' },
  { id: 'roman-numeral', importName: 'RomanNumeralTool' },
  { id: 'ascii-art', importName: 'ASCIIArtTool' },
  { id: 'password-strength', importName: 'PasswordStrengthTool' },
  { id: 'text-statistics', importName: 'TextStatisticsTool' },
  { id: 'unit-converter-pro', importName: 'UnitConverterProTool' },
  { id: 'file-converter', importName: 'FileConverterTool' },
  { id: 'project-cost-estimator', importName: 'ProjectCostEstimatorTool' },
  { id: 'color-palette-pro', importName: 'ColorPaletteProTool' },
  { id: 'app-vs-website', importName: 'AppVsWebsiteTool' },
  { id: 'website-speed-checker', importName: 'WebsiteSpeedCheckerTool' },
  { id: 'roi-calculator', importName: 'ROICalculatorTool' },
  { id: 'credit-card-validator', importName: 'CreditCardValidatorTool' },
  { id: 'loan-calculator', importName: 'LoanCalculatorTool' },
  { id: 'percentage-calculator', importName: 'PercentageCalculatorTool' },
  { id: 'lorem-ipsum', importName: 'LoremIpsumTool' },
]

// ─── Page generator ───────────────────────────────────────────────────────────
function generatePage(toolId: string, importName: string): string {
  // Get the correct display name from the map — never use regex on component name
  const displayName = TOOL_DISPLAY_NAMES[toolId] ?? toolId
  const useCases = TOOL_USE_CASES[toolId] ?? ['for professionals', 'for developers', 'for students']
  const componentFnName = importName.replace(/[^a-zA-Z0-9]/g, '') + 'Page'
  const useCasesJson = JSON.stringify(useCases)

  return `import { Metadata } from 'next'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'
import ToolSEO from '@/components/seo/ToolSEO'
import { generateToolSEO } from '@/utils/seo-generator'
import ${importName} from '@/components/tools/${importName}'

export const metadata: Metadata = generateToolSEO('${toolId}', '${displayName}')

export default function ${componentFnName}() {
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
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">${displayName}</span>
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
                Free ${displayName} Online — Professional Tool
              </h1>
              <ToolSEO
                toolId="${toolId}"
                toolName="${displayName}"
                toolDescription="Professional ${displayName} for accurate and fast results. Free to use, no registration required."
                useCases={${useCasesJson}}
              />
              <div className="mt-8">
                <${importName} />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
`
}

// ─── Main runner ──────────────────────────────────────────────────────────────
function run() {
  const toolsDir = path.join(__dirname, '../src/app/tools')

  for (const tool of functionalTools) {
    const toolDir = path.join(toolsDir, tool.id)
    const pageFile = path.join(toolDir, 'page.tsx')
    const compFile = path.join(__dirname, `../src/components/tools/${tool.importName}.tsx`)

    if (!fs.existsSync(toolDir)) {
      console.log(`⚠️  Directory missing: ${tool.id}`)
      continue
    }
    if (!fs.existsSync(compFile)) {
      console.log(`⚠️  Component missing: ${tool.importName}.tsx — skipping ${tool.id}`)
      continue
    }

    try {
      fs.writeFileSync(pageFile, generatePage(tool.id, tool.importName), 'utf8')
      console.log(`✅  ${tool.id}  →  "${TOOL_DISPLAY_NAMES[tool.id]}"`)
    } catch (err) {
      console.log(`❌  Error: ${tool.id}`, err)
    }
  }

  console.log('\n🎉 Done! All functional tool pages updated.')
}

run()