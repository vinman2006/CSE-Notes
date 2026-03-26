"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("__LOADER_FINISHED")) {
        setIsLoaded(true);
        return;
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          y: -30,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete: () => {
            if (typeof window !== "undefined") {
              sessionStorage.setItem("__LOADER_FINISHED", "true");
            }
            setIsLoaded(true);
          }
        });
      }
    });

    // Simulate loading progress from 0 to 100
    const dummy = { val: 0 };
    tl.to(dummy, {
      val: 100,
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        setProgress(Math.round(dummy.val));
      }
    });
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-background text-foreground flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-sm flex flex-col">
        <h2 className="font-sketch text-2xl md:text-3xl font-bold tracking-widest mb-2 self-start">Loading...</h2>
        
        <div className="w-full h-10 border-[4px] border-current rounded-2xl p-1 relative select-none">
          <div 
            className="h-full bg-foreground rounded-xl"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <h2 className="font-sketch text-2xl md:text-3xl font-bold tracking-widest mt-2 self-end">{progress} %</h2>
      </div>
    </div>
  );
}
