'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    { label: 'Projects', href: '/projects' },
    { label: 'Skills', href: '/skills' },
    { label: 'Tools', href: '/tools' },
    { label: 'Blog', href: '/blog' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Contact', href: '/contact' }
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-background/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 dark:border-gray-800/50' : 'bg-transparent'
    }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-foreground dark:text-white text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">RF</Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4 sm:space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 hover:scale-105 ${
                      pathname === item.href ? 'text-foreground dark:text-white bg-white/10 dark:bg-white/10' : ''
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-foreground dark:hover:text-white hover:bg-white/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-lg mt-2 border border-gray-200/50 dark:border-gray-700/50">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-gray-600 dark:text-gray-300 hover:text-foreground dark:hover:text-white block px-3 py-3 text-base font-medium w-full text-left transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/10 rounded-lg hover:translate-x-1 ${
                      pathname === item.href ? 'text-foreground dark:text-white bg-white/10 dark:bg-white/10' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
  )
}

export default Navbar
