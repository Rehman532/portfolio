import { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, Heart, Code, Monitor, Rocket } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import AnimatedSection from '@/components/ui/AnimatedSection'

export const metadata: Metadata = {
  title: "Build Stunning Portfolio with Next.js: Complete Tutorial | Rehman Farouq",
  description: "Learn how to create a professional portfolio website using Next.js, Tailwind CSS, and modern web development practices.",
  openGraph: {
    title: "Build Stunning Portfolio with Next.js: Complete Tutorial | Rehman Farouq",
    description: "Learn how to create a professional portfolio website using Next.js, Tailwind CSS, and modern web development practices.",
    url: "https://rehmanfarouq.site/blog/nextjs-portfolio-tutorial",
  },
}

export default function NextjsPortfolioTutorialPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-gray-900 flex flex-col">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 animate-in slide-in-from-top duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/blog"
              className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Blog</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Blog</span>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Article</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatedSection delay={200}>
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-sm font-medium rounded-full">
                  Tutorial
                </span>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <Calendar size={14} />
                  February 20, 2024
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                  <Clock size={14} />
                  20 min read
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Build Stunning Portfolio with Next.js: Complete Tutorial
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Step-by-step guide to creating a professional portfolio website using Next.js 14, Tailwind CSS, and modern web development practices. Build a site that showcases your skills and impresses recruiters.
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-500" />
                      <span className="font-medium text-gray-900 dark:text-white">Rehman Farouq</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Flutter & Next.js Developer</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
                    <Share2 size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="space-y-8">
                {/* Introduction */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Next.js for Your Portfolio?</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Next.js has become the go-to framework for building modern, performant web applications. 
                    With its excellent SEO capabilities, fast loading times, and developer experience, it's perfect 
                    for creating a portfolio that stands out to recruiters and clients.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                    In this comprehensive tutorial, we'll build a complete portfolio website from scratch using 
                    Next.js 14, Tailwind CSS, and modern development practices. By the end, you'll have a professional 
                    portfolio that showcases your skills and projects effectively.
                  </p>
                </section>

                {/* Prerequisites */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">📋 Prerequisites</h2>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Code size={20} className="text-blue-500" />
                        <span className="text-gray-900 dark:text-white">Basic knowledge of HTML, CSS, and JavaScript</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code size={20} className="text-green-500" />
                        <span className="text-gray-900 dark:text-white">Familiarity with React concepts</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code size={20} className="text-purple-500" />
                        <span className="text-gray-900 dark:text-white">Node.js and npm installed on your system</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code size={20} className="text-orange-500" />
                        <span className="text-gray-900 dark:text-white">Basic understanding of Git</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Project Setup */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🚀 Project Setup</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 1: Create Next.js App</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Start by creating a new Next.js application using the create-next-app command:
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400">
                          <div>npx create-next-app@latest portfolio</div>
                          <div className="text-gray-400 mt-2"># Follow the prompts to configure your project</div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          Choose the following options when prompted:
                        </p>
                        <ul className="text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                          <li>• Would you like to use TypeScript? <strong>Yes</strong></li>
                          <li>• Would you like to use ESLint? <strong>Yes</strong></li>
                          <li>• Would you like to use Tailwind CSS? <strong>Yes</strong></li>
                          <li>• Would you like to use `src/` directory? <strong>Yes</strong></li>
                          <li>• Would you like to use App Router? <strong>Yes</strong></li>
                          <li>• Would you like to customize the default import alias? <strong>No</strong></li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 2: Install Additional Dependencies</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Navigate to your project directory and install additional packages:
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                          <div>cd portfolio</div>
                          <div className="mt-2">npm install lucide-react framer-motion</div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">
                          These packages will provide:
                        </p>
                        <ul className="text-gray-600 dark:text-gray-400 space-y-1 ml-4">
                          <li>• <strong>lucide-react</strong> - Beautiful icons for your portfolio</li>
                          <li>• <strong>framer-motion</strong> - Smooth animations and transitions</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Step 3: Project Structure</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Organize your project with the following structure:
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300">
                          <div>portfolio/</div>
                          <div className="ml-4">├── src/</div>
                          <div className="ml-8">├── app/</div>
                          <div className="ml-12">├── components/</div>
                          <div className="ml-16">├── ui/</div>
                          <div className="ml-16">├── sections/</div>
                          <div className="ml-16">└── layout/</div>
                          <div className="ml-12">├── globals.css</div>
                          <div className="ml-12">├── layout.tsx</div>
                          <div className="ml-12">└── page.tsx</div>
                          <div className="ml-8">├── lib/</div>
                          <div className="ml-8">├── types/</div>
                          <div className="ml-8">└── utils/</div>
                          <div className="ml-4">├── public/</div>
                          <div className="ml-4">└── package.json</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Core Components */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🧩 Building Core Components</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Navbar Component</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Create a responsive navigation bar with smooth scrolling:
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                          <div>// src/app/components/layout/Navbar.tsx</div>
                          <div className="text-blue-400 mt-2">'use client'</div>
                          <div className="mt-2">import { useState, useEffect } from 'react'</div>
                          <div>import Link from 'next/link'</div>
                          <div>import { Menu, X } from 'lucide-react'</div>
                          <div className="mt-2">const navItems = [</div>
                          <div className="ml-4">{`{ label: 'Home', href: '/' }`},</div>
                          <div className="ml-4">{`{ label: 'About', href: '#about' }`},</div>
                          <div className="ml-4">{`{ label: 'Projects', href: '#projects' }`},</div>
                          <div className="ml-4">{`{ label: 'Skills', href: '#skills' }`},</div>
                          <div className="ml-4">{`{ label: 'Contact', href: '#contact' }`}</div>
                          <div>]</div>
                          <div className="mt-2">export default function Navbar() {'{'}</div>
                          <div className="ml-4">const [isOpen, setIsOpen] = useState(false)</div>
                          <div className="ml-4">return (</div>
                          <div className="ml-8">{`<nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50">`}</div>
                          <div className="ml-12">{`{/* Navigation content */}`}</div>
                          <div className="ml-8">{`</nav>`}</div>
                          <div className="ml-4">)</div>
                          <div>{'}'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hero Section</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Create an impressive hero section with animations:
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                          <div>// src/app/components/sections/Hero.tsx</div>
                          <div className="text-blue-400 mt-2">'use client'</div>
                          <div className="mt-2">import { motion } from 'framer-motion'</div>
                          <div>import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'</div>
                          <div className="mt-2">export default function Hero() `{`</div>
                          <div className="ml-4">return (</div>
                          <div className="ml-8">`<section className="min-h-screen flex items-center justify-center">`</div>
                          <div className="ml-12">`<motion.div</div>
                          <div className="ml-12">initial={`{ opacity: 0, y: 20 }`}</div>
                          <div className="ml-12">animate={`{ opacity: 1, y: 0 }`}</div>
                          <div className="ml-12">transition={`{ duration: 0.6 }`}</div>
                          <div className="ml-12">className="text-center"</div>
                          <div className="ml-12">`</div>
                          <div className="ml-16">`<h1 className="text-5xl font-bold mb-4">`</div>
                          <div className="ml-20">`Hi, I'm John Doe`</div>
                          <div className="ml-16">`</h1>`</div>
                          <div className="ml-12">`</motion.div>`</div>
                          <div className="ml-8">`</section>`</div>
                          <div className="ml-4">)</div>
                          <div>}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Cards</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Create interactive project cards with hover effects:
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300 overflow-x-auto">
                          <div>// src/app/components/sections/Projects.tsx</div>
                          <div className="text-blue-400 mt-2">'use client'</div>
                          <div className="mt-2">import { motion } from 'framer-motion'</div>
                          <div>import { ExternalLink, Github } from 'lucide-react'</div>
                          <div className="mt-2">const projects = [</div>
                          <div className="ml-4">`{`</div>
                          <div className="ml-8">title: 'E-commerce Platform',</div>
                          <div className="ml-8">description: 'Modern e-commerce solution with React and Node.js',</div>
                          <div className="ml-8">tech: ['React', 'Node.js', 'MongoDB'],</div>
                          <div className="ml-8">liveUrl: 'https://example.com',</div>
                          <div className="ml-8">githubUrl: 'https://github.com/username/project'</div>
                          <div className="ml-4">`}`</div>
                          <div>]</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Advanced Features */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">✨ Advanced Features</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🌙 Dark Mode</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Implement dark mode with system preference detection:
                      </p>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                        <li>• Use next-themes package</li>
                        <li>• Create theme context</li>
                        <li>• Add theme toggle button</li>
                        <li>• Persist user preference</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">📱 Responsive Design</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Ensure perfect mobile experience:
                      </p>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                        <li>• Mobile-first approach</li>
                        <li>• Tailwind responsive utilities</li>
                        <li>• Touch-friendly interactions</li>
                        <li>• Optimized navigation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 Performance Optimization</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Make your portfolio lightning fast:
                      </p>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                        <li>• Image optimization</li>
                        <li>• Lazy loading</li>
                        <li>• Code splitting</li>
                        <li>• Font optimization</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🔍 SEO Optimization</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Rank higher in search results:
                      </p>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                        <li>• Meta tags optimization</li>
                        <li>• Structured data</li>
                        <li>• Sitemap generation</li>
                        <li>• Open Graph tags</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Deployment */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🚀 Deployment</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Deploy to Vercel</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Vercel is the recommended platform for Next.js applications:
                        </p>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                          <ol className="text-gray-600 dark:text-gray-400 space-y-2">
                            <li>1. Push your code to GitHub</li>
                            <li>2. Sign up for Vercel account</li>
                            <li>3. Import your GitHub repository</li>
                            <li>4. Configure build settings</li>
                            <li>5. Deploy your portfolio</li>
                          </ol>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                          <p className="text-blue-700 dark:text-blue-300 text-sm">
                            <strong>Pro Tip:</strong> Connect your custom domain and enable automatic HTTPS for a professional appearance.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Environment Variables</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400">
                          Set up environment variables for sensitive data:
                        </p>
                        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300">
                          <div># .env.local</div>
                          <div>NEXT_PUBLIC_EMAIL=your-email@example.com</div>
                          <div>NEXT_PUBLIC_PHONE=+1234567890</div>
                          <div>ANALYTICS_ID=your-analytics-id</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Best Practices */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">💡 Best Practices</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                      <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-3">✅ Do's</h3>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                        <li>• Use semantic HTML5 elements</li>
                        <li>• Implement proper accessibility (ARIA labels, keyboard navigation)</li>
                        <li>• Optimize images for web (WebP format, lazy loading)</li>
                        <li>• Use TypeScript for type safety</li>
                        <li>• Write clean, maintainable code</li>
                        <li>• Test on multiple devices and browsers</li>
                        <li>• Add loading states and error handling</li>
                        <li>• Include a contact form with validation</li>
                      </ul>
                    </div>
                    
                    <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                      <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-3">❌ Don'ts</h3>
                      <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                        <li>• Don't use inline styles excessively</li>
                        <li>• Don't ignore mobile responsiveness</li>
                        <li>• Don't skip accessibility features</li>
                        <li>• Don't use large images without optimization</li>
                        <li>• Don't forget to add meta tags for SEO</li>
                        <li>• Don't ignore performance metrics</li>
                        <li>• Don't use deprecated APIs</li>
                        <li>• Don't forget to test your contact form</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Conclusion */}
                <section>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎉 Conclusion</h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    Congratulations! You've built a professional portfolio website using Next.js. This portfolio showcases 
                    your technical skills and provides a solid foundation for your web development career.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                    Remember that a portfolio is never truly finished. Keep updating it with new projects, 
                    improve the design based on feedback, and add new features as you learn more about web development.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-4">
                    Your portfolio is now ready to impress recruiters and clients. Good luck with your job search! 🚀
                  </p>
                </section>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {['Next.js', 'Portfolio', 'Tutorial', 'Web Dev', 'React', 'Tailwind CSS'].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
