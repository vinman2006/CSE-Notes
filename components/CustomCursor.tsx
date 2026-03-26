"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for closest interactive elements
      if (target.closest("[data-cursor='card']") || target.closest(".sketch-box")) {
        setCursorVariant("card");
      } else if (target.closest("a") || target.closest("button") || target.closest("[data-cursor='link']")) {
        setCursorVariant("link");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: position.x - 10,
      y: position.y - 10,
      height: 20,
      width: 20,
      backgroundColor: "white",
      mixBlendMode: "difference" as any,
      transition: { type: "tween" as const, ease: "backOut" as const, duration: 0.1 }
    },
    card: {
      x: position.x - 40,
      y: position.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "white",
      mixBlendMode: "difference" as any,
      opacity: 0.2, // Subtly highlight the card
      transition: { type: "spring" as const, mass: 0.1 }
    },
    link: {
      x: position.x - 15,
      y: position.y - 15,
      height: 30,
      width: 30,
      backgroundColor: "transparent",
      border: "2px solid white",
      mixBlendMode: "difference" as any,
      transition: { type: "spring" as const, mass: 0.1 }
    }
  };

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[999999]"
      style={{
        transform: "translate(-50%, -50%)"
      }}
    />
  );
}
