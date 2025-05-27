"use client";

import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>

      <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
        {/* Add top padding to avoid overlap with navbar */}
        <div className="h-8" /> {/* Reduced from h-16 to h-8 */}
        <Image
          src="/logo.svg"
          alt="Logo"
          width={60}
          height={60}
        />
        <h2 className="text-6xl font-bold text-gray-800 ">InterviewGenie </h2>
        <p className="text-lg tracking-wide text-gray-600 ">
          Your AI-Powered Interview Assistant
        </p>
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2 ">
            <button
              className="mt-4 bg-[#5417d7] hover:bg-[#5417d7d2] transition-all duration-300 ease-in-out rounded-full px-6 py-2 text-white text-lg flex items-center gap-2 border-2 animate-borderColor"
              style={{
                borderColor: "#5417d7",
                animation: "borderColorAnim 2s linear infinite"

              }}
              onClick={() => router.push("/dashboard")}
            >
              Get Start
              <FaArrowRight size={18} />
            </button>
            <button className="flex items-center gap-2 px-6 py-2 mt-4 text-lg text-black transition-all duration-300 ease-in-out bg-white border-gray-500 rounded-full hover:bg-black hover:text-white border-1">
              Learn More
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-6 py-2 text-lg text-black transition-all duration-300 ease-in-out bg-white border-gray-500 rounded-full hover:bg-black hover:text-white border-1">
              <FaGithub size={24} /> {/* GitHub icon */}
              GitHub Resource
            </button>
            <button className="flex items-center gap-2 px-6 py-2 text-lg text-black transition-all duration-300 ease-in-out bg-white border-gray-500 rounded-full hover:bg-black hover:text-white border-1">
              How it works?
            </button>
          </div>
        </div>
        {/* Infinite horizontal scroll of programming logos */}
        <div className="relative w-full mt-16 overflow-hidden">
          {/* Left blur overlay */}
          <div className="absolute top-0 left-0 z-10 w-24 h-full pointer-events-none bg-gradient-to-r from-white via-white/10 to-transparent" />
          {/* Right blur overlay */}
          <div className="absolute top-0 right-0 z-10 w-24 h-full pointer-events-none bg-gradient-to-l from-white via-white/10 to-transparent" />
          <div className="relative w-full h-20">
            <div
              className={`absolute top-0 left-0 flex items-center h-20 animate-logoScroll whitespace-nowrap${isHovered ? " paused-logo-scroll" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Repeat the logos twice for seamless looping */}
              {[1, 2].map((repeat) => (
                <div key={repeat} className="flex items-center">
                  <Image src="/logos/256.png" alt="JavaScript" width={80} height={80} className="mx-6 rounded-3xl" />
                  <Image src="/logos/next.png" alt="Next.js" width={80} height={80} className="mx-6" />
                  <Image src="/logos/js.png" alt="Java" width={80} height={80} className="mx-6 rounded-3xl" />
                  <Image src="/logos/tailwind.png" alt="C++" width={80} height={80} className="mx-6" />
                  <Image src="/logos/react.png" alt="React" width={80} height={80} className="mx-6" />
                  <Image src="/logos/express.jpeg" alt="Node.js" width={80} height={80} className="mx-6" />
                  <Image src="/logos/shadcn.png" alt="PHP" width={70} height={70} className="mx-6" />
                  <Image src="/logos/postgres.png" alt="Go" width={240} height={240} className="mx-6" />
                  <Image src="/logos/ai.png" alt="TypeScript" width={100} height={100} className="mx-6" />
                  <Image src="/logos/256.png" alt="JavaScript" width={80} height={80} className="mx-6 rounded-3xl" />
                  <Image src="/logos/next.png" alt="Next.js" width={80} height={80} className="mx-6" />
                  <Image src="/logos/js.png" alt="Java" width={80} height={80} className="mx-6 rounded-3xl" />
                  <Image src="/logos/tailwind.png" alt="C++" width={80} height={80} className="mx-6" />
                  <Image src="/logos/react.png" alt="React" width={80} height={80} className="mx-6" />
                  <Image src="/logos/express.jpeg" alt="Node.js" width={80} height={80} className="mx-6" />
                  <Image src="/logos/shadcn.png" alt="PHP" width={70} height={70} className="mx-6" />
                  <Image src="/logos/postgres.png" alt="Go" width={240} height={240} className="mx-6" />
                  <Image src="/logos/ai.png" alt="TypeScript" width={100} height={100} className="mx-6" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 w-full py-4 mt-12 text-sm text-center text-gray-600 ">

        <div>
          &copy; {new Date().getFullYear()} InterviewGenie. All rights reserved.
        </div>
        <div>
          <a
            href="https://github.com/yourusername/interviewgenie"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5417d7] hover:underline"
          >
            View on GitHub
          </a>
        </div>
      </footer>
    </>
  );
}

// Add the following CSS to your global styles (e.g., globals.css or in a <style jsx global> block):
/*
@keyframes logoScroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-logoScroll {
  animation: logoScroll 20s linear infinite;
  min-width: 200%;
}
.paused-logo-scroll {
  animation-play-state: paused;
}
*/
