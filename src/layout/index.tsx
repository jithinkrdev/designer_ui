import React, { useState, type ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { theme } from "../pages/theme";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className={`${theme.gradientBg} flex flex-col min-h-screen`}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          className={`w-full transition-all duration-300 ${
            sidebarOpen ? "md:ml-24" : ""
          }`}
        >
          {/* Scroll only inside this container */}
          <div className="min-h-screen overflow-y-auto px-4 md:px-8 pb-20 h-100%  pt-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
