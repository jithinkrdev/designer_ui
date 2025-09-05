import React, { useState } from "react";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md fixed top-0 left-0 z-50">
      {/* Drawer Toggle Button (Hamburger icon) */}
      <button
        className="mr-4 p-2 bg-emerald-600 text-white rounded-lg shadow-lg focus:outline-none"
        aria-label="Toggle sidebar"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Logo */}
      <div
        className="flex cursor-pointer items-center"
        onClick={() => (window.location.href = "/dashboard")}
      >
        <img src="/noolil.png" alt="Logo" className="h-8 w-8 mr-2" />
        <span className="text-xl font-bold text-emerald-600">Designer App</span>
      </div>
      {/* User Avatar */}
      <div className="relative">
        <button
          className="flex cursor-pointer items-center focus:outline-none"
          onClick={() => setPopoverOpen((open) => !open)}
        >
          <img
            src="/noolil.png"
            alt="User Avatar"
            className="h-10 w-10 rounded-full border-2 border-emerald-600 shadow"
          />
          {/* Logout Icon */}
          <a
            className="ml-2 p-2 cursor-pointer bg-transparent text-emerald-600 hover:text-emerald-800 focus:outline-none"
            title="Logout"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
              />
            </svg>
          </a>
        </button>
        {/* Popover */}
        {popoverOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border">
            {/* <a
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
              onClick={() => setPopoverOpen(false)}
            >
              Profile
            </a> */}
            <a
              href="/change-password"
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-emerald-50 hover:text-emerald-600"
              onClick={() => setPopoverOpen(false)}
            >
              Change Password
            </a>
            <a
              href="/settings"
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-emerald-50 hover:text-emerald-600"
              onClick={() => setPopoverOpen(false)}
            >
              Settings
            </a>
            <a
              href="/trending"
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-emerald-50 hover:text-emerald-600"
              onClick={() => setPopoverOpen(false)}
            >
              Trending
            </a>
            <a
              href="/sales"
              className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-emerald-50 hover:text-emerald-600"
              onClick={() => setPopoverOpen(false)}
            >
              Sales
            </a>
            <button
              className="w-full text-left px-4 py-2 cursor-pointer text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
              onClick={() => {
                setPopoverOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
