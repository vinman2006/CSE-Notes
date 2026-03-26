import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CAC Notes Portal",
  description: "Minimal academic notes portal",
};

import LoadingScreen from "@/components/LoadingScreen";
import CanvasBackground from "@/components/CanvasBackground";
import CustomCursor from "@/components/CustomCursor";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen flex flex-col`}>
        <Suspense fallback={null}>
          <LoadingScreen />
          <CanvasBackground />
          <CustomCursor />
          <KeyboardShortcuts />
        </Suspense>
        <Providers>
          <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 bg-background/90 backdrop-blur-md border-b-[3px] border-foreground/10">
            <div>
              <h1 className="font-sketch text-2xl tracking-widest uppercase ml-4">CSE Notes</h1>
            </div>
            <div className="mr-4">
              <ThemeToggle />
            </div>
          </nav>
          <main className="flex-1 w-full max-w-6xl mx-auto pt-28 px-6">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </main>
        </Providers>
      </body>
    </html>
  );
}
