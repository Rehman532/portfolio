"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Counter from "@/components/ui/Counter";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-950/10 via-purple-950/10 to-pink-950/10 dark:from-blue-950/25 dark:via-purple-950/25 dark:to-pink-950/25" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background dark:from-slate-950 dark:to-slate-950" />

      <div
        className="hidden md:block absolute h-80 w-80 rounded-full bg-blue-500/15 blur-3xl transition-all duration-300"
        style={{ left: mousePosition.x - 160, top: mousePosition.y - 160 }}
      />

      <div className="absolute inset-0">
        <div className="absolute left-8 top-20 h-2.5 w-2.5 animate-ping rounded-full bg-blue-400" />
        <div className="absolute right-24 top-32 h-2 w-2 animate-ping rounded-full bg-purple-400 delay-1000" />
        <div className="absolute bottom-24 left-16 h-2.5 w-2.5 animate-pulse rounded-full bg-pink-400 delay-1500" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-[2rem] bg-linear-to-r from-blue-500 to-purple-500 blur-2xl opacity-50" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-3 shadow-[0_30px_90px_rgba(37,99,235,0.2)] backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70">
                <div className="relative h-72 w-56 overflow-hidden rounded-[1.5rem] sm:h-80 sm:w-64 md:h-96 md:w-72 lg:h-[28rem] lg:w-80">
                  <Image
                    src="/images/profile-photo.png"
                    alt="Rehman Farouq"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 288px, 320px"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 shadow-lg dark:border-slate-900" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-500" />{" "}
              Available for freelance and full-time work
            </div>

            <h1 className="mb-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              <span className="text-slate-800 dark:text-white">I&apos;m</span>{" "}
              <span className="animate-gradient bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                REHMAN FAROUQ
              </span>
            </h1>

            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {[
                "Flutter",
                "Next.js",
                "UI/UX",
                "Android",
                "iOS",
                "Play Store",
                "App Store",
                "Firebase",
                "API Integration",
                "Animations",
                "Responsive Design",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-sm font-medium text-slate-700 shadow-sm transition hover:scale-105 hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <p className="mx-auto mb-8 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 lg:mx-0 lg:text-lg">
              I craft polished mobile and web products with clean architecture,
              thoughtful interactions, and measurable product impact. From
              start-ups to modern brands, I turn ideas into fast, elegant
              experiences.
            </p>

            <div className="mb-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-[0_18px_40px_rgba(59,130,246,0.25)] transition-all duration-300"
              >
                View Projects{" "}
                <ArrowRight
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  size={18}
                />
              </motion.button>
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#contact"
                className="flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200"
              >
                <Download size={18} /> Download CV
              </motion.a>
            </div>

            <div className="mb-10 flex justify-center gap-3 lg:justify-start">
              <a
                href="https://github.com/Rehman532"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/rehman-farouq-93727526b"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:text-purple-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
              >
                <Linkedin size={18} />
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  <Counter end={4} suffix="+" className="inline-block" />
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Years experience
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  <Counter end={50} suffix="+" className="inline-block" />
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Projects shipped
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-slate-800/70 dark:bg-slate-900/60">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  <Counter end={100} suffix="%" className="inline-block" />
                </div>
                <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Client delight
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-5 items-start justify-center rounded-full border border-slate-400/70 dark:border-slate-600">
          <div className="mt-2 h-2 w-1 rounded-full bg-slate-600 animate-bounce dark:bg-slate-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
