"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Testimonials from "@/components/sections/Testimonials";

// ============================================================
// TYPES
// ============================================================
type SectionWrapperProps = {
  children: ReactNode;
  delay?: number;
  id?: string;
};

type StaggerChildrenProps = {
  children: ReactNode;
  delay?: number;
};

// ============================================================
// WRAPPER COMPONENTS
// ============================================================
const SectionWrapper = ({ children, delay = 0, id }: SectionWrapperProps) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative"
    >
      {children}
    </motion.section>
  );
};

const StaggerChildren = ({ children, delay = 0 }: StaggerChildrenProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================
// CHILD VARIANTS (exported for use in child components)
// ============================================================
export const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function HomeClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effects for Hero
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6]);

  // Client‑only floating particles
  const [particles, setParticles] = useState<
    Array<{ left: string; top: string; duration: number; delay: number }>
  >([]);

  // Generate particles only after mount (client side)
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps → runs once after mount

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-background dark:bg-gray-900 overflow-x-hidden"
    >
      {/* Navbar – slide‑in from top */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.2,
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <Navbar />
      </motion.div>

      {/* Floating particles – only rendered after client hydration */}
      {particles.length > 0 && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: p.left,
                top: p.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Hero section with parallax */}
      <motion.div
        style={{
          y: heroY,
          opacity: heroOpacity,
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionWrapper id="hero">
          <Hero />
        </SectionWrapper>
      </motion.div>

      {/* About */}
      <SectionWrapper delay={0.1} id="about">
        <StaggerChildren delay={0.1}>
          <About />
        </StaggerChildren>
      </SectionWrapper>

      {/* Experience – slide from left */}
      <motion.section
        id="experience"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          type: "spring",
          stiffness: 80,
        }}
        viewport={{ once: true }}
      >
        <Experience />
      </motion.section>

      {/* Projects – slide from right */}
      <motion.section
        id="projects"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          type: "spring",
          stiffness: 80,
        }}
        viewport={{ once: true }}
      >
        <Projects />
      </motion.section>

      {/* Skills – scale + rotate */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: "easeOut",
        }}
        viewport={{ once: true }}
      >
        <Skills />
      </motion.section>

      {/* Testimonials */}
      <SectionWrapper delay={0.5} id="testimonials">
        <StaggerChildren delay={0.3}>
          <Testimonials />
        </StaggerChildren>
      </SectionWrapper>

      {/* Contact – zoom‑in */}
      <motion.section
        id="contact"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.6,
          ease: "backOut",
        }}
        viewport={{ once: true }}
      >
        <Contact />
      </motion.section>

      {/* Footer – fade‑up */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
      >
        <Footer />
      </motion.div>

      {/* Scroll progress indicator */}
      <ScrollProgress />
    </motion.div>
  );
}
