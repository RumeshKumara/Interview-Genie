"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { BsMoon, BsSun } from "react-icons/bs";

function Header() {
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
    <div className="flex justify-between items-center p-4 bg-transparent text-white">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="Logo" width={40} height={50} />
        <h2 className=" text-2xl font-bold text-[#5417d7]">InterviewGenie</h2>
      </div>
      <ul className="flex gap-8 bg-[#ffffff] backdrop-blur-sm shadow-lg p-4 px-8 rounded-full text-[#5417d7] font-semibold hover:shadow-xl transition-shadow">
        <li>Dashboard</li>
        <li>Questions</li>
        <li>Upgrade</li>
        <li>How it Works?</li>
      </ul>
      <div className="flex items-center gap-4">
        <button
          onClick={toggleDarkMode}
          className="bg-[#ffffff] backdrop-blur-sm shadow-lg p-4 rounded-full text-[#5417d7] font-semibold hover:shadow-xl transition-shadow"
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
  );
}

export default Header;
