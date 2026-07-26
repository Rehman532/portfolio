"use client";

import {
  Smartphone,
  Globe,
  Database,
  Server,
  Code2,
  Palette,
  GitBranch,
  Cloud,
  Zap,
  Shield,
  Layout,
  Terminal,
  Rocket,
  Target,
  Sparkles,
  Monitor,
  SmartphoneIcon,
  Users,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const Skills = () => {
  const skills = [
    // Mobile Development
    {
      name: "Flutter",
      icon: <Smartphone size={32} />,
      category: "Mobile",
      level: 95,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Dart",
      icon: <Code2 size={32} />,
      category: "Mobile",
      level: 90,
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "iOS Developer",
      icon: <SmartphoneIcon size={32} />,
      category: "Mobile",
      level: 75,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Android Development",
      icon: <Smartphone size={32} />,
      category: "Mobile",
      level: 85,
      color: "from-green-500 to-green-600",
    },
    {
      name: "React Native",
      icon: <SmartphoneIcon size={32} />,
      category: "Mobile",
      level: 70,
      color: "from-cyan-500 to-blue-500",
    },

    // Web Development
    {
      name: "Next.js",
      icon: <Globe size={32} />,
      category: "Web",
      level: 85,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "React",
      icon: <Layout size={32} />,
      category: "Web",
      level: 82,
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "TypeScript",
      icon: <Terminal size={32} />,
      category: "Web",
      level: 78,
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "JavaScript",
      icon: <Code2 size={32} />,
      category: "Web",
      level: 88,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "HTML5/CSS3",
      icon: <Palette size={32} />,
      category: "Web",
      level: 92,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Tailwind CSS",
      icon: <Palette size={32} />,
      category: "Web",
      level: 88,
      color: "from-teal-500 to-green-500",
    },
    {
      name: "Responsive Web",
      icon: <Monitor size={32} />,
      category: "Web",
      level: 90,
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Web Application",
      icon: <Globe size={32} />,
      category: "Web",
      level: 85,
      color: "from-cyan-500 to-blue-500",
    },

    // Backend & Database
    {
      name: "Google Firebase",
      icon: <Cloud size={32} />,
      category: "Backend",
      level: 82,
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "REST APIs",
      icon: <Server size={32} />,
      category: "Backend",
      level: 92,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "GraphQL",
      icon: <Server size={32} />,
      category: "Backend",
      level: 75,
      color: "from-pink-500 to-purple-500",
    },
    {
      name: "Node.js",
      icon: <Server size={32} />,
      category: "Backend",
      level: 70,
      color: "from-green-600 to-green-700",
    },
    {
      name: "MySQL",
      icon: <Database size={32} />,
      category: "Backend",
      level: 35,
      color: "from-blue-500 to-blue-600",
    },

    // Design & UI/UX
    {
      name: "UI/UX Design",
      icon: <Palette size={32} />,
      category: "Design",
      level: 85,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Figma",
      icon: <Palette size={32} />,
      category: "Design",
      level: 78,
      color: "from-purple-600 to-purple-700",
    },
    {
      name: "Adobe XD",
      icon: <Palette size={32} />,
      category: "Design",
      level: 72,
      color: "from-pink-600 to-rose-600",
    },
    {
      name: "Material Design",
      icon: <Layout size={32} />,
      category: "Design",
      level: 90,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Responsive Design",
      icon: <Monitor size={32} />,
      category: "Design",
      level: 92,
      color: "from-teal-500 to-green-500",
    },

    // Tools & Deployment
    {
      name: "GIT Version Control",
      icon: <GitBranch size={32} />,
      category: "Tools",
      level: 88,
      color: "from-red-500 to-orange-500",
    },
    {
      name: "GitHub",
      icon: <GitBranch size={32} />,
      category: "Tools",
      level: 90,
      color: "from-gray-600 to-gray-700",
    },
    {
      name: "GitLab",
      icon: <GitBranch size={32} />,
      category: "Tools",
      level: 75,
      color: "from-orange-600 to-red-600",
    },
    {
      name: "VS Code",
      icon: <Code2 size={32} />,
      category: "Tools",
      level: 95,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Android Studio",
      icon: <Terminal size={32} />,
      category: "Tools",
      level: 85,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Xcode",
      icon: <Terminal size={32} />,
      category: "Tools",
      level: 70,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Mobile App Publishing",
      icon: <Rocket size={32} />,
      category: "Deployment",
      level: 95,
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Docker",
      icon: <Server size={32} />,
      category: "Deployment",
      level: 65,
      color: "from-blue-600 to-cyan-600",
    },
    {
      name: "Vercel",
      icon: <Rocket size={32} />,
      category: "Deployment",
      level: 80,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Netlify",
      icon: <Rocket size={32} />,
      category: "Deployment",
      level: 78,
      color: "from-cyan-500 to-blue-500",
    },

    // Monetization & Analytics
    {
      name: "AdMob Integration",
      icon: <Target size={32} />,
      category: "Monetization",
      level: 85,
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Google Analytics",
      icon: <Target size={32} />,
      category: "Monetization",
      level: 80,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Firebase Analytics",
      icon: <Cloud size={32} />,
      category: "Monetization",
      level: 82,
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "In-App Purchases",
      icon: <Target size={32} />,
      category: "Monetization",
      level: 75,
      color: "from-purple-500 to-pink-500",
    },

    // Expertise & Soft Skills
    {
      name: "Debugging & Troubleshooting",
      icon: <Zap size={32} />,
      category: "Expertise",
      level: 92,
      color: "from-yellow-500 to-orange-500",
    },
    {
      name: "Cross-Platform Development",
      icon: <Layout size={32} />,
      category: "Expertise",
      level: 95,
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Performance Optimization",
      icon: <Zap size={32} />,
      category: "Expertise",
      level: 88,
      color: "from-green-500 to-teal-500",
    },
    {
      name: "Code Review",
      icon: <Shield size={32} />,
      category: "Expertise",
      level: 85,
      color: "from-blue-600 to-purple-600",
    },
    {
      name: "Agile/Scrum",
      icon: <Target size={32} />,
      category: "Expertise",
      level: 80,
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Problem Solving",
      icon: <Zap size={32} />,
      category: "Expertise",
      level: 90,
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Team Collaboration",
      icon: <Users size={32} />,
      category: "Expertise",
      level: 92,
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Project Management",
      icon: <Target size={32} />,
      category: "Expertise",
      level: 78,
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "API Integration",
      icon: <Server size={32} />,
      category: "Expertise",
      level: 90,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Security Best Practices",
      icon: <Shield size={32} />,
      category: "Expertise",
      level: 82,
      color: "from-red-500 to-orange-500",
    },
  ];

  const categories = [...new Set(skills.map((skill) => skill.category))];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mobile":
        return <Smartphone size={20} className="text-blue-400" />;
      case "Web":
        return <Globe size={20} className="text-purple-400" />;
      case "Design":
        return <Palette size={20} className="text-pink-400" />;
      case "Backend":
        return <Server size={20} className="text-orange-400" />;
      case "Deployment":
        return <Rocket size={20} className="text-indigo-400" />;
      case "Tools":
        return <GitBranch size={20} className="text-red-400" />;
      case "Monetization":
        return <Target size={20} className="text-green-400" />;
      case "Expertise":
        return <Sparkles size={20} className="text-yellow-400" />;
      default:
        return <Target size={20} className="text-gray-400" />;
    }
  };

  return (
    <section
      id="skills"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 dark:from-gray-900 via-gray-100 dark:via-gray-800 to-gray-50 dark:to-gray-900 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Skills &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              Comprehensive skill set covering mobile development, web
              technologies, and modern development practices
            </p>
          </FadeIn>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {categories.map((category, catIndex) => (
            <FadeIn
              key={category}
              direction="up"
              delay={catIndex * 200}
              className="animate-fade-up"
            >
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-center gap-3 sm:gap-4 animate-slide-left delay-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all duration-300">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white capitalize hover:text-blue-400 transition-colors duration-300">
                    {category}{" "}
                    <span className="text-gray-400 font-normal">
                      Technologies
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill, index) => (
                      <FadeIn
                        key={index}
                        direction="up"
                        delay={index * 100}
                        className="animate-fade-scale"
                      >
                        <div className="group relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-110 hover:border-gray-600/50 transform hover:-translate-y-2">
                          {/* Skill level indicator */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gray-700/50">
                            <div
                              className={`h-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>

                          <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                            <div
                              className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${skill.color} rounded-2xl flex items-center justify-center text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl`}
                            >
                              <span className="text-sm sm:text-base">
                                {skill.icon}
                              </span>
                            </div>
                            <div className="space-y-2 w-full">
                              <span className="text-white font-semibold text-sm sm:text-base lg:text-lg block group-hover:text-blue-400 transition-colors duration-300 animate-fade-up delay-100">
                                {skill.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-700/50 rounded-full h-1.5 sm:h-2 overflow-hidden">
                                  <div
                                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                                    style={{ width: `${skill.level}%` }}
                                  ></div>
                                </div>
                                <span className="text-gray-400 text-xs sm:text-sm font-medium bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full group-hover:bg-gray-600/50 transition-colors duration-300 whitespace-nowrap animate-fade-up delay-200">
                                  {skill.level}%
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Hover effect overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                          ></div>
                        </div>
                      </FadeIn>
                    ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Skills summary */}
      <FadeIn direction="up" delay={800}>
        <div className="mt-16 sm:mt-20 text-center">
          <div className="inline-flex items-center gap-3 sm:gap-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 sm:px-6 py-2 sm:py-3 hover:scale-105 transition-transform duration-300">
            <Rocket className="text-blue-400" size={20} />
            <span className="text-blue-300 font-medium text-sm sm:text-base">
              {skills.length}+ Technologies mastered across {categories.length}{" "}
              categories
            </span>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

export default Skills;
