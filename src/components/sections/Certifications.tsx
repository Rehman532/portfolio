'use client'

import { Award, ExternalLink, Calendar } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'

const Certifications = () => {
  const certifications = [
    {
      name: 'Google Flutter Certified Developer',
      issuer: 'Google',
      date: '2024',
      description: 'Advanced certification in cross-platform mobile development using Flutter and Dart. Expertise in widget trees, state management, and native platform integration.',
      skills: ['Flutter', 'Dart', 'Firebase', 'Mobile UI/UX', 'REST APIs'],
      featured: true
    },
    {
      name: 'Next.js Professional Developer',
      issuer: 'Vercel',
      date: '2024',
      description: 'Comprehensive certification in Next.js 14+ covering App Router, server components, API routes, middleware, and advanced performance optimization techniques.',
      skills: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      featured: true
    },
    {
      name: 'Flutter & Firebase: Full Stack Development',
      issuer: 'Google Developers',
      date: '2023',
      description: 'Specialized certification in building full-stack Flutter applications with Firebase backend including authentication, cloud functions, and real-time databases.',
      skills: ['Flutter', 'Firebase Auth', 'Cloud Firestore', 'Cloud Functions', 'FCM'],
      featured: false
    },
    {
      name: 'Full Stack Next.js with Node.js',
      issuer: 'Meta',
      date: '2023',
      description: 'Professional certification in building full-stack applications with Next.js, Node.js, and PostgreSQL. Includes authentication, API development, and deployment strategies.',
      skills: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'JWT Auth'],
      featured: false
    },
    {
      name: 'Flutter Advanced State Management',
      issuer: 'Coursera',
      date: '2022',
      description: 'Deep dive into Flutter state management solutions including Riverpod, Bloc/Cubit, and Provider with real-world application architecture patterns.',
      skills: ['Riverpod', 'Bloc/Cubit', 'Provider', 'Clean Architecture'],
      featured: false
    },
    {
      name: 'Next.js Performance & Optimization',
      issuer: 'Frontend Masters',
      date: '2023',
      description: 'Advanced techniques for optimizing Next.js applications including image optimization, code splitting, ISR, and Core Web Vitals improvement strategies.',
      skills: ['Performance Tuning', 'Core Web Vitals', 'ISR', 'Image Optimization'],
      featured: false
    }
  ]

  return (
    <section id="certifications" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Professional <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Certifications</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              Industry-recognized certifications in Flutter and Next.js development
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certifications.map((cert, index) => (
            <FadeIn key={index} direction="up" delay={index * 100}>
              <div className={`group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-105 h-full flex flex-col ${
                cert.featured ? 'ring-2 ring-blue-500/50 hover:ring-blue-500/70' : ''
              }`}>
                {/* Featured badge */}
                {cert.featured && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                    Featured
                  </div>
                )}
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                      {cert.name}
                    </h3>
                    <div className="flex items-center gap-3 text-gray-400 text-xs sm:text-sm flex-wrap">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4 text-blue-400" />
                        <span>{cert.issuer}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-4 text-sm leading-relaxed flex-grow">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2 text-xs sm:text-sm">Skills Covered:</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-500/30 hover:bg-blue-600/30 transition-colors duration-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verify button only */}
                <div className="flex justify-end pt-4 border-t border-gray-700/50 mt-auto">
                  <button className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors duration-300 text-xs sm:text-sm">
                    <ExternalLink size={14} />
                    <span>Verify Certificate</span>
                  </button>
                </div>

                {/* Technology icons indicator */}
                <div className="absolute top-4 left-4 flex gap-1 opacity-30">
                  {cert.skills.includes('Flutter') && <span className="text-xs">📱</span>}
                  {cert.skills.includes('Next.js') && <span className="text-xs">⚡</span>}
                  {cert.skills.includes('React') && <span className="text-xs">⚛️</span>}
                  {cert.skills.includes('TypeScript') && <span className="text-xs">📘</span>}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications