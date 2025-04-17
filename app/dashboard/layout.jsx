import React from "react";
import Header from "./_components/Header";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] transition-colors duration-300">
      <Header />
      <div className="mx-5  md:mx-20 lg:mx-36">{children}</div>
    </div>
  );
}
