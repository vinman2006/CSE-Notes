"use client";

import { useEffect, useState, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function KeyboardShortcuts() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only show shortcuts tooltip on landscape desktops
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768 && window.innerHeight < window.innerWidth && !window.matchMedia("(pointer: coarse)").matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in an input, only listen to ESC
      if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA") {
        if (e.key === "Escape") {
            setIsSearchOpen(false);
            (document.activeElement as HTMLElement).blur();
        }
        return;
      }

      if (e.key === "/") {
        e.preventDefault(); // Prevent native browser search
        setIsSearchOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
      
      if (e.key.toLowerCase() === "d") {
        e.preventDefault();
        const btn = document.getElementById("theme-toggle-btn");
        if (btn) btn.click();
      }

      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", checkDesktop);
    }
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      <AnimatePresence>
        {isDesktop && !isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.5 }} 
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-[90] text-xs space-y-2 font-mono tracking-wider pointer-events-none text-right"
          >
            <div className="flex items-center justify-end gap-2">Search <kbd className="border border-current rounded px-1.5 py-0.5">/</kbd></div>
            <div className="flex items-center justify-end gap-2">Theme <kbd className="border border-current rounded px-1.5 py-0.5">D</kbd></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100000] bg-background/90 backdrop-blur-xl flex items-start justify-center pt-[20vh] p-4"
          >
            <div className="w-full max-w-2xl sketch-box !p-2 flex items-center bg-background relative shadow-[8px_8px_0_currentColor]">
              <Search className="ml-4 opacity-50" size={24} />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search subjects, units, topics..." 
                className="w-full bg-transparent outline-none p-4 text-xl font-sketch tracking-wide"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-4 opacity-50 hover:opacity-100 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="absolute bottom-10 opacity-50 font-mono text-sm tracking-widest flex gap-2 items-center">
               <kbd className="border border-current px-2 rounded box-border">ESC</kbd> to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
