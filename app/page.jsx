'use client';
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import DamanAI from "./components/Daman-ai";

export default function Portfolio() {
  const { scrollYProgress } = useScroll();

  const switchScale = useTransform(scrollYProgress, [0.0, 0.4], [1, 5]);
  const switchOpacity = useTransform(scrollYProgress, [0.0, 0.4], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-black text-white font-sans overflow-x-hidden">
      <Hero />

      {/* Image 1 - Network Switch with scroll effect */}
      <section className="min-h-[40vh] flex flex-col justify-center items-center relative space-y-6">
        <motion.div
          className="relative flex justify-center items-center w-full"
          style={{ scale: switchScale, opacity: switchOpacity }}
        >
          <div className="absolute w-[60%] h-[100%] bg-black rounded-full blur-3xl opacity-60"></div>
          <img
            src="/images/network-switch.png"
            alt="Network Switch"
            className="w-1/2 relative z-10"
          />
        </motion.div>

        {/* Scroll Down Arrow with SVG */}
        <div className="absolute bottom-0 right-10 flex flex-col items-center animate-bounce text-white opacity-70 space-y-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          <span className="text-sm">scroll down</span>
        </div>
      </section>

      {/* Spacer before Tech Stack to push it lower */}
      <div className="min-h-[30vh]" />

      {/* Daman AI section */}
      <section className="py-20 px-6 md:px-24">
        <DamanAI />
      </section>

      <TechStack />
      <Projects />
      <Timeline />
      <Certifications />
      <Contact />

      <footer className="py-10 text-center text-sm text-neutral-500">
        © 2025 Damanpreet Chauhan. Built with ❤️ and Framer Motion.
      </footer>
    </main>
  );
}
