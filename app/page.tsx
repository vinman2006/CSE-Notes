import HomeClient from "@/components/HomeClient";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center p-12 text-2xl font-mono">Loading Interactive Portal...</div>}>
      <HomeClient />
    </Suspense>
  );
}
