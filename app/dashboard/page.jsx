import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";

function Dashboard() {
  return (
    <div className="">
      <h2 className="text-3xl font-bold text-[#5100ff] dark:text-[#6f2dff] ">
        Dashboard
      </h2>
      <h2 className="text-gray-500 dark:text-white/70">
        Create and Start your AI Mockup Interview
      </h2>

      <div className="grid grid-cols-1 my-5 md:grid-cols-3">
        <AddNewInterview />
      </div>
    </div>
  );
}

export default Dashboard;
