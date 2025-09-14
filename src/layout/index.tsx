import React, { type ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-background flex overflow-hidden relative">
      {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

      <div className="w-full bg-gray-900 h-full flex">
        <Sidebar />
        <div className="flex-1 p-4 overflow-y-auto ">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
