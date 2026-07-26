"use client";

import { Quote, Star } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechStart",
      company: "TechStart Inc.",
      avatar: "/images/avatar-1.jpg",
      content:
        "REHMAN delivered an exceptional Flutter application that exceeded our expectations. His attention to detail and problem-solving skills are outstanding. Highly recommended!",
      rating: 5,
      featured: true,
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "Innovate Solutions",
      avatar: "/images/avatar-2.jpg",
      content:
        "Working with REHMAN was a game-changer for our mobile app development. He brought innovative solutions and delivered on time every single project.",
      rating: 5,
      featured: false,
    },
    {
      name: "Emily Rodriguez",
      role: "CTO",
      company: "Digital Agency",
      avatar: "/images/avatar-3.jpg",
      content:
        "REHMAN's expertise in Flutter and Next.js is remarkable. He transformed our ideas into beautiful, functional applications that our users love.",
      rating: 5,
      featured: false,
    },
  ];

  return (
    <section
      id="testimonials"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Client{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Testimonials
              </span>
            </h2>
            <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
              What my clients say about working with me
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn
              key={index}
              direction="up"
              delay={index * 200}
              className="animate-fade-scale"
            >
              <div
                className={`group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-105 transform hover:-translate-y-2 hover:border-blue-500/30 ${
                  testimonial.featured
                    ? "ring-2 ring-blue-500/50 hover:ring-blue-500/70"
                    : ""
                }`}
              >
                {/* Featured badge */}
                {testimonial.featured && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-bounce-in delay-200">
                    Featured
                  </div>
                )}

                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-blue-400/20 group-hover:text-blue-400/40 transition-colors duration-300 animate-rotate-in">
                  <Quote size={24} />
                </div>

                {/* Content */}
                <div className="mb-6 animate-fade-up delay-100">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 animate-fade-up delay-200">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-current transform hover:scale-125 transition-transform delay-100"
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 animate-slide-up delay-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base group-hover:text-blue-400 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
