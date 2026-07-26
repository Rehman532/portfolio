"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Experience", href: "/experience" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Tools", href: "/tools" },
    { label: "Blog", href: "/blog" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl mx-auto rounded-full transition-all duration-500 animate-slide-down ${
        scrolled
          ? "bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.16)] border border-white/70 dark:border-slate-800/70"
          : "bg-white/40 dark:bg-slate-900/30 backdrop-blur-xl border border-transparent"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center gap-2 group animate-fade-scale delay-100"
          >
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 animate-fade-up">
              RF
            </div>
            <span className="font-semibold text-slate-800 dark:text-white hidden sm:inline group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 animate-fade-up delay-100">
              Rehman Farouq
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 animate-fade-scale transform hover:-translate-y-1 ${
                  pathname === item.href
                    ? "text-white bg-linear-to-r from-blue-500 to-purple-600 shadow-lg shadow-purple-500/20 animate-bounce-in"
                    : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:shadow-md"
                }`}
                style={{ animationDelay: `${50 + index * 30}ms` }}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="#contact"
              className="ml-3 px-5 py-2.5 text-sm font-semibold rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 animate-fade-scale transform delay-300"
            >
              <Sparkles size={16} className="animate-spin-slow" />
              Let&apos;s Talk
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hover:scale-110 transform hover:-translate-y-1 animate-fade-scale delay-100"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={22} className="animate-rotate-in" />
            ) : (
              <Menu size={22} className="animate-slide-left" />
            )}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-125 opacity-100 pb-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/60 p-2 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all animate-fade-scale transform hover:-translate-x-1 ${
                  pathname === item.href
                    ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md shadow-purple-500/20 animate-bounce-in"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md"
                }`}
                style={{ animationDelay: `${50 + index * 30}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 mt-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold text-center shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300 transform hover:-translate-y-1 animate-fade-scale delay-300"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
