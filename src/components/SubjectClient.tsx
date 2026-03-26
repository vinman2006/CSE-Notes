"use client";

import { subjects, Subject } from "@/data/subjects";
import Link from "next/link";
import { ArrowLeft, BookOpen, Download, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function SubjectClient({ subject }: { subject: Subject | undefined }) {
  const [mounted, setMounted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".subject-underline",
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
      gsap.fromTo(".unit-card-border",
        { strokeDasharray: 100, strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.out", stagger: 0.05, delay: 0.4 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [mounted, subject]);

  if (!mounted) return null;

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="font-sketch text-4xl mb-4">Subject Not Found</h2>
        <Link href="/">
          <button className="sketch-button flex items-center gap-2">
            <ArrowLeft size={20} /> Back to Hub
          </button>
        </Link>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 pt-8"
      ref={pageRef}
    >
      <Link href="/">
        <button className="sketch-button flex items-center gap-2 mb-12 bg-background relative z-10">
          <ArrowLeft size={18} />
          Back
        </button>
      </Link>

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-16 relative z-10"
      >
        <h1 className="font-sketch text-5xl md:text-6xl mb-4 inline-block relative">
          {subject.subject_name}
          <svg className="absolute w-full h-3 -bottom-1 left-0 text-foreground overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 10">
             <path className="subject-underline" pathLength="100" d="M0,5 Q50,10 100,5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </h1>
        <div className="flex gap-4 mt-6">
          <span className="text-sm font-bold tracking-wider px-3 py-1 border-2 border-dashed border-current rounded uppercase">
            {subject.type}
          </span>
          <span className="text-sm font-bold tracking-wider px-3 py-1 border-2 border-dashed border-current rounded uppercase opacity-70">
            {subject.units?.length || 0} Units
          </span>
        </div>
      </motion.div>

      <div className="sketch-divider mx-auto w-full opacity-30 relative z-10" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8 relative z-10"
      >
        {subject.units?.map((unit, idx) => (
          <motion.div key={idx} variants={itemVariants} className="relative bg-background p-[18px] rounded-[10px] shadow-[4px_4px_0_currentColor]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-[10px]" preserveAspectRatio="none">
              <rect className="unit-card-border" x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="8" fill="none" stroke="currentColor" strokeWidth="3" pathLength="100" />
            </svg>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
              
              <div className="flex-1">
                <h3 className="font-sketch text-3xl mb-2">{unit.unit}</h3>
                {unit.title && <h4 className="text-xl font-medium mb-4 opacity-90">{unit.title}</h4>}
                
                {unit.topics && unit.topics.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 mt-4 opacity-80 text-sm md:text-base">
                    {unit.topics.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-3 min-w-[200px]">
                <button className="sketch-button flex items-center justify-center gap-2 py-2 text-sm w-full group overflow-hidden">
                  <BookOpen size={16} className="group-hover:scale-110 transition-transform" />
                  Read Notes
                </button>
                <button className="sketch-button flex items-center justify-center gap-2 py-2 text-sm w-full group overflow-hidden">
                  <FileText size={16} className="group-hover:scale-110 transition-transform" />
                  View PYQ
                </button>
                <button className="sketch-button flex items-center justify-center gap-2 py-2 text-sm w-full group border-dashed opacity-80 hover:opacity-100 overflow-hidden">
                  <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
                  Download PDF
                </button>
              </div>

            </div>
          </motion.div>
        ))}
      </motion.div>

      {(!subject.units || subject.units.length === 0) && (
        <div className="text-center opacity-60 mt-12 italic relative z-10">
          No units uploaded for this subject yet.
        </div>
      )}
    </motion.div>
  );
}
