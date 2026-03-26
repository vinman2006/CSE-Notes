"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { subjects } from "@/data/subjects";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

export default function HomeClient() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let hasLoadedSession = false;
    if (typeof window !== "undefined") {
      hasLoadedSession = sessionStorage.getItem("__LOADER_FINISHED") === "true";
    }

    const initDelay = hasLoadedSession ? 0.1 : 2.5;
    const heroDelay = hasLoadedSession ? 0 : 2.0;

    const ctx = gsap.context(() => {
      // Intro fade up
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        delay: heroDelay
      });

      // SVG Hand-drawn underline animation
      gsap.fromTo(".hero-underline", 
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.out", delay: initDelay }
      );

      // Subject Cards overall fade/slide in
      gsap.from(".sketch-box", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.05,
        delay: initDelay
      });

      // Subject Cards SVG Border animation
      gsap.fromTo(".card-border",
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.out", stagger: 0.05, delay: initDelay }
      );

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef} className="pb-24">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-12 mb-20 relative z-10">
        <h2 className="hero-text font-sketch text-5xl md:text-7xl mb-4 tracking-wide relative inline-block">
          Access 4th Semester Notes
          <svg className="absolute w-full h-4 -bottom-2 left-0 text-foreground overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 20">
             <path className="hero-underline" pathLength="100" d="M5,15 Q200,5 395,15" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </h2>
      </section>

      {/* Subjects Grid */}
      <section className="mt-20 relative z-10">
        {/* Lab Subjects */}
        <h3 className="hero-text font-sketch text-4xl mb-12 text-center">Lab Subjects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {subjects.filter(s => s.type === "lab").map((subject) => (
            <Link key={subject.slug} href={`/subject/${subject.slug}`}>
              <Magnetic strength={0.05}>
                <motion.div
                  className="sketch-box cursor-pointer group flex flex-col h-full bg-background relative z-10 p-[18px] rounded-[10px] shadow-[4px_4px_0_currentColor]"
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                >
                  {/* SVG Animated Border */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[10px]" preserveAspectRatio="none">
                    <rect 
                      className="card-border"
                      x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" 
                      rx="8" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      pathLength="100"
                    />
                  </svg>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h4 className="font-sketch text-2xl group-hover:underline decoration-dashed underline-offset-4 leading-tight pr-4">
                      {subject.subject_name}
                    </h4>
                    <span className="text-xs uppercase font-bold tracking-wider px-2 py-1 border-2 border-dashed border-current rounded whitespace-nowrap">
                      Lab
                    </span>
                  </div>
                  <div className="mt-auto pt-6 text-sm opacity-70 relative z-10">
                    {subject.units?.length || 0} Experiments
                  </div>
                </motion.div>
              </Magnetic>
            </Link>
          ))}
        </div>

        {/* Theory Subjects */}
        <div className="sketch-divider mx-auto w-1/2 opacity-30 mb-20" />
        <h3 className="hero-text font-sketch text-4xl mb-12 text-center">Theory Subjects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.filter(s => s.type === "theory").map((subject) => (
            <Link key={subject.slug} href={`/subject/${subject.slug}`}>
              <Magnetic strength={0.05}>
                <motion.div
                  className="sketch-box cursor-pointer group flex flex-col h-full bg-background relative z-10 p-[18px] rounded-[10px] shadow-[4px_4px_0_currentColor]"
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                >
                  {/* SVG Animated Border */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[10px]" preserveAspectRatio="none">
                    <rect 
                      className="card-border"
                      x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" 
                      rx="8" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      pathLength="100"
                    />
                  </svg>

                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h4 className="font-sketch text-2xl group-hover:underline decoration-dashed underline-offset-4 leading-tight pr-4">
                      {subject.subject_name}
                    </h4>
                    <span className="text-xs uppercase font-bold tracking-wider px-2 py-1 border-2 border-dashed border-current rounded whitespace-nowrap">
                      Theory
                    </span>
                  </div>
                  <div className="mt-auto pt-6 text-sm opacity-70 relative z-10">
                    {subject.units?.length || 0} Units Available
                  </div>
                </motion.div>
              </Magnetic>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
