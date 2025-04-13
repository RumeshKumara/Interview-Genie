"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { BsMoon, BsSun } from "react-icons/bs";
import { usePathname } from "next/navigation";

function Header() {
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-transparent dark:bg-[#121212]">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={50} />
        <h2 className=" hidden md:flex text-2xl font-bold text-[#5417d7] dark:text-[#5417d7]">
          InterviewGenie
        </h2>
      </div>
      <div className=" p-[2px] bg-gradient-to-r from-[#5417d7] via-[#8b5cf6] to-[#5417d7] rounded-full animate-gradient bg-[length:200%_200%]">
        <ul className=" hidden md:flex gap-8 bg-white dark:bg-[#1e1e1e] backdrop-blur-sm p-2 px-2 pr-4 rounded-full text-[#444444] dark:text-[#e2e2e2] font-semibold items-center">
          <li
            className={`hover:text-[#8b5cf6] transition-colors cursor-pointer
                ${path == "/dashboard" && " bg-[#d8cdff] dark:bg-[#2a2149] px-[18px] py-2 text-[#5100ff] dark:text-[#7433ff] rounded-full"}
                `}
          >
            Dashboard
          </li>
          <li
            className={`hover:text-[#8b5cf6] transition-colors cursor-pointer
                ${path == "/dashboard/questions" && " bg-[#d8cdff] dark:bg-[#2a2149] px-[18px] py-2 text-[#5100ff] dark:text-[#7433ff] rounded-full"}
            `}
          >
            Questions
          </li>
          <li
            className={`hover:text-[#8b5cf6] transition-colors cursor-pointer
                ${path == "/dashboard/upgrade" && " bg-[#d8cdff] dark:bg-[#2a2149] px-[18px] py-2 text-[#5100ff] dark:text-[#7433ff] rounded-full"}
            `}
          >
            Upgrade
          </li>
          <li
            className={`hover:text-[#8b5cf6] transition-colors cursor-pointer
                ${path == "/dashboard/how" && " bg-[#d8cdff] dark:bg-[#2a2149] px-[18px] py-2 text-[#5100ff] dark:text-[#7433ff] rounded-full"}
            `}
          >
            How it Works?
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-2 bg-gradient-to-r from-[#5417d7] via-[#8b5cf6] to-[#5417d7] rounded-full animate-gradient bg-[length:200%_200%] p-[2px] bg-white dark:bg-[#1e1e1e]">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-full px-2 flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className=" p-4 rounded-full text-[#5417d7] dark:text-[#a98eff] font-semibold hover:text-[#8b5cf6] transition-colors cursor-pointer"
          >
            {darkMode ? (
              <BsSun className="text-lg lg:text-xl" />
            ) : (
              <BsMoon className="text-lg lg:text-xl" />
            )}
          </button>
          <UserButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
