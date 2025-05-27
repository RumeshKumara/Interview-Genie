"use client";

import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white ">
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
            className="mt-4 bg-[#5417d7] hover:bg-[#5417d7d2] transition-all duration-300 ease-in-out  rounded-full px-6 py-2 text-white text-lg flex items-center gap-2"
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
    </div>
  );
}
