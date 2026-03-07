'use client'

import { Award, Users, Clock, TrendingUp, MapPin } from 'lucide-react'
import FadeIn from '@/components/ui/FadeIn'
import Counter from '@/components/ui/Counter'

const About = () => {
  const technologies = [
    { 
      name: 'Flutter', 
      image: '/images/flutter.png', 
      level: 95, 
      color: 'from-blue-500 to-blue-600' 
    },
    { 
      name: 'Dart', 
      image: '/images/dart.png', 
      level: 90, 
      color: 'from-blue-600 to-blue-700' 
    },
    { 
      name: 'Next.js', 
      image: '/images/nextjs.png', 
      level: 85, 
      color: 'from-purple-500 to-purple-600' 
    },
    { 
      name: 'Tailwind CSS', 
      image: '/images/tailwind.png', 
      level: 88, 
      color: 'from-teal-500 to-green-500' 
    },
    { 
      name: 'Firebase', 
      image: '/images/firebase.png', 
      level: 82, 
      color: 'from-orange-500 to-yellow-500' 
    },
    { 
      name: 'REST APIs', 
      image: '/images/api.png', 
      level: 92, 
      color: 'from-green-500 to-emerald-500' 
    }
  ]

  const stats = [
    { icon: <Users size={24} />, label: 'Happy Clients', value: 50 },
    { icon: <Clock size={24} />, label: 'Hours Coded', value: 8000 },
    { icon: <Award size={24} />, label: 'Apps Published', value: 15 },
    { icon: <TrendingUp size={24} />, label: 'Performance', value: 100 }
  ]

  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 dark:from-gray-900 via-gray-100 dark:via-gray-800 to-gray-50 dark:to-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4 sm:mb-6">
              About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              Results-driven developer with expertise in Flutter and Next.js development
            </p>
          </FadeIn>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - About content */}
          <div className="space-y-6 sm:space-y-8">
            <FadeIn direction="left" delay={200}>
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl sm:text-3xl font-semibold text-foreground dark:text-white mb-4 sm:mb-6">
                  Professional <span className="text-blue-400">Summary</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                  I am a results-driven Flutter Developer specializing in mobile and web application development. 
I build high-performance applications using Flutter, Dart, and modern web technologies. 
My expertise includes integrating REST APIs, developing scalable websites, and implementing 
modern UI/UX designs to deliver efficient, responsive, and engaging digital experiences.
                </p>
                
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-900/70 transition-colors duration-300">
                  <MapPin className="text-blue-400" size={20} />
                  <div>
                    <p className="text-foreground dark:text-white font-medium text-sm sm:text-base">Location</p>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Tapyiala, Tehsile Kharian, District Gujrat</p>
                  </div>
                </div>
                
                {/* Animated Stats grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-4 rounded-xl hover:bg-gray-100/70 dark:hover:bg-gray-900/70 transition-colors duration-300 group">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-blue-400 group-hover:scale-110 transition-transform duration-300">{stat.icon}</span>
                        <span className="text-foreground dark:text-white font-bold text-lg sm:text-xl">
                          <Counter end={stat.value} suffix={stat.label === 'Performance' ? '%' : '+'} className="inline-block" />
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right side - Technologies */}
          <div className="space-y-6 sm:space-y-8">
            <FadeIn direction="right" delay={400}>
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:scale-105">
                <h3 className="text-2xl sm:text-3xl font-semibold text-foreground dark:text-white mb-6 sm:mb-8">
                  Core <span className="text-purple-400">Technologies</span>
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {technologies.map((tech, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                         <div className="w-12 h-12 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <img
                               src={tech.image}
                      alt={tech.name}
                       className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                          />
                              </div>
                          <span className="text-foreground dark:text-white font-semibold text-sm sm:text-base lg:text-lg group-hover:text-blue-400 transition-colors duration-300">{tech.name}</span>
                        </div>
                        <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium bg-gray-200/50 dark:bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full group-hover:bg-gray-300/50 dark:group-hover:bg-gray-600/50 transition-colors duration-300">
                          {tech.level}%
                        </span>
                      </div>
                      <div className="relative w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-full h-2 sm:h-3 overflow-hidden">
                        <div 
                          className={`absolute top-0 left-0 h-full bg-gradient-to-r ${tech.color} rounded-full transition-all duration-1500 ease-out shadow-lg`}
                          style={{ width: `${tech.level}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About