'use client'

import { ExternalLink } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
  title: 'Binomical',
  description: 'Your AI-Powered Partner for Automated Business Processes. From data to insights to automation powered by AI using optimized design. Specializing in Salesforce implementation and intelligent workflow automation.',
  techStack: ['Flutter', 'Next.js', 'AI/ML','React', 'TypeScript', 'Tailwind CSS', 'Blockchain', 'Cloud Computing', ],
  liveDemo: 'https://binomical.com',
  featured: true,
  gradient: 'from-blue-500 to-cyan-500'
},
    {
      title: 'GIGSTRAP',
      description: 'Gigstrap is an AI-powered service marketplace that connects users with service providers instantly through intelligent matching. It combines blockchain technology for secure transactions with features like multi-role access, Gigtoken rewards, and enterprise workforce management tools.',
      techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI/ML', 'Blockchain', 'Cloud Computing', 'Flutter'],
      liveDemo: 'https://gigstrap.com',
      featured: false,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'SaraaKuch - Beauty & Lifestyle E-Commerce ',
      description: 'A complete one-stop online store solution for apparel, cosmetics, food items, and lifestyle products. Features include product catalog management, secure checkout, user authentication, and an intuitive shopping experience.',
      techStack: ['Flutter', 'Firebase', 'Next.js', 'React', 'Node.js', 'MongoDB'],
      liveDemo: '',
      featured: false,
      gradient: 'from-green-500 to-teal-500'
    },
    {
  title: 'GleamHR - AI-Powered HR Management',
  description: 'Comprehensive cloud-based HR platform with AI-assisted recruitment, employee onboarding, time tracking, payroll processing, and performance reviews. Features face attendance, asset tracking, custom workflows, Pumble integration, and real-time analytics for data-driven HR decisions.',
  techStack: ['Flutter', 'Next.js', 'PostgreSQL', 'Redis', 'AI/ML', 'Node.js'],
  liveDemo: 'https://play.google.com/store/apps/details?id=com.glowlogix.gleamhr&hl=en',
  featured: false,
  gradient: 'from-blue-500 to-teal-500'
},
  ]

  return (
    <section id="projects" className="relative py-24 bg-gradient-to-br from-gray-50 dark:from-gray-900 via-gray-100 dark:via-gray-800 to-gray-50 dark:to-gray-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore my latest work showcasing expertise in Flutter and Next.js development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-105 hover:border-gray-600/50 ${
                project.featured ? 'ring-2 ring-blue-500/50' : ''
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <span>Featured</span>
                </div>
              )}

              {/* Project header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {project.description}
                </p>
              </div>
              
              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-600/30 hover:border-blue-500/50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-all duration-300 hover:bg-blue-600/10 px-4 py-2 rounded-lg"
                >
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                  <span>Live Demo</span>
                </a>
              </div>

              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* View all projects button */}
        <div className="text-center mt-12">
          <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-500 flex items-center gap-3 mx-auto shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105">
            <span className="relative z-10 flex items-center gap-3">
              View All Projects
              <ExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects