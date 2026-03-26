"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme from DOM
    if (!document.documentElement.classList.contains("dark")) {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const x = e.clientX;
    const y = e.clientY;

    const isCurrentlyDark = document.documentElement.classList.contains("dark");

    // Fallback if View Transitions API is not supported (e.g. Firefox, older Safari)
    if (!document.startViewTransition) {
      document.documentElement.classList.toggle("dark");
      setIsDark(!isCurrentlyDark);
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle("dark");
      setIsDark(!isCurrentlyDark);
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];

      // Animating the new view snapshot using native WAAPI to grow circularly
      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 800,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      id="theme-toggle-btn"
      onClick={toggleTheme}
      className="sketch-button flex items-center justify-center min-w-[120px] bg-background text-foreground"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
