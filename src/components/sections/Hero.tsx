'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Github, Linkedin, Download, Star } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import Counter from '@/components/ui/Counter'
import AnimatedText from '@/components/ui/AnimatedText'

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30">
        <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-gray-900 via-transparent to-background dark:to-gray-900"></div>
      </div>
      
      {/* Mouse-following gradient orb - Hidden on mobile */}
      <div className="hidden md:block absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-32 w-2 h-2 bg-purple-400 rounded-full animate-ping delay-1000"></div>
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-1500"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Row layout for Profile Photo and Main Content */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Left Column - Profile Photo */}
            <FadeIn delay={300} direction="left" className="lg:sticky lg:top-1/2 lg:-translate-y-1/2">
              <div className="flex justify-center lg:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-lg opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gray-200/50 dark:border-gray-800/50 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src="/images/profile-photo.jpeg" 
                      alt="REHMAN FAROUQ" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-background dark:border-gray-900 animate-pulse"></div>
                </div>
              </div>
            </FadeIn>

            {/* Right Column - Main Content */}
            <div className="flex-1 text-center lg:text-left mt-25">
              {/* Badge */}
              <FadeIn delay={200} direction="down">
                <div className="inline-flex items-center gap-2 bg-blue-600/10 dark:bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 dark:border-blue-500/30 rounded-full px-3 sm:px-4 py-2 mb-6 sm:mb-8 hover:scale-105 transition-transform duration-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-blue-600 dark:text-blue-300 text-xs sm:text-sm font-medium">Available for hire</span>
                </div>
              </FadeIn>

              {/* Main title with gradient */}
              <FadeIn delay={400} direction="up">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6">
                  <span className="text-foreground dark:text-white">I'm</span>{' '}
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300">
                    REHMAN FAROUQ
                  </span>
                </h1>
              </FadeIn>
              
              {/* Subtitle with typing effect */}
              <FadeIn delay={600} direction="up">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 font-light">
                  <span className="text-blue-500 dark:text-blue-400">APP</span> &{' '}
                  <span className="text-purple-500 dark:text-purple-400">WEB</span>{' '}
                  <span className="text-foreground dark:text-white">DEVELOPER</span>
                </h2>
              </FadeIn>
              
              {/* Enhanced description */}
              <FadeIn delay={800} direction="up">
                <div className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto lg:mx-0 leading-relaxed px-4">
                  <AnimatedText text="Results-driven Full Stack Developer with 3+ years of experience building scalable mobile and web applications. Expertise in Flutter, Dart, Next.js, and modern UI/UX development with focus on performance and clean architecture." delay={100} />
                </div>
              </FadeIn>
              
              {/* Enhanced CTA buttons */}
              <FadeIn delay={1000} direction="up">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start mb-12 sm:mb-16">
                  <button
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-500 flex items-center gap-3 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:rotate-1 text-sm sm:text-base"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      View Projects
                      <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                  
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative overflow-hidden border-2 border-blue-500/50 text-blue-600 dark:text-blue-400 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold transition-all duration-500 flex items-center gap-3 hover:bg-blue-600/20 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 hover:-rotate-1 text-sm sm:text-base"
                  >
                    <span className="flex items-center gap-3">
                      Contact Me
                      <Download className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                    </span>
                  </button>
                </div>
              </FadeIn>

              {/* Enhanced social links */}
              <FadeIn delay={1200} direction="up">
                <div className="flex justify-center lg:justify-start gap-4 sm:gap-6">
                  <a
                    href="https://github.com/Rehman532"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 sm:w-12 sm:h-12 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:rotate-12"
                  >
                    <Github size={20} />
                  </a>
                  <a
                  href="https://www.linkedin.com/in/rehman-farouq-93727526b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 sm:w-12 sm:h-12 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-white hover:bg-purple-600/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-110 hover:-rotate-12"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Stats - Full width below the row */}
          <FadeIn delay={1400} direction="up">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-20 max-w-2xl mx-auto">
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Counter end={3} suffix="+" className="inline-block" />
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Counter end={50} suffix="+" className="inline-block" />
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Projects Completed</div>
              </div>
              <div className="text-center group">
                <div className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Counter end={100} suffix="%" className="inline-block" />
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Client Satisfaction</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center animate-bounce">
          <div className="w-1 h-2 sm:h-3 bg-gray-500 dark:bg-gray-400 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero
