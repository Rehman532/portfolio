import { Metadata } from 'next'
import Link from 'next/link'
import { Type, Key, QrCode, Image as ImageIcon, Code2, ArrowLeft, ExternalLink, Palette, Clock, Link2, Binary, Ruler, Calculator as CalculatorIcon, FileText, Hash } from 'lucide-react'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: "Free Developer Tools Online | Web Development Utilities | Text, JSON, Password, QR Code Generators",
  description: "Collection of 15+ free online developer tools and utilities for web development. Text converter, password generator, QR code generator, image resizer, JSON formatter, color converter, time converter, URL shortener, Base64 converter, unit converter, markdown editor, hash generator, and more developer productivity tools.",
  keywords: "free developer tools, online web tools, developer utilities, text converter online, password generator, QR code generator, image resizer online, JSON formatter, color converter, time converter, URL shortener, Base64 converter, unit converter, markdown editor, hash generator, web development tools, coding tools, online utilities, developer productivity",
  openGraph: {
    title: "Free Developer Tools Online | Web Development Utilities | Text, JSON, Password, QR Code Generators",
    description: "Collection of 15+ free online developer tools and utilities for web development. Text converter, password generator, QR code generator, image resizer, JSON formatter, and more developer productivity tools.",
    url: "https://rehmanfarouq.site/tools",
    type: "website",
    siteName: "Rehman Farouq Developer Tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Developer Tools Online | Web Development Utilities",
    description: "Collection of 15+ free online developer tools and utilities for web development. Text converter, password generator, QR code generator, and more.",
  },
}

const tools = [
  {
    id: 'text-converter',
    name: 'Text Converter',
    description: 'Convert text between different cases, remove spaces, reverse text, and more text manipulation tools.',
    icon: <Type size={32} />,
    color: 'from-blue-500 to-cyan-500',
    route: '/tools/text-converter',
    features: ['Uppercase & Lowercase', 'Remove Spaces', 'Reverse Text', 'Copy to Clipboard']
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure passwords with customizable options including length, character types, and strength indicators.',
    icon: <Key size={32} />,
    color: 'from-purple-500 to-pink-500',
    route: '/tools/password-generator',
    features: ['Custom Length', 'Character Types', 'Strength Meter', 'Secure Generation']
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Create QR codes for URLs, text, and other data. Download high-quality QR codes instantly.',
    icon: <QrCode size={32} />,
    color: 'from-green-500 to-teal-500',
    route: '/tools/qr-generator',
    features: ['URL & Text Support', 'High Quality', 'Instant Download', 'Custom Size']
  },
  {
    id: 'image-resize',
    name: 'Image Resizer',
    description: 'Resize images to custom dimensions while maintaining aspect ratio. Support for multiple image formats.',
    icon: <ImageIcon size={32} />,
    color: 'from-orange-500 to-red-500',
    route: '/tools/image-resize',
    features: ['Custom Dimensions', 'Aspect Ratio Lock', 'Multiple Formats', 'Instant Preview']
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, and beautify JSON code with error highlighting and minification options.',
    icon: <Code2 size={32} />,
    color: 'from-indigo-500 to-blue-500',
    route: '/tools/json-formatter',
    features: ['Format & Minify', 'Real-time Validation', 'Error Detection', 'Download JSON']
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert between HEX, RGB, and HSL color formats. Generate random colors and copy color codes.',
    icon: <Palette size={32} />,
    color: 'from-pink-500 to-purple-500',
    route: '/tools/color-converter',
    features: ['HEX/RGB/HSL', 'Random Colors', 'Live Preview', 'Copy Formats']
  },
  {
    id: 'time-converter',
    name: 'Time Converter',
    description: 'Convert timestamps between Unix and human-readable formats. Support multiple timezones.',
    icon: <Clock size={32} />,
    color: 'from-blue-500 to-indigo-500',
    route: '/tools/time-converter',
    features: ['Unix Timestamp', 'Multiple Formats', 'Timezone Support', 'Current Time']
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    description: 'Create short, memorable URLs from long links. Generate unique codes and manage URLs.',
    icon: <Link2 size={32} />,
    color: 'from-purple-500 to-pink-500',
    route: '/tools/url-shortener',
    features: ['Instant Shortening', 'Unique Codes', 'URL Management', 'Copy Links']
  },
  {
    id: 'base64-converter',
    name: 'Base64 Converter',
    description: 'Encode and decode text to/from Base64. Support file upload and bidirectional conversion.',
    icon: <Binary size={32} />,
    color: 'from-green-500 to-blue-500',
    route: '/tools/base64-converter',
    features: ['Encode & Decode', 'File Upload', 'Bidirectional', 'Download Results']
  },
  {
    id: 'unit-converter',
    name: 'Unit Converter',
    description: 'Convert between different units of measurement including length, weight, temperature, and data storage.',
    icon: <Ruler size={32} />,
    color: 'from-orange-500 to-yellow-500',
    route: '/tools/unit-converter',
    features: ['Length & Weight', 'Temperature', 'Data Storage', 'Multiple Units']
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    description: 'Write and preview markdown with live rendering. Export to HTML and download as files.',
    icon: <FileText size={32} />,
    color: 'from-teal-500 to-green-500',
    route: '/tools/markdown-editor',
    features: ['Live Preview', 'Toolbar Shortcuts', 'HTML Export', 'File Download']
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate cryptographic hashes for text and files. Support for multiple hash algorithms.',
    icon: <Hash size={32} />,
    color: 'from-red-500 to-orange-500',
    route: '/tools/hash-generator',
    features: ['MD5 & SHA', 'File Support', 'Secure Hashing', 'Multiple Algorithms']
  }
]

export default function ToolsPage() {
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
              <span className="font-medium">Back to Portfolio</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Developer Tools</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatedSection delay={200}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground dark:text-white mb-6">
              Developer Tools
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A collection of handy utility tools for developers and designers. Built with modern web technologies for speed and efficiency.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-16">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="group relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl"
                     style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}
                ></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {tool.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tool.color}`}></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Link
                    href={tool.route}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group-hover:shadow-xl"
                    style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}
                  >
                    Use Tool
                    <ExternalLink size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                <Type size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-400">Built for speed and efficiency with modern web technologies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                <Key size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400">All processing happens in your browser, no data sent to servers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                <QrCode size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Always Updated</h3>
              <p className="text-gray-600 dark:text-gray-400">Modern tools with the latest features and improvements</p>
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
