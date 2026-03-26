import HomeClient from "@/components/HomeClient";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-24">
      <div className="space-y-8 text-center">
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
          CSENotes <span className="inline-block animate-bounce">🚀</span>
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Your premium academic notes portal is now live and fully refactored for Next.js 16.
        </p>
      </div>

      <div className="mt-16 w-full max-w-5xl">
        <Suspense fallback={<div className="text-center p-12 text-2xl font-mono">Loading Interactive Portal...</div>}>
          <HomeClient />
        </Suspense>
      </div>
    </main>
  );
}
