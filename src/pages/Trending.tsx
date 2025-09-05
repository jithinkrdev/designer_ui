import React, { useState } from "react";
import { theme } from "./theme";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";

const Trending: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className={theme.gradientBg + " min-h-screen w-full"}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div
        className={`flex flex-col items-center justify-center min-h-screen w-full pt-24 pb-8 px-2 ${
          sidebarOpen ? "md:ml-64 md:pl-8 md:pr-8" : ""
        } transition-all duration-300`}
      >
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-emerald-700 mb-4">Trending</h1>
          <span className="text-2xl font-semibold text-gray-500 mb-2">
            Coming Soon
          </span>
          <svg
            className="w-16 h-16 text-emerald-300"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Trending;
