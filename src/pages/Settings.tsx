import React from "react";
import Layout from "../layout";

const Settings: React.FC = () => {
  return (
    <Layout>
      <div
        className={`flex items-center justify-center min-h-screen w-full pt-24 pb-8 px-2  "md:ml-64 md:pl-8 md:pr-8  transition-all duration-300`}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center animate-fade-in w-full max-w-xl">
          <svg
            className="mb-6 animate-bounce"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#34d399" />
            <path
              d="M12 8v4"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="#fff" />
          </svg>
          <h1 className="text-5xl font-extrabold text-green-700 mb-3 tracking-tight drop-shadow-lg">
            Settings
          </h1>
          <p className="text-2xl text-gray-500 mb-6 font-medium">Coming Soon</p>
          <div className="flex items-center gap-2 text-green-500 text-lg">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-info"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="8" />
            </svg>
            <span>Stay tuned for updates!</span>
          </div>
        </div>
        <style>{`
          .animate-fade-in {
            animation: fadeIn 1.2s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Settings;
